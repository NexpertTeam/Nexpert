import React from 'react';
import './styles/ExpandedNode.css';

function ExpandedNode({ currentNode, children }) {
  return (
    <div className="expandedNode">
      {currentNode &&
        <div>
            <div className="nodeTag"><b>Name:</b> {currentNode?.data.name}</div>
            <div className="nodeTag"><b>Depth:</b> {currentNode?.depth}</div>
            <div className="nodeTag"><b>Content:</b> {currentNode?.data.content}</div>
            <div className="nodeTag"><b>References:</b> {currentNode?.data.references}</div>
        </div>
      }   
      {!currentNode && 
        <div>No insight expanded.</div>
      }

      {children}
    </div>
  );
}

export default ExpandedNode;
