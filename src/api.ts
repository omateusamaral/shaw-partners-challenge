import axios from "axios";
import { User } from "./interfaces";

function createInstance() {
  return axios.create({
    baseURL: "https://api.github.com/",
    timeout: 4000,
  });
}

const userCache: {
  [key: string]: User;
} = {};

export async function listUsers(since: string | undefined, pageSize = 100) {
  try {
    const instance = createInstance();
    const response = await instance.get(
      `/users?per_page=${pageSize}&since=${since}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUser(username: string): Promise<User> {
  if (userCache[username]) {
    return userCache[username];
  }

  try {
    const response = await doGetUser(username);
    userCache[username] = response;
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function doGetUser(username: string) {
  try {
    const instance = createInstance();
    const response = await instance.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
