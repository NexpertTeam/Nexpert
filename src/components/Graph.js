import React, { useState, useEffect, useContext } from 'react';
import Tree from 'react-d3-tree';
import './styles/Graph.css';
import NodeContext from '../NodeContext.js';

function collapseNodesAtDepth(data, depth) {
  const walk = (node, currentDepth = 0) => {
    if (currentDepth === depth) {
      node._collapsed = true;
    }
    if (node.children) {
      node.children.forEach(child => walk(child, currentDepth + 1));
    }
  };
  walk(data);
  return data;
}

export default function Graph({ data }) {
  const [treeData, setTreeData] = useState(data);
  const { setCurrentNode } = useContext(NodeContext);

  // Zoom out a layer by detecting what layer we are currently on
  // Then subtracting by one

  const collapseDepth = 1;

  useEffect(() => {
    setTreeData(collapseNodesAtDepth(data, collapseDepth));
  }, [data]);

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