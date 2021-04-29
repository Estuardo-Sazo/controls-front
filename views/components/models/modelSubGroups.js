import General from '../genearl.js';


export default class ModelSubGroups extends General {
    constructor() {
        super();
        this.url = 'sub-groups'
    }

    getApi() {
        return this.urlApi + this.url
    }

    async getAll() {
        var r = await fetch(this.getApi()+'/as', {
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

}