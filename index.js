let close = document.getElementById("close");
let pictures = document.getElementsByClassName("pic_ico");
let image = document.getElementById("origin_pic");
let leftArrow = document.getElementById("left");
let rightArrow = document.getElementById("right");

let originImageNow = {
    number: null,
    name: null,
};

close.onclick = () => {
    document.getElementById("pic_big").hidden = true;
    image.src = "";
    originImageNow.number = null;
    originImageNow.name = null;
}
console.dir();


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



