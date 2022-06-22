import { useState, useCallback } from "react";
import {
  Handle,
  Position,
  useUpdateNodeInternals,
  useReactFlow,
} from "react-flow-renderer";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import "./customNode.css";
import PopupState, { bindContextMenu, bindMenu } from "material-ui-popup-state";
import { PopupState as PState } from "material-ui-popup-state/core";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "./store";

interface Item {
  id: string;
  content: string;
}

function BlockNode({ id, data }: any) {
  const updateNodeInternals = useUpdateNodeInternals();
  const dispatch = useDispatch();
  const nodes = useSelector((state: AppState) => state.nodes);

  const onDelete = useCallback(() => {
    dispatch({ type: "DELETE_NODE" });
  }, [dispatch]);

  const onDuplicate = useCallback(
    (popupState: PState) => {
      dispatch({ type: "DUPLICATE_NODE" });
      popupState.close();
    },
    [dispatch]
  );
  // const reactFlowInstance = useReactFlow();

  // console.log("reactFlowInstance....");
  // console.log(reactFlowInstance.getNodes());
  // console.log(reactFlowInstance.getEdges());

  const [localKids, setLocalKids] = useState(data.kids);
  const [blockId] = useState(id);
  return (
    <>
      <Handle type="target" position={Position.Top} />

      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <>
            <div className="text-updater-node" {...bindContextMenu(popupState)}>
              <Droppable droppableId={blockId} key={blockId}>
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
                      {localKids.map((kid: Item, index: number) => {
                        // console.log("kid id : ", kid.id);
                        return (
                          <Draggable
                            key={kid.id}
                            draggableId={kid.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              // Restrict dragging to vertical axis
                              let transform = undefined;
                              if (
                                provided &&
                                provided.draggableProps &&
                                provided.draggableProps.style
                              )
                                transform =
                                  provided.draggableProps.style.transform;
                              if (snapshot.isDragging && transform) {
                                transform = transform.replace(/\(.+\,/, "(0,");
                              }
                              return (
                                <PopupState
                                  variant="popover"
                                  popupId="demo-popup-menu-child"
                                >
                                  {(popupStateChild) => (
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
                                        {...bindContextMenu(popupStateChild)}
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
                                      <Menu {...bindMenu(popupStateChild)}>
                                        <MenuItem
                                          onClick={() =>
                                            onDuplicate(popupStateChild)
                                          }
                                        >
                                          Duplicate
                                        </MenuItem>
                                        <MenuItem onClick={onDelete}>
                                          Delete
                                        </MenuItem>
                                      </Menu>
                                    </>
                                  )}
                                </PopupState>
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
            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={() => onDuplicate(popupState)}>
                Duplicate
              </MenuItem>
              <MenuItem onClick={onDelete}>Delete</MenuItem>
            </Menu>
          </>
        )}
      </PopupState>
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
