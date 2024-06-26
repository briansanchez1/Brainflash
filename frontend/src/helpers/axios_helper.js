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
  activateEmail: (token) => instance.get("/auth/activate/" + token),
};

// PFE Sessions API
export const apiPFESessions = {
  getAllSessions: () => instance.get("/pfe"),
  createSession: (data) => instance.post("/pfe/add", data),
  deleteSession: (id) => instance.get("/pfe/delete/" + id),
  updateSession: (id, s) =>
    instance.put("/pfe/update/" + id, {
      id: s.id,
      title: s.title,
      startDate: s.startDate,
      endDate: s.endDate,
      deckId: s.deckId,
      categoryId: s.categoryId,
    }),
};

// Categories API
export const apiCategories = {
  getCategory: (id) => instance.get("/categories/" + id),
  getAllCategories: () => instance.get("/categories"),
  createCategory: (data) => instance.post("/categories/add", data),
  deleteCategory: (id) => instance.get("/categories/delete/" + id),
  updateCategory: (id, category) =>
    instance.put("/categories/update/" + id, { title: category.title }),
};

// Decks API
export const apiDecks = {
  getDeck: (id) => instance.get("/decks/" + id),
  getAllDecks: () => instance.get("/decks"),
  createDeck: (data) => instance.post("/decks/add", data),
  deleteDeck: (id) => instance.get("/decks/delete/" + id),
  updateDeck: (id, deck) =>
    instance.put("/decks/update/" + id, { title: deck.title }),
};

// Flashcards API
export const apiFlashcards = {
  getAllFlashcards: () => instance.get("/flashcards"),
  createFlashcard: (data) => instance.post("/flashcards/add", data),
  getFlashcard: (id) => instance.get("/flashcards/" + id),
  deleteFlashcard: (id) => instance.get("/flashcards/delete/" + id),
  updateFlashcard: (id, f) =>
    instance.put("/flashcards/update/" + id, {
      question: f.question,
      answer: f.answer,
      deckId: f.deckId,
      categoryId: f.categoryId,
    }),
  getFlashcardsByDeck: (deckId) => instance.get("/flashcards/deck/" + deckId),
  getFlashcardsByCategory: (categoryId) =>
    instance.get("/flashcards/category/" + categoryId),
};

// Users API
export const apiUsers = {
  // Delete the user account using the endpoint created in UserController.java, then clear the authentication token and redirect to the login page
  deleteUser: () => instance.get("/users/delete-account", apiAuth.logout),
  resetPass: (token, data) =>
    instance.put("/users/reset-password/" + token, {
      password: data.password,
      confirmationPassword: data.confirm_password,
    }),
  resetEmailPass: (data) => instance.post("/users/reset-password-email", data),
  changePassword: (data) => instance.post("users/change-password", data),
  changeEmail: (data) => instance.post("users/change-email", data),
};
