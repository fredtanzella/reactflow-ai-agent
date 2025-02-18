import React from 'react';
import { useDnD } from './DnDContext';
import thoughtboxLogo from '/thoughtbox-logo.png'; // Public folder path

const Sidebar = () => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      {/* Logo at the top */}
      <div className="logo-container">
        <img src={thoughtboxLogo} alt="ThoughtBox Logo" className="logo" />
      </div>

      <div className="description">Drag nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'Model Query')} draggable>
        Model Query Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'Decision')} draggable>
        Decision Node
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'Output')} draggable>
        Output Node
      </div>
    </aside>
  );
};

export default Sidebar;