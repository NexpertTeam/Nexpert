import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

export function getTopPaper(searchTerm) {
  return axios.post(`${BASE_URL}/query`, { query: searchTerm })
    .then(response => response.data)
    .catch(error => {
      console.error('Error sending query:', error);
      throw error;
    });
}

export function getLongDescription() {
  return axios.post(`${BASE_URL}/expand-concept`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching text:', error);
      throw error;
    });
}

export function getChildrenIDs() {
  return axios.post(`${BASE_URL}/generate-insights`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching IDs:', error);
      throw error;
    });
}
