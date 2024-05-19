package rotas

import (
	data "cubonauta/driver"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

func FormulaCard(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Expose-Headers", "*")

	formulas := data.GetFormulas()

	if r.Method != "GET" && r.Method != "OPTIONS" {
		return
	}

	//Pega o ID da url e converte para int
	//Checka se está no range de formulas
	//Se houver algum erro retorna -1
	id := IdResolve(r, len(formulas.Formulas))
	size := SizeResolve(r)
	filters := FiltersResolve(r)

	//Se O ID passado for maior que a lista de formulas
	if id == -2 {
		return
	}

	//Se não foi passado um ID
	if id == -1 {
		id = 0
	}

	//Se não foi passado um SIZE
	if size == -1 {
		size = 1
	}

	stringHtml := ""
	formulasAdded := 0
	cursor := 0

	//Itera sob cada formula
	for i := id; i < len(formulas.Formulas); i++ {

		cursor = i

		if formulasAdded == size {
			break
		}

		//Se não houver nenhum filtro
		if len(filters) <= 0 {
			stringHtml += FormulaString(formulas.Formulas[i])
			formulasAdded += 1
			continue
		}

		filtersCount := 0
		//Itera sob cada tag
		for x := 0; x < len(formulas.Formulas[i].Tags); x++ {
			//Itera sob cada filter
			for y := 0; y < len(filters); y++ {
				//Se esse filtro for igual a essa tag
				if formulas.Formulas[i].Tags[x] == filters[y] {
					filtersCount += 1
					break
				}
			}
		}
		//no fim, testa se o tamanho de filtros é igual ao numeros de encontrados
		if filtersCount == len(filters) {
			stringHtml += FormulaString(formulas.Formulas[i])
			formulasAdded += 1
		}

	}

	w.Header().Set("Hx-Trigger", fmt.Sprintf(`{"att-ID" : "%d"}`, cursor))
	fmt.Fprint(w, stringHtml)

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
	if id >= formulas_size {
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
