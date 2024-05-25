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
const renderer = new THREE.WebGLRenderer({canvas: cube_holder.children[0], antialias: true});
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

document.addEventListener("keypress", (e)=>{
    if(e.key === "q"){
        animateRotation("F")
    } else if(e.key === "Q"){
        animateRotation("F'")
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

function animate() {
    requestAnimationFrame(animate);

    update()

    renderer.render(scene, camera);
}

animateRotation("F")

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

        case "L":
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
        case "L'":
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

        case "R":
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
        case "R'":
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

animate();
