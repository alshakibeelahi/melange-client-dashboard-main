import { getBaseUrl } from "@/app/utils";
import axios from "axios";

const baseAxios = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});

export default baseAxios;
