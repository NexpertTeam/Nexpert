import React, { useContext, useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import { NodeContext } from '../NodeContext.js';
import { getPaperInsights, expandGraphWithNewNodes } from '../api/apiCalls.js'; // or wherever your API functions are stored
import './styles/Graph.css';

const Graph = ({ data }) => {
  const { handleNodeClick, translate, scale, nodeIdToExpand } = useContext(NodeContext);
  const [treeData, setTreeData] = useState(data); // Initially, treeData is what you pass in as a prop

  useEffect(() => {
    // This function fetches data from your endpoints
    const fetchData = async () => {
      try {
        // Fetch paper insights and set them in the state
        const paperInsights = await getPaperInsights(); // Add any necessary arguments
        setTreeData(paperInsights);

        // If there's a node to expand, fetch new nodes and add them to the tree data
        if (nodeIdToExpand) {
          const expandedGraphData = await expandGraphWithNewNodes(nodeIdToExpand); // Add any necessary arguments
          // Now merge expandedGraphData with treeData, you may need to find the node with nodeIdToExpand and add expandedGraphData as its children. This depends on your data structure
        }
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
        // You might want to handle this error - show it to the user or something
      }
    };

    fetchData();
  }, [nodeIdToExpand]); // Fetch data when the component mounts, and refetch whenever nodeIdToExpand changes

  const onClick = (nodeData) => {
    console.log(nodeData);
    handleNodeClick(nodeData);
  };

  return (
    <div className="graph" style={{ transform: `scale(${scale})` }}>
      <Tree 
        data={treeData} 
        translate={translate}
        onNodeClick={onClick} 
        separation={{ siblings: 1, nonSiblings: 1 }}
      />
    </div>
  );
};

export default Graph;
