import React from 'react';
import './styles/ExpandedNode.css';

function ExpandedNode({ currentNode, children }) {
  return (
    <div className="expandedNode">
      {currentNode?.data.name}
      {children}
    </div>
  );
}

export default ExpandedNode;
