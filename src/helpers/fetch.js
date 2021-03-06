const baseUrl = process.env.REACT_APP_API_URL;

export const fetchApi = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`;//localhost:4000/api/

    if(method === "GET"){
        return fetch(url);
    }else{
        return fetch(url,{
            method,
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify(data)
        });
    }

};

/* Hacer lo de thunk CHRISTIAN, PARA ACCIONES ASINCRONAS */