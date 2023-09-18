import axios from "axios";

function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    const hasToken = Boolean(window.localStorage.getItem("token"));
    if (hasToken) {
      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      };
    }
    return req;
  });

  axios.interceptors.response.use(
    (req) => {
      return req;
    },
    (error) => {
      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        window.localStorage.removeItem("token");
        window.location.replace("/login");
      }
      return Promise.reject(error);
    }
  );
}

export default jwtInterceptor;