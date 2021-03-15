import axios from "axios";

const DEFAULT_OPTIONS = {
  headers: { "Content-Type": "application/json" },
};

const LOGIN = `localhost:8080/login`;

export async function userSignIn(payload) {
  await axios.post(LOGIN, payload, DEFAULT_OPTIONS);
}
