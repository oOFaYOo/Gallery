"use strict"

export class Api{

    getImagesSync () {
        let request = new XMLHttpRequest();
        request.open("GET","/images", false);
        request.send();
        if(request.status === 200){
            return JSON.parse(request.response);
        } else {
            console.error(request.status, request.statusText);
        }
    }
    async getImagesAsync (){
        let response = await fetch("/images", {
            method: "GET"
        });
        if(response.status === 200){
            return response.json();
        } else console.error("Код ошибки: "+response.status);
    }

    async reServerAsync (){
        let response = await fetch("/", {
            method: "GET"
        });
    }

    reServer (){
        let request = new XMLHttpRequest();
        request.open("GET","/", false);
        request.send();
    }

    async addImage (arr) {
        for(let image of arr) {
            let response = await fetch(image.name, {
                method: "PUT",
                headers: {
                    "Content-Type": image.type,
                }
            });
            if(response.status !== 200){
                console.error("Код ошибки: "+response.status);
            }
        }
    }

    async deleteImage (picSRC) {
        let response = await fetch(picSRC, {
            method: "DELETE",
        });
        if(response.status !== 200){
            console.error("Код ошибки: "+response.status);
        }
    }

}

