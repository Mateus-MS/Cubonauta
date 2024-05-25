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
// renderer.setClearColor("rgb(255, 255, 255)")
renderer.setClearAlpha(0)
cube_holder.appendChild(renderer.domElement);

//TEMPORARIO
const controls = new OrbitControls( camera, renderer.domElement );
//#endregion

//#region CREATE CUBE
var cube = {
    geometry: new THREE.Group(),
    rotate: (move)=>{

        //SOME KIND OF PERFORMACE MODE

        let clockWise = new Matrix([
            [0, 1],
            [-1, 0]
        ])
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

                        console.log(cube.geometry.children[i].matrix)
                        
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
        cube.rotate("F")
    } else if(e.key === "Q"){
        cube.rotate("F'")
    }
    

    if(e.key === "w"){
        cube.rotate("B")
    } else if (e.key === "W"){
        cube.rotate("B'")
    }

    if(e.key === "e"){
        cube.rotate("L")
    } else if (e.key === "E"){
        cube.rotate("L'")
    }

    if(e.key === "a"){
        cube.rotate("R")
    } else if (e.key === "A"){
        cube.rotate("R'")
    }

    if(e.key === "s"){
        cube.rotate("U")
    } else if (e.key === "S"){
        cube.rotate("U'")
    }

    if(e.key === "d"){
        cube.rotate("D")
    } else if (e.key === "D"){
        cube.rotate("D'")
    }

})

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
