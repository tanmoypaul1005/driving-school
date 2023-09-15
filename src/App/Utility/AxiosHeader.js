import axios from "axios";
import BaseUrl, { BaseUrlSchool } from "./Url";
import { k_role } from "./const";

const AxiosHeader = (token) => {

  const app_role = localStorage.getItem('maway_role');

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  axios.defaults.baseURL = (app_role === k_role.admin) ? BaseUrl : BaseUrlSchool;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.common['role'] = app_role;

  // set access control allow origin
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
};

export default AxiosHeader;
