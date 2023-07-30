import React, { useContext, useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import { NodeContext } from '../NodeContext.js';
import { getLongDescription, expandGraphWithNewNodes } from '../api/apiCalls.js'; // or wherever your API functions are stored
import './styles/Graph.css';

function mergeData(nodeId, treeData, expandedData) {
  // Function to recursively search for a node
  function findNode(node) {
    if (node.id === nodeId) {
      // Node found, append children
      node.children = node.children.concat(expandedData);
    } else if (node.children) {
      // Node not found, search children
      node.children.forEach(findNode);
    }
  }

  // Make a deep copy of the tree data and search it
  const newTreeData = JSON.parse(JSON.stringify(treeData));
  findNode(newTreeData);

  return newTreeData;
}

const Graph = ({ data }) => {
  const { scale, translate, handleNodeClick, currentNode } = useContext(NodeContext);
  const [treeData, setTreeData] = useState(data); // Initially, treeData is what you pass in as a prop

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch paper insights and set them in the state
        const paperInsights = await getLongDescription(currentNode.data.id); // Add any necessary arguments
        setTreeData(paperInsights);

        // If there's a node to expand, fetch new nodes and add them to the tree data
        if (currentNode) {
          const expandedGraphData = await expandGraphWithNewNodes(currentNode.data.id);
          const newTreeData = mergeData(currentNode.data.id, treeData, expandedGraphData.concepts);
          setTreeData(newTreeData);
        }
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
        // You might want to handle this error - show it to the user or something
      }
    };

    fetchData();
  }, [currentNode]); // Fetch data when the component mounts, and refetch whenever nodeIdToExpand changes

  const onClick = (nodeData) => {
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
