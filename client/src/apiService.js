import axios from 'axios';
const BASE_URL = 'http://localhost:4000';
export const getInactiveContracts = () => {
  return axios.get(`${BASE_URL}/inactiveContracts`);
};
export const searchContracts = (searchTerm) => {
  return axios.get(`${BASE_URL}/contracts/${searchTerm}`);
};
export const inactivateContract = (contractId) => {
  return axios.post(`${BASE_URL}/inactivateContract/${contractId}`);
};