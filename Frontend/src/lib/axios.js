import axios from "axios";
//this is a custom instance of axios it is just like exxpress rrouter\
//in this we can use this method to send a request by just entering the endpoint
export  const axiosInstance =axios.create({
    baseURL:"http://localhost:5001/api",
    //tells axios to send cookies with request especially in cross origin requests
    withCredentials:true
})