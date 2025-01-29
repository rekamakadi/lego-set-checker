import axios from 'axios';

const API_KEY = import.meta.env.VITE_REBRICKABLE_API_KEY;
const BASE_URL = 'https://rebrickable.com/api/v3/lego/';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `key ${API_KEY}`,
  },
});

export const searchLegoSets = async (query) => {
  const response = await apiClient.get(`sets/`, {
    params: { search: query, page_size: 10 },
  });
  return response.data.results;
};

export const getLegoSetDetails = async (setId) => {
  const response = await apiClient.get(`sets/${setId}/`);
  return response.data;
};

export const getLegoSetParts = async (setId) => {
  const response = await apiClient.get(`sets/${setId}/parts/`, {
    params: { page_size: 100 },
  });
  return response.data.results;
};
