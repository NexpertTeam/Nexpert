import React, { useContext } from 'react';
import Tree from 'react-d3-tree';
import { NodeContext } from '../NodeContext.js';
import './styles/Graph.css';

const Graph = ({ data }) => {
  const { handleNodeClick, translate, scale } = useContext(NodeContext);

  const onClick = (nodeData) => {
    console.log(nodeData)
    handleNodeClick(nodeData);
  };

  return (
    <div className="graph" style={{ transform: `scale(${scale})` }}>
      <Tree 
        data={data} 
        translate={translate}
        onNodeClick={onClick} 
        separation={{ siblings: 1, nonSiblings: 1 }}
      />
    </div>
  );
};

export default Graph;
