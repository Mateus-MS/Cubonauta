import * as THREE from "three";
//TEMPORARIO
import { Piece } from "../../frontend/js/cube/piece.js";

import { Matrix } from "../../frontend/js/cube/matrix.js";

//#region SETUP
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 20);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0)

var cube_holder = document.getElementById("cube_holder")
const renderer = new THREE.WebGLRenderer({canvas: cube_holder.children[0], antialias: true, preserveDrawingBuffer: true  });
renderer.setSize(300, 300);
renderer.setClearColor("rgb(255, 255, 255)")
cube_holder.appendChild(renderer.domElement);
//#endregion

//#region CREATE CUBE
const cube = new THREE.Group();
scene.add(cube)

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
    cube.add(new Piece(normalColors[i]).geometry)
    cube.children[i].position.set(...positions[i])
}
//#endregion

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

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
                if(cube.children[i].position.z == 1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.y]
                    ])
            
                    let result = clockWise.multiply(mat2d)
            
                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.y = result.matrix[1][0]
                    
                    //NEED MORE RESEARCH
                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -Math.PI / 2)

                }
            }
            break
        case "F'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.z == 1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.y]
                    ])
            
                    let result = counterClockWise.multiply(mat2d)
            
                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.y = result.matrix[1][0]
            
                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2)
                }
            }
            break
        case "F2":
        case "F2'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.z == 1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.y]
                    ])
            
                    let result = halfTurn.multiply(mat2d)
            
                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.y = result.matrix[1][0]
                    
                    //NEED MORE RESEARCH
                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -Math.PI)

                }
            }
            break
        case "Fw":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.z != -1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.y]
                    ])
            
                    let result = clockWise.multiply(mat2d)
            
                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.y = result.matrix[1][0]
                    
                    //NEED MORE RESEARCH
                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -Math.PI / 2)

                }
            }
            break
        case "Fw'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.z != -1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.y]
                    ])
            
                    let result = counterClockWise.multiply(mat2d)
            
                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.y = result.matrix[1][0]
                    
                    //NEED MORE RESEARCH
                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2)

                }
            }
            break
        case "Fw2":
        case "Fw2'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.z != -1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.y]
                    ])
            
                    let result = halfTurn.multiply(mat2d)
            
                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.y = result.matrix[1][0]
                    
                    //NEED MORE RESEARCH
                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -Math.PI)

                }
            }
            break

        case "B":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.z == -1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.y]
                    ])
            
                    let result = counterClockWise.multiply(mat2d)
            
                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.y = result.matrix[1][0]
            
                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2)
                }
            }
            break
        case "B'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.z == -1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.y]
                    ])
            
                    let result = clockWise.multiply(mat2d)
            
                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.y = result.matrix[1][0]
            
                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -Math.PI / 2)
                }
            }
            break
        case "B2":
        case "B2'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.z == -1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.y]
                    ])
            
                    let result = halfTurn.multiply(mat2d)
            
                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.y = result.matrix[1][0]
            
                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), Math.PI)
                }
            }
            break
        case "Bw":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.z != 1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.y]
                    ])
            
                    let result = counterClockWise.multiply(mat2d)
            
                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.y = result.matrix[1][0]
            
                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2)
                }
            }
            break
        case "Bw'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.z != 1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.y]
                    ])
            
                    let result = clockWise.multiply(mat2d)
            
                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.y = result.matrix[1][0]
            
                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -Math.PI / 2)
                }
            }
            break
        case "Bw2":
        case "Bw2'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.z != 1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.y]
                    ])
            
                    let result = halfTurn.multiply(mat2d)
            
                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.y = result.matrix[1][0]
            
                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), Math.PI)
                }
            }
            break


        case "R":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.x == 1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.y],
                        [cube.children[i].position.z]
                    ])

                    let result = clockWise.multiply(mat2d)

                    cube.children[i].position.y = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2)
                    
                }
            }
            break
        case "R'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.x == 1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.y],
                        [cube.children[i].position.z]
                    ])

                    let result = counterClockWise.multiply(mat2d)

                    cube.children[i].position.y = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2)
                }
            }
            break
        case "R2":
        case "R2'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.x == 1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.y],
                        [cube.children[i].position.z]
                    ])

                    let result = halfTurn.multiply(mat2d)

                    cube.children[i].position.y = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI)
                }
            }
            break
        case "Rw":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.x != -1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.y],
                        [cube.children[i].position.z]
                    ])

                    let result = clockWise.multiply(mat2d)

                    cube.children[i].position.y = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2)
                }
            }
            break
        case "Rw'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.x != -1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.y],
                        [cube.children[i].position.z]
                    ])

                    let result = counterClockWise.multiply(mat2d)

                    cube.children[i].position.y = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2)
                }
            }
            break
        case "Rw2":
        case "Rw2'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.x != -1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.y],
                        [cube.children[i].position.z]
                    ])

                    let result = halfTurn.multiply(mat2d)

                    cube.children[i].position.y = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI)
                }
            }
            break

        case "L":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.x == -1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.y],
                        [cube.children[i].position.z]
                    ])

                    let result = counterClockWise.multiply(mat2d)

                    cube.children[i].position.y = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2)
                    
                }
            }
            break
        case "L'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.x == -1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.y],
                        [cube.children[i].position.z]
                    ])

                    let result = clockWise.multiply(mat2d)

                    cube.children[i].position.y = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2)
                }
            }
            break
        case "L2":
        case "L2'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.x == -1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.y],
                        [cube.children[i].position.z]
                    ])

                    let result = halfTurn.multiply(mat2d)

                    cube.children[i].position.y = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI)
                    
                }
            }
            break
        case "Lw":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.x != 1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.y],
                        [cube.children[i].position.z]
                    ])

                    let result = counterClockWise.multiply(mat2d)

                    cube.children[i].position.y = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2)
                    
                }
            }
            break
        case "Lw'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.x != 1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.y],
                        [cube.children[i].position.z]
                    ])

                    let result = clockWise.multiply(mat2d)

                    cube.children[i].position.y = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2)
                    
                }
            }
            break
        case "Lw2":
        case "Lw2'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.x != 1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.y],
                        [cube.children[i].position.z]
                    ])

                    let result = halfTurn.multiply(mat2d)

                    cube.children[i].position.y = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI)
                    
                }
            }
            break

        case "U":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.y == 1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.z]
                    ])

                    let result = counterClockWise.multiply(mat2d)

                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2)
                    
                }
            }
            break
        case "U'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.y == 1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.z]
                    ])

                    let result = clockWise.multiply(mat2d)

                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2)
                }
            }
            break
        case "U2":
        case "U2'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.y == 1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.z]
                    ])

                    let result = halfTurn.multiply(mat2d)

                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -Math.PI)
                    
                }
            }
            break
        case "Uw":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.y != -1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.z]
                    ])

                    let result = counterClockWise.multiply(mat2d)

                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2)
                    
                }
            }
            break
        case "Uw'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.y != -1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.z]
                    ])

                    let result = clockWise.multiply(mat2d)

                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2)
                    
                }
            }
            break
        case "Uw2":
        case "Uw2'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.y != -1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.z]
                    ])

                    let result = halfTurn.multiply(mat2d)

                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -Math.PI)
                    
                }
            }
            break

        case "D":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.y == -1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.z]
                    ])

                    let result = clockWise.multiply(mat2d)

                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2)
                    
                }
            }
            break
        case "D'":
                for(let i = 0; i < 26; i++){
                    if(cube.children[i].position.y == -1){
                        
                        let mat2d = new Matrix([
                            [cube.children[i].position.x],
                            [cube.children[i].position.z]
                        ])

                        let result = counterClockWise.multiply(mat2d)

                        cube.children[i].position.x = result.matrix[0][0]
                        cube.children[i].position.z = result.matrix[1][0]

                        cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2)
                    }
                }
                break
        case "D2":
        case "D2'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.y == -1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.z]
                    ])

                    let result = halfTurn.multiply(mat2d)

                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI)
                    
                }
            }
            break
        case "Dw":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.y != 1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.z]
                    ])

                    let result = clockWise.multiply(mat2d)

                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2)
                    
                }
            }
            break
        case "Dw'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.y != 1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.z]
                    ])

                    let result = counterClockWise.multiply(mat2d)

                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2)
                    
                }
            }
            break
        case "Dw2":
        case "Dw2'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.y != 1){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.z]
                    ])

                    let result = halfTurn.multiply(mat2d)

                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI)
                    
                }
            }
            break

        case "x":
            for(let i = 0; i < 26; i++){
                let mat2d = new Matrix([
                    [cube.children[i].position.y],
                    [cube.children[i].position.z]
                ])

                let result = clockWise.multiply(mat2d)

                cube.children[i].position.y = result.matrix[0][0]
                cube.children[i].position.z = result.matrix[1][0]

                cube.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2)
            }
            break
        case "x'":
            for(let i = 0; i < 26; i++){
                let mat2d = new Matrix([
                    [cube.children[i].position.y],
                    [cube.children[i].position.z]
                ])

                let result = counterClockWise.multiply(mat2d)

                cube.children[i].position.y = result.matrix[0][0]
                cube.children[i].position.z = result.matrix[1][0]

                cube.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2)
            }
            break
        case "x2":
        case "x2'":
            for(let i = 0; i < 26; i++){
                let mat2d = new Matrix([
                    [cube.children[i].position.y],
                    [cube.children[i].position.z]
                ])

                let result = halfTurn.multiply(mat2d)

                cube.children[i].position.y = result.matrix[0][0]
                cube.children[i].position.z = result.matrix[1][0]

                cube.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -Math.PI)
            }
            break

            
        case "y":
            for(let i = 0; i < 26; i++){
                let mat2d = new Matrix([
                    [cube.children[i].position.x],
                    [cube.children[i].position.z]
                ])

                let result = counterClockWise.multiply(mat2d)

                cube.children[i].position.x = result.matrix[0][0]
                cube.children[i].position.z = result.matrix[1][0]

                cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -Math.PI / 2)
            }
            break
        case "y'":
            for(let i = 0; i < 26; i++){
                let mat2d = new Matrix([
                    [cube.children[i].position.x],
                    [cube.children[i].position.z]
                ])

                let result = clockWise.multiply(mat2d)

                cube.children[i].position.x = result.matrix[0][0]
                cube.children[i].position.z = result.matrix[1][0]

                cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2)
            }
            break
        case "y2":
        case "y2'":
            for(let i = 0; i < 26; i++){
                let mat2d = new Matrix([
                    [cube.children[i].position.x],
                    [cube.children[i].position.z]
                ])

                let result = halfTurn.multiply(mat2d)

                cube.children[i].position.x = result.matrix[0][0]
                cube.children[i].position.z = result.matrix[1][0]

                cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -Math.PI)
            }
            break
                
        case "z":
            for(let i = 0; i < 26; i++){
                let mat2d = new Matrix([
                    [cube.children[i].position.x],
                    [cube.children[i].position.y]
                ])
        
                let result = clockWise.multiply(mat2d)
        
                cube.children[i].position.x = result.matrix[0][0]
                cube.children[i].position.y = result.matrix[1][0]
                
                //NEED MORE RESEARCH
                cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -Math.PI / 2)
            }
            break
        case "z'":
            for(let i = 0; i < 26; i++){
                let mat2d = new Matrix([
                    [cube.children[i].position.x],
                    [cube.children[i].position.y]
                ])
        
                let result = counterClockWise.multiply(mat2d)
        
                cube.children[i].position.x = result.matrix[0][0]
                cube.children[i].position.y = result.matrix[1][0]
                
                //NEED MORE RESEARCH
                cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2)
            }
            break
        case "z2":
        case "z2'":
            for(let i = 0; i < 26; i++){
                let mat2d = new Matrix([
                    [cube.children[i].position.x],
                    [cube.children[i].position.y]
                ])
        
                let result = halfTurn.multiply(mat2d)
          
                cube.children[i].position.x = result.matrix[0][0]
                cube.children[i].position.y = result.matrix[1][0]
                
                //NEED MORE RESEARCH
                cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -Math.PI)
            }
            break

        case "M":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.x == 0){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.y],
                        [cube.children[i].position.z]
                    ])

                    let result = counterClockWise.multiply(mat2d)

                    cube.children[i].position.y = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2)
                    
                }
            }
            break
        case "M'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.x == 0){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.y],
                        [cube.children[i].position.z]
                    ])

                    let result = clockWise.multiply(mat2d)

                    cube.children[i].position.y = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2)
                }
            }
            break
        case "M2":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.x == 0){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.y],
                        [cube.children[i].position.z]
                    ])

                    let result = halfTurn.multiply(mat2d)

                    cube.children[i].position.y = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI)
                    
                }
            }
            break
        case "M2'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.x == 0){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.y],
                        [cube.children[i].position.z]
                    ])

                    let result = halfTurn.multiply(mat2d)

                    cube.children[i].position.y = result.matrix[0][0]
                    cube.children[i].position.z = result.matrix[1][0]

                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -Math.PI)
                }
            }
            break

        case "S":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.z == 0){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.y]
                    ])
            
                    let result = clockWise.multiply(mat2d)
            
                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.y = result.matrix[1][0]
                    
                    //NEED MORE RESEARCH
                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -Math.PI / 2)

                }
            }
            break
        case "S'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.z == 0){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.y]
                    ])
            
                    let result = counterClockWise.multiply(mat2d)
            
                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.y = result.matrix[1][0]
            
                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2)
                }
            }
            break
        case "S2":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.z == 0){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.y]
                    ])
            
                    let result = clockWise.multiply(mat2d)
            
                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.y = result.matrix[1][0]
                    
                    //NEED MORE RESEARCH
                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -Math.PI)

                }
            }
            break
        case "S2'":
            for(let i = 0; i < 26; i++){
                if(cube.children[i].position.z == 0){
                    
                    let mat2d = new Matrix([
                        [cube.children[i].position.x],
                        [cube.children[i].position.y]
                    ])
            
                    let result = counterClockWise.multiply(mat2d)
            
                    cube.children[i].position.x = result.matrix[0][0]
                    cube.children[i].position.y = result.matrix[1][0]
            
                    cube.children[i].rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), Math.PI)
                }
            }
            break
    }

}

export function reset(){
    for(let i = 0; i < positions.length; i++){
        cube.children[i].position.set(...positions[i])
        cube.children[i].setRotationFromQuaternion(new THREE.Quaternion())
    }
}

export function screenShot(imageName){
    var link = document.createElement("a")
    link.setAttribute("href", renderer.domElement.toDataURL())
    let name = imageName
    name = name.replaceAll(" ", "_")
    link.setAttribute("download", name)
    link.click()
}

export function setCase(formula){

    return new Promise((resolve) => {
        for(let i = 0; i < formula.length; i++){
            setRotation(formula[i])
        }
        resolve();
    })

}