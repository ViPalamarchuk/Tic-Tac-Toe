'use strict';

class Game{
    constructor() {
        this.number = 0;
        this.sizeField();
    }

    static setValue(element, value){
        element.style.background = `url('${value}.png')`;
        element.style.backgroundSize = " contain ";
        element.style.backgroundRepeat = "no-repeat";
        element.style.backgroundPosition = "center";
        element.dataset.value = value;

    }

    static checkWin(value, dataAttribute, size){
        let result = false;
        for(let z = 0; z < size; ++z) {
            let elements = document.querySelectorAll(`[${dataAttribute}="${z}"]`);
            result = true;
            for (let i = 0; i < size; i++) {
                if ((elements[i].dataset.value !== value)) {
                    result = false;
                    break;
                }
            }
            if(result) {
                break;
            }
        }
        return result;
    }

    static diagonalCheck(value) {
        let result = true;
        let elementsArray = document.getElementsByTagName('td');
        let elements = Array.from(elementsArray).filter(function (element) {
            return element.dataset.row === element.dataset.column
        });
        for(let i = 0; i < elements.length; i++) {
            if (elements[i].dataset.value !== value) {
                result = false;
                break;
            }
        }
        return result;
    }

    reversCheck(value, size) {
        let result = true;
        let elementsArray = document.getElementsByTagName('td');
        let elements = Array.from(elementsArray).filter(function (element) {
            let row = +element.dataset.row;
            let column = +element.dataset.column;
            return (row + column === (+size - 1));
        });
        for(let i = 0; i < elements.length; i++) {
            if (elements[i].dataset.value !== value) {
                result = false;
                break;
            }
        }
        return result;
    }


    sizeField(){
        this.number = 0;
        let size = +prompt('Enter size field');
        let htmlObj = document.getElementById('container');
        for(let x = 0; x < size; x++){
            let elements = document.createElement('tr');
            htmlObj.appendChild(elements);
            for(let y = 0; y < size; y++) {
                let elem = document.createElement('td');
                elem.dataset.column = y;
                elem.dataset.row = x;
                let cellSize = 100/size;
                elem.style.height = cellSize + 'vh';
                elem.style.width = cellSize + 'vw';
                elem.style.backgroundColor = 'tan';
                let that = this;
                elem.addEventListener('click', function(event) {
                    that.number += 1;
                    if(event.target.dataset.value === undefined){
                        if(that.number % 2) {
                            that.constructor.setValue(event.target, 'x', 'x.png');
                        }
                        else{
                            that.constructor.setValue(event.target, 'o', 'o.png');
                        }}
                        let rowResult = that.constructor.checkWin(event.target.dataset.value, 'data-row', size);
                        let columnResult = that.constructor.checkWin(event.target.dataset.value, 'data-column', size);
                        let diagonalResult = that.constructor.diagonalCheck(event.target.dataset.value);
                        let reversResult = that.reversCheck(event.target.dataset.value, size);
                        if(rowResult || columnResult || diagonalResult || reversResult){
                            alert('Win: '+ event.target.dataset.value);
                        }

                });
                elements.appendChild(elem);
           }
        }
    }
}
let newGame;
newGame = new Game();