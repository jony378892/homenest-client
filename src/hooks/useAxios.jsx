import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.BASE_URL || "http://localhost:3000",
});

export default function useAxios() {
  return instance;
}
