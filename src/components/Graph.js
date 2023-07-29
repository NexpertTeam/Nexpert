import React from 'react';

function Graph({ color, children }) {
  return (
    <div style={{ backgroundColor: color, flex: 1, padding: '10px' }}>
      {children}
    </div>
  );
}

export default Graph;
