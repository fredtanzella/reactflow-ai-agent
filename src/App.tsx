import React, { useState, useCallback, useEffect } from 'react'; // Import useRef here if needed
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
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';
import PropertiesPanel from './PropertiesPanel';
import { DnDProvider, useDnD } from './DnDContext';

// Default node component with handles
const DefaultNode = ({ data }: { data: any }) => (
  <div>
    {data.label}
    <Handle type="target" position="top" />
    <Handle type="source" position="bottom" />
  </div>
);

// ModelQueryNode component
const ModelQueryNode = ({ data }: { data: any }) => (
  <div>
    {data.label}
    <Handle type="target" position="top" />
    <Handle type="source" position="bottom" />
  </div>
);

const nodeTypes = {
  Input: DefaultNode,
  Decision: DefaultNode,
  Output: DefaultNode,
  'Model Query': ModelQueryNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = React.useRef<HTMLDivElement>(null); // added type to ref
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
  const [selectedNode, setSelectedNode] = useState<Node | null>(null); // typed selectedNode

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!type) return;

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
    [screenToFlowPosition, type, setNodes]
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => setSelectedNode(node),
    []
  );

  const onPaneClick = useCallback(() => setSelectedNode(null), []);

  return (
    <div id="app">
      <div className="top-panel">
        <img src="./thoughtbox-logo.png" alt="Thoughtbox" className="logo" />
        <div className="menu">
          <div className="menu-item">File</div>
          <div className="menu-item">Models</div>
          <div className="menu-item">Export</div>
          <div className="menu-item">Settings</div>
          <div className="menu-item">Help</div>
          <div className="menu-item-login-image">
            <img src="./fred-google.jpg" className="loginimage" alt="Fred Tanzella" />
          </div>
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
            nodeTypes={nodeTypes}
            defaultViewport={{ x: 0, y: 0, zoom: 0.4 }} // Initial zoom level
            zoomOnScroll={true}
            zoomOnDoubleClick={false}
            panOnScroll
            style={{ backgroundColor: '#FFFFFF' }}
          >
            <Controls />
            <Background variant="dots" gap={16} size={1} color="#797979" />
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
