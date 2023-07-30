import React, { useContext, useEffect, useState } from 'react';
import { NodeContext } from '../NodeContext.js';
import './styles/ExpandedNode.css';

function ExpandedNode({ children }) {
  const { currentNode, loading, treeData } = useContext(NodeContext);
  const [foundNode, setFoundNode] = useState(null);

  const findNode = (node, id) => {
    if (node.id === id) {
      return node;
    }

    if (node.children) {
      for (let child of node.children) {
        const result = findNode(child, id);
        if (result) {
          return result;
        }
      }
    }

    return null;
  };

  useEffect(() => {
    if (currentNode && treeData) {
      setFoundNode(findNode(treeData, currentNode.data.id));
    }
  }, [currentNode, treeData]);

  return (
    treeData &&
    (
      <div className="expandedNode">
        <h3 className='title'>Read More</h3>
        {loading && <div className='noNodeTag'>Loading...</div>}
        {!loading && foundNode &&
          <div>
            <div className="nodeTag"><b>Name:</b> {foundNode.name}</div>
            <div className="nodeTag"><b>Description:</b> {foundNode.description}</div>
            <div className="nodeTag"><b>Reference URL:</b> <a href={foundNode?.referenceUrl} target='_blank'>{foundNode?.referenceUrl}</a></div>
          </div>
        }   
        {!foundNode && 
          <div className="noNodeTag"><i>Press CMD-S to get started, or select a node on the righthand side.</i></div>
        }

        {children}
      </div>
    )
  );
}

export default ExpandedNode;
