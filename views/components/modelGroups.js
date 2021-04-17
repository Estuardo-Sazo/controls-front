import General from './genearl.js';


export default class ModelGroups extends General {
    constructor() {
        super();
        this.url = 'groups'
    }

    getApi() {
        return this.urlApi + this.url
    }

    getAll() {
        fetch(this.getApi(), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.body);
                return data
            });
    }

}