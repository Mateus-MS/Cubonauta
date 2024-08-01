package db

import (
	"Cubonauta/models"
	"Cubonauta/utils"
	"strings"
)

func GetFormulaCard(method string, id int, valids string) models.DB_Case {

	var formula models.DB_Case = GetFormula(method, id)
	var valids_list = strings.Split(valids, ":")
	var new_formulas []models.DB_Formula

	for i := 0; i < len(valids_list); i++ {
		var position int = utils.ConvertStringToInt(valids_list[i])
		new_formulas = append(new_formulas, formula.Formulas[position])
	}

	formula.Formulas = new_formulas

	return formula
}
