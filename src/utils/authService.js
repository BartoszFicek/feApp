export const login = (token) => {
  window.localStorage.setItem("authToken", token);
};

export const isAuthenticated = () => {
  if (window.localStorage.getItem("authToken") == null) {
    return false;
  } else {
    return true;
  }
};

export const logout = () => {
  if (window.localStorage.getItem("authToken") != null) {
    window.localStorage.removeItem("authToken");
  }
};
