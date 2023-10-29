import axios from "axios";

// Create an instance of Axios
const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = localStorage.getItem("userToken"); // Update this with how you store your token
    if (token) {
      // Set the authorization header with the token
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Do something with the response data
    return response;
  },
  (error) => {
    // Check if the error is a 401 response and not from the login API
    if (error.response.status === 401 && !error.config.url.includes("login")) {
      // Redirect to the login page
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      window.location.href = "/login"; // Update this with your login page URL
    }

    // Do something with response error
    return Promise.reject(error);
  }
);

export default api;
