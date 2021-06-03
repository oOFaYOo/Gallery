"use strict"

export class Api{
    constructor(url) {
        this.url = url;
    }
    getImages () {
        let request = new XMLHttpRequest();
        request.open("GET","http://" + this.url + "/images", false);
        request.send();
        if(request.status === 200){
            return JSON.parse(request.response);
        } else {
            console.error(request.status, request.statusText);
        }
    }
    // async addImage () {
    //
    // }
    // async deleteImage () {
    //
    // }

}