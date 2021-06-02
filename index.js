let close = document.getElementById("close");
let pictures = document.getElementsByClassName("pic_ico");
let image = document.getElementById("origin_pic");

close.onclick = () => {
    document.getElementById("pic_big").hidden = true;
}
console.dir();

// for(let pic of pictures){
//     pic.onclick = () => {
//         document.getElementById("pic_big").hidden = false;
//     }
// }

for(let pic of pictures){
    pic.onclick = () => {
        image.src = pic.firstChild.src;
        document.getElementById("pic_big").hidden = false;
    }
}
