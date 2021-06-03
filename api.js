"use strict"

export class Api{

    getImages () {
        let request = new XMLHttpRequest();
        request.open("GET","/images", false);
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

