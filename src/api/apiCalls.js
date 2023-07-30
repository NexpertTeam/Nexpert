import axios from 'axios';

const BASE_URL = 'http://0.0.0.0:8000';

const exampleExpandedData = {
  "url": "https://arxiv.org/pdf/1810.04805.pdf",
  "concepts": [
    {
      "name": "Concept 1",
      "referenceUrl": "https://referenceUrl1",
      "description": "This is a description of Concept 1",
      "referenceText": "",
      "id": "",
      "parent": "",
      "children": []
    },
    {
      "name": "Concept 2",
      "referenceUrl": "https://referenceUrl2",
      "description": "This is a description of Concept 2",
      "referenceText": "",
      "id": "",
      "parent": "",
      "children": []
    },
    //... more concept nodes
  ]
}

const exampleLongDescription = {
  "expandedDescription": "This is an expanded description of the concept. It includes additional details and context drawn from the reference paper. For example, the original paper discusses the concept in the context of a larger study on..."
};


export async function generateTwoLayers(searchTerm) {
  return axios.post(`${BASE_URL}/query`, { query: searchTerm })
    .then(response => response.data)
    .catch(error => {
      console.error('Error sending query:', error);
      throw error;
    });
}

export function getLongDescription(node) {
  // return axios.post(`${BASE_URL}/more-info`, { concept: node })
  //   .then(response => {console.log(response); return response.data})
  //   .catch(error => {
  //     console.error('Error fetching text:', error);
  //     throw error;
  //   });
  return exampleLongDescription;
}

export function expandGraphWithNewNodes(nodeId) {
  // return axios.post(`${BASE_URL}/expand-graph-with-new-nodes`, { concept: nodeId })
  //   .then(response => response.data)
  //   .catch(error => {
  //     console.error('Error expanding graph with new nodes:', error);
  //     throw error;
  //   });
  return exampleExpandedData;
}