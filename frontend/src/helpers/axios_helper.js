import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Get and Set the JWT Token in the browser
export const getAuthToken = () => {
  return window.localStorage.getItem("auth_token");
};

export const setAuthHeader = (token) => {
  if (token !== null) {
    window.localStorage.setItem("auth_token", token);
  } else {
    window.localStorage.removeItem("auth_token");
  }
};

// Request interceptor to add the JWT to every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      // Redirect user to login page or refresh the token
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/register"
      ) {
        window.location.href = "/login";
      }

      // We might need to refresh the token
      // refreshToken();
    }
    return Promise.reject(error);
  }
);

// Verify if JWT token existrs and is valid. if it is return true, if its not return false
export const verifyAuth = () => {
  return new Promise((resolve) => {
    if (!getAuthToken()) {
      resolve(false);
    } else {
      apiAuth
        .validateAuth()
        .then((res) => {
          resolve(true);
        })
        .catch((error) => {
          resolve(false);
        });
    }
  });
};

// Authentication API
export const apiAuth = {
  authenticate: (email, password) =>
    instance.post("/auth/authenticate", {
      email: email,
      password: password,
    }),
  register: (name, email, password) =>
    instance.post("/auth/register", {
      name: name,
      email: email,
      password: password,
    }),
  validateAuth: () =>
    instance.get("/auth/validate", {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }),
  logout: () => {
    // Clear auth token from local storage
    setAuthHeader(null);
    // Redirect user to login page
    window.location.href = "/login";
  },
};

// Categories API
export const apiCategories = {
  getAllCategories: () => instance.get("/categories"),
  createCategory: (data) => instance.post("/categories/add", data),
};