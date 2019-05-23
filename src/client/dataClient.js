
import axios from "axios";


function calcCrow(lat1, lon1, lat2, lon2)
{
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
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

    const response = await axios.post(url, data);

    const result = response.data.map((data)=>{
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
               40.7808,
               -73.9772,
               data.address.coord.coordinates[1],
               data.address.coord.coordinates[0]).toFixed(1)
       })
    });

    return await result;
}

export async function getDataCuisine(url, currentCuisine){

    const data = {
        currentCuisine
    }
    return await axios.post(url, data);
}

export async function isLogged(url){

    const response = await axios.post(url);
    return response.data;

}



export async function tryLogin (username, password) {
    const data = {
        username,
        password
    };
    const response = await axios.post('/login', data);
    console.log('===> User response', await response);
    return await response.data
}
