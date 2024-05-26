import * as THREE from "three";
//TEMPORARIO
import { OrbitControls } from 'orbitControls';
import { Piece } from "./piece.js";

import { Matrix } from "./matrix.js";

//#region SETUP
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 20);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0)

var cube_holder = document.getElementById("cube_holder")
const renderer = new THREE.WebGLRenderer({canvas: cube_holder.children[0], antialias: true, preserveDrawingBuffer: true});
renderer.setSize(300, 300);
renderer.setClearColor("rgb(255, 255, 255)")
// renderer.setClearAlpha(0)
cube_holder.appendChild(renderer.domElement);

//TEMPORARIO
const controls = new OrbitControls( camera, renderer.domElement );
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

let colors = [
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
    cube.geometry.add(new Piece(colors[i]).geometry)
    cube.geometry.children[i].position.set(...positions[i])
}
//#endregion

document.addEventListener("keydown", (e)=>{

    if(e.key === "q"){
        AnimateRotation("F")
    } else if(e.key === "Q"){
        AnimateRotation("F'")
    }
    

    if(e.key === "w"){
        animateRotation("B")
    } else if (e.key === "W"){
        animateRotation("B'")
    }

    if(e.key === "e"){
        animateRotation("L")
    } else if (e.key === "E"){
        animateRotation("L'")
    }

    if(e.key === "a"){
        animateRotation("R")
    } else if (e.key === "A"){
        animateRotation("R'")
    }

    if(e.key === "s"){
        animateRotation("U")
    } else if (e.key === "S"){
        animateRotation("U'")
    }

    if(e.key === "d"){
        animateRotation("D")
    } else if (e.key === "D"){
        animateRotation("D'")
    }

})

var angle = 0
var speed = 3
var maxAngle;
var animating = false
var round = false
var animationFunction;
var speedRad = speed * Math.PI / 180;

var formula_index = 0;

function animate() {
    requestAnimationFrame(animate);

    update()

    renderer.render(scene, camera);
}

function update(){

    if(animating){
        if(angle < maxAngle){
            animationFunction()
        } else {
            angle = 0
            animating = false
            maxAngle = undefined
            round = false
        }
    }

}

setCase("R2' U' R' U' R U R U R U' R")

function setCase(formula){

    let form = formula.split(' ')

    for(let i = 0; i < formula.length; i++){
        setRotation(form[i])
    }

}

function setRotation(move){
    //SOME KIND OF PERFORMACE MODE

    //PRECALCULATED 90 Deg Matrix
    let clockWise = new Matrix([
        [0, 1],
        [-1, 0]
    ])

    //PRECALCULATED -90 Deg Matrix
    let counterClockWise = new Matrix([
        [0, -1],
        [1, 0]
    ])

    //PRECALCULATED 180 Deg Matrix
    let halfTurn = new Matrix([
        [-1, 0],
        [0, -1]
    ])

    switch(move){
        case "F":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.z == 1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.y]
                    ])
            
                    let result = clockWise.multiply(mat2d)
            
                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.y = result.matrix[1][0]
                    
                    //NEED MORE RESEARCH
                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -Math.PI / 2)

                }
            }
            break
        case "F'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.z == 1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.y]
                    ])
            
                    let result = counterClockWise.multiply(mat2d)
            
                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.y = result.matrix[1][0]
            
                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2)
                }
            }
            break
        case "F2":
        case "F2'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.z == 1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.y]
                    ])
            
                    let result = halfTurn.multiply(mat2d)
            
                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.y = result.matrix[1][0]
                    
                    //NEED MORE RESEARCH
                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -Math.PI)

                }
            }
            break
        case "Fw":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.z != -1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.y]
                    ])
            
                    let result = clockWise.multiply(mat2d)
            
                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.y = result.matrix[1][0]
                    
                    //NEED MORE RESEARCH
                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -Math.PI / 2)

                }
            }
            break
        case "Fw'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.z != -1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.y]
                    ])
            
                    let result = counterClockWise.multiply(mat2d)
            
                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.y = result.matrix[1][0]
                    
                    //NEED MORE RESEARCH
                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2)

                }
            }
            break
        case "Fw2":
        case "Fw2'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.z != -1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.y]
                    ])
            
                    let result = halfTurn.multiply(mat2d)
            
                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.y = result.matrix[1][0]
                    
                    //NEED MORE RESEARCH
                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -Math.PI)

                }
            }
            break

        case "B":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.z == -1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.y]
                    ])
            
                    let result = counterClockWise.multiply(mat2d)
            
                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.y = result.matrix[1][0]
            
                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2)
                }
            }
            break
        case "B'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.z == -1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.y]
                    ])
            
                    let result = clockWise.multiply(mat2d)
            
                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.y = result.matrix[1][0]
            
                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -Math.PI / 2)
                }
            }
            break
        case "B2":
        case "B2'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.z == -1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.y]
                    ])
            
                    let result = halfTurn.multiply(mat2d)
            
                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.y = result.matrix[1][0]
            
                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), Math.PI)
                }
            }
            break
        case "Bw":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.z != 1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.y]
                    ])
            
                    let result = counterClockWise.multiply(mat2d)
            
                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.y = result.matrix[1][0]
            
                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2)
                }
            }
            break
        case "Bw'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.z != 1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.y]
                    ])
            
                    let result = clockWise.multiply(mat2d)
            
                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.y = result.matrix[1][0]
            
                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -Math.PI / 2)
                }
            }
            break
        case "Bw2":
        case "Bw2'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.z != 1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.y]
                    ])
            
                    let result = halfTurn.multiply(mat2d)
            
                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.y = result.matrix[1][0]
            
                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), Math.PI)
                }
            }
            break


        case "R":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.x == 1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.y],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = clockWise.multiply(mat2d)

                    cube.geometry.children[i].position.y = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2)
                    
                }
            }
            break
        case "R'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.x == 1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.y],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = counterClockWise.multiply(mat2d)

                    cube.geometry.children[i].position.y = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2)
                }
            }
            break
        case "R2":
        case "R2'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.x == 1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.y],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = halfTurn.multiply(mat2d)

                    cube.geometry.children[i].position.y = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI)
                }
            }
            break
        case "Rw":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.x != -1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.y],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = counterClockWise.multiply(mat2d)

                    cube.geometry.children[i].position.y = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2)
                }
            }
            break
        case "Rw'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.x != -1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.y],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = clockWise.multiply(mat2d)

                    cube.geometry.children[i].position.y = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2)
                }
            }
            break
        case "Rw2":
        case "Rw2'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.x != -1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.y],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = halfTurn.multiply(mat2d)

                    cube.geometry.children[i].position.y = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI)
                }
            }
            break

        case "L":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.x == -1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.y],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = counterClockWise.multiply(mat2d)

                    cube.geometry.children[i].position.y = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2)
                    
                }
            }
            break
        case "L'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.x == -1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.y],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = clockWise.multiply(mat2d)

                    cube.geometry.children[i].position.y = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2)
                }
            }
            break
        case "L2":
        case "L2'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.x == -1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.y],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = halfTurn.multiply(mat2d)

                    cube.geometry.children[i].position.y = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI)
                    
                }
            }
            break
        case "Lw":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.x != 1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.y],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = counterClockWise.multiply(mat2d)

                    cube.geometry.children[i].position.y = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2)
                    
                }
            }
            break
        case "Lw'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.x != 1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.y],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = clockWise.multiply(mat2d)

                    cube.geometry.children[i].position.y = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2)
                    
                }
            }
            break
        case "Lw2":
        case "Lw2'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.x != 1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.y],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = halfTurn.multiply(mat2d)

                    cube.geometry.children[i].position.y = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI)
                    
                }
            }
            break

        case "U":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.y == 1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = counterClockWise.multiply(mat2d)

                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2)
                    
                }
            }
            break
        case "U'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.y == 1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = clockWise.multiply(mat2d)

                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2)
                }
            }
            break
        case "U2":
        case "U2'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.y == 1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = halfTurn.multiply(mat2d)

                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -Math.PI)
                    
                }
            }
            break
        case "Uw":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.y != -1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = counterClockWise.multiply(mat2d)

                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2)
                    
                }
            }
            break
        case "Uw'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.y != -1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = clockWise.multiply(mat2d)

                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2)
                    
                }
            }
            break
        case "Uw2":
        case "Uw2'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.y != -1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = halfTurn.multiply(mat2d)

                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -Math.PI)
                    
                }
            }
            break

        case "D":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.y == -1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = clockWise.multiply(mat2d)

                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2)
                    
                }
            }
            break
        case "D'":
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.y == -1){
                        
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.x],
                            [cube.geometry.children[i].position.z]
                        ])

                        let result = counterClockWise.multiply(mat2d)

                        cube.geometry.children[i].position.x = result.matrix[0][0]
                        cube.geometry.children[i].position.z = result.matrix[1][0]

                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2)
                    }
                }
                break
        case "D2":
        case "D2'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.y == -1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = halfTurn.multiply(mat2d)

                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI)
                    
                }
            }
            break
        case "Dw":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.y != 1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = clockWise.multiply(mat2d)

                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2)
                    
                }
            }
            break
        case "Dw'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.y != 1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = counterClockWise.multiply(mat2d)

                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2)
                    
                }
            }
            break
        case "Dw2":
        case "Dw2'":
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.y != 1){
                    
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.z]
                    ])

                    let result = halfTurn.multiply(mat2d)

                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]

                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI)
                    
                }
            }
            break

        case "x":
            for(let i = 0; i < 26; i++){
                let mat2d = new Matrix([
                    [cube.geometry.children[i].position.y],
                    [cube.geometry.children[i].position.z]
                ])

                let result = clockWise.multiply(mat2d)

                cube.geometry.children[i].position.y = result.matrix[0][0]
                cube.geometry.children[i].position.z = result.matrix[1][0]

                cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2)
            }
            break
        case "x'":
            for(let i = 0; i < 26; i++){
                let mat2d = new Matrix([
                    [cube.geometry.children[i].position.y],
                    [cube.geometry.children[i].position.z]
                ])

                let result = counterClockWise.multiply(mat2d)

                cube.geometry.children[i].position.y = result.matrix[0][0]
                cube.geometry.children[i].position.z = result.matrix[1][0]

                cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2)
            }
            break
        case "x2":
        case "x2'":
            for(let i = 0; i < 26; i++){
                let mat2d = new Matrix([
                    [cube.geometry.children[i].position.y],
                    [cube.geometry.children[i].position.z]
                ])

                let result = halfTurn.multiply(mat2d)

                cube.geometry.children[i].position.y = result.matrix[0][0]
                cube.geometry.children[i].position.z = result.matrix[1][0]

                cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -Math.PI)
            }
            break

            
        case "y":
            for(let i = 0; i < 26; i++){
                let mat2d = new Matrix([
                    [cube.geometry.children[i].position.x],
                    [cube.geometry.children[i].position.z]
                ])

                let result = counterClockWise.multiply(mat2d)

                cube.geometry.children[i].position.x = result.matrix[0][0]
                cube.geometry.children[i].position.z = result.matrix[1][0]

                cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2)
            }
            break
        case "y'":
            for(let i = 0; i < 26; i++){
                let mat2d = new Matrix([
                    [cube.geometry.children[i].position.x],
                    [cube.geometry.children[i].position.z]
                ])

                let result = clockWise.multiply(mat2d)

                cube.geometry.children[i].position.x = result.matrix[0][0]
                cube.geometry.children[i].position.z = result.matrix[1][0]

                cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2)
            }
            break
        case "y2":
        case "y2'":
            for(let i = 0; i < 26; i++){
                let mat2d = new Matrix([
                    [cube.geometry.children[i].position.x],
                    [cube.geometry.children[i].position.z]
                ])

                let result = halfTurn.multiply(mat2d)

                cube.geometry.children[i].position.x = result.matrix[0][0]
                cube.geometry.children[i].position.z = result.matrix[1][0]

                cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -Math.PI)
            }
            break
                
        case "z":
            for(let i = 0; i < 26; i++){
                let mat2d = new Matrix([
                    [cube.geometry.children[i].position.x],
                    [cube.geometry.children[i].position.y]
                ])
        
                let result = clockWise.multiply(mat2d)
        
                cube.geometry.children[i].position.x = result.matrix[0][0]
                cube.geometry.children[i].position.y = result.matrix[1][0]
                
                //NEED MORE RESEARCH
                cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -Math.PI / 2)
            }
            break
        case "z'":
            for(let i = 0; i < 26; i++){
                let mat2d = new Matrix([
                    [cube.geometry.children[i].position.x],
                    [cube.geometry.children[i].position.y]
                ])
        
                let result = counterClockWise.multiply(mat2d)
        
                cube.geometry.children[i].position.x = result.matrix[0][0]
                cube.geometry.children[i].position.y = result.matrix[1][0]
                
                //NEED MORE RESEARCH
                cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2)
            }
            break
        case "z2":
        case "z2'":
            for(let i = 0; i < 26; i++){
                let mat2d = new Matrix([
                    [cube.geometry.children[i].position.x],
                    [cube.geometry.children[i].position.y]
                ])
        
                let result = halfTurn.multiply(mat2d)
          
                cube.geometry.children[i].position.x = result.matrix[0][0]
                cube.geometry.children[i].position.y = result.matrix[1][0]
                
                //NEED MORE RESEARCH
                cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -Math.PI)
            }
            break

    }

}

function animateRotation(move){

    if(animating) return

    switch(move){

        case "F":
            animationFunction = ()=>{

                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(-speedRad), -Math.sin(-speedRad)],
                    [Math.sin(-speedRad),  Math.cos(-speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.z == 1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.x],
                            [cube.geometry.children[i].position.y]
                        ])
                
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.x = result.matrix[0][0]
                        cube.geometry.children[i].position.y = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -speedRad)

                        if(round){
                            cube.geometry.children[i].position.x = Math.round(cube.geometry.children[i].position.x)
                            cube.geometry.children[i].position.y = Math.round(cube.geometry.children[i].position.y)
                        }

                        founded += 1
                        if(founded == 9){
                            break
                        }
                    }
                }
            }
            animating = true
            maxAngle = 90
            break
        case "F'":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(speedRad), -Math.sin(speedRad)],
                    [Math.sin(speedRad),  Math.cos(speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.z == 1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.x],
                            [cube.geometry.children[i].position.y]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.x = result.matrix[0][0]
                        cube.geometry.children[i].position.y = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), speedRad)

                        if(round){
                            cube.geometry.children[i].position.x = Math.round(cube.geometry.children[i].position.x)
                            cube.geometry.children[i].position.y = Math.round(cube.geometry.children[i].position.y)
                        }

                        founded += 1
                        if(founded == 9){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 90
            break
        case "F2":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(-speedRad), -Math.sin(-speedRad)],
                    [Math.sin(-speedRad),  Math.cos(-speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.z == 1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.x],
                            [cube.geometry.children[i].position.y]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.x = result.matrix[0][0]
                        cube.geometry.children[i].position.y = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -speedRad)

                        if(round){
                            cube.geometry.children[i].position.x = Math.round(cube.geometry.children[i].position.x)
                            cube.geometry.children[i].position.y = Math.round(cube.geometry.children[i].position.y)
                        }

                        founded += 1
                        if(founded == 9){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 180
            break

        case "Fw":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(-speedRad), -Math.sin(-speedRad)],
                    [Math.sin(-speedRad),  Math.cos(-speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.z != -1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.x],
                            [cube.geometry.children[i].position.y]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.x = result.matrix[0][0]
                        cube.geometry.children[i].position.y = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -speedRad)

                        if(round){
                            cube.geometry.children[i].position.x = Math.round(cube.geometry.children[i].position.x)
                            cube.geometry.children[i].position.y = Math.round(cube.geometry.children[i].position.y)
                        }

                        founded += 1
                        if(founded == 17){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 90
            break
        case "Fw'":
        animationFunction = ()=>{
            if(angle >= maxAngle){
                angle = maxAngle
            }
        
            let rotationMatrix = new Matrix([
                [Math.cos(speedRad), -Math.sin(speedRad)],
                [Math.sin(speedRad),  Math.cos(speedRad)]
            ])

            let founded = 0
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.z != -1){
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.y]
                    ])
            
                    // let result = clockWise.multiply(mat2d)
                    let result = rotationMatrix.multiply(mat2d)
            
                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.y = result.matrix[1][0]
                    
                    //NEED MORE RESEARCH
                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), speedRad)

                    if(round){
                        cube.geometry.children[i].position.x = Math.round(cube.geometry.children[i].position.x)
                        cube.geometry.children[i].position.y = Math.round(cube.geometry.children[i].position.y)
                    }

                    founded += 1
                    if(founded == 17){
                        break
                    }
                    
                }
            }
        }
        animating = true
        maxAngle = 90
        break


        case "B":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(speedRad), -Math.sin(speedRad)],
                    [Math.sin(speedRad),  Math.cos(speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.z == -1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.x],
                            [cube.geometry.children[i].position.y]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.x = result.matrix[0][0]
                        cube.geometry.children[i].position.y = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), speedRad)

                        if(round){
                            cube.geometry.children[i].position.x = Math.round(cube.geometry.children[i].position.x)
                            cube.geometry.children[i].position.y = Math.round(cube.geometry.children[i].position.y)
                        }

                        founded += 1
                        if(founded == 9){
                            break
                        }
                    }
                }
            }
            animating = true
            maxAngle = 90
            break
        case "B'":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(-speedRad), -Math.sin(-speedRad)],
                    [Math.sin(-speedRad),  Math.cos(-speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.z == -1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.x],
                            [cube.geometry.children[i].position.y]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.x = result.matrix[0][0]
                        cube.geometry.children[i].position.y = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -speedRad)

                        if(round){
                            cube.geometry.children[i].position.x = Math.round(cube.geometry.children[i].position.x)
                            cube.geometry.children[i].position.y = Math.round(cube.geometry.children[i].position.y)
                        }

                        founded += 1
                        if(founded == 9){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 90
            break
        case "B2":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(speedRad), -Math.sin(speedRad)],
                    [Math.sin(speedRad),  Math.cos(speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.z == -1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.x],
                            [cube.geometry.children[i].position.y]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.x = result.matrix[0][0]
                        cube.geometry.children[i].position.y = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), speedRad)

                        if(round){
                            cube.geometry.children[i].position.x = Math.round(cube.geometry.children[i].position.x)
                            cube.geometry.children[i].position.y = Math.round(cube.geometry.children[i].position.y)
                        }

                        founded += 1
                        if(founded == 9){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 180
            break

        case "Bw":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(speedRad), -Math.sin(speedRad)],
                    [Math.sin(speedRad),  Math.cos(speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.z != 1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.x],
                            [cube.geometry.children[i].position.y]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.x = result.matrix[0][0]
                        cube.geometry.children[i].position.y = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), speedRad)

                        if(round){
                            cube.geometry.children[i].position.x = Math.round(cube.geometry.children[i].position.x)
                            cube.geometry.children[i].position.y = Math.round(cube.geometry.children[i].position.y)
                        }

                        founded += 1
                        if(founded == 17){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 90
            break
        case "Bw'":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(-speedRad), -Math.sin(-speedRad)],
                    [Math.sin(-speedRad),  Math.cos(-speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.z != 1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.x],
                            [cube.geometry.children[i].position.y]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.x = result.matrix[0][0]
                        cube.geometry.children[i].position.y = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -speedRad)

                        if(round){
                            cube.geometry.children[i].position.x = Math.round(cube.geometry.children[i].position.x)
                            cube.geometry.children[i].position.y = Math.round(cube.geometry.children[i].position.y)
                        }

                        founded += 1
                        if(founded == 17){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 90
            break


        case "L":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(speedRad), -Math.sin(speedRad)],
                    [Math.sin(speedRad),  Math.cos(speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.x == 1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.z],
                            [cube.geometry.children[i].position.y]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.z = result.matrix[0][0]
                        cube.geometry.children[i].position.y = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -speedRad)

                        if(round){
                            cube.geometry.children[i].position.z = Math.round(cube.geometry.children[i].position.z)
                            cube.geometry.children[i].position.y = Math.round(cube.geometry.children[i].position.y)
                        }

                        founded += 1
                        if(founded == 9){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 90
            break
        case "L'":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(-speedRad), -Math.sin(-speedRad)],
                    [Math.sin(-speedRad),  Math.cos(-speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.x == 1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.z],
                            [cube.geometry.children[i].position.y]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.z = result.matrix[0][0]
                        cube.geometry.children[i].position.y = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), speedRad)

                        if(round){
                            cube.geometry.children[i].position.z = Math.round(cube.geometry.children[i].position.z)
                            cube.geometry.children[i].position.y = Math.round(cube.geometry.children[i].position.y)
                        }

                        founded += 1
                        if(founded == 9){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 90
            break
        case "L2":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(speedRad), -Math.sin(speedRad)],
                    [Math.sin(speedRad),  Math.cos(speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.x == 1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.z],
                            [cube.geometry.children[i].position.y]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.z = result.matrix[0][0]
                        cube.geometry.children[i].position.y = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -speedRad)

                        if(round){
                            cube.geometry.children[i].position.z = Math.round(cube.geometry.children[i].position.z)
                            cube.geometry.children[i].position.y = Math.round(cube.geometry.children[i].position.y)
                        }

                        founded += 1
                        if(founded == 9){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 180
            break

        case "Lw":
        animationFunction = ()=>{
            if(angle >= maxAngle){
                angle = maxAngle
            }
        
            let rotationMatrix = new Matrix([
                [Math.cos(speedRad), -Math.sin(speedRad)],
                [Math.sin(speedRad),  Math.cos(speedRad)]
            ])

            let founded = 0
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.x != -1){
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.z],
                        [cube.geometry.children[i].position.y]
                    ])
            
                    // let result = clockWise.multiply(mat2d)
                    let result = rotationMatrix.multiply(mat2d)
            
                    cube.geometry.children[i].position.z = result.matrix[0][0]
                    cube.geometry.children[i].position.y = result.matrix[1][0]
                    
                    //NEED MORE RESEARCH
                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -speedRad)

                    if(round){
                        cube.geometry.children[i].position.z = Math.round(cube.geometry.children[i].position.z)
                        cube.geometry.children[i].position.y = Math.round(cube.geometry.children[i].position.y)
                    }

                    founded += 1
                    if(founded == 17){
                        break
                    }
                    
                }
            }
        }
        animating = true
        maxAngle = 90
        break
        case "Lw'":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(-speedRad), -Math.sin(-speedRad)],
                    [Math.sin(-speedRad),  Math.cos(-speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.x != -1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.z],
                            [cube.geometry.children[i].position.y]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.z = result.matrix[0][0]
                        cube.geometry.children[i].position.y = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), speedRad)

                        if(round){
                            cube.geometry.children[i].position.z = Math.round(cube.geometry.children[i].position.z)
                            cube.geometry.children[i].position.y = Math.round(cube.geometry.children[i].position.y)
                        }

                        founded += 1
                        if(founded == 17){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 90
            break


        case "R":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(-speedRad), -Math.sin(-speedRad)],
                    [Math.sin(-speedRad),  Math.cos(-speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.x == -1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.z],
                            [cube.geometry.children[i].position.y]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.z = result.matrix[0][0]
                        cube.geometry.children[i].position.y = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), speedRad)

                        if(round){
                            cube.geometry.children[i].position.z = Math.round(cube.geometry.children[i].position.z)
                            cube.geometry.children[i].position.y = Math.round(cube.geometry.children[i].position.y)
                        }

                        founded += 1
                        if(founded == 9){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 90
            break
        case "R'":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(speedRad), -Math.sin(speedRad)],
                    [Math.sin(speedRad),  Math.cos(speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.x == -1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.z],
                            [cube.geometry.children[i].position.y]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.z = result.matrix[0][0]
                        cube.geometry.children[i].position.y = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -speedRad)

                        if(round){
                            cube.geometry.children[i].position.z = Math.round(cube.geometry.children[i].position.z)
                            cube.geometry.children[i].position.y = Math.round(cube.geometry.children[i].position.y)
                        }

                        founded += 1
                        if(founded == 9){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 90
            break
        case "R2":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(-speedRad), -Math.sin(-speedRad)],
                    [Math.sin(-speedRad),  Math.cos(-speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.x == -1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.z],
                            [cube.geometry.children[i].position.y]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.z = result.matrix[0][0]
                        cube.geometry.children[i].position.y = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), speedRad)

                        if(round){
                            cube.geometry.children[i].position.z = Math.round(cube.geometry.children[i].position.z)
                            cube.geometry.children[i].position.y = Math.round(cube.geometry.children[i].position.y)
                        }

                        founded += 1
                        if(founded == 9){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 180
            break

        case "Rw":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(-speedRad), -Math.sin(-speedRad)],
                    [Math.sin(-speedRad),  Math.cos(-speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.x != 1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.z],
                            [cube.geometry.children[i].position.y]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.z = result.matrix[0][0]
                        cube.geometry.children[i].position.y = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), speedRad)

                        if(round){
                            cube.geometry.children[i].position.z = Math.round(cube.geometry.children[i].position.z)
                            cube.geometry.children[i].position.y = Math.round(cube.geometry.children[i].position.y)
                        }

                        founded += 1
                        if(founded == 17){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 90
            break
        case "Rw'":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(speedRad), -Math.sin(speedRad)],
                    [Math.sin(speedRad),  Math.cos(speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.x != 1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.z],
                            [cube.geometry.children[i].position.y]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.z = result.matrix[0][0]
                        cube.geometry.children[i].position.y = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -speedRad)

                        if(round){
                            cube.geometry.children[i].position.z = Math.round(cube.geometry.children[i].position.z)
                            cube.geometry.children[i].position.y = Math.round(cube.geometry.children[i].position.y)
                        }

                        founded += 1
                        if(founded == 17){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 90
            break


        case "U":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(speedRad), -Math.sin(speedRad)],
                    [Math.sin(speedRad),  Math.cos(speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.y == 1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.x],
                            [cube.geometry.children[i].position.z]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.x = result.matrix[0][0]
                        cube.geometry.children[i].position.z = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -speedRad)

                        if(round){
                            cube.geometry.children[i].position.x = Math.round(cube.geometry.children[i].position.x)
                            cube.geometry.children[i].position.z = Math.round(cube.geometry.children[i].position.z)
                        }

                        founded += 1
                        if(founded == 9){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 90
            break
        case "U'":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(-speedRad), -Math.sin(-speedRad)],
                    [Math.sin(-speedRad),  Math.cos(-speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.y == 1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.x],
                            [cube.geometry.children[i].position.z]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.x = result.matrix[0][0]
                        cube.geometry.children[i].position.z = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), speedRad)

                        if(round){
                            cube.geometry.children[i].position.x = Math.round(cube.geometry.children[i].position.x)
                            cube.geometry.children[i].position.z = Math.round(cube.geometry.children[i].position.z)
                        }

                        founded += 1
                        if(founded == 9){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 90
            break
        case "U2":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(speedRad), -Math.sin(speedRad)],
                    [Math.sin(speedRad),  Math.cos(speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.y == 1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.x],
                            [cube.geometry.children[i].position.z]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.x = result.matrix[0][0]
                        cube.geometry.children[i].position.z = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -speedRad)

                        if(round){
                            cube.geometry.children[i].position.x = Math.round(cube.geometry.children[i].position.x)
                            cube.geometry.children[i].position.z = Math.round(cube.geometry.children[i].position.z)
                        }

                        founded += 1
                        if(founded == 9){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 180
            break
            
        case "Uw":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(speedRad), -Math.sin(speedRad)],
                    [Math.sin(speedRad),  Math.cos(speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.y != -1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.x],
                            [cube.geometry.children[i].position.z]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.x = result.matrix[0][0]
                        cube.geometry.children[i].position.z = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -speedRad)

                        if(round){
                            cube.geometry.children[i].position.x = Math.round(cube.geometry.children[i].position.x)
                            cube.geometry.children[i].position.z = Math.round(cube.geometry.children[i].position.z)
                        }

                        founded += 1
                        if(founded == 17){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 90
            break
        case "Uw'":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(-speedRad), -Math.sin(-speedRad)],
                    [Math.sin(-speedRad),  Math.cos(-speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.y != -1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.x],
                            [cube.geometry.children[i].position.z]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.x = result.matrix[0][0]
                        cube.geometry.children[i].position.z = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), speedRad)

                        if(round){
                            cube.geometry.children[i].position.x = Math.round(cube.geometry.children[i].position.x)
                            cube.geometry.children[i].position.z = Math.round(cube.geometry.children[i].position.z)
                        }

                        founded += 1
                        if(founded == 17){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 90
            break


        case "D":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(-speedRad), -Math.sin(-speedRad)],
                    [Math.sin(-speedRad),  Math.cos(-speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.y == -1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.x],
                            [cube.geometry.children[i].position.z]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.x = result.matrix[0][0]
                        cube.geometry.children[i].position.z = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), speedRad)

                        if(round){
                            cube.geometry.children[i].position.x = Math.round(cube.geometry.children[i].position.x)
                            cube.geometry.children[i].position.z = Math.round(cube.geometry.children[i].position.z)
                        }

                        founded += 1
                        if(founded == 9){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 90
            break
        case "D'":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(speedRad), -Math.sin(speedRad)],
                    [Math.sin(speedRad),  Math.cos(speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.y == -1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.x],
                            [cube.geometry.children[i].position.z]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.x = result.matrix[0][0]
                        cube.geometry.children[i].position.z = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -speedRad)

                        if(round){
                            cube.geometry.children[i].position.x = Math.round(cube.geometry.children[i].position.x)
                            cube.geometry.children[i].position.z = Math.round(cube.geometry.children[i].position.z)
                        }

                        founded += 1
                        if(founded == 9){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 90
            break
        case "D2":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(-speedRad), -Math.sin(-speedRad)],
                    [Math.sin(-speedRad),  Math.cos(-speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.y == -1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.x],
                            [cube.geometry.children[i].position.z]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.x = result.matrix[0][0]
                        cube.geometry.children[i].position.z = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), speedRad)

                        if(round){
                            cube.geometry.children[i].position.x = Math.round(cube.geometry.children[i].position.x)
                            cube.geometry.children[i].position.z = Math.round(cube.geometry.children[i].position.z)
                        }

                        founded += 1
                        if(founded == 9){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 180
            break

        case "Dw":
        animationFunction = ()=>{
            if(angle >= maxAngle){
                angle = maxAngle
            }
        
            let rotationMatrix = new Matrix([
                [Math.cos(-speedRad), -Math.sin(-speedRad)],
                [Math.sin(-speedRad),  Math.cos(-speedRad)]
            ])

            let founded = 0
            for(let i = 0; i < 26; i++){
                if(cube.geometry.children[i].position.y != 1){
                    let mat2d = new Matrix([
                        [cube.geometry.children[i].position.x],
                        [cube.geometry.children[i].position.z]
                    ])
            
                    // let result = clockWise.multiply(mat2d)
                    let result = rotationMatrix.multiply(mat2d)
            
                    cube.geometry.children[i].position.x = result.matrix[0][0]
                    cube.geometry.children[i].position.z = result.matrix[1][0]
                    
                    //NEED MORE RESEARCH
                    cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), speedRad)

                    if(round){
                        cube.geometry.children[i].position.x = Math.round(cube.geometry.children[i].position.x)
                        cube.geometry.children[i].position.z = Math.round(cube.geometry.children[i].position.z)
                    }

                    founded += 1
                    if(founded == 17){
                        break
                    }
                    
                }
            }
        }
        animating = true
        maxAngle = 90
        break
        case "Dw'":
            animationFunction = ()=>{
                angle += speed

                if(angle >= maxAngle){
                    angle = maxAngle
                    round = true
                }
            
                let rotationMatrix = new Matrix([
                    [Math.cos(speedRad), -Math.sin(speedRad)],
                    [Math.sin(speedRad),  Math.cos(speedRad)]
                ])

                let founded = 0
                for(let i = 0; i < 26; i++){
                    if(cube.geometry.children[i].position.y != 1){
                        let mat2d = new Matrix([
                            [cube.geometry.children[i].position.x],
                            [cube.geometry.children[i].position.z]
                        ])
                
                        // let result = clockWise.multiply(mat2d)
                        let result = rotationMatrix.multiply(mat2d)
                
                        cube.geometry.children[i].position.x = result.matrix[0][0]
                        cube.geometry.children[i].position.z = result.matrix[1][0]
                        
                        //NEED MORE RESEARCH
                        cube.geometry.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -speedRad)

                        if(round){
                            cube.geometry.children[i].position.x = Math.round(cube.geometry.children[i].position.x)
                            cube.geometry.children[i].position.z = Math.round(cube.geometry.children[i].position.z)
                        }

                        founded += 1
                        if(founded == 17){
                            break
                        }
                        
                    }
                }
            }
            animating = true
            maxAngle = 90
            break

    }

}

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

function AnimateRotation(move){

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

animate();
