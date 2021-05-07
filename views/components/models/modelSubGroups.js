import General from '../genearl.js';


export default class ModelSubGroups extends General {
    constructor() {
        super();
        this.url = 'sub-groups/as'
    }

    getApi() {
        return this.urlApi + this.url
    }

    async getAll() {
        console.log(this.getApi());
        var r = await fetch(this.getApi(), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Request failed!');
            }, networkError => console.log(networkError.message))
            .then((data) => {
                return data
            });

        return r;
    }

    setData(name, description) {
        var data = {
            name,
            description
        }
        var r = await fetch(this.getApi(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Request failed!');
            }, networkError => console.log(networkError.message))
            .then((data) => {
                return data
            });

        return r;
    }

}