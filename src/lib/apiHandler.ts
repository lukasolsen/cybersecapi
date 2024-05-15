import axios from "axios";

const api = axios.create({
    baseURL: "https://platform-rest-prod.ngdata.no/api/",
    headers: {
        "Content-Type": "application/json",
    },
    });

export default api;
