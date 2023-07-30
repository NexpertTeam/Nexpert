import axios from 'axios';

const BASE_URL = 'http://your-api-url.com';

export function getLongDescription() {
  return axios.get(`${BASE_URL}/text-endpoint`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching text:', error);
      throw error;
    });
}

export function getChildrenIDs() {
  return axios.get(`${BASE_URL}/ids-endpoint`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching IDs:', error);
      throw error;
    });
}
