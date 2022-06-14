import { useRef, useState, useLayoutEffect, useMemo } from "react";
import { Handle, Position } from "react-flow-renderer";
import "./Testnode.css";

const TestNode = () => {
  const nodeRef = useRef(null);
  const [sourceHandles, setSourceHandles] = useState<Array<number>>([]);

  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const nodeEl: any = nodeRef.current;
    if (nodeEl) {
      //console.log(nodeEl.offsetHeight);
      setDimension({
        width: nodeEl.offsetWidth + dimension.width,
        height: nodeEl.offsetHeight + dimension.height,
      });
    }
  }, []);

  const positionHandle = (i: number) => {
    //console.log(dimension);
    if (i === 1 || i === 2) {
      return (dimension.height / 3) * i;
    } else if (i === 3) {
      return 0;
    } else if (i === 4) {
      return dimension.height;
    }
  };

  const addHandle = () => {
    if (sourceHandles.length < 4) {
      setSourceHandles([...sourceHandles, sourceHandles.length + 1]);
    }
  };

  const handlesJsx = useMemo(
    () =>
      sourceHandles.map((x, i) => {
        const handleId = `sourceTestNodeHandle-${i + 1}`;
        return (
          <Handle
            id={handleId}
            key={handleId}
            type="source"
            position={Position.Right}
            style={{ top: positionHandle(i + 1) }}
          />
        );
      }),
    [sourceHandles]
  );

  return (
    <div ref={nodeRef}>
      {handlesJsx}
      <div className="box">
        <div className="innerbox">
          <button onClick={() => addHandle()}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default TestNode;
