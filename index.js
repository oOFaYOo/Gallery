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
const delButton = document.getElementById("del");
const addButton = document.getElementById("add");
const addPicBlock = document.getElementsByClassName("add_file")[0];
const addFile = document.getElementById("add_file");

const originImageNow = {
    number: null,
    name: null,
};

creatDivsPicturesAndHandlers();

close.onclick = () => {
    document.getElementById("pic_big").hidden = true;
    image.src = "";
    originImageNow.number = null;
    originImageNow.name = null;
}

leftArrow.onclick = () => {
    if (originImageNow.number > 0) {
        arrowLeft();
    }
};

rightArrow.onclick = () => {
    if (originImageNow.number < pictures.length - 1) {
        arrowRight();
    }
}

delButton.onclick = async () => {
    if (originImageNow.name) {
        await api.deleteImage(originImageNow.name);
        creatDivsPicturesAndHandlers(true);
        document.getElementById("pic_big").hidden = true;
        image.src = "";
        originImageNow.number = null;
        originImageNow.name = null;
    }
};

addButton.onclick = () => {
    if (addPicBlock.hidden) {
        bigPicBlock.hidden = true;
        addPicBlock.hidden = false;
    } else addPicBlock.hidden = true;
};

closeAddPicBlock.onclick = () => {
    addPicBlock.hidden = true;
}

addFile.onchange = async () => {
    await api.addImage(addFile.files);
    addPicBlock.hidden = true;
    creatDivsPicturesAndHandlers(true);
    document.getElementById("pic_big").hidden = true;
}


function arrowLeft() {
    originImageNow.number = originImageNow.number - 1;
    originImageNow.name = pictures[originImageNow.number].firstChild.src;
    image.src = originImageNow.name;
}

function arrowRight() {
    originImageNow.number = originImageNow.number + 1;
    originImageNow.name = pictures[originImageNow.number].firstChild.src;
    image.src = originImageNow.name;
}

function createPicIco(src) {
    $(".main_back").append('<div class="pic_ico"><img src=' + src + '></div>');
}

function creatDivsPicturesAndHandlers(needCleanup) {
    if (needCleanup) {
        $("div").remove(".pic_ico");
    }

    for (let image of api.getImagesSync()) {
        createPicIco(image);
    }

    for (let i = 0; i < pictures.length; i++) {
        pictures[i].onclick = () => {
            if (addPicBlock.hidden === true) {
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
}



