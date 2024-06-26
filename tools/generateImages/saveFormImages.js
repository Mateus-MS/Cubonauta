import { screenShot, reset, setCase } from "./initiateCubeSimplified.js";

let data = [
  {
    "formula": "R U R'",
    "setCase": "R U' R' ",
    "name": "Caso 01",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "y L' U' L",
    "setCase": "L' U L y' ",
    "name": "Caso 02",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "y U' L' U L",
    "setCase": "L' U' L U y' ",
    "name": "Caso 03",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "U R U' R'",
    "setCase": "R U R' U' ",
    "name": "Caso 04",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "U R U' R' U' F' U F",
    "setCase": "F' U' F U R U R' U' ",
    "name": "Caso 05",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "y U' L' U L U F U' F'",
    "setCase": "F U F' U' L' U' L U y' ",
    "name": "Caso 06",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "R U' R' Dw R' U2 R U2' R' U R",
    "setCase": "R' U' R U2 R' U2' R Dw' R U R' ",
    "name": "Caso 07",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "U R U R' U2 R U R'",
    "setCase": "R U' R' U2' R U' R' U' ",
    "name": "Caso 08",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "U' R U' R' U2 R U' R'",
    "setCase": "R U R' U2' R U R' U ",
    "name": "Caso 09",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "U2 R' F R F' U2 R U R'",
    "setCase": "R U' R' U2' F R' F' R U2' ",
    "name": "Caso 10",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "U' R U R' U F' U' F",
    "setCase": "F' U F U' R U' R' U ",
    "name": "Caso 11",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "R U R' U' R U R' U' R U R'",
    "setCase": "R U' R' U R U' R' U R U' R' ",
    "name": "Caso 12",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "U' R' F R F' R U' R'",
    "setCase": "R U R' F R' F' R U ",
    "name": "Caso 13",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "R U' R' U R U' R' U2 R U' R'",
    "setCase": "R U R' U2' R U R' U' R U R' ",
    "name": "Caso 14",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "U' R U2 R' U F' U' F",
    "setCase": "F' U F U' R U2' R' U ",
    "name": "Caso 15",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "U' R U' R' U R U R'",
    "setCase": "R U' R' U' R U R' U ",
    "name": "Caso 16",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "y' U R' U R U' R' U' R",
    "setCase": "R' U R U R' U' R U' y ",
    "name": "Caso 17",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "R U' R' U2 F' U' F",
    "setCase": "F' U F U2' R U R' ",
    "name": "Caso 18",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "R U R' U2 R U' R' U R U' R'",
    "setCase": "R U R' U' R U R' U2' R U' R' ",
    "name": "Caso 19",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "R U2 R' U' R U R'",
    "setCase": "R U' R' U R U2' R' ",
    "name": "Caso 20",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "y' R' U2 R U R' U' R",
    "setCase": "R' U R U' R' U2' R y ",
    "name": "Caso 21",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "F U R U' R' F' R U' R'",
    "setCase": "R U R' F R U R' U' F' ",
    "name": "Caso 22",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "R U R' U2 R U R' U' R U R'",
    "setCase": "R U' R' U R U' R' U2' R U' R' ",
    "name": "Caso 23",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "R U R' U R U' R'",
    "setCase": "R U R' U' R U' R' ",
    "name": "Caso 24",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "y' L' U' L U' L' U L",
    "setCase": "L' U' L U L' U L y ",
    "name": "Caso 25",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "R U2 R' U R U' R'",
    "setCase": "R U R' U' R U2' R' ",
    "name": "Caso 26",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "y' L' U2 L U' L' U L",
    "setCase": "L' U' L U L' U2' L y ",
    "name": "Caso 27",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "R U' R' U R U' R'",
    "setCase": "R U R' U' R U R' ",
    "name": "Caso 28",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "R U R' U' F R' F' R",
    "setCase": "R' F R F' U R U' R' ",
    "name": "Caso 29",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "R U R' U' R U R'",
    "setCase": "R U' R' U R U' R' ",
    "name": "Caso 30",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "R' F R F' R' F R F'",
    "setCase": "F R' F' R F R' F' R ",
    "name": "Caso 31",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "R U R' U2 R U' R' U R U R'",
    "setCase": "R U' R' U' R U R' U2' R U' R' ",
    "name": "Caso 32",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "R U R' U' R U2 R' U' R U R'",
    "setCase": "R U' R' U R U2' R' U R U' R' ",
    "name": "Caso 33",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "R U' R' Rw U' Rw' U2 Rw U Rw'",
    "setCase": "Rw U' Rw' U2' Rw U Rw' R U R' ",
    "name": "Caso 34",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "Rw U' Rw' U2 Rw U Rw' R U R'",
    "setCase": "R U' R' Rw U' Rw' U2' Rw U Rw' ",
    "name": "Caso 35",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "Dw R' U2 R U2 R' U R",
    "setCase": "R' U' R U2' R' U2' R Dw' ",
    "name": "Caso 36",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "U' R U2 R' U2 R U' R'",
    "setCase": "R U R' U2' R U2' R' U ",
    "name": "Caso 37",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "Dw R' U' R U2 R' U R",
    "setCase": "R' U' R U2' R' U R Dw' ",
    "name": "Caso 38",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "U' R U R' U2 R U' R'",
    "setCase": "R U R' U2' R U' R' U ",
    "name": "Caso 39",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "U' R U R' U R U R'",
    "setCase": "R U' R' U' R U' R' U ",
    "name": "Caso 40",
    "tags": [
      "F2L"
    ]
  },
  {
    "formula": "U' R U' R' U F' U' F",
    "setCase": "F' U F U' R U R' U ",
    "name": "Caso 41",
    "tags": [
      "F2L"
    ]
  }
];

let txt = document.getElementById("text")
let btn = document.getElementById("btn")

let nxt = document.getElementById("right")
let prv = document.getElementById("left")

var index = 0
setCase(data[index].setCase.split(" "))

console.log(data.length)

txt.innerText = data[index].formula

btn.addEventListener('click', (e)=>{
    screenShot(data[index].name)
})

nxt.addEventListener("click", (e)=>{
    if(index >= data.length) return
    index += 1
    txt.innerText = data[index].formula
    reset()
    setCase(data[index].setCase.split(" "))
})

prv.addEventListener("click", (e)=>{
    if (index == 0) return
    index -= 1
    txt.innerText = data[index].formula
    reset()
    setCase(data[index].setCase.split(" "))
})