import React, { useContext } from 'react';
import Tree from 'react-d3-tree';
import './styles/Graph.css';
import NodeContext from '../NodeContext.js';

export default function Graph({ data }) {
  const { setCurrentNode } = useContext(NodeContext);

  const onNodeClick = (nodeData, evt) => {
    console.log(nodeData);
    setCurrentNode(nodeData);
  };
    
  return (
    <div className="graph">
      <Tree data={data} onNodeClick={onNodeClick} />
    </div>
  );
}