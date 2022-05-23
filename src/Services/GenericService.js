import axios from "axios";
// axios.defaults.baseURL = "https://unstationary1.herokuapp.com/api";
axios.defaults.baseURL = "http://3.208.1.250:8080/api/";

class GenericService {

  get = (url) =>
    new Promise((resolve, reject) => {
      axios
        .get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("authToken"),
            "Access-Control-Allow-Origin":"*"
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });

  post = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .post(url, data , {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("authToken"),
            "Access-Control-Allow-Origin":"*",
            "requestToken":"3487132813749274823(923008134089)",
            "lang":"en"
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  put = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .put(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  delete = (url) =>
    new Promise((resolve, reject) => {
      axios
        .delete(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
}

export default GenericService;
