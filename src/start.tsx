import { useCallback, memo } from "react";

import { Handle, Position } from "react-flow-renderer";
import "./customNode.css";

const handleStyle = { left: 10, background: "#000" };

function StartNode() {
  return (
    <>
      <div className="text-updater-node">
        <label htmlFor="text">Start</label>
      </div>
    </>
  );
}

export default StartNode;
