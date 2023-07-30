import React, { useState, useEffect, useContext } from 'react';
import { NodeContext, NodeProvider } from './NodeContext.js';
import ExpandedNode from './components/ExpandedNode.js';
import Graph from './components/Graph.js';
import History from './components/History.js';
import PromptBar from './components/PromptBar.js';

import './App.css';

// This is where the data needs to be passed in...
// TODO: We need to do an array of papers and map over them to generate individual graphs


// TODO: Need to make a mapping function

const data = {
  name: "Layer 1",
  id: "layer1",
  parentNode: null,
  description: "This is a random sentence for layer 1.",
  referenceUrl: [],
  children: [
    {
      name: "Layer 2A",
      id: "layer2A",
      parentNode: "layer1",
      description: "This is a random sentence for layer 2A.",
      referenceUrl: 'google.com',
      children: [
        {
          name: "Layer 3A",
          id: "layer3A",
          parentNode: "layer2A",
          description: "This is a random sentence for layer 3A.",
          referenceUrl: 'google.com',
          children: [
            {
              name: "Layer 4A",
              id: "layer4A",
              parentNode: "layer3A",
              description: "This is a random sentence for layer 4A.",
              referenceUrl: 'google.com',
              children: [
                {
                  name: "Layer 5A",
                  id: "layer5A",
                  parentNode: "layer4A",
                  description: "This is a random sentence for layer 5A.",
                  referenceUrl: 'google.com',
                },
                {
                  name: "Layer 5B",
                  id: "layer5B",
                  parentNode: "layer4A",
                  description: "This is a random sentence for layer 5B.",
                  referenceUrl: 'google.com',
                },
              ],
            },
            {
              name: "Layer 4B",
              id: "layer4B",
              parentNode: "layer3A",
              description: "This is a random sentence for layer 4B.",
              referenceUrl: 'google.com',
            },
          ],
        },
        {
          name: "Layer 3B",
          id: "layer3B",
          parentNode: "layer2A",
          description: "This is a random sentence for layer 3B.",
          referenceUrl: 'google.com',
        },
      ],
    },
    {
      name: "Layer 2B",
      id: "layer2B",
      parentNode: "layer1",
      description: "This is a random sentence for layer 2B.",
      referenceUrl: 'google.com',
      children: [
        {
          name: "Layer 3C",
          id: "layer3C",
          parentNode: "layer2B",
          description: "This is a random sentence for layer 3C.",
          referenceUrl: 'google.com',
          children: [
            {
              name: "Layer 4C",
              id: "layer4C",
              parentNode: "layer3C",
              description: "This is a random sentence for layer 4C.",
              referenceUrl: 'google.com',
              children: [
                {
                  name: "Layer 5C",
                  id: "layer5C",
                  parentNode: "layer4C",
                  description: "This is a random sentence for layer 5C.",
                  referenceUrl: 'google.com',
                },
                {
                  name: "Layer 5D",
                  id: "layer5D",
                  parentNode: "layer4C",
                  description: "This is a random sentence for layer 5D.",
                  referenceUrl: 'google.com',
                },
              ],
            },
            {
              name: "Layer 4D",
              id: "layer4D",
              parentNode: "layer3C",
              description: "This is a random sentence for layer 4D.",
              referenceUrl: 'google.com',
            },
          ],
        },
        {
          name: "Layer 3D",
          id: "layer3D",
          parentNode: "layer2B",
          description: "This is a random sentence for layer 3D.",
          referenceUrl: 'google.com',
        },
      ],
    },
  ],
};


function App() {
  const [isPromptBarVisible, setPromptBarVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.metaKey && event.key === 's') {
        event.preventDefault();
        setPromptBarVisible(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const closeSearchBar = () => {
    setPromptBarVisible(false);
  };

  return (
      <NodeProvider>
        <div className="App">
          {isPromptBarVisible && <PromptBar onClose={closeSearchBar} />}
          <History />
          <ExpandedNode />
          <Graph data={data}/>
        </div>
      </NodeProvider>
  );
}

export default App;