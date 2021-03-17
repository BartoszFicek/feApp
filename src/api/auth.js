import axios from "axios";

const DEFAULT_OPTIONS = {
  headers: { "Content-Type": "application/json" },
};

const LOGIN = `http://localhost:8888/login`;

export async function userSignIn(payload) {
  return await axios.post(LOGIN, payload, DEFAULT_OPTIONS);
}
