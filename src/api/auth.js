import axios from "axios";

const DEFAULT_OPTIONS = {
  headers: { "Content-Type": "application/json" },
};

const AUTH_URL = `http://localhost:8888/login`;

export async function userSignIn(payload) {
  return await axios.post(AUTH_URL, payload, DEFAULT_OPTIONS);
}
