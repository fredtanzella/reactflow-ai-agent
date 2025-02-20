import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  Handle,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';
import PropertiesPanel from './PropertiesPanel';
import { DnDProvider, useDnD } from './DnDContext';

// Define a default node component with handles
const DefaultNode = ({ data }) => (
  <div>
    <strong>{data.label}</strong>
    <Handle type="target" position="top" />
    <Handle type="source" position="bottom" />
  </div>
);

const nodeTypes = {
  input: DefaultNode,
  decision: DefaultNode,
  output: DefaultNode,
  'Model Query': DefaultNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition, fitView } = useReactFlow();
  const [type] = useDnD();
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    fitView({ padding: 0.2, minZoom: 0.5, maxZoom: 1.5, zoom: 0.75 });
  }, [fitView]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!type) {
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
    <div id="app">
      <div className="top-panel">
        <img src="./thoughtbox-logo.png" alt="Throughtbox" className="logo" />
        <div className="menu">
        <div className="menu-item">File</div>
          <div className="menu-item">Models</div>
          <div className="menu-item">Export</div>
          <div className="menu-item">Settings</div>
          <div className="menu-item">Help</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div className="menu-item-login-image"><img src="./unicorn.jpg" className="loginimage" alt="Throughtbox" /></div>
          <div className="menu-item-login">Fred Tanzella</div>
        </div>
      </div>
      <div className="dndflow">
        <Sidebar />
        <div
          className="reactflow-wrapper"
          ref={reactFlowWrapper}
          style={{ flexGrow: 1, height: '100%' }}
        >
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
            nodeTypes={nodeTypes}
            style={{ backgroundColor: '#FFFFFF' }}
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
        <PropertiesPanel selectedNode={selectedNode} />
      </div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);