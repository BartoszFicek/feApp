import axios from "axios";
const DEFAULT_OPTIONS = {
  headers: { "Content-Type": "application/json" },
};

const GROUPS = `http://localhost:8888/groups`;

export async function getGroupsData() {
  return await axios.get(GROUPS, DEFAULT_OPTIONS);
}
