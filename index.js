"use strict"

import {Api} from "./api.js";
const api = new Api();
const close = document.getElementById("close");
const closeAddPicBlock = document.getElementById("close_add");
const pictures = document.getElementsByClassName("pic_ico");
const image = document.getElementById("origin_pic");
const bigPicBlock = document.getElementById("pic_big");
const leftArrow = document.getElementById("left");
const rightArrow = document.getElementById("right");
const del = document.getElementById("del");
const add = document.getElementById("add");
const addPicBlock = document.getElementsByClassName("add_file")[0];
const addFile = document.getElementById("add_file");
const originImageNow = {
    number: null,
    name: null,
};

//отрисовка страницы
for(let pic of api.getImagesSync()){
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
        if(addPicBlock.hidden === true) {
            originImageNow.number = i;
            originImageNow.name = pictures[originImageNow.number].firstChild.src;
            image.src = originImageNow.name;
            bigPicBlock.hidden = false;
        } else {
            addPicBlock.hidden = true;
            originImageNow.number = i;
            originImageNow.name = pictures[originImageNow.number].firstChild.src;
            image.src = originImageNow.name;
            bigPicBlock.hidden = false;
        }
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

// del.onclick = async ()=>{
//     if(originImageNow.name) {
//         await api.deleteImage(originImageNow.name);
//         document.getElementById("pic_big").hidden = true;
//         $("div").remove(".pic_ico");
//         let arrOfPic = await api.getImagesAsync();
//         for(let pic of arrOfPic){
//             createPicIco(pic);
//         }
//         image.src = "";
//         originImageNow.number = null;
//         originImageNow.name = null;
//     }
// };

del.onclick = ()=>{
    if(originImageNow.name) {
        api.deleteImage(originImageNow.name);
        $("div").remove(".pic_ico");
        document.getElementById("pic_big").hidden = true;
        for(let pic of api.getImagesSync()){
            createPicIco(pic);
        }
        image.src = "";
        originImageNow.number = null;
        originImageNow.name = null;
    }
};

add.onclick = () => {

    if(addPicBlock.hidden){
        bigPicBlock.hidden = true;
        addPicBlock.hidden = false;
    } else addPicBlock.hidden = true;
};

closeAddPicBlock.onclick = () => {
    addPicBlock.hidden = true;
}

addFile.onchange = ()=>{
    api.addImage(addFile.files);
    addPicBlock.hidden = true;
    $("div").remove(".pic_ico");
    document.getElementById("pic_big").hidden = true;
    for(let pic of api.getImagesSync()){
        createPicIco(pic);
    }
}

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





