import { useCallback, memo, useState } from "react";

import { Handle, Position } from "react-flow-renderer";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import "./customNode.css";

const childItems = [
  { id: uuidv4(), content: "child node 1" },
  { id: uuidv4(), content: "child node 2" },
  { id: uuidv4(), content: "child node 3" },
];

const block = {
  [uuidv4()]: {
    name: "Message",
    items: childItems,
  },
};

function BlockNode() {
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
                                    >
                                      <div
                                        style={{
                                          margin: "8px",
                                        }}
                                        id="id1"
                                      >
                                        <label htmlFor="text">
                                          {item.content}
                                        </label>
                                        <Handle
                                          type="source"
                                          position={Position.Bottom}
                                          id="id1"
                                        />
                                      </div>
                                      {/* <Handle
                                        type="source"
                                        position={Position.Right}
                                        id="id1"
                                      /> */}
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
