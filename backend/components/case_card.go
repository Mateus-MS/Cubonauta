package components

import (
	"Cubonauta/cluster"
	"Cubonauta/models"
	"Cubonauta/utils"
	"context"
	"fmt"
	"net/http"
	"strings"
	"text/template"

	"go.mongodb.org/mongo-driver/bson"
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
		mobile(w, r)
	}

	if strings.Contains(r.UserAgent(), "Windows") {
		template, _ := template.ParseFiles("./components/case_card/desktop.html")
		template.Execute(w, nil)
	}

}

func mobile(w http.ResponseWriter, r *http.Request) {
	cli := cluster.GetInstance()

	var category string = utils.GetUrlCaseCategory(r)
	var size int = utils.GetUrlCaseSize(r)
	var filters []string = utils.GetUrlCaseFilters(r)

	database := cli.Cli.Database("CFOP")
	collection := database.Collection(category)

	count, err := collection.CountDocuments(context.TODO(), bson.D{})
	if err != nil {
		fmt.Println(err)
	}
	var id int = utils.GetUrlCaseIndex(r, int(count))

	var formula models.Case
	var formulas []models.Case

	if len(filters) > 0 {
		for i := 0; i < size; i++ {
			if id >= int(count) {
				break
			}

			formula, err := cluster.GetFormulaFiltered(category, id, filters)

			if err == 0 {
				formulas = append(formulas, formula)
			} else {
				i--
			}

			id += 1
		}
	} else {
		for i := 0; i < size; i++ {
			if id >= int(count) {
				break
			}

			formula = cluster.GetFormula(category, id)
			if formula.Name != "" {
				formulas = append(formulas, formula)
				id += 1
			}
		}
	}

	w.Header().Set("Hx-Trigger", fmt.Sprintf(`{"att-ID" : "%d"}`, id))

	if len(formulas) == 0 {
		return
	}

	utils.RenderTemplate("./components/case_card/mobile.html", w, formulas)
}
