package custom_routes_elements

import (
	"Cubonauta/db"
	"Cubonauta/models"
	routes_query "Cubonauta/routes/query"
	"Cubonauta/utils"
	"fmt"
	"net/http"
	"text/template"

	"go.mongodb.org/mongo-driver/mongo"
)

func Skeleton(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Expose-Headers", "*")

	if r.Method != "GET" && r.Method != "OPTIONS" {
		return
	}

	//Resolve the pre-flight
	if r.Method == "OPTIONS" {
		fmt.Fprint(w)
		return
	}

	var id int = getID(r)
	var size int = getSize(r)

	var filters []string = routes_query.Filters_Query(r)
	var length = getCollectionLength("F2L")

	var cards_data []models.Card_Skeleton

	for id <= length {

		if len(cards_data) >= size {
			break
		}

		var card_skeleton models.Card_Skeleton
		var db_case models.DB_Case

		if len(filters) == 1 && filters[0] == "" {
			db_case = db.GetFormula("F2L", id)
		} else {
			//Must Have at least one of the passed filters to be returned
			db_case = db.GetFormulaFiltred("F2L", id, filters)
		}

		card_skeleton = utils.ConvertCaseToCard_Skeleton(db_case)

		if len(db_case.Formulas) != 0 {
			cards_data = append(cards_data, card_skeleton)
		}

		id += 1

	}

	if len(cards_data) == 0 {
		//If does not found a formula matching the filters
		w.WriteHeader(http.StatusNotFound)
		return
	}

	w.Header().Set("Hx-Trigger", fmt.Sprintf(`{"att-ID" : "%d"}`, id))

	template := template.Must(
		template.New("card--skeleton.html").Funcs(
			template.FuncMap{"repeat": func(times int) []int {
				return make([]int, times)
			}},
		).ParseFiles("./elements/card--skeleton.html"),
	)

	template.Execute(w, cards_data)

}

func getCollectionLength(collection_name string) int {
	client, err := db.GetClient()
	if err != nil {
		fmt.Println("Erro na função getClient ao chamar no getFormula")
		panic(err)
	}
	var collection *mongo.Collection = client.Database("CFOP").Collection(collection_name)

	return int(utils.GetCollectionSize(collection))
}

func getID(r *http.Request) int {
	str := routes_query.QueryURL("id", r)
	number := utils.ConvertStringToInt(str)

	if number == 0 {
		return 1
	} else {
		return number
	}
}

func getSize(r *http.Request) int {
	str := routes_query.QueryURL("size", r)
	number := utils.ConvertStringToInt(str)

	if number == 0 {
		return 1
	} else {
		return number
	}
}
