import { useState } from "react";
import {
  Handle,
  Position,
  useUpdateNodeInternals,
  useReactFlow,
} from "react-flow-renderer";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import "./customNode.css";

interface Item {
  id: string;
  content: string;
}

function BlockNode({ id, data }: any) {
  const updateNodeInternals = useUpdateNodeInternals();
  // const reactFlowInstance = useReactFlow();

  // console.log("reactFlowInstance....");
  // console.log(reactFlowInstance.getNodes());
  // console.log(reactFlowInstance.getEdges());

  const [localKids, setLocalKids] = useState(data.kids);
  const [blockId] = useState(id);
  return (
    <>
      <Handle type="target" position={Position.Top} />

      <div className="text-updater-node">
        <Droppable droppableId={blockId} key={blockId}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? "lightgrey" : "white",
                }}
              >
                {localKids.map((kid: Item, index: number) => {
                  // console.log("kid id : ", kid.id);
                  return (
                    <Draggable key={kid.id} draggableId={kid.id} index={index}>
                      {(provided, snapshot) => {
                        // Restrict dragging to vertical axis
                        let transform = undefined;
                        if (
                          provided &&
                          provided.draggableProps &&
                          provided.draggableProps.style
                        )
                          transform = provided.draggableProps.style.transform;
                        if (snapshot.isDragging && transform) {
                          transform = transform.replace(/\(.+\,/, "(0,");
                        }
                        return (
                          <>
                            <div
                              {...provided.draggableProps}
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
                                //transform,
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
                                  {...provided.dragHandleProps}
                                >
                                  {kid.content}
                                </label>
                                <Handle
                                  type="source"
                                  position={Position.Right}
                                  id={kid.id}
                                  key={kid.id}
                                />
                              </div>
                            </div>
                          </>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        <button
          style={{ fontSize: "8px" }}
          onClick={() => {
            updateNodeInternals("E");
            //reactFlowInstance.setEdges(reactFlowInstance.getEdges());
            //updateNodeDimensions([{ id, nodeElement, forceUpdate: true }]);
            // updateNodeDimensions([{ "E", document.querySelector(`.react-flow__node[data-id="E"]`), forceUpdate: true }]);
          }}
        >
          Update Node Internals
        </button>
      </div>
      <Handle
        id="e-source"
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
