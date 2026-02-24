
import axios from "axios"; 
const API_URL = 'http://localhost:5001/api/logs';

export const fetchLogs = () => axios.get(API_URL);
export const createLog = (newLog) => axios.post(API_URL, newLog);