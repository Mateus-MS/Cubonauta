package rotas

import (
	data "cubonauta/driver"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

//TODO REORGANIZAR TODA A LOGICA DESSE END POINT MDS

func FormulaCard(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Expose-Headers", "*")

	formulas := data.GetFormulas()

	if r.Method == "GET" {

		//Pega o ID da url e converte para int
		//Checka se está no range de formulas
		//Se houver algum erro retorna -1
		id := IdResolve(r, len(formulas.Formulas))
		size := SizeResolve(r)
		//filters := FiltersResolve(r)

		//Se O ID passado for maior que a lista de formulas
		if id == -2 {
			return
		}

		//Se NÃO foi passado um ID mas FOI passado um SIZE
		if id == -1 && size != -1 {
			stringHtml := ""
			for i := 0; i < size; i++ {
				stringHtml += FormulaString(formulas.Formulas[i])
			}

			w.Header().Set("Hx-Trigger", fmt.Sprintf(`{"att-ID" : "%d"}`, size))
			fmt.Fprint(w, stringHtml)

			return
		}

		//Se Foi passado um ID mas NÃO FOI passado um SIZE
		if id != -1 && size == -1 {
			element := FormulaString(formulas.Formulas[id])
			fmt.Fprint(w, element)

			return
		}

		//Se Foi passado um ID E um SIZE
		if id != -1 && size != -1 {
			stringHtml := ""
			for i := id; i < id+size; i++ {
				fmt.Println(i)
				if i < len(formulas.Formulas) {
					stringHtml += FormulaString(formulas.Formulas[i])
				}
			}

			w.Header().Set("Hx-Trigger", fmt.Sprintf(`{"att-ID" : "%d"}`, id+size))
			fmt.Fprint(w, stringHtml)

			return
		}

		//Se NÃO foi passado um ID NEM um SIZE
		fmt.Fprint(w, formulas)

	}

}

func IdResolve(path *http.Request, formulas_size int) int {
	//Extrai o ID da URL
	id_URL := path.URL.Query().Get("id")

	//Se não foi passado um ID
	if id_URL == "" {
		return -1
	}

	//Converte string -> int
	id := StringToInt(id_URL)

	//Se houver erro de converção
	if id == -1 {
		return -1
	}

	//Se o ID esta no range da lista de formulas
	if id > formulas_size {
		return -2
	}

	return id
}

func SizeResolve(path *http.Request) int {
	size_URL := path.URL.Query().Get("size")

	//Converte string -> int
	size := StringToInt(size_URL)

	//Se houver erro de converção
	if size == -1 {
		return -1
	}

	return size
}

func FiltersResolve(path *http.Request) []string {

	filters := path.URL.Query().Get("filters")

	//Se não foi passado nenhum filtro
	if filters == "" {
		return nil
	}

	//Se foi, coloca cada um dentro de um array
	filtersArr := strings.Split(filters, ":")

	return filtersArr

}

func StringToInt(value string) int {
	number, err := strconv.Atoi(value)

	if err != nil {
		return -1
	}

	return number
}

func FormulaString(formula data.Formula) string {

	tags := ""

	for i := 0; i < len(formula.Tags); i++ {
		tags += fmt.Sprintf(`<div class='formula_card__holder__tag_container__tag'>
					%s
				</div>`, formula.Tags[i])
	}

	templ := fmt.Sprintf(`<div class='formula_card'>
		<div class='formula_card__img'></div>
		<div class='formula_card__holder'>
			<div class='formula_card__holder__formula'>
				%s
			</div>
			<div class='formula_card__holder__tag_container'>
				%s
			</div>
			<div class='formula_card__holder__bottom'>
				<div class='formula_card__holder__bottom__name'>
					%s
				</div>
				<div class='formula_card__holder__bottom__options_holder'>
					<div class='formula_card__holder__bottom__options_holder__option'>

					</div>
					<div class='formula_card__holder__bottom__options_holder__option'>

					</div>
				</div>
			</div>
		</div>
	</div>
	`, formula.Formula, tags, formula.Name)

	return templ
}
