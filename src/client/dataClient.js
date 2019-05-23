import Axios from "axios";

const NyCoord = [-73.9772, 40.7808];


function calcCrow(lat1, lon1, lat2, lon2)
{
    let R = 6371; // km
    let dLat = toRad(lat2-lat1);
    let dLon = toRad(lon2-lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    let temp = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    let radian = 2 * Math.atan2(Math.sqrt(temp), Math.sqrt(1 - temp));

    return (R * radian);
}
// Converts numeric degrees to radians
function toRad(Value)
{
    return Value * Math.PI / 180;
}

export async function getAllData(url, filter){
    if (!(filter.km)){
        filter.km = 50
    }
    if (!(filter.cuisine)){
        filter.cuisine = ["Chinese"]
    }
    if (!(filter.grade)){
        filter.grade = 30
    }

    const data = {
        filter
    };

    const response = await Axios.post(url, data);
    const result = response.data.map((data) => {

        var scores = 0;
        data.grades.map((dat)=>{
            scores += dat.score;
        });

       return({
           borough : data.borough,
           cuisine : data.cuisine,
           name : data.name,
           score :  parseInt(scores/data.grades.length, 10),
           distance : calcCrow(
               NyCoord[1],
               NyCoord[0],
               data.address.coord.coordinates[1],
               data.address.coord.coordinates[0]).toFixed(1)
       })
    });
    return await result;
}

export async function getDataCuisine(url, currentCuisine){
    currentCuisine = "^" + currentCuisine;
    const data = {
        currentCuisine
    };
    return await Axios.post(url, data);
}

export async function isLogged(url){
    const response = await Axios.post(url);
    return response.data;
}

export async function tryLogin (username, password) {
    const data = {
        username,
        password
    };
    const response = await Axios.post('/login', data);
    return await response.data
}

export async function insertFilter(url, filter)
{
    const data = {
        filter
    }
    const response = await Axios.post(url, data);
    return response.data;
}

export async function loadUserResearch(url)
{
    const response = await Axios.post(url);
    return response.data;
}


