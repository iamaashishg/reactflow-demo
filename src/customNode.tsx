import { useCallback, memo } from "react";

import { Handle, Position } from "react-flow-renderer";
// import { DragDropContext } from "react-beautiful-dnd";

import "./customNode.css";

const handleStyle = { left: 10, background: "#000" };

function CustomNode() {
  //   const onChange = useCallback((evt: any) => {
  //     console.log(evt.target.value);
  //   }, []);
  return (
    <div className="text-updater-node">
      <label htmlFor="text">child node 3</label>
      {/* <input id="text" name="text" onChange={onChange} /> */}
      {/* <Handle
          type="source"
          position={Position.Bottom}
          id="b"
          style={{
            backgroundColor: "#E5E5E5",
          }}
        /> */}
    </div>
  );
}

export default CustomNode;
