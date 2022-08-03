import axios from "axios";

async function getList() {
  await axios.get("http://localhost:8080/list");
}

getList();
