import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { Node, Handle, Position } from "react-flow-renderer";
import InnerDragComponentLabel from "./InnerDragComponentLabel";
const els = [
  {
    id: "cn1",
    type: "customn1",
    data: { label: "C 1" },
    position: { x: -50, y: -30 },
  },
  {
    id: "cn2",
    type: "customn2",
    data: { label: "C 2" },
    position: { x: -50, y: -20 },
  },
  {
    id: "cn3",
    type: "customn3",
    data: { label: "C 3" },
    position: { x: -50, y: -10 },
  },
];

const InnerDragComponent = () => {
  const [blocks, setBlocks] = useState({
    [uuidv4()]: {
      name: "Message",
      items: els,
    },
  });

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

  return (
    <>
      <div className="text-updater-node" style={{ background: "yellow" }}>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, blocks, setBlocks)}
        >
          {Object.entries(blocks).map(([id, column]) => {
            console.log("column...");
            console.log(column);
            return (
              <>
                <div>
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
                                <Handle
                                  type="source"
                                  position={Position.Right}
                                  style={{ background: "green" }}
                                />
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
                                            width: "70%",
                                            height: "70%",
                                            cursor: "pointer",
                                            // background: snapshot.isDragging
                                            //   ? "#000"
                                            //   : "#fff",
                                          }}
                                        >
                                          <InnerDragComponentLabel
                                          //label={item.data.label}
                                          />
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
                </div>
              </>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
};

export default InnerDragComponent;
