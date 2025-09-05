import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import './FloatingMenu.css';

// TODO
// import EditIcon from '@mui/icons-material/Edit';
// import { CompareArrows } from '@mui/icons-material';

interface FloatingMenuProps { 
  children: React.ReactNode, 
  onDelete: (mousePosition: [number, number]) => void, 
  onInfo: (mousePosition: [number, number]) => void,
  onCompare?: (mousePosition: [number, number]) => void,
  onEditStartDate?: (mousePosition: [number, number]) => void
}

export default function FloatingMenu({
  children, 
  onDelete, 
  onInfo, 
  onCompare,
  onEditStartDate
}: FloatingMenuProps) {
  const [floatingMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleFloatingMenu = (event: React.MouseEvent) => {
    event.preventDefault();

    setContextMenu(
      floatingMenu === null
        ? {
          mouseX: event.clientX + 2,
          mouseY: event.clientY - 6,
        }
        : null,
    );

    // Prevent text selection lost after opening the context menu on Safari and Firefox
    const selection = document.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      setTimeout(() => {
        selection.addRange(range);
      });
    }
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleDelete = () => {
    handleClose?.();
    onDelete?.([floatingMenu?.mouseX || 0, floatingMenu?.mouseY || 0]);
  };

  const handleInfo = () => {
    handleClose?.();
    onInfo?.([floatingMenu?.mouseX || 0, floatingMenu?.mouseY || 0]);
  };

  return (
    <div className="context-menu-container" onClick={handleFloatingMenu}>
      {children}
      <Menu
        open={floatingMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          floatingMenu !== null
            ? { top: floatingMenu.mouseY, left: floatingMenu.mouseX }
            : undefined
        }
      >
        <MenuItem className="context-menu-item" onClick={handleInfo}>
          <InfoIcon className="context-menu-item-icon" />
          <div className="context-menu-item-text">
            Info
          </div>
        </MenuItem>
        {/* TODO 
          <MenuItem className="context-menu-item" onClick={handleCompare}>
          <CompareArrows className="context-menu-item-icon" />
          <div className="context-menu-item-text">
            Compare
          </div>
        </MenuItem> 
        <MenuItem className="context-menu-item" onClick={handleEditStartDate}>
          <EditIcon className="context-menu-item-icon" />
          <div className="context-menu-item-text">
            Edit start date
          </div>
        </MenuItem> */}
        <MenuItem className="context-menu-item" onClick={handleDelete}>
          <DeleteIcon className="context-menu-item-icon" />
          <div className="context-menu-item-text">
            Delete
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
