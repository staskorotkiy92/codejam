'use strict';
document.querySelector('.image__choise__items').addEventListener('click', handlerEvent);

class Canvas {
    constructor(drawData, imageType) {
        this.canvas = document.querySelector('canvas');
        this.drawData = drawData;
        this.imageType = imageType;
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width / imageType;
        this.height = this.canvas.height / imageType;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.width);
    }

    draw() {
        switch (this.imageType) {
            case '4':
                for (let i = 0; i < this.drawData.length; i++) {
                    for (let j = 0; j < this.drawData[i].length; j++) {
                        this.ctx.fillStyle = `#${this.drawData[i][j]}`;
                        this.ctx.fillRect(i * this.width, j * this.height, this.width, this.height);
                    }
                }
                break;
            case '32':
                for (let i = 0; i < this.drawData.length; i++) {
                    for (let j = 0; j < this.drawData[i].length; j++) {
                        this.ctx.fillStyle = `#${rgbToHex(this.drawData[i][j])}`;
                        this.ctx.fillRect(i * this.width, j * this.height, this.width, this.height);
                    }
                }
                break;
            case 'img':
                this.ctx.drawImage(this.drawData, 0, 0, this.canvas.width, this.canvas.height);
                break;
            default:
                alert('what?');
                break;
        }
    }
}

function handlerEvent(event) {
    let typeChoise = event.target.closest('li').id;
    let requestURL;
    let request = new XMLHttpRequest();

    switch (typeChoise) {
        case '4':
            requestURL = 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/4x4.json';
            request.responseType = 'json';
            break;
        case '32':
            requestURL = 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/32x32.json';
            request.responseType = 'json';
            break;
        case 'img':
            let img = new Image();
            img.src = 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/image.png';
            img.onload = function () {
                let paintCanvas = new Canvas(img, typeChoise);
                paintCanvas.draw();
            };
            return;
    }

    request.open('GET', requestURL);
    request.send();
    request.onload = function () {
        let data = request.response;
        let paintCanvas = new Canvas(data, typeChoise);
        paintCanvas.draw();
        console.log(paintCanvas.width);
        console.log(paintCanvas.height);
    };
}

function rgbToHex(rgb) {
    let result;
    rgb.length = 3;
    result = rgb.map((component) => {
        let hexComponent = component.toString(16);
        return hexComponent.length === 1 ? '0' + hexComponent : hexComponent;
    });
    return result.join('');
}


