package components

import (
	"Cubonauta/cluster"
	"Cubonauta/models"
	"context"
	"fmt"
	"net/http"
	"strconv"
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

		cli := cluster.GetInstance()

		var id int = getUrlCaseIndex(r)
		var size int = getUrlCaseSize(r)
		var filters []string = getUrlCaseFilters(r)
		var category string = getUrlCaseCategory(r)

		database := cli.Cli.Database("CFOP")
		collection := database.Collection(category)

		count, err := collection.CountDocuments(context.TODO(), bson.D{})
		if err != nil {
			fmt.Println(err)
		}

		//If asking for a formula out of bounds
		if id >= int(count) {
			return
		}

		//fmt.Println(id, size, filters, category)

		var formula models.Case
		var formulas []models.Case

		if filters[0] != "" && len(filters) > 0 {
			for i := 0; i < size; i++ {
				formula, err := cluster.GetFormulaFiltered(category, id, filters)

				if err == 0 {
					formulas = append(formulas, formula)
					id += 1
				}
			}
		} else {
			for i := 0; i < size; i++ {
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

		// Render the template
		template, err := template.ParseFiles("./components/case_card/mobile.html")
		if err != nil {
			fmt.Println(err)
		}
		template.Execute(w, formulas)
	}

	if strings.Contains(r.UserAgent(), "Windows") {
		template, _ := template.ParseFiles("./components/case_card/desktop.html")
		template.Execute(w, nil)
	}

}

func removeFromArray(array []models.Case, index int) []models.Case {
	return append(array[:index], array[index+1:]...)
}

func getUrlCaseIndex(r *http.Request) int {
	string_index := r.URL.Query().Get("case_id")
	index, err := strconv.Atoi(string_index)

	if err != nil {
		fmt.Println("Erro ao converter case index")
		return 0
	}

	return index
}

func getUrlCaseSize(r *http.Request) int {
	string_size := r.URL.Query().Get("size")
	size, err := strconv.Atoi(string_size)

	if err != nil {
		fmt.Println("Erro ao converter case size")
		return 1
	}

	return size
}

func getUrlCaseFilters(r *http.Request) []string {
	return strings.Split(r.URL.Query().Get("filters"), ":")
}

func getUrlCaseCategory(r *http.Request) string {
	category := r.URL.Query().Get("category")

	if category == "" {
		return "F2L"
	}

	return category
}