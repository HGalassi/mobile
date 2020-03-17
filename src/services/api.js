import axios from 'axios';
import Constants from "expo-constants";

const { manifest } = Constants;

console.log(manifest.debuggerHost.split(':').shift() + ':3333');

const api = axios.create({
    baseURL: `http://${manifest.debuggerHost.split(':').shift()}:3333`
    // baseURL: 'http://192.168.15.19:3333'
})

export default api;