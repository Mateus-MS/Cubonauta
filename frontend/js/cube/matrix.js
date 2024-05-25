export class Matrix{

    constructor(m){

        this.matrix = m;

    }

    get rows(){
        return this.matrix.length
    }

    get cols(){
        return this.matrix[0].length
    }

    multiply(m){

        if(this.cols != m.rows){
            console.log("Colunas de A devem ser iguais as Linhas de B")
            return
        }

        let matrix = []
        for(let i = 0; i < this.rows; i++){
            let row = []
            for(let j = 0; j < m.cols; j++){
                let sum = 0;
                for(let k = 0; k < this.cols; k++){
                    sum += this.matrix[i][k] * m.matrix[k][j];
                }
                row.push(sum)
            }
            matrix.push(row)
        }

        return new Matrix(matrix)
        
    }

    print(){
        for(let i = 0; i < this.matrix.length; i++){
            for(let j = 0; j < this.matrix[i].length; j++){
                console.log(this.matrix[i][j])
            }
        }
    }

}