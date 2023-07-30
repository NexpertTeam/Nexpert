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

const expandedDescription1 = "Residual calcium in the presynaptic terminal after signaling events affects the dynamics of facilitation and depression over a train of spikes. A fast timescale synaptic depression is responsible for oscillatory network activation during reverberations, whereas the onset of a slow timescale depression leads to the termination of reverberation";
const expandedDescription2 = "Synaptic computation in neuromodulation for depression involves the complex interplay between neurons, their connections (synapses), and various neurotransmitters that mediate these connections. In the context of depression, the neuromodulatory systems such as the serotonin, norepinephrine, and dopamine pathways are of primary interest. At a synaptic level, aberrations in these systems can lead to an imbalance in neural circuitry that is often associated with depressive symptoms. Neuromodulation, which refers to processes that regulate neural activity, aims to restore this balance. Techniques such as transcranial magnetic stimulation (TMS) or deep brain stimulation (DBS) can alter synaptic computation, enhancing or inhibiting neural activities in specific brain regions."

export async function generateTwoLayers(searchTerm) {
  return axios.post(`${BASE_URL}/query`, { query: searchTerm })
    .then(response => {console.log(response); return response.data})
    .catch(error => {
      console.error('Error sending query:', error);
      // instead of throwing the error, return an error indication
      return { error: true, message: error.message };
    });
}

      // const paperInsights = await getLongDescription(node, node.data.name === "Residual calcium effects" ); // Add any necessary arguments


export async function getLongDescription(node, state) {
  delete node.data.__rd3t;
  delete node.data.depth;
  delete node.data.height;
  delete node.data.x;
  delete node.data.y;

  // return state ? expandedDescription1 : expandedDescription2;

  console.log(node.data)

  return axios.post(`${BASE_URL}/more-info`,  node.data )
    .then(response => {console.log(response); return response.data})
    .catch(error => {
      console.error('Error fetching text:', error);
      throw error;
    });
  
}

export async function expandGraphWithNewNodes(nodeId, query, node) {
  return axios.post(`${BASE_URL}/expand-graph-with-new-nodes`, { id: nodeId, query: query, concept: nodeId })
    .then(response => response.data)
    .catch(error => {
      console.error('Error expanding graph with new nodes:', error);
      throw error;
    });
}