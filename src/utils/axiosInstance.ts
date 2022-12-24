import axios from "axios";

export type BaseURL = {
  development: string;
  production?: string;
};

export const baseUrl: BaseURL = {
  development: "http://localhost:5000/api/v1",
};

export const publicRequest = axios.create({
  baseURL: baseUrl.development,
});
