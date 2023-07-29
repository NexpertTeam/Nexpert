import React from 'react';

function ExpandedNode({ color, children }) {
  return (
    <div style={{ backgroundColor: color, flex: 1, padding: '10px' }}>
      {children}
    </div>
  );
}

export default ExpandedNode;
