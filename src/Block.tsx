import { useCallback, memo, useState } from "react";

import {
  Handle,
  Position,
  useUpdateNodeInternals,
  useReactFlow,
  useStore,
} from "react-flow-renderer";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import "./customNode.css";

const childItems = [
  { id: "cno1", content: "child node 10" },
  { id: "cno2", content: "child node 20" },
  { id: "cno3", content: "child node 30" },
];

const block = {
  [uuidv4()]: {
    name: "Message",
    items: childItems,
  },
};

function BlockNode() {
  const updateNodeDimensions = useStore(
    (actions) => actions.updateNodeDimensions
  );
  const updateNodeInternals = useUpdateNodeInternals();
  const reactFlowInstance = useReactFlow();
  console.log("reactFlowInstance....");
  console.log(reactFlowInstance.getNodes());
  console.log(reactFlowInstance.getEdges());
  const [refresh, setRefresh] = useState(0);
  const onDragEnd = (result: DropResult, blocks: any, setBlocks: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const column = blocks[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setBlocks({
      ...blocks,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  };
  const [blocks, setBlocks] = useState(block);
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        // style={{
        //   background: "black",
        //   height: "0.1px",
        //   width: "0.1px",
        //   border: "none",
        // }}
      />

      <div className="text-updater-node">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, blocks, setBlocks)}
        >
          {Object.entries(blocks).map(([id, column]) => {
            return (
              <Droppable droppableId={id} key={id}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "lightgrey"
                          : "white",
                      }}
                    >
                      {column.items.map((item, index) => {
                        return (
                          <>
                            {/* <Handle type="source" position={Position.Bottom} /> */}
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <>
                                    <div
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                      className="nodrag"
                                      style={{
                                        ...provided.draggableProps.style,
                                        top: "auto !important",
                                        left: "auto !important",
                                        width: "100%",
                                        height: "100%",
                                        cursor: "pointer",
                                        // background: snapshot.isDragging
                                        //   ? "#000"
                                        //   : "#fff",
                                      }}
                                      id={`id1${index}`}
                                      key={`id1${index}`}
                                    >
                                      <div
                                        style={{
                                          position: "relative",
                                        }}
                                        id={`id2${index}`}
                                        key={`id2${index}`}
                                      >
                                        <label
                                          htmlFor="text"
                                          style={{ margin: "8px" }}
                                        >
                                          {item.content}
                                        </label>
                                        <Handle
                                          type="source"
                                          position={Position.Right}
                                          id={item.id}
                                          key={item.id}
                                        />
                                      </div>
                                    </div>
                                  </>
                                );
                              }}
                            </Draggable>
                          </>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
        </DragDropContext>
        <button
          style={{ fontSize: "8px" }}
          onClick={() => {
            updateNodeInternals("E");
            //reactFlowInstance.setEdges(reactFlowInstance.getEdges());
            //setRefresh((old) => ++old);
            //updateNodeDimensions([{ id, nodeElement, forceUpdate: true }]);
            // updateNodeDimensions([{ "E", document.querySelector(`.react-flow__node[data-id="E"]`), forceUpdate: true }]);
          }}
        >
          Update Node Internals
        </button>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        // style={{
        //   background: "black",
        //   height: "0.1px",
        //   width: "0.1px",
        //   border: "none",
        // }}
      />
    </>
  );
}

export default BlockNode;
