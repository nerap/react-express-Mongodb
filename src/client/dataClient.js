import API from "../utils/API";


export async function getAllData(url){
    return await API.get(url);
}

