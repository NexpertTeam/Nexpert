import { createContext, useState } from 'react';
import { getLongDescription, getChildrenIDs } from './api/apiCalls.js';

export const NodeContext = createContext();

export function NodeProvider({ children }) {
  const [currentNode, setCurrentNode] = useState(null);
  const [nodeHistory, setNodeHistory] = useState([]);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const handleNodeClick = (nodeData) => {
    setCurrentNode(nodeData);
    setNodeHistory(prev => [...prev, nodeData]);
    // TODO: fetch long description and children IDs
    getLongDescription(nodeData.data.id);
    getChildrenIDs(nodeData.data.id); //use this to render further nodes;
  };

  const goToNodeInHistory = (nodeData) => {
    setCurrentNode(nodeData);
    zoomToNode(nodeData.x, nodeData.y); // Zoom to the selected node
  };

  const zoomToNode = (x, y) => {
    const svgWidth = 800;
    const svgHeight = 800;
    
    setTranslate({
      x: svgWidth / 2 - scale * x,
      y: svgHeight / 2 - scale * y
    });

    setScale(2); // Or any desired scale factor
  }

  return (
    <NodeContext.Provider 
      value={{ 
        currentNode, 
        nodeHistory, 
        handleNodeClick, 
        goToNodeInHistory,
        translate,
        scale
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};
