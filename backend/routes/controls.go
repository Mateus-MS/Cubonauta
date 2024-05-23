package rotas

import (
	data "cubonauta/driver"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

func IdResolve(path *http.Request, formulas_size int) int {
	//Extrai o ID da URL
	id_URL := path.URL.Query().Get("id")

	//Se não foi passado um ID
	if id_URL == "" {
		return 0
	}

	//Converte string -> int
	id := StringToInt(id_URL)

	//Se houver erro de converção
	if id == -1 {
		return -1
	}

	//Se o ID esta no range da lista de formulas
	if id >= formulas_size-1 {
		return -2
	}

	return id
}

func SizeResolve(path *http.Request) int {
	size_URL := path.URL.Query().Get("size")

	//Converte string -> int
	size := StringToInt(size_URL)

	if size == -1 {
		return 0
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
		tags += fmt.Sprintf(`<div class='tag'>
					%s
				</div>`, formula.Tags[i])
	}

	templ := fmt.Sprintf(`<div class='formula_card'>
	<div class='img'></div>
	<div class='holder'>
		<div class='formula'>
			%s
		</div>
		<div class='tag_container'>
			%s
		</div>
		<div class='bottom'>
			<div class='name'>
				%s
			</div>
			<div class='options_holder'>
				<div class='option'>

				</div>
				<div class='option'>

				</div>
			</div>
		</div>
	</div>
</div>
	`, formula.Formula, tags, formula.Name)

	return templ
}

type Search struct {
	html   string
	cursor int
}

func SearchFormulas(id int, size int, filters []string, formulas data.Formulas) Search {

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

	return Search{html: stringHtml, cursor: cursor}

}

func CategoryResolve(path *http.Request) string {
	var category string = path.URL.Query().Get("category")
	if category == "" {
		return "F2L"
	} else {
		return category
	}
}
