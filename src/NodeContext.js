import { createContext, useState } from 'react';

export const NodeContext = createContext();

export function NodeProvider({ children }) {
  const [currentNode, setCurrentNode] = useState(null);
  const [nodeHistory, setNodeHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const handleNodeClick = (nodeData) => {
    setCurrentNode(nodeData);
    setNodeHistory(prev => [...prev, nodeData]);
    setLoading(true);
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
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};
