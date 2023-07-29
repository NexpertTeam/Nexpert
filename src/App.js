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
  name: "Superconducting Quantum Wells (SQWs)",
  children: [
    { 
      name: "Insight #1",
      children: [
        {
          name: "Interface regions between lead ions and oxygen atoms that exhibit superconducting properties.",
          content: "The substitution of smaller Cu2+ ions for Pb2+ ions in the insulating phosphate network causes a volume reduction and stress on the lead ions in the cylindrical columns. This stress distorts the positions of the lead ions and creates superconducting quantum wells at the interfaces between the lead ions and oxygen atoms in the phosphate network. The SQWs are detected through electron paramagnetic resonance signals and are critical for explaining the high temperature superconductivity in LK-99.",
          references: [
            " Yoshida, K., Nakamura, M., Higashi, N., & Shimizu, H. (2002). EPR in the 21st Century Basics and Applications to Material, Life and Earth Science. Elsevier B.V. ,"
          ] 
        },
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
