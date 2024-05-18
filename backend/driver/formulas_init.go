package data

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
)

var FormulasOBJ Formulas = OpenFormulasFile()

type Formulas struct {
	Formulas []Formula `json:"formulas"`
}

type Formula struct {
	Formula string   `json:"formula"`
	Tags    []string `json:"tags"`
}

func OpenFormulasFile() Formulas {
	formulasFile, err := os.Open("../data/formulas.json")

	if err != nil {
		fmt.Println(err)
	}

	formulasByteJSON, _ := io.ReadAll(formulasFile)

	formulas := Formulas{}

	json.Unmarshal(formulasByteJSON, &formulas)
	defer formulasFile.Close()

	return formulas
}

func GetFormulas() Formulas {
	return FormulasOBJ
}
