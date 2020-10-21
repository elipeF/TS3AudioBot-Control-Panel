import axios from "axios";

const instance = axios.create();

if (instance.defaults.headers.common["Authorization"]) {
  instance.defaults.headers.common["Authorization"] =
    "bearer " + window.localStorage.getItem("jwt_token");
}

export default instance;
