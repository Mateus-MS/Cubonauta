package components

import (
	"Cubonauta/cluster"
	"Cubonauta/models"
	"database/sql"
	"fmt"
	"net/http"
	"strings"
	"text/template"
)

func Case_card(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "https://cubonauta.com")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-Requested-With, X-CSRF-Token")
	w.Header().Set("Access-Control-Expose-Headers", "X-CSRF-Token")

	//Resolve pre-flight
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	if strings.Contains(r.UserAgent(), "Mobile") {

		rows := getRows(r.URL.Query().Get("case_id"))
		defer rows.Close()

		case_ := formatRows(rows)

		// Render the template
		template, err := template.ParseFiles("./components/case_card/mobile.html")
		if err != nil {
			fmt.Println(err)
		}
		template.Execute(w, case_)
	}

	if strings.Contains(r.UserAgent(), "Windows") {
		template, _ := template.ParseFiles("./components/case_card/desktop.html")
		template.Execute(w, nil)
	}

}

func getRows(case_id string) *sql.Rows {
	query := `SELECT 
				c.case_nome, 
				f.formula_id, 
				f.nome, 
				f.solver, 
				f.setter, 
				t.tag 
			FROM 
				f2l 
			JOIN 
				cases c ON f2l.case_id = c.case_id 
			JOIN 
				j_cases_formulas jcf ON c.case_id = jcf.case_id 
			JOIN 
				formula f ON jcf.formula_id = f.formula_id 
			LEFT JOIN 
				j_formula_tags jft ON f.formula_id = jft.formula_id 
			LEFT JOIN 
				tags t ON jft.tag_id = t.id 
			WHERE 
				f2l.case_id = 
	`

	db_instance := cluster.GetInstance()
	rows, err := db_instance.Db.Query(query + case_id)
	if err != nil {
		fmt.Println(err)
	}

	return rows
}

func formatRows(rows *sql.Rows) models.Case {
	var case_ models.Case
	var form_ models.Formula
	var tags_ []models.Tag

	for rows.Next() {
		var row_case_name string
		var row_form_id int
		var row_form_name string
		var row_solver string
		var row_setter string
		var row_tag string

		if err := rows.Scan(&row_case_name, &row_form_id, &row_form_name, &row_solver, &row_setter, &row_tag); err != nil {
			fmt.Println(err)
			continue
		}

		// Check if we have moved to a new case
		if row_case_name != case_.Name {
			if case_.Name != "" {
				// This means we're moving to a new case, handle the previous formula
				form_.Tags = tags_
				case_.Formulas = append(case_.Formulas, form_)
			}
			// Handle new case
			case_ = models.Case{Name: row_case_name}
			form_ = models.Formula{} // Reset the formula for the new case
			tags_ = []models.Tag{}   // Reset the tags
		}

		// Check if we have moved to a new formula
		if row_form_name != form_.Name {
			if form_.Name != "" {
				// This means we're moving to a new formula
				form_.Tags = tags_
				case_.Formulas = append(case_.Formulas, form_)
			}

			// Initialize new formula
			form_ = models.Formula{
				Name:   row_form_name,
				Solver: row_solver,
				Setter: row_setter,
				Tags:   []models.Tag{},
			}
			tags_ = []models.Tag{} // Reset tags for the new formula
		}

		// Append the tag
		tags_ = append(tags_, models.Tag{Name: row_tag})
	}

	// Make sure to add the last formula to the case
	if form_.Name != "" {
		form_.Tags = tags_
		case_.Formulas = append(case_.Formulas, form_)
	}

	return case_
}
