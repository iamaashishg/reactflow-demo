import { Node, Handle, Position } from "react-flow-renderer";

interface LabelProps {
  label: string;
}

const InnerDragComponentLabel = () => {
  return (
    <div
      style={{
        margin: "8px",
        position: "relative",
      }}
      id="id1"
    >
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "red" }}
      />
      <label htmlFor="text">Labelx</label>
    </div>
  );
};
export default InnerDragComponentLabel;
