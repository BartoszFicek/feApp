import axios from "axios";
const DEFAULT_OPTIONS = {
  headers: { "Content-Type": "application/json" },
};

const GROUPS_URL = `http://localhost:8888/groups`;

export async function getGroupsData() {
  return await axios.get(GROUPS_URL, DEFAULT_OPTIONS);
}
