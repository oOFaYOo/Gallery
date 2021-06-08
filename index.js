"use strict"

import {Api} from "./api.js";

const api = new Api();
const closeOriginImage = document.getElementById("close");
const closeAddImageBlock = document.getElementById("close_add");
const pictures = document.getElementsByClassName("pic_ico");
const originImage = document.getElementById("origin_pic");
const originImageBlock = document.getElementById("pic_big");
const leftArrow = document.getElementById("left");
const rightArrow = document.getElementById("right");
const delButton = document.getElementById("del");
const addButton = document.getElementById("add");
const addImageBlock = document.getElementsByClassName("add_file")[0];
const addFileInput = document.getElementById("add_file");

const originImageNow = {
    number: null,
    name: null,
};

creatDivsPicturesAndHandlers();

closeOriginImage.onclick = () => {
    document.getElementById("pic_big").hidden = true;
    originImage.src = "";
    clearOriginImage(originImageNow);
}

leftArrow.onclick = () => {
    if (originImageNow.number > 0) {
        swipeLeft(originImageNow);
    }
};

rightArrow.onclick = () => {
    if (originImageNow.number < pictures.length - 1) {
        swipeRight(originImageNow);
    }
}

delButton.onclick = async () => {
    if (originImageNow.name) {
        await api.deleteImage(originImageNow.name);
        creatDivsPicturesAndHandlers(true);
        document.getElementById("pic_big").hidden = true;
        originImage.src = "";
        clearOriginImage(originImageNow);
    }
};

addButton.onclick = () => {
    if (addImageBlock.hidden) {
        originImageBlock.hidden = true;
        addImageBlock.hidden = false;
    } else addImageBlock.hidden = true;
};

closeAddImageBlock.onclick = () => {
    addImageBlock.hidden = true;
}

addFileInput.onchange = async () => {
    await api.addImage(addFileInput.files);
    addImageBlock.hidden = true;
    creatDivsPicturesAndHandlers(true);
    document.getElementById("pic_big").hidden = true;
}


function swipeLeft(originImageNow) {
    originImageNow.number = originImageNow.number - 1;
    originImageNow.name = pictures[originImageNow.number].firstChild.src;
    originImage.src = originImageNow.name;
}

function swipeRight(originImageNow) {
    originImageNow.number = originImageNow.number + 1;
    originImageNow.name = pictures[originImageNow.number].firstChild.src;
    originImage.src = originImageNow.name;
}

function createDivImageIco(src) {
    $(".main_back").append('<div class="pic_ico"><img src=' + src + '></div>');
}

function creatDivsPicturesAndHandlers(needCleanup) {
    if (needCleanup) {
        $("div").remove(".pic_ico");
    }

    for (let image of api.getImagesSync()) {
        createDivImageIco(image);
    }

    for (let i = 0; i < pictures.length; i++) {
        pictures[i].onclick = () => {
            if (addImageBlock.hidden === true) {
                originImageNow.number = i;
                originImageNow.name = pictures[originImageNow.number].firstChild.src;
                originImage.src = originImageNow.name;
                originImageBlock.hidden = false;
            } else {
                addImageBlock.hidden = true;
                originImageNow.number = i;
                originImageNow.name = pictures[originImageNow.number].firstChild.src;
                originImage.src = originImageNow.name;
                originImageBlock.hidden = false;
            }
        }
    }
}

function clearOriginImage(originImage) {
    originImage.number = null;
    originImage.name = null;
}


