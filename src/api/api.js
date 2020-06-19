import axios from "axios";

const createConfig = () => {
  const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
  });

  const api_key = "06536c3dd760f709a35a71a7e630337a";
  api.interceptors.request.use((config) => {
    config.params = config.params || {};
    config.params["api_key"] = api_key;
    config.params["language"] = localStorage.getItem("language") || "en";
    return config;
  });
  return api;
};
const api = createConfig();
export default api;
