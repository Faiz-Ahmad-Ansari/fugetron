import axios from 'axios';

const common = 'execute-api.us-east-1.amazonaws.com/v1';

const ApiServices = {

    /////////// FETCH RECORD LIST ///////////
    recordList(){
        return axios.get(`https://j5ej5u32gg.${common}/fetch`)
    },
    /////////// ADD NEW RECORD ///////////
    addRecord(queryString){
        return axios.get(`https://c0ri699qs5.${common}/add?${queryString}`)
    },
    /////////// EDIT RECORD ///////////
    editRecord(queryString){
        return axios.get(`https://o1wm686yz2.${common}/edit?${queryString}`)
    },
    /////////// DELETE RECORD ///////////
    deleteRecord(queryString){
        return axios.get(`https://k6j938wg66.${common}/delete?param1=${queryString}`)
    },

}

export default ApiServices;