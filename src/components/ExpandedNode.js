import React, { useContext } from 'react';
import { NodeContext } from '../NodeContext.js';
import './styles/ExpandedNode.css';

function ExpandedNode({ children }) {
   const { currentNode } = useContext(NodeContext);

  return (
    <div className="expandedNode">
      <h3 className='title'>Description</h3>
      {currentNode &&
        <div>
            <div className="nodeTag"><b>Name:</b> {currentNode?.data.name}</div>
            <div className="nodeTag"><b>Depth:</b> {currentNode?.depth}</div>
            <div className="nodeTag"><b>Content:</b> {currentNode?.data.content}</div>
            <div className="nodeTag"><b>References:</b> {currentNode?.data.references}</div>
        </div>
      }   
      {!currentNode && 
        <div className="nodeTag">No insight expanded.</div>
      }

      {children}
    </div>
  );
}

export default ExpandedNode;
