import React, { useState } from 'react';
import NodeContext from './NodeContext.js';
import ExpandedNode from './components/ExpandedNode.js';
import Graph from './components/Graph.js';
import History from './components/History.js';

import './App.css';

// This is where the data needs to be passed in...
// We need to do an array of papers and map over them to generate individual graphs
//

const data = {
  name: "Paper #1",
  children: [
    { 
      name: "Insight #1",
      children: [
        { name: "grandchild #1", content: "", references: [] },
        { name: "grandchild #2", content: "", references: [] },
      ]
    },
    { 
      name: "Insight #2",
      children: [
        { name: "grandchild #3", content: "", references: [] },
        { name: "grandchild #4", content: "", references: [] },  
      ]
    },
  ]
};


function App() {
  const [currentNode, setCurrentNode] = useState(null);

  return (
    <div className="App">
      <NodeContext.Provider value={{ currentNode, setCurrentNode }}>
        <History />
        <ExpandedNode currentNode={currentNode} />
        <Graph data={data}/>
      </NodeContext.Provider>
    </div>
  );
}

export default App;
