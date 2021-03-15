import axios from "axios";
const DEFAULT_OPTIONS = {
  headers: { "Content-Type": "application/json" },
};

const GROUPS = `localhost:8080/groups`;

export async function ugetGroupsData() {
  await axios.get(GROUPS, DEFAULT_OPTIONS);
}
