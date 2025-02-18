import React, { useRef, useCallback, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls, 
  useReactFlow,
  Background,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import Sidebar from './Sidebar';
import { useDnD } from './DnDContext';

nodeTypes={nodeTypes}

const nodeTypes = {
  'Model Query': ModelQueryNode, // Ensure it's correctly defined
};

// Define the custom Model Query node
// const ModelQueryNode = ({ data }) => {
//  return (
//    <div style={{ padding: 10, border: '1px solid #0041d0', borderRadius: 5 }}>
//      <strong>{data.label}</strong>
//    </div>
//  );
//};

// Register custom node types
const nodeTypes = {
  'Model Query': ModelQueryNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Model Query node' },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      console.log("Dropped node type:", type); // Debugging log
  
      if (!type) {
        console.error("Error: Type is null. Node not created.");
        return;
      }
  
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
  
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };
  
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="dndflow">
      <Sidebar />
      <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ flexGrow: 1, height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          fitView
          nodeTypes={nodeTypes} // Register custom node types here
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <Controls />
          <Background 
            variant="dots"
            gap={16}
            size={1}
            color="#b3b2b2"
          />
        </ReactFlow>
      </div>
      <div className="right-panel">
        <h2>Properties</h2>
        {selectedNode && selectedNode.type === 'input' && (
          <div>
            <label>Enter Prompt:</label>
            <textarea rows="4" cols="30"></textarea>
          </div>
        )}
      </div>
    </div>
  );
};

const nodeTypes = {
  'Model Query': ModelQueryNode, // ✅ Ensure this EXACT string matches Sidebar.jsx
};

console.log("Registered node types:", nodeTypes); // ✅ Log this to verify it's registered

<ReactFlow
  nodeTypes={nodeTypes}  // ✅ Make sure this is included
/>

export default DnDFlow;
