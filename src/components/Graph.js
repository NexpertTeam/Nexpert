import React from 'react';
import Tree from 'react-d3-tree';
import './styles/Graph.css';

export default function Graph({ data }) {
  return (
    <div className="graph">
      <Tree data={data} />
    </div>
  );
}