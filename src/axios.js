import axios from "axios";

const instance = axios.create();

if (window.localStorage.getItem("jwt_token")) {
  instance.defaults.headers.common["Authorization"] =
    "bearer " + window.localStorage.getItem("jwt_token");
}

export default instance;
