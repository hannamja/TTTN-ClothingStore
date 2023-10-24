import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import useFetch from "../../hooks/useFetch";

export default function DropDownPhanLoai() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { data, loading, error } = useFetch('/loaimh')
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    loading ? 'loading...' :
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Phân loại
          <KeyboardArrowDownIcon sx={{rotate: open ? "180deg" : "inherit"}} />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {
            data?.map((e, i) =>
              <MenuItem
                onClick={() => {
                  navigate(`/products/${e.maloaimh}`);
                  handleClose();
                }}
              >
                {e.tenloadimh}
              </MenuItem>
            )
          }
        </Menu>
      </div >
  );
}
