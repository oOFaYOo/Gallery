"use strict"

import {Api} from "./api.js";
const api = new Api();
const close = document.getElementById("close");
const pictures = document.getElementsByClassName("pic_ico");
const image = document.getElementById("origin_pic");
const leftArrow = document.getElementById("left");
const rightArrow = document.getElementById("right");
const originImageNow = {
    number: null,
    name: null,
};
const del = document.getElementById("del");
const add = document.getElementById("add");


//отрисовка страницы
for(let pic of api.getImages()){
    createPicIco(pic);
}

//обработчики
close.onclick = () => {
    document.getElementById("pic_big").hidden = true;
    image.src = "";
    originImageNow.number = null;
    originImageNow.name = null;
}

for(let i = 0; i < pictures.length; i++){
    pictures[i].onclick = () => {
        originImageNow.number = i;
        originImageNow.name = pictures[originImageNow.number].firstChild.src;
        image.src = originImageNow.name;
        document.getElementById("pic_big").hidden = false;
    }
}

leftArrow.onclick = () => {
    if(originImageNow.number > 0){
        arrowLeft();
    }
};

rightArrow.onclick = () => {
    if(originImageNow.number < pictures.length-1){
        arrowRight();
    }
}

// del.onclick = api.deleteImage();
//
// add.onclick = api.addImage();

//функции
function arrowLeft() {
    originImageNow.number = originImageNow.number-1;
    originImageNow.name =  pictures[originImageNow.number].firstChild.src;
    image.src = originImageNow.name;
}

function arrowRight() {
    originImageNow.number = originImageNow.number+1;
    originImageNow.name =  pictures[originImageNow.number].firstChild.src;
    image.src = originImageNow.name;
}

function createPicIco(src) {
    $(".main_back").append('<div class="pic_ico"><img src=' + src + '></div>');
}



