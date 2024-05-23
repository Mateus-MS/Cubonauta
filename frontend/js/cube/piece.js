import * as THREE from "three";

let positions = [
    new THREE.Vector3(0, 0, .5),
    new THREE.Vector3(0, 0, -.5),

    new THREE.Vector3(.5, 0, 0),
    new THREE.Vector3(-.5, 0, 0),

    new THREE.Vector3(0, .5, 0),
    new THREE.Vector3(0, -.5, 0)
]

let rotationsAxis = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 1, 0),
    
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, 1, 0),
    
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(1, 0, 0)
]

let rotationsRadian = [
    0,
    3.14159,

    1.5708,
    -1.5708,
    
    -1.5708,
    1.5708
]

export class Piece{

    constructor(color){

        this.geometry = new THREE.Group()

        for(let i = 0; i < 6; i++){
            this.geometry.add(new THREE.Mesh( new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({color: color[i]})))
            this.geometry.children[i].position.set(...positions[i])
            this.geometry.children[i].quaternion.setFromAxisAngle(rotationsAxis[i], rotationsRadian[i])
        }

    }

}