import React, { useState } from "react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HistoryList from "../HistoryList/HistoryList";
import Modal from "@mui/material/Modal";
import "./OrderBillList.scss";
import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import useFetchAdmin from "../../hooks/useFetchAdmin";
import { useSelector } from "react-redux";
import { CheckOutlined, DeliveryDiningOutlined } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

import { DataGrid } from "@mui/x-data-grid";

const initialMessage = {
  content: "",
  type: "",
};

const OrderBillList = () => {
  const [open, setOpen] = React.useState("");
  const [input, setInput] = useState("");
  const { data, loading, error } = useFetchAdmin(`/hoadon`);
  // rows: Danh sách hóa đơn trong API

  const columns = [
    { field: "makh", headerName: "Mã khách hàng", width: 150 },
    {
      field: "madon",
      headerName: "Mã đơn",
    },
    {
      field: "ngaydat",
      headerName: "Ngày đặt",
      width: 200,
    },
    {
      field: "trangthai",
      headerName: "Trạng thái",
      width: 300,
      valueGetter: (params) => {
        const { trangthai } = params.row;
        let content;
        switch (trangthai) {
          case 1:
            content = "Chưa thanh toán";
            break;
          case 2:
            content = "Đã thanh toán";
            break;
          case 3:
            content = "Đã duyệt";
            break;
          case 4:
            content = "Đang giao";
            break;
          case 5:
            content = "Đã giao";
            break;
          case 6:
            content = "Đã hủy";
            break;
          default:
            content = "Unknow";
        }
        return content;
      },
    },
    {
      field: "hanhdong",
      headerName: "Hành động",

      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();

          const thisRow = {};
          thisRow.id = params.row.id;
          thisRow.madon = params.row.madon;

          setOpen(thisRow.madon);
        };
        return (
          <div className="btns" style={{ color: "green" }}>
            <div className="info" onClick={onClick}>
              <InfoOutlinedIcon />
            </div>
          </div>
        );
      },
    },
  ];
  const rows = data?.map((item, index) => {
    return {
      id: index,
      makh: item.khachhang.makh,
      madon: item.mahd,
      ngaydat: item.ngaytao,
      trangthai: item.chitietTrangThaiDTO.trangthai.matthd,
    };
  });
  const user = useSelector((state) => state.user);

  const [shipper, setShipper] = useState(null);
  const shipperData = useFetchAdmin(`/shipper`);

  const [message, setMessage] = useState(initialMessage);
  const handleOpen = (e) => setOpen(e);
  const handleClose = (e) => setOpen(e);
  const handldeChange = (e) => {
    setInput(e);
  };

  const handleCloseMesssage = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage((m) => ({ ...m, content: "" }));
  };

  const handleConfirm = (hd) => {
    console.log(hd);
    if (!shipper) {
      setMessage({ content: "Chọn shipper!", type: "warning" });
      return;
    }
    hd.nhanvien = {
      cmnd: null,
      ngaysinh: null,
      sdt: null,
      tennv: null,
      diachi: null,
      gioitinh: null,
      manv: user.info.nhanvien.manv,
      trangthai: null,
      email: null,
    };
    hd.shipper = {
      mashipper: shipper.mashipper,
    };
    fetch("http://localhost:8081/api/hoadon/confirm", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
      body: JSON.stringify(hd),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errCode == "BILL_CONFIRMED_SUCCESS") {
          setMessage({ content: data.message, type: "success" });
        } else {
          setMessage({ content: data.message, type: "error" });
        }
        setTimeout(() => {
          handleClose("");
          window.location.reload();
        }, 2000);
      });
  };
  const handleComplete = (hd) => {
    fetch("http://localhost:8081/api/hoadon/complete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
      body: JSON.stringify(hd),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errCode == "BILL_COMPLETED_DELIVERING") {
          setMessage({ content: data.message, type: "success" });
        } else {
          setMessage({ content: data.message, type: "error" });
        }
        setTimeout(() => {
          handleClose("");
          window.location.reload();
        }, 2000);
      });
  };
  const handleCancle = (hd) => {
    if (window.confirm("Bạn có muốn hủy hóa đơn có id: " + hd.mahd + "?"))
      fetch("http://localhost:8081/api/hoadon/cancel", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: JSON.stringify(hd),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.errCode == "BILL_CANCELED_SUCCESS") {
            setMessage({ content: data.message, type: "success" });
            window.location.reload();
          } else {
            setMessage({ content: data.message, type: "error" });
          }
        setTimeout(() => {
          handleClose("");
          window.location.reload();
        }, 2000);
        });
    else return;
  };

  const handleProcessing = (hd) => {
    fetch("http://localhost:8081/api/hoadon/processing", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
      body: JSON.stringify(hd),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errCode == "BILL_PROCESSED_SUCCESS") {
          setMessage({content: data.message, type: "success"});
        } else {
          setMessage({content: data.message, type: 'error'});
        }
        setTimeout(() => {
          handleClose("");
          window.location.reload();
        }, 2000);
      });
  };

  return loading ? (
    "loading..."
  ) : (
    <div className="orderBillList">
      {/* Sửa lại UI Table */}

      <Box sx={{ height: 500, width: "95%", margin: "0 auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 7,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
      {data?.map((row) => (
        <Modal
          open={open == row.mahd}
          onClose={() => handleClose("")}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="div">
              <HistoryList data={row} type="admin" />
            </Typography>
            {row.chitietTrangThaiDTO.trangthai.matthd < 3 &&
              row.chitietTrangThaiDTO.trangthai.matthd !== 6 ? (
              <div
                style={{
                  display: "flex",
                  gap: 5,
                  justifyContent: "end",
                  alignItems: 'center',
                  marginTop: "10px"
                }}
              >
                <div className="shipper">
                  <FormControl fullWidth sx={{ minWidth: "150px" }}>
                    <InputLabel id="add-clothes-brand-select-label">
                      Chọn shipper
                    </InputLabel>
                    <Select
                      labelId="add-clothes-brand-select-label"
                      id="add-clothes-brand-select"
                      value={shipper}
                      label="Chọn shipper"
                      onChange={(event) => {
                        setShipper(event.target.value);
                      }}
                    >
                      {shipperData.data?.map((e, i) => {
                        return (
                          <MenuItem key={i} value={e}>
                            {e.tenshipper}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
                <CheckOutlined
                  style={{ color: "lime" }}
                  onClick={() => handleConfirm(row)}
                />
                <ClearOutlinedIcon
                  style={{ color: "red" }}
                  onClick={() => handleCancle(row)}
                />
              </div>
            ) : row.chitietTrangThaiDTO.trangthai.matthd === 4 ? (
              <div
                style={{
                  display: "flex",
                  gap: 5,
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <CheckOutlined
                  color="success"
                  onClick={() => handleComplete(row)}
                />{" "}
                Xác nhận hoàn thành
              </div>
            ) : row.chitietTrangThaiDTO.trangthai.matthd === 3 ? (
              <div
                style={{
                  display: "flex",
                  gap: 5,
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <DeliveryDiningOutlined
                  color="success"
                  onClick={() => handleProcessing(row)}
                />{" "}
                Xác nhận đang giao
              </div>
            ) : (
              <></>
            )}
          </Box>
        </Modal>
      ))}
      {/* End Sửa lại UI Table */}
      {/* Sửa message */}
      <Snackbar
        open={!!message.content}
        autoHideDuration={6000}
        onClose={handleCloseMesssage}
      >
        <Alert
          onClose={handleCloseMesssage}
          severity={message.type}
          sx={{ width: "100%" }}
        >
          {message.content}
        </Alert>
      </Snackbar>
      {/* End sửa message */}
    </div>
  );
};

export default OrderBillList;
