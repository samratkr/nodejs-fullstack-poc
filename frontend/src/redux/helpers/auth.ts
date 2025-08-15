import axios from "axios";
import type { UpdateUserPayload, User } from "../../types/User";
import { store } from "../store";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (data: { name: string; email: string; password: string; age: number }) => {
  const response = await axios.post(`${API_URL}/api/auth/signup`, data);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, data);
  return response.data;
};

export const googleLogin = async () => {
  const response = await axios.get(`${API_URL}/api/auth/google`, { withCredentials: true });
  return response.data; // { user, token }
};

export const fetchUser = async (token: string): Promise<User> => {
  const response = await axios.get(`${API_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUserData = async (id: string, payload:UpdateUserPayload): Promise<User> => {

  const token = store.getState().auth.token;
  const response = await axios.put(`${API_URL}/api/${id}`,payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchMyData = async (token: string): Promise<User> => {

  const response = await axios.get(`${API_URL}/api/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("responseResponse", response)
  return response.data;
};

