import React, { useState, useCallback, useEffect, useRef } from "react";
import { Handle, Position, useUpdateNodeInternals } from "react-flow-renderer";
import { Droppable, Draggable } from "react-beautiful-dnd";
// import { v4 as uuidv4 } from "uuid";
import "./customNode.css";
import PopupState, {
  bindContextMenu,
  bindMenu,
  bindPopover,
  bindTrigger,
} from "material-ui-popup-state";
import { PopupState as PState } from "material-ui-popup-state/core";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "./store";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { CardHeader, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import EditableTextField from "./EditableField";

interface Item {
  id: string;
  content: string;
}

function BlockNode({ id, data }: any) {
  const updateNodeInternals = useUpdateNodeInternals();
  const dispatch = useDispatch();

  const onActionButtonClick = () => {
    console.log("on Action click");
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const cardContent = () => {
    return (
      <>
        <CardContent style={{ paddingTop: "0px" }}>
          <Typography variant="h5" component="div">
            Header
          </Typography>
          <Typography
            sx={{ fontSize: 14, mb: 1.5 }}
            color="text.secondary"
            gutterBottom
          >
            Subheader
          </Typography>
          <Typography variant="body2">content goes here...</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => onActionButtonClick()}>
            Action Button
          </Button>
        </CardActions>
      </>
    );
  };

  const card = (popState: PState) => {
    return (
      <React.Fragment>
        <CardHeader
          action={
            <IconButton
              aria-label="open modal"
              onClick={() => {
                popState.close();
                handleOpen();
              }}
            >
              <MoreVertIcon />
            </IconButton>
          }
          style={{ paddingBottom: "0px" }}
        />
        {cardContent()}
      </React.Fragment>
    );
  };

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

  const onDeleteChild = useCallback(
    (id: string) => {
      dispatch({ type: "DELETE_NODE", payload: { id } });
    },
    [dispatch]
  );

  const onDuplicateChild = useCallback(
    (popupState: PState, id: string) => {
      dispatch({ type: "DUPLICATE_NODE", payload: { id } });
      popupState.close();
    },
    [dispatch]
  );

  // const reactFlowInstance = useReactFlow();

  // console.log("reactFlowInstance....");
  // console.log(reactFlowInstance.getNodes());
  // console.log(reactFlowInstance.getEdges());

  const [localKids, setLocalKids] = useState(data.kids);
  const [showMenu, setShowMenu] = useState(true);
  const [blockId] = useState(id);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onContextClickChild = (e: any) => {
    e.stopPropagation();
    setShowMenu(false);
  };

  const onContextClickParent = () => {
    setShowMenu(true);
  };

  useEffect(() => {
    setLocalKids(data.kids);
  }, [data.kids]);

  return (
    <>
      <Handle type="target" position={Position.Top} />

      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <div onContextMenu={onContextClickParent}>
            <div className="text-updater-node" {...bindContextMenu(popupState)}>
              <EditableTextField value="Block Title" />
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
                            {(provided, snapshot, n) => {
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
                                    <div onContextMenu={onContextClickChild}>
                                      <PopupState
                                        variant="popover"
                                        popupId="demo-popup-popover"
                                      >
                                        {(popupStatePop) => (
                                          <>
                                            <div
                                              {...provided.draggableProps}
                                              ref={(el: HTMLDivElement) => {
                                                provided.innerRef(el);
                                                //setDraggableRefs(el);
                                                if (el && snapshot.isDragging) {
                                                  const pos =
                                                    el.getBoundingClientRect();
                                                  localStorage.setItem(
                                                    "lastDraggedChildPosX",
                                                    pos.x.toString()
                                                  );
                                                  localStorage.setItem(
                                                    "lastDraggedChildPosY",
                                                    pos.y.toString()
                                                  );
                                                }
                                              }}
                                              className="nodrag"
                                              style={{
                                                ...provided.draggableProps
                                                  .style,
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
                                              {...bindContextMenu(
                                                popupStateChild
                                              )}
                                              {...bindTrigger(popupStatePop)}
                                            >
                                              <div
                                                ref={(el: HTMLDivElement) => {
                                                  //setDraggableRefs(el);
                                                }}
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
                                            <Menu
                                              {...bindMenu(popupStateChild)}
                                            >
                                              <MenuItem
                                                onClick={() =>
                                                  onDuplicateChild(
                                                    popupStateChild,
                                                    kid.id
                                                  )
                                                }
                                              >
                                                Duplicate
                                              </MenuItem>
                                              <MenuItem
                                                onClick={() =>
                                                  onDeleteChild(kid.id)
                                                }
                                              >
                                                Delete
                                              </MenuItem>
                                            </Menu>
                                            <Popover
                                              {...bindPopover(popupStatePop)}
                                              anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "left",
                                              }}
                                              transformOrigin={{
                                                vertical: "top",
                                                horizontal: "center",
                                              }}
                                            >
                                              <Card
                                                variant="outlined"
                                                style={{ margin: "0px" }}
                                              >
                                                {card(popupStatePop)}
                                              </Card>
                                            </Popover>
                                          </>
                                        )}
                                      </PopupState>
                                    </div>
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
            <Menu
              {...bindMenu(popupState)}
              open={showMenu && popupState.isOpen}
            >
              <MenuItem onClick={() => onDuplicate(popupState)}>
                Duplicate
              </MenuItem>
              <MenuItem onClick={onDelete}>Delete</MenuItem>
            </Menu>
          </div>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}> {cardContent()}</Box>
      </Modal>
    </>
  );
}

export default BlockNode;
