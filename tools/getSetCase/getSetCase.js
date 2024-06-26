function stringToArrayForm(formula){

    return formula.split(" ");

}

function reverseFormula(formula){

    let form = []
    for(let i = formula.length - 1; i >= 0; i--){
        form.push(formula[i])
    }

    return form

}

function invertMove(formula){

    for(let i = 0; i < formula.length; i++){

        if(formula[i][formula[i].length - 1] == "'"){
            formula[i] = formula[i].replace("'", "")
        } else {
            formula[i] += "'"
        }

    }

    return formula

}

function setCase(formula){

    let arr = stringToArrayForm(formula)
    let reverse = reverseFormula(arr)
    return invertMove(reverse)

}

function formulaArrToString(formula){

    let form = ""
    for(let i = 0; i < formula.length; i++){
        form += formula[i] + " "
    }

    return form

}

let data = [
    {
        "formula": "R U R'",
        "name"   : "Caso 01",
        "tags"   : ["F2L"]
    },
    {
        "formula": "y L' U' L",
        "name"   : "Caso 02",
        "tags"   : ["F2L"]
    },
    {
        "formula": "y U' L' U L",
        "name"   : "Caso 03",
        "tags"   : ["F2L"]
    },
    {
        "formula": "U R U' R'",
        "name"   : "Caso 04",
        "tags"   : ["F2L"]
    },
    {
        "formula": "U R U' R' U' F' U F",
        "name"   : "Caso 05",
        "tags"   : ["F2L"]
    },
    {
        "formula": "y U' L' U L U F U' F'",
        "name"   : "Caso 06",
        "tags"   : ["F2L"]
    },
    {
        "formula": "R U' R' Dw R' U2 R U2' R' U R",
        "name"   : "Caso 07",
        "tags"   : ["F2L"]
    },
    {
        "formula": "U R U R' U2 R U R'",
        "name"   : "Caso 08",
        "tags"   : ["F2L"]
    },
    {
        "formula": "U' R U' R' U2 R U' R'",
        "name"   : "Caso 09",
        "tags"   : ["F2L"]
    },
    {
        "formula": "U2 R' F R F' U2 R U R'",
        "name"   : "Caso 10",
        "tags"   : ["F2L"]
    },
    {
        "formula": "U' R U R' U F' U' F",
        "name"   : "Caso 11",
        "tags"   : ["F2L"]
    },
    {
        "formula": "R U R' U' R U R' U' R U R'",
        "name"   : "Caso 12",
        "tags"   : ["F2L"]
    },
    {
        "formula": "U' R' F R F' R U' R'",
        "name"   : "Caso 13",
        "tags"   : ["F2L"]
    },
    {
        "formula": "R U' R' U R U' R' U2 R U' R'",
        "name"   : "Caso 14",
        "tags"   : ["F2L"]
    },
    {
        "formula": "U' R U2 R' U F' U' F",
        "name"   : "Caso 15",
        "tags"   : ["F2L"]
    },
    {
        "formula": "U' R U' R' U R U R'",
        "name"   : "Caso 16",
        "tags"   : ["F2L"]
    },
    {
        "formula": "y' U R' U R U' R' U' R",
        "name"   : "Caso 17",
        "tags"   : ["F2L"]
    },
    {
        "formula": "R U' R' U2 F' U' F",
        "name"   : "Caso 18",
        "tags"   : ["F2L"]
    },
    {
        "formula": "R U R' U2 R U' R' U R U' R'",
        "name"   : "Caso 19",
        "tags"   : ["F2L"]
    },
    {
        "formula": "R U2 R' U' R U R'",
        "name"   : "Caso 20",
        "tags"   : ["F2L"]
    },
    {
        "formula": "y' R' U2 R U R' U' R",
        "name"   : "Caso 21",
        "tags"   : ["F2L"]
    },
    {
        "formula": "F U R U' R' F' R U' R'",
        "name"   : "Caso 22",
        "tags"   : ["F2L"]
    },
    {
        "formula": "R U R' U2 R U R' U' R U R'",
        "name"   : "Caso 23",
        "tags"   : ["F2L"]
    },
    {
        "formula": "R U R' U R U' R'",
        "name"   : "Caso 24",
        "tags"   : ["F2L"]
    },
    {
        "formula": "y' L' U' L U' L' U L",
        "name"   : "Caso 25",
        "tags"   : ["F2L"]
    },
    {
        "formula": "R U2 R' U R U' R'",
        "name"   : "Caso 26",
        "tags"   : ["F2L"]
    },
    {
        "formula": "y' L' U2 L U' L' U L",
        "name"   : "Caso 27",
        "tags"   : ["F2L"]
    },
    {
        "formula": "R U' R' U R U' R'",
        "name"   : "Caso 28",
        "tags"   : ["F2L"]
    },
    {
        "formula": "R U R' U' F R' F' R",
        "name"   : "Caso 29",
        "tags"   : ["F2L"]
    },
    {
        "formula": "R U R' U' R U R'",
        "name"   : "Caso 30",
        "tags"   : ["F2L"]
    },
    {
        "formula": "R' F R F' R' F R F'",
        "name"   : "Caso 31",
        "tags"   : ["F2L"]
    },
    {
        "formula": "R U R' U2 R U' R' U R U R'",
        "name"   : "Caso 32",
        "tags"   : ["F2L"]
    },
    {
        "formula": "R U R' U' R U2 R' U' R U R'",
        "name"   : "Caso 33",
        "tags"   : ["F2L"]
    },
    {
        "formula": "R U' R' Rw U' Rw' U2 Rw U Rw'",
        "name"   : "Caso 34",
        "tags"   : ["F2L"]
    },
    {
        "formula": "Rw U' Rw' U2 Rw U Rw' R U R'",
        "name"   : "Caso 35",
        "tags"   : ["F2L"]
    },
    {
        "formula": "Dw R' U2 R U2 R' U R",
        "name"   : "Caso 36",
        "tags"   : ["F2L"]
    },
    {
        "formula": "U' R U2 R' U2 R U' R'",
        "name"   : "Caso 37",
        "tags"   : ["F2L"]
    },
    {
        "formula": "Dw R' U' R U2 R' U R",
        "name"   : "Caso 38",
        "tags"   : ["F2L"]
    },
    {
        "formula": "U' R U R' U2 R U' R'",
        "name"   : "Caso 39",
        "tags"   : ["F2L"]
    },
    {
        "formula": "U' R U R' U R U R'",
        "name"   : "Caso 40",
        "tags"   : ["F2L"]
    },
    {
        "formula": "U' R U' R' U F' U' F",
        "name"   : "Caso 41",
        "tags"   : ["F2L"]
    }
]

for(let i = 0; i < data.length; i++){

    data[i].setCase = formulaArrToString(setCase(data[i].formula))

}

console.log(data)
