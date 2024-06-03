import * as THREE from "three";
//TEMPORARIO
import { Piece } from "./piece.js";

import { Matrix } from "./matrix.js";

import { togglePlayButton } from "../logic/form_popUp.js";
import { putOnCenter, removeMovements, removeEvidence } from "../logic/slider.js"

//#region SETUP
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 20);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0)

var cube_holder = document.getElementById("form_animation__holder__cube_holder__render")
const renderer = new THREE.WebGLRenderer({canvas: cube_holder.children[0] });

let width = window.innerWidth * .8 - 80

renderer.setSize(width, width);
renderer.setClearColor("rgb(255, 255, 255)")
cube_holder.appendChild(renderer.domElement);
//#endregion

//#region CREATE CUBE
const cube = {
    geometry: new THREE.Group()
}
scene.add(cube.geometry)

let positions = [
    [-1, -1, -1],
    [0, -1, -1],
    [1, -1, -1],
    [-1, -1, 0],
    [0, -1, 0],
    [1, -1, 0],
    [-1, -1, 1],
    [0, -1, 1],
    [1, -1, 1],

    [-1, 0, -1],
    [0, 0, -1],
    [1, 0, -1],
    [-1, 0, 0],
    [1, 0, 0],
    [-1, 0, 1],
    [0, 0, 1],
    [1, 0, 1],
    
    [-1, 1, -1],
    [0, 1, -1],
    [1, 1, -1],
    [-1, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
    [-1, 1, 1],
    [0, 1, 1],
    [1, 1, 1],

]

let normalColors = [
    ["black", "#ffa719", "black", "#406bf7", "black", "#e6e6e6"],
    ["black", "#ffa719", "black", "black", "black", "#e6e6e6"],
    ["black", "#ffa719", "#46f740", "black", "black", "#e6e6e6"],
    ["black", "black", "black", "#406bf7", "black", "#e6e6e6"],
    ["black", "black", "black", "black", "black", "#e6e6e6"],
    ["black", "black", "#46f740", "black", "black", "#e6e6e6"],
    ["#ff3333", "black", "black", "#406bf7", "black", "#e6e6e6"],
    ["#ff3333", "black", "black", "black", "black", "#e6e6e6"],
    ["#ff3333", "black", "#46f740", "black", "black", "#e6e6e6"],

    ["black", "#ffa719", "black", "#406bf7", "black", "black"],
    ["black", "#ffa719", "black", "black", "black", "black"],
    ["black", "#ffa719", "#46f740", "black", "black", "black"],
    ["black", "black", "black", "#406bf7", "black", "black"],
    ["black", "black", "#46f740", "black", "black", "black"],
    ["#ff3333", "black", "black", "#406bf7", "black", "black"],
    ["#ff3333", "black", "black", "black", "black", "black"],
    ["#ff3333", "black", "#46f740", "black", "black", "black"],
    
    ["black", "#ffa719", "black", "#406bf7", "#fffb14", "black"],
    ["black", "#ffa719", "black", "black", "#fffb14", "black"],
    ["black", "#ffa719", "#46f740", "black", "#fffb14", "black"],
    ["black", "black", "black", "#406bf7", "#fffb14", "black"],
    ["black", "black", "black", "black", "#fffb14", "black"],
    ["black", "black", "#46f740", "black", "#fffb14", "black"],
    ["#ff3333", "black", "black", "#406bf7", "#fffb14", "black"],
    ["#ff3333", "black", "black", "black", "#fffb14", "black"],
    ["#ff3333", "black", "#46f740", "black", "#fffb14", "black"],
]

for(let i = 0; i < 26; i++){
    cube.geometry.add(new Piece(normalColors[i]).geometry)
    cube.geometry.children[i].position.set(...positions[i])
}
//#endregion

export function setPlayFormula(form){
    setTimeout(()=>{
        play = true
    }, 500)
    formulaString = form
    formulaArray = formulaString.split(" ")
}

export function getSpeed(){
    return speed
}

export function getFormulaIndex(){
    return formula_index
}

export function setCase(formula){
    let form = formula.split(" ")
    set_case = formula

    for(let i = 0; i < formula.length; i++){
        setRotation(form[i])
    }
}

export function reset(){
    //Reinicia a posição das peças do cubo
    cubeReset()
    //Reseta as variaveis de controle
    formulaString = undefined;
    formulaArray = [];
    formula_index = 0;
    animationFunction = undefined;
    set_caseArray = [];
    set_case = undefined;
    animating = false;
    angle = 0;
    play = false
    formula_direction = 1
    removeMovements()

    setTimeout(()=>{
        play = true
    }, 500)
}

export function setPlayState(state){
    
    //When the formula is complete
    if(formula_index === formulaArray.length){
        refresh()
        return
    }
    
    play = state
    formula_direction = 1
}

export function incrementSpeed(){
    speed += 1
    if(speed > 3){
        speed = 1
    }
    speedRad = speed * Math.PI / 180
}

var angle = 0
var speed = 1
var maxAngle;
var animating = false
var round = false
var animationFunction;
var speedRad = speed * Math.PI / 180;
var formulaString = ""
var formulaArray;
var formula_index = 0;
var play = false;
var set_case = ""
var set_caseArray = []
var formula_direction = 1

function animate() {
    requestAnimationFrame(animate);
    
    if(!animating && play && formulaArray !== undefined){
        AnimateRotation(formulaArray[formula_index])
    }
    
    update()
    
    renderer.render(scene, camera);
}

function update(){
    
    if(animating){
        if(angle < maxAngle){
            animationFunction()
        } else {
            if(formula_index < formulaArray.length - 1){
                afterMovement()
            }
        }
    }

}

function beforeMovement(){

}

function afterMovement(){
    //The formula_index should be increased before
    formula_index += formula_direction
    putOnCenter(formula_index)
    angle = 0
    animating = false
    maxAngle = undefined
    round = false
    formula_direction = 1

    //When the formula is complet, set the icon to reload icon
    if(formula_index === formulaArray.length){
        play = false
        togglePlayButton(true)
    }
}

export function callNextMovement(){
    formula_direction = 1
    AnimateRotation(formulaArray[formula_index])
}

export function callPreviousMovement(){
    if(formula_index >= 1){
        formula_direction = -1
        AnimateRotation(invertMovement(formulaArray[formula_index - 1]))
    }
}

//Reset the cube and set the same formula again
export function refresh(){
    //Put the pieces at origin
    cubeReset()
    //Put the pieces in place of the formula
    setCase(set_case)
    //Reset the variables
    removeEvidence(formula_index)
    formula_index = 0
    angle = 0
    animating = false
    round = false
    animationFunction = undefined
    play = false
    formula_direction = 1
    putOnCenter(0)

    setTimeout(()=>{    
        play = true
    }, 500)
}

function cubeReset(){
    for(let i = 0; i < positions.length; i++){
        cube.geometry.children[i].position.set(...positions[i])
        cube.geometry.children[i].setRotationFromQuaternion(new THREE.Quaternion())
    }
}

//Call function who call the right function to move the cube pieces instantly
function setRotation(move){

    switch(move){

        //#region F
        case "F":
            SetRotate(new THREE.Vector3(0, 0, 1), "clockWise", [1], -Math.PI / 2)
            break
        case "F'":
            SetRotate(new THREE.Vector3(0, 0, 1), "counterClockWise", [1], Math.PI / 2)
            break
        case "F2":
        case "F2'":
            SetRotate(new THREE.Vector3(0, 0, 1), "halfTurn", [1], -Math.PI)
            break
        case "Fw":
            SetRotate(new THREE.Vector3(0, 0, 1), "clockWise", [1, 0], -Math.PI / 2)
            break
        case "Fw'":
            SetRotate(new THREE.Vector3(0, 0, 1), "counterClockWise", [1, 0], Math.PI / 2)
            break
        case "Fw2":
        case "Fw2'":
            SetRotate(new THREE.Vector3(0, 0, 1), "halfTurn", [1, 0], -Math.PI)
            break
        //#endregion
        
        //#region B
        case "B":
            SetRotate(new THREE.Vector3(0, 0, 1), "counterClockWise", [-1], Math.PI / 2)
            break
        case "B'":
            SetRotate(new THREE.Vector3(0, 0, 1), "clockWise", [-1], -Math.PI / 2)
            break
        case "B2":
        case "B2'":
            SetRotate(new THREE.Vector3(0, 0, 1), "halfTurn", [-1], Math.PI)
            break
        case "Bw":
            SetRotate(new THREE.Vector3(0, 0, 1), "counterClockWise", [-1, 0], Math.PI / 2)
            break
        case "Bw'":
            SetRotate(new THREE.Vector3(0, 0, 1), "clockWise", [-1, 0], -Math.PI / 2)
            break
        case "Bw2":
        case "Bw2'":
            SetRotate(new THREE.Vector3(0, 0, 1), "halfTurn", [-1, 0], Math.PI)
            break
        //#endregion

        //#region R
        case "R":
            SetRotate(new THREE.Vector3(1, 0, 0), "clockWise", [1], -Math.PI / 2)
            break
        case "R'":
            SetRotate(new THREE.Vector3(1, 0, 0), "counterClockWise", [1], Math.PI / 2)
            break
        case "R2":
        case "R2'":
            SetRotate(new THREE.Vector3(1, 0, 0), "halfTurn", [1], Math.PI)
            break
        case "Rw":
            SetRotate(new THREE.Vector3(1, 0, 0), "clockWise", [1, 0], -Math.PI / 2)
            break
        case "Rw'":
            SetRotate(new THREE.Vector3(1, 0, 0), "counterClockWise", [1, 0], Math.PI / 2)
            break
        case "Rw2":
        case "Rw2'":
            SetRotate(new THREE.Vector3(1, 0, 0), "halfTurn", [1, 0], Math.PI)
            break
        //#endregion

        //#region L
        case "L":
            SetRotate(new THREE.Vector3(-1, 0, 0), "counterClockWise", [-1], -Math.PI / 2)
            break
        case "L'":
            SetRotate(new THREE.Vector3(-1, 0, 0), "clockWise", [-1], Math.PI / 2)
            break
        case "L2":
        case "L2'":
            SetRotate(new THREE.Vector3(-1, 0, 0), "halfTurn", [-1], Math.PI)
            break
        case "Lw":
            SetRotate(new THREE.Vector3(-1, 0, 0), "counterClockWise", [-1, 0], -Math.PI / 2)
            break
        case "Lw'":
            SetRotate(new THREE.Vector3(-1, 0, 0), "clockWise", [-1, 0], Math.PI / 2)
            break
        case "Lw2":
        case "Lw2'":
            SetRotate(new THREE.Vector3(-1, 0, 0), "halfTurn", [-1, 0], Math.PI)
            break
        //#endregion

        //#region U
        case "U":
            SetRotate(new THREE.Vector3(0, 1, 0), "counterClockWise", [1], -Math.PI / 2)
            break
        case "U'":
            SetRotate(new THREE.Vector3(0, 1, 0), "clockWise", [1], Math.PI / 2)
            break
        case "U2":
        case "U2'":
            SetRotate(new THREE.Vector3(0, 1, 0), "halfTurn", [1], -Math.PI)
            break
        case "Uw":
            SetRotate(new THREE.Vector3(0, 1, 0), "counterClockWise", [1, 0], -Math.PI / 2)
            break
        case "Uw'":
            SetRotate(new THREE.Vector3(0, 1, 0), "clockWise", [1, 0], Math.PI / 2)
            break
        case "Uw2":
        case "Uw2'":
            SetRotate(new THREE.Vector3(0, 1, 0), "halfTurn", [1, 0], Math.PI)
            break
        //#endregion

        //#region D
        case "D":
            SetRotate(new THREE.Vector3(0, -1, 0), "clockWise", [-1], -Math.PI / 2)
            break
        case "D'":
            SetRotate(new THREE.Vector3(0, -1, 0), "counterClockWise", [-1], Math.PI / 2)
            break
        case "D2":
        case "D2'":
            SetRotate(new THREE.Vector3(0, -1, 0), "halfTurn", [-1], Math.PI)
            break
        case "Dw":
            SetRotate(new THREE.Vector3(0, -1, 0), "clockWise", [-1, 0], -Math.PI / 2)
            break
        case "Dw'":
            SetRotate(new THREE.Vector3(0, -1, 0), "counterClockWise", [-1, 0], Math.PI / 2)
            break
        case "Dw2":
        case "Dw2'":
            SetRotate(new THREE.Vector3(0, -1, 0), "halfTurn", [-1, 0], Math.PI)
            break
        //#endregion
            
        //#region X
        case "x":
            SetRotate(new THREE.Vector3(0, 0, 1), "clockWise", [-1, 0, 1], -Math.PI / 2)
            break
        case "x'":
            SetRotate(new THREE.Vector3(0, 0, 1), "counterClockWise", [-1, 0, 1], Math.PI / 2)
            break
        case "x2":
        case "x2'":
            SetRotate(new THREE.Vector3(0, 0, 1), "halfTurn", [-1, 0, 1], Math.PI)
            break
        //#endregion
            
        //#region Y
        case "y":
            SetRotate(new THREE.Vector3(0, 1, 0), "counterClockWise", [-1, 0, 1], -Math.PI / 2)
            break
        case "y'":
            SetRotate(new THREE.Vector3(0, 1, 0), "clockWise", [-1, 0, 1], Math.PI / 2)
            break
        case "y2":
        case "y2'":
            SetRotate(new THREE.Vector3(0, 1, 0), "halfTurn", [-1, 0, 1], Math.PI)
            break
        //#endregion
                
        //#region Z
        case "z":
            SetRotate(new THREE.Vector3(0, 0, 1), "clockWise", [-1, 0, 1], -Math.PI / 2)
            break
        case "z'":
            SetRotate(new THREE.Vector3(0, 0, 1), "counterClockWise", [-1, 0, 1], Math.PI / 2)
            break
        case "z2":
        case "z2'":
            SetRotate(new THREE.Vector3(0, 0, 1), "halfTurn", [-1, 0, 1], Math.PI)
            break
        //#endregion
            
        //#region M
        case "M":
            SetRotate(new THREE.Vector3(1, 0, 0), "counterClockWise", [0], Math.PI / 2)
            break
        case "M'":
            SetRotate(new THREE.Vector3(1, 0, 0), "clockWise", [0], -Math.PI / 2)
            break
        case "M2":
        case "M2'":
            SetRotate(new THREE.Vector3(1, 0, 0), "halfTurn", [0], Math.PI)
            break
        //#endregion
    
        //#region S
        case "S":
            SetRotate(new THREE.Vector3(0, 0, 1), "clockWise", [0], -Math.PI / 2)
            break
        case "S'":
            SetRotate(new THREE.Vector3(0, 0, 1), "counterClockWise", [0], Math.PI / 2)
            break
        case "S2":
        case "S2'":
            SetRotate(new THREE.Vector3(0, 0, 1), "halfTurn", [0], Math.PI)
            break
        //#endregion

    }

}

//The function who move the cube pieces intantly
function SetRotate(axys, direction, axysRange, rotationDir){

    let directionArray = axys.toArray()
    let directionIndex;

    //Descobre qual axis foi passado
    for(let i = 0; i < directionArray.length; i++){
        if(directionArray[i] != 0){
            directionIndex = i;
            break;
        }
    }

    //Salva em um array os outros dois axis não selecionados
    let notSelectedIndex = []
    for(let i = 0; i < 3; i++){
        if(i != directionIndex){
            notSelectedIndex.push(i)
        }
    }

    let matrix;
    switch(direction){
        case "clockWise":
            matrix = new Matrix([
                [0, 1],
                [-1, 0]
            ]);
            break;
        case "counterClockWise":
            matrix = new Matrix([
                [0, -1],
                [1, 0]
            ]);
            break;
        case "halfTurn":
            matrix = new Matrix([
                [-1, 0],
                [0, -1]
            ]);
            break;
    }

    for(let i = 0; i < 26; i++){
        for(let j = 0; j < axysRange.length; j++){
            if(cube.geometry.children[i].position.getComponent(directionIndex) == axysRange[j]){

                let mat2d = new Matrix([
                    [cube.geometry.children[i].position.getComponent(notSelectedIndex[0])],
                    [cube.geometry.children[i].position.getComponent(notSelectedIndex[1])]
                ])
        
                let result = matrix.multiply(mat2d)
                cube.geometry.children[i].position.setComponent(notSelectedIndex[0], result.matrix[0][0]) 
                cube.geometry.children[i].position.setComponent(notSelectedIndex[1], result.matrix[1][0])

                cube.geometry.children[i].rotateOnWorldAxis(axys, rotationDir)

            }   
        }
    }

}

//The function who call the right function to animate the cube pieces
function AnimateRotation(move){

    if(animating) return false

    beforeMovement();

    switch(move){

        case "F":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), -1, -1, [1])
            }
            maxAngle = 90
            animating = true
            break
        case "F'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), 1, 1, [1])
            }
            maxAngle = 90
            animating = true
            break
        case "F2":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), 1, 1, [1])
            }
            maxAngle = 180
            animating = true
            break
        case "F2'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), -1, -1, [1])
            }
            maxAngle = 180
            animating = true
            break
        case "Fw":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), -1, -1, [1, 0])
            }
            maxAngle = 90
            animating = true
            break
        case "Fw'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), 1, 1, [1, 0])
            }
            maxAngle = 90
            animating = true
            break
        case "Fw2":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), -1, -1, [1, 0])
            }
            maxAngle = 180
            animating = true
            break
        case "Fw2'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), 1, 1, [1, 0])
            }
            maxAngle = 180
            animating = true
            break

        case "B":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), 1, 1, [-1])
            }
            maxAngle = 90
            animating = true
            break
        case "B'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), -1, -1, [-1])
            }
            maxAngle = 90
            animating = true
            break
        case "B2":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), 1, 1, [-1])
            }
            maxAngle = 180
            animating = true
            break
        case "B2'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), -1, -1, [-1])
            }
            maxAngle = 180
            animating = true
            break
        case "Bw":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), 1, 1, [-1, 0])
            }
            maxAngle = 90
            animating = true
            break
        case "Bw'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), -1, -1, [-1, 0])
            }
            maxAngle = 90
            animating = true
            break
        case "Bw2":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), 1, 1, [-1, 0])
            }
            maxAngle = 180
            animating = true
            break
        case "Bw2'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), -1, -1, [-1, 0])
            }
            maxAngle = 180
            animating = true
            break

        case "L":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), 1, 1, [-1])
            }
            maxAngle = 90
            animating = true
            break
        case "L'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), -1, -1, [-1])
            }
            maxAngle = 90
            animating = true
            break
        case "L2":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), 1, 1, [-1])
            }
            maxAngle = 180
            animating = true
            break
        case "L2'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), -1, -1, [-1])
            }
            maxAngle = 180
            animating = true
            break
        case "Lw":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), 1, 1, [-1, 0])
            }
            maxAngle = 90
            animating = true
            break
        case "Lw'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), -1, -1, [-1, 0])
            }
            maxAngle = 90
            animating = true
            break
        case "Lw2":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), 1, 1, [-1, 0])
            }
            maxAngle = 180
            animating = true
            break
        case "Lw2'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), -1, -1, [-1, 0])
            }
            maxAngle = 180
            animating = true
            break

        case "R":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), -1, -1, [1])
            }
            maxAngle = 90
            animating = true
            break
        case "R'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), 1, 1, [1])
            }
            maxAngle = 90
            animating = true
            break
        case "R2":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), -1, -1, [1])
            }
            maxAngle = 180
            animating = true
            break
        case "R2'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), 1, 1, [1])
            }
            maxAngle = 180
            animating = true
            break
        case "Rw":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), -1, -1, [1, 0])
            }
            maxAngle = 90
            animating = true
            break
        case "Rw'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), 1, 1, [1, 0])
            }
            maxAngle = 90
            animating = true
            break
        case "Rw2":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), -1, -1, [1, 0])
            }
            maxAngle = 180
            animating = true
            break
        case "Rw2'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), 1, 1, [1, 0])
            }
            maxAngle = 180
            animating = true
            break

        case "U":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 1, 0), 1, -1, [1])
            }
            maxAngle = 90
            animating = true
            break
        case "U'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 1, 0), -1, 1, [1])
            }
            maxAngle = 90
            animating = true
            break
        case "U2":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 1, 0), 1, -1, [1])
            }
            maxAngle = 180
            animating = true
            break
        case "U2'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 1, 0), -1, 1, [1])
            }
            maxAngle = 180
            animating = true
            break
        case "Uw":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 1, 0), 1, -1, [1, 0])
            }
            maxAngle = 90
            animating = true
            break
        case "Uw'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 1, 0), -1, 1, [1, 0])
            }
            maxAngle = 90
            animating = true
            break
        case "Uw2":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 1, 0), 1, -1, [1, 0])
            }
            maxAngle = 180
            animating = true
            break
        case "Uw2'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 1, 0), -1, 1, [1, 0])
            }
            maxAngle = 180
            animating = true
            break

        case "D":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 1, 0), -1, 1, [-1])
            }
            maxAngle = 90
            animating = true
            break
        case "D'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 1, 0), 1, -1, [-1])
            }
            maxAngle = 90
            animating = true
            break

        case "D2":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 1, 0), -1, 1, [-1])
            }
            maxAngle = 180
            animating = true
            break
        case "D2'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 1, 0), 1, -1, [-1])
            }
            maxAngle = 180
            animating = true
            break
        case "Dw":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 1, 0), -1, 1, [-1, 0])
            }
            maxAngle = 90
            animating = true
            break
        case "Dw'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 1, 0), 1, -1, [-1, 0])
            }
            maxAngle = 90
            animating = true
            break
        case "Dw2":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 1, 0), -1, 1, [-1, 0])
            }
            maxAngle = 180
            animating = true
            break
        case "Dw2'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 1, 0), 1, -1, [-1, 0])
            }
            maxAngle = 180
            animating = true
            break
        
        case "x":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), -1, -1, [1, 0, -1])
            }
            maxAngle = 90
            animating = true
            break
        case "x'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), 1, 1, [1, 0, -1])
            }
            maxAngle = 90
            animating = true
            break
        case "x2":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), -1, -1, [1, 0, -1])
            }
            maxAngle = 180
            animating = true
            break
        case "x2'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), 1, 1, [1, 0, -1])
            }
            maxAngle = 180
            animating = true
            break

        case "y":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 1, 0), 1, -1, [1, 0, -1])
            }
            maxAngle = 90
            animating = true
            break
        case "y'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 1, 0), -1, 1, [1, 0, -1])
            }
            maxAngle = 90
            animating = true
            break
        case "y2":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 1, 0), 1, -1, [1, 0, -1])
            }
            maxAngle = 180
            animating = true
            break
        case "y2'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 1, 0), -1, 1, [1, 0, -1])
            }
            maxAngle = 180
            animating = true
            break

        case "z":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), -1, -1, [1, 0, -1])
            }
            maxAngle = 90
            animating = true
            break
        case "z'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), 1, 1, [1, 0, -1])
            }
            maxAngle = 90
            animating = true
            break
        case "z2":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), -1, -1, [1, 0, -1])
            }
            maxAngle = 180
            animating = true
            break
        case "z2'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), 1, 1, [1, 0, -1])
            }
            maxAngle = 180
            animating = true
            break
            
        case "M":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), 1, 1, [0])
            }
            maxAngle = 90
            animating = true
            break
        case "M'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), -1, -1, [0])
            }
            maxAngle = 90
            animating = true
            break
        case "M2":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), 1, 1, [0])
            }
            maxAngle = 180
            animating = true
            break
        case "M2'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(1, 0, 0), -1, -1, [0])
            }
            maxAngle = 180
            animating = true
            break

        case "S":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), -1, -1, [0])
            }
            maxAngle = 90
            animating = true
            break
        case "S'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), 1, 1, [0])
            }
            maxAngle = 90
            animating = true
            break
        case "S2":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), -1, -1, [0])
            }
            maxAngle = 180
            animating = true
            break
        case "S2'":
            animationFunction = ()=>{
                Rotate(new THREE.Vector3(0, 0, 1), 1, 1, [0])
            }
            maxAngle = 180
            animating = true
            break
        
    }

}

//The function who animate the cube pieces
function Rotate(axys, translationDir, rotationDir, axysRange){

    let directionArray = axys.toArray()
    let directionIndex;

    //Descobre qual axis foi passado
    for(let i = 0; i < directionArray.length; i++){
        if(directionArray[i] != 0){
            directionIndex = i;
            break;
        }
    }

    //Salva em um array os outros dois axis não selecionados
    let notSelectedIndex = []
    for(let i = 0; i < 3; i++){
        if(i != directionIndex){
            notSelectedIndex.push(i)
        }
    }

    angle += speed

    if(angle >= maxAngle){
        angle = maxAngle
        round = true
    }

    let r = speedRad * translationDir

    let rotationMatrix = new Matrix([
        [Math.cos(r), -Math.sin(r)],
        [Math.sin(r),  Math.cos(r)]
    ])

    for(let i = 0; i < 26; i++){
        for(let j = 0; j < axysRange.length; j++){
            if(cube.geometry.children[i].position.getComponent(directionIndex) == axysRange[j]){

                let mat2d = new Matrix([
                    [cube.geometry.children[i].position.getComponent(notSelectedIndex[0])],
                    [cube.geometry.children[i].position.getComponent(notSelectedIndex[1])]
                ])
        
                let result = rotationMatrix.multiply(mat2d)
                cube.geometry.children[i].position.setComponent(notSelectedIndex[0], result.matrix[0][0]) 
                cube.geometry.children[i].position.setComponent(notSelectedIndex[1], result.matrix[1][0])
                
                //NEED MORE RESEARCH
                cube.geometry.children[i].rotateOnWorldAxis(axys, speedRad * rotationDir)
                
                if(round){
                    cube.geometry.children[i].position.setComponent(notSelectedIndex[0], Math.round(cube.geometry.children[i].position.getComponent(notSelectedIndex[0])))
                    cube.geometry.children[i].position.setComponent(notSelectedIndex[1], Math.round(cube.geometry.children[i].position.getComponent(notSelectedIndex[1])))
                }
            }   
        }
    }

}

function invertMovement(movement){

    if(movement[movement.length - 1] === "'"){
        movement = movement.replace("'", "")
    } else {
        movement += "'"
    }

    return movement

}

animate();