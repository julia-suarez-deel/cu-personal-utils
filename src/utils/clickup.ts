import axios, {AxiosInstance} from "axios";
import {validateEnvironmentVariables} from "@/utils/validation";

export function createClickUpHttpInstance(): AxiosInstance {
  validateEnvironmentVariables(['CLICK_UP_TOKEN']);
  return axios.create({
    baseURL: 'https://api.clickup.com/api/v2',
    headers: {
      Authorization: process.env.CLICK_UP_TOKEN
    }
  });
}
