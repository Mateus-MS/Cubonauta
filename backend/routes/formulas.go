package rotas

import (
	data "cubonauta/driver"
	"fmt"
	"net/http"
	"strconv"
)

func FormulaCard(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	formulas := data.GetFormulas()

	if r.Method == "GET" {

		//Pega o ID da url e converte para int
		//Checka se está no range de formulas
		//Se houver algum erro retorna -1
		id := IdResolve(r, len(formulas.Formulas))
		size := SizeResolve(r)

		//Se O ID passado for maior que a lista de formulas
		if id == -2 {
			return
		}

		//Se NÃO foi passado um ID mas FOI passado um SIZE
		if id == -1 && size != -1 {
			stringHtml := ""
			for i := 0; i < size; i++ {
				stringHtml += fmt.Sprintf(
					`<div class='card'>
						<span>%s</span>
					</div>`,
					formulas.Formulas[i].Formula)
			}

			fmt.Fprint(w, stringHtml)

			return
		}

		//Se Foi passado um ID mas NÃO FOI passado um SIZE
		if id != -1 && size == -1 {
			element :=
				`<div class='card'>
				<span>%s</span>
			</div>`
			fmt.Fprintf(w, element, formulas.Formulas[id].Formula)

			return
		}

		//Se Foi passado um ID E um SIZE
		if id != -1 && size != -1 {
			stringHtml := ""
			for i := id; i < id+size; i++ {
				if i <= len(formulas.Formulas)-1 {
					stringHtml += fmt.Sprintf(
						`<div class='card'>
							<span>%s</span>
						</div>`,
						formulas.Formulas[i].Formula)
				}
			}

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

func StringToInt(value string) int {
	number, err := strconv.Atoi(value)

	if err != nil {
		return -1
	}

	return number
}
