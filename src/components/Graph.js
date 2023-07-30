import React, { useContext, useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import cloneDeep from 'lodash/cloneDeep';
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
  const newTreeData = cloneDeep(treeData);
  findNode(newTreeData);

  return newTreeData;
}

// Function to recursively update node description
function updateDescription(node, currentNode, longDescription) {
  if (node.id === currentNode.id) {
    // Return a new object for the node
    return { ...node, description: longDescription };
  }
  if (node.children) {
    // Iterate through children, creating new objects for any that have changed
    return {
      ...node,
      children: node.children.map(child => updateDescription(child, currentNode, longDescription)),
    };
  }
  // No changes to this node or its children
  return node;
};

const Graph = ({ data }) => {
  const { scale, translate, handleNodeClick, currentNode } = useContext(NodeContext);
  const [treeData, setTreeData] = useState(data); // Initially, treeData is what you pass in as a prop

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch paper insights and set them in the state
        const paperInsights = await getLongDescription(currentNode); // Add any necessary arguments
        // Update node description in treeData
        const updatedTreeData = updateDescription(treeData, currentNode.data, paperInsights?.expandedDescription);
        setTreeData(updatedTreeData);
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
        // You might want to handle this error - show it to the user or something
      }
    };

    fetchData();
  }, [currentNode]); // Fetch data when the component mounts, and refetch whenever currentNode changes

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