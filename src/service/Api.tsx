import axios from "axios";
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", 
  timeout: 5000,
});
export interface User {
  id: number;
  name: string;
  email: string;
}
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/users");
  return response.data;
};
