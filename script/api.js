let user = document.cookie;
if (!user) {
    user = prompt("Пользователь не найден, укажите имя пользователя", "alexpetrov");
    document.cookie = `user=${user}`;
} else {
    user = user.split("=")[1];
}

const CONFIG_API = {
    url: 'https://sb-cats.herokuapp.com/api/2',
    name: user,
    headers: {
        "Content-Type": "application/json"
    }
}

class Api {
    constructor(config){
        this._url = config.url;
        this.name = config.name;
        this._headers = config.headers;
    }

    _onResponce(res){
        return res.ok ? res.json() : Promise.reject({...res, message: "Ошибка на стороне сервера"});
    }

    getAllCats(){
        return fetch(`${this._url}/${this.name}/show`, {
            method: 'GET'
        }).then(this._onResponce)
    }

    addNewCat(data){
        return fetch(`${this._url}/${this.name}/add`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: this._headers
        }).then(this._onResponce)
    }

    updateCatById(idCat, data){
        return fetch(`${this._url}/${this.name}/update/${idCat}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: this._headers
        }).then(this._onResponce)
    }

    getCatById(idCat){
        return fetch(`${this._url}/${this.name}/show/${idCat}`, {
            method: 'GET',
        }).then(this._onResponce)
    }

    deleteCatById(idCat){
       return fetch(`${this._url}/${this.name}/delete/${idCat}`, {
            method: 'DELETE',
        }).then(this._onResponce)
    }

}

export const api = new Api(CONFIG_API);
