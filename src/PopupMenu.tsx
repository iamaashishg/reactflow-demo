import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Handle, Position } from "react-flow-renderer";

export default function MenuPopupState() {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="text-updater-node">
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button variant="contained" {...bindTrigger(popupState)}>
                Test Node One
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>Duplicate</MenuItem>
                <MenuItem onClick={popupState.close}>Delete</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}
