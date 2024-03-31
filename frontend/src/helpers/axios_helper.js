import axios from "axios";

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
// Default values
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.post["Content-Type"] = "application/json";

// provided request. Most likely will delete
export const request = (method, url, data) => {
  let headers = {};
  if (getAuthToken() !== null && getAuthToken() !== "null") {
    headers = { Authorization: `Bearer ${getAuthToken()}` };
  }

  return axios({
    method: method,
    url: url,
    headers: headers,
    data: data,
  });
};


// get categories from database with their token
export const getAllCategories = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/categories",
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    const categories = response.data.map((category) => category.title);
    return categories;
  } catch (error) {
    console.error("Error occurred while fetching categories" + error);
    throw error;
  }
};

// Verify if JWT token existrs and is valid. if it is return true, if its not return false
export const verifyAuth = () => {
  return new Promise((resolve) => {
    if (!getAuthToken()) {
      resolve(false);
    } else {
      axios
        .get("http://localhost:8080/api/v1/secure", {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        })
        .then((res) => {
          resolve(true);
        })
        .catch((error) => {
          resolve(false);
        });
    }
  });
};
