import React, { useState, useCallback } from 'react';
import './PropertiesPanel.css';
import { Node } from 'reactflow';

const PropertiesPanel = ({ selectedNode }: { selectedNode: Node | null }) => {
  const [prompt, setPrompt] = useState('');
  const [queryResult, setQueryResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendPrompt = useCallback(async () => {
    if (!prompt.trim()) {
      console.warn('Prompt is empty.');
      return;
    }
    setIsLoading(true);
    setQueryResult(''); // Clear previous results
    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gemma:2b', // Your model name
          prompt: prompt,
          stream: false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${JSON.stringify(
            errorData
          )}`
        );
      }

      const data = await response.json();
      setQueryResult(data.response); // Assuming the response contains the text field
    } catch (error) {
      console.error('Error querying model:', error);
      setQueryResult('Error querying model. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

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
        {/* Common properties section */}
        {selectedNode.type === 'Model Query' && (
          <>
            <div>
              <strong>Model:</strong> Gemma 2B
            </div>
            <div className="prompt">
              <label htmlFor="prompt">
                <strong>Enter Prompt:</strong>
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows="6"
                style={{
                  width: '95%',
                  padding: '5px',
                  marginTop: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  boxShadow: '0 0 0 rgba(0,0,0,0.1)',
                  resize: 'vertical',
                }}
              />
              <button
                className="send-button"
                onClick={handleSendPrompt}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
              <div className="query-result">
                <label htmlFor="result">
                  <strong>Query Result:</strong>
                </label>
                <textarea
                  id="result"
                  value={queryResult}
                  readOnly
                  rows="8"
                  style={{
                    width: '95%',
                    padding: '5px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    boxShadow: '0 0 0 rgba(0,0,0,0.1)',
                    resize: 'vertical',
                    marginTop: '10px',
                    backgroundColor: '#f8f8f8',
                  }}
                />
              </div>
            </div>
          </>
        )}
        {selectedNode.type === 'Decision' && (
          <>
            <div>
              <strong>Decision:</strong>
            </div>
            <div className="prompt">
              <label htmlFor="condition">
                <strong>Enter Condition:</strong>
              </label>
              <textarea
                id="condition"
                rows="6"
                style={{
                  width: '95%',
                  padding: '5px',
                  marginTop: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  boxShadow: '0 0 0 rgba(0,0,0,0.1)',
                  resize: 'vertical',
                }}
              />
              <button className="send-button">Save</button>
              <div className="condition-result">
                <label htmlFor="result">
                  <strong>Condition Result:</strong>
                </label>
                <textarea
                  id="result"
                  rows="8"
                  readOnly
                  style={{
                    width: '95%',
                    padding: '5px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    boxShadow: '0 0 0 rgba(0,0,0,0.1)',
                    resize: 'vertical',
                    marginTop: '10px',
                    backgroundColor: '#f8f8f8',
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;
