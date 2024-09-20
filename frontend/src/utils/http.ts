import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL
});

async function get(url: string) {
  try {
    const response = await instance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function post<T>(url: string, data: T) {
  try {
    const response = await instance.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default {
  get,
  post
};
