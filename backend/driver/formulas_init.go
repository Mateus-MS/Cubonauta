package data

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
)

var CFOP_F2L Formulas = OpenFile("../data/methods/CFOP/F2L.json")
var CFOP_OLL Formulas = OpenFile("../data/methods/CFOP/OLL.json")
var CFOP_PLL Formulas = OpenFile("../data/methods/CFOP/PLL.json")

type Formulas struct {
	Formulas []Formula `json:"formulas"`
}

type Formula struct {
	Formula string   `json:"formula"`
	Name    string   `json:"name`
	Tags    []string `json:"tags"`
}

func OpenFile(path string) Formulas {
	file, err := os.Open(path)

	if err != nil {
		fmt.Println(err)
	}

	byteJson, _ := io.ReadAll(file)

	fileArray := Formulas{}

	json.Unmarshal(byteJson, &fileArray)
	defer file.Close()

	return fileArray
}

func GetFormulas(filter string) Formulas {
	if filter == "F2L" {
		return CFOP_F2L
	}
	if filter == "OLL" {
		return CFOP_OLL
	}
	if filter == "PLL" {
		return CFOP_PLL
	}
	return Formulas{}
}
