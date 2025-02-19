import React from 'react';
import './PropertiesPanel.css';

const PropertiesPanel = ({ selectedNode }) => {
  if (!selectedNode) {
    return (
      <div className="right-panel">
        <h2>Properties</h2>
        <p>No node selected</p>
      </div>
    );
  }

  return (
    <div className="right-panel">
      <h2>Properties</h2>
      <div>
        <strong>ID:</strong> {selectedNode.id}
      </div>
      <div>
        <strong>Type:</strong> {selectedNode.type}
      </div>
      <div>
        <strong>Label:</strong> {selectedNode.data.label}
      </div>
      <div>
        <label htmlFor="prompt">Enter Prompt:</label>
        <textarea
          id="prompt"
          rows="5"
          style={{
            width: '90%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            resize: 'vertical',
          }}
        />
      </div>
    </div>
  );
};

export default PropertiesPanel;