import General from '../genearl.js';
export default class ModelGastos extends General {
    constructor() {
        super();
        this.url = 'estimate'
    }

    getApi() {
        return this.urlApi + this.url
    }

    async getAll() {
        var r = await fetch(this.getApi() , {
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

    async getDetail(estimate) {
        var r = await fetch(this.getApi()+'/detail/'+estimate , {
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

    async setData(data) {

        var r = await fetch(this.getApi(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
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

    async setDetail(data) {

        var r = await fetch(this.getApi()+'/detail/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
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

    async deleteDetail(estimate,id) {
        var r = await fetch(this.getApi() + '/' + id, {
                method: "DELETE",
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

    async deleteDetail(id) {
        var r = await fetch(this.getApi() + '/detail/' + id, {
                method: "DELETE",
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