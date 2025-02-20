import React from 'react';
import { useDnD } from './DnDContext';


const Sidebar = () => {
  const [, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">Drag nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'Model Query')} draggable>
        Model Query
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'Decision')} draggable>
        Decision
      </div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'Input')} draggable>
        Input
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'Output')} draggable>
        Output
      </div>
    </aside>
  );
};

export default Sidebar;