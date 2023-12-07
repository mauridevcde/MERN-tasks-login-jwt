import axios from "./axios";


export const registerRequest = async (user) => {
  return axios.post('/register', user);
};

export const loginRequest = async (user) => {
  return axios.post('/login', user);
};

export const verifyRequest = async ( ) => {
  return axios.get('/verify');
}