import React from 'react';
import './PropertiesPanel.css';

const PropertiesPanel = ({ selectedNode }) => {
  if (!selectedNode) {
    return (
      <div className="right-panel">
        <h2>Properties</h2>
        <p>Select a node to see its properties.</p>
      </div>
    );
  }

  return (
    <div className="right-panel">
      <h2>Properties</h2>
      <div className="node-properties">
        <div>
          <strong>ID:</strong> {selectedNode.id}
        </div>
        <div>
          <strong>Node:</strong> {selectedNode.type}
        </div>
        <div>
          <strong>Model:</strong> Gemma 2B
        </div>
        {selectedNode.type === 'Model Query' && (
          <div className="prompt">
            <label htmlFor="prompt"><strong>Enter Prompt:</strong></label>
            <textarea
              id="prompt"
              rows="6"
              style={{
                width: '95%',
                padding: '5px',
                marginTop: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                resize: 'vertical',
              }}
            />
            <button className="send-button">Send</button>
            <div className="query-result">
              <label htmlFor="result"><strong>Query Result:</strong></label>
              <textarea
                id="result"
                rows="8"
                readOnly
                style={{
                  width: '95%',
                  padding: '5px',
                  
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  resize: 'vertical',
                  marginTop: '10px',
                  backgroundColor: '#f8f8f8',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;