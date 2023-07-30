import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

export function generateTwoLayers(searchTerm) {
  return axios.post(`${BASE_URL}/query`, { query: searchTerm })
    .then(response => response.data)
    .catch(error => {
      console.error('Error sending query:', error);
      throw error;
    });
}

export function getLongDescription(nodeId) {
  return axios.post(`${BASE_URL}/more-info`, { concept: nodeId })
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching text:', error);
      throw error;
    });
}

export function expandGraphWithNewNodes(nodeId) {
  return axios.post('/expand-graph-with-new-nodes', { concept: nodeId })
    .then(response => response.data)
    .catch(error => {
      console.error('Error expanding graph with new nodes:', error);
      throw error;
    });
}