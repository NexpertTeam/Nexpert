import { createContext, useState } from 'react';
import '../src/App.css'

export const NodeContext = createContext();

const exampleTreeDataToRemove = {
  name: "Layer 1",
  id: "layer1",
  // parent: null,
  description: "This is a random sentence for layer 1.",
  referenceUrl: [],
  children: [
    {
      name: "Layer 2A",
      id: "layer2A",
      // parentNode: "layer1",
      description: "This is a random sentence for layer 2A.",
      referenceUrl: 'google.com',
      children: [
        {
          name: "Layer 3A",
          id: "layer3A",
          // parentNode: "layer2A",
          description: "This is a random sentence for layer 3A.",
          referenceUrl: 'google.com',
          children: [
            {
              name: "Layer 4A",
              id: "layer4A",
              // parentNode: "layer3A",
              description: "This is a random sentence for layer 4A.",
              referenceUrl: 'google.com',
              children: [
                {
                  name: "Layer 5A",
                  id: "layer5A",
                  // parentNode: "layer4A",
                  description: "This is a random sentence for layer 5A.",
                  referenceUrl: 'google.com',
                },
                {
                  name: "Layer 5B",
                  id: "layer5B",
                  // parentNode: "layer4A",
                  description: "This is a random sentence for layer 5B.",
                  referenceUrl: 'google.com',
                },
              ],
            },
            {
              name: "Layer 4B",
              id: "layer4B",
              // parentNode: "layer3A",
              description: "This is a random sentence for layer 4B.",
              referenceUrl: 'google.com',
            },
          ],
        },
        {
          name: "Layer 3B",
          id: "layer3B",
          // parentNode: "layer2A",
          description: "This is a random sentence for layer 3B.",
          referenceUrl: 'google.com',
        },
      ],
    },
    {
      name: "Layer 2B",
      id: "layer2B",
      // parentNode: "layer1",
      description: "This is a random sentence for layer 2B.",
      referenceUrl: 'google.com',
      children: [
        {
          name: "Layer 3C",
          id: "layer3C",
          // parentNode: "layer2B",
          description: "This is a random sentence for layer 3C.",
          referenceUrl: 'google.com',
          children: [
            {
              name: "Layer 4C",
              id: "layer4C",
              // parentNode: "layer3C",
              description: "This is a random sentence for layer 4C.",
              referenceUrl: 'google.com',
              children: [
                {
                  name: "Layer 5C",
                  id: "layer5C",
                  // parentNode: "layer4C",
                  description: "This is a random sentence for layer 5C.",
                  referenceUrl: 'google.com',
                },
                {
                  name: "Layer 5D",
                  id: "layer5D",
                  // parentNode: "layer4C",
                  description: "This is a random sentence for layer 5D.",
                  referenceUrl: 'google.com',
                },
              ],
            },
            {
              name: "Layer 4D",
              id: "layer4D",
              // parentNode: "layer3C",
              description: "This is a random sentence for layer 4D.",
              referenceUrl: 'google.com',
            },
          ],
        },
        {
          name: "Layer 3D",
          id: "layer3D",
          // parentNode: "layer2B",
          description: "This is a random sentence for layer 3D.",
          referenceUrl: 'google.com',
        },
      ],
    },
  ],
};

export function NodeProvider({ children }) {
  const [currentNode, setCurrentNode] = useState(null);
  const [treeData, setTreeData] = useState(exampleTreeDataToRemove); 

  const [nodeHistory, setNodeHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const handleNodeClick = (nodeData) => {
    setCurrentNode(nodeData);
    setNodeHistory(prev => [...prev, nodeData]);
  };

  const goToNodeInHistory = (nodeData) => {
    setCurrentNode(nodeData);
    zoomToNode(nodeData.x, nodeData.y); // Zoom to the selected node
  };

  const zoomToNode = (x, y) => {
    const svgWidth = 800;
    const svgHeight = 800;

    setTranslate({
      x: svgWidth / 2 - x,
      y: svgHeight / 2 - y
    });
  }

  return (
    <NodeContext.Provider 
      value={{ 
        setCurrentNode,
        currentNode, 
        nodeHistory, 
        handleNodeClick, 
        goToNodeInHistory,
        translate,
        scale,
        loading,
        setLoading,
        treeData,
        setTreeData,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};
