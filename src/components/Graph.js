import React, { useContext, useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import cloneDeep from 'lodash/cloneDeep';
import { NodeContext } from '../NodeContext.js';
import { getLongDescription, expandGraphWithNewNodes } from '../api/apiCalls.js'; // or wherever your API functions are stored
import './styles/Graph.css';

// Helper functions
function mergeData(nodeId, treeData, expandedData) {
  // Function to recursively search for a node
  function findNode(node) {
    if (node.id === nodeId) {
      // Node found, append children
      node.children = node.children?.concat(expandedData);
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

const getLongDesc = async (node, callbackFunc, activeVar) => {
  const paperInsights = await getLongDescription(node); // Add any necessary arguments
  // Update node description in treeData
  const updatedTreeData = updateDescription(activeVar, node.data, paperInsights?.expandedDescription);
  callbackFunc(updatedTreeData);
}

const expandGraph = async (node, callbackFunc, activeVar) => {
  const expandedGraphData = await expandGraphWithNewNodes(node.data.id);
  const newTreeData = mergeData(node.data.id, activeVar, expandedGraphData);
  callbackFunc(newTreeData)
}

// Main component
const Graph = ({ data }) => {
  const { scale, translate, handleNodeClick, currentNode, setLoading } = useContext(NodeContext);
  const [treeData, setTreeData] = useState(data); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentNode && currentNode.data) {
          // getLongDesc(currentNode, setTreeData, treeData);
          expandGraph(currentNode, setTreeData, treeData);

        }
        setLoading(false);
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    fetchData();
  }, [currentNode]); 

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
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
      />
    </div>
  );
};

export default Graph;