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

export function expandGraphWithNewNodes(concept) {
  return axios.post('/expand-graph-with-new-nodes', concept)
    .then(response => response.data)
    .catch(error => {
      console.error('Error expanding graph with new nodes:', error);
      throw error;
    });
}

export async function getPaperInsights(paperId) {
  try {
    const response = await axios.post(`${BASE_URL}/generate-insights`, {
      paperId, // this assumes the server is expecting a paperId field in the request body
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching paper insights:', error);
    throw error;
  }
}