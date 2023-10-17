import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import HistoryList from '../HistoryList/HistoryList';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import './OrderBillList.scss';
import {
  Alert,
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from '@mui/material';
import useFetchAdmin from '../../hooks/useFetchAdmin';
import { useSelector } from 'react-redux';
import { CheckOutlined, DeliveryDiningOutlined } from '@mui/icons-material';
import { Button } from 'bootstrap';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  '&:last-child': {
    '.btns': {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      '.info': {
        display: 'flex',
        alignItems: 'center',
        color: 'lime',
        cursor: 'pointer',
      },
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type()': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Search = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  marginBottom: 10,
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));
const BackspaceIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '40ch',
        borderBottom: '1px solid black',
      },
    },
  },
}));

import { DataGrid } from '@mui/x-data-grid';
import { grey, red, yellow } from '@mui/material/colors';
const OrderBillList = () => {
  const [open, setOpen] = React.useState('');
  const [input, setInput] = useState('');
  const { data, loading, error } = useFetchAdmin(`/hoadon`);
  console.log('hoadon: ', data);
  // rows: Danh sách hóa đơn trong API

  const columns = [
    { field: 'makh', headerName: 'Mã khách hàng', width: 150 },
    {
      field: 'madon',
      headerName: 'Mã đơn',
    },
    {
      field: 'ngaydat',
      headerName: 'Ngày đặt',
      width: 200,
    },
    {
      field: 'trangthai',
      headerName: 'Trạng thái',
      width: 300,
      valueGetter: (params) => {
        const { trangthai } = params.row;
        let content;
        switch (trangthai) {
          case 1:
            content = 'Chưa thanh toán';
            break;
          case 2:
            content = 'Đã thanh toán';
            break;
          case 3:
            content = 'Đã duyệt';
            break;
          case 4:
            content = 'Đang giao';
            break;
          case 5:
            content = 'Đã giao';
            break;
          case 6:
            content = 'Đã hủy';
            break;
          default:
            content = 'Unknow';
        }
        return content;
      },
    },
    {
      field: 'hanhdong',
      headerName: 'Hành động',

      renderCell: (params) => {
        const onClick = (e) => {
          console.log('params: ', params);
          e.stopPropagation();

          const thisRow = {};
          thisRow.id = params.row.id;
          thisRow.madon = params.row.madon;

          setOpen(thisRow.madon);
        };
        return (
          <div className='btns' style={{color: 'green'}}>
            <div className='info' onClick={onClick}>
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
  console.log('shipperData: ', shipperData);

  const [message, setMessage] = useState('');
  const handleOpen = (e) => setOpen(e);
  const handleClose = (e) => setOpen(e);
  const handldeChange = (e) => {
    setInput(e);
  };

  const [openSuccess, setOpenSuccess] = React.useState(false);
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  const [openErr, setOpenErr] = React.useState(false);
  const handleCloseErr = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErr(false);
  };

  const handleConfirm = (hd) => {
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
    fetch('http://localhost:8081/api/hoadon/confirm', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
      body: JSON.stringify(hd),
    })
      .then((res) => res.json())
      .then((data) => {
        // FIXME: Sửa lại mã code
        if (data.errCode == 'BILL_COMPLETED_DELIVERING') {
          setMessage(data.message);
          setOpenSuccess(true);
        } else {
          setMessage(data.message);
          setOpenErr(true);
        }
        handleClose('');
        window.location.reload();
      });
  };
  const handleComplete = (hd) => {
    fetch('http://localhost:8081/api/hoadon/complete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
      body: JSON.stringify(hd),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errCode == 'BILL_COMPLETED_DELIVERING') {
          setMessage(data.message);
          setOpenSuccess(true);
        } else {
          setMessage(data.message);
          setOpenErr(true);
        }
        handleClose('');
        window.location.reload();
      });
  };
  const handleCancle = (hd) => {
    if (window.confirm('Bạn có muốn hủy hóa đơn có id: ' + hd.mahd + '?'))
      fetch('http://localhost:8081/api/hoadon/cancel', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.token,
        },
        body: JSON.stringify(hd),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.errCode == 'BILL_CANCELED_SUCCESS') {
            setMessage(data.message);
            setOpenSuccess(true);
            window.location.reload();
          } else {
            setMessage(data.message);
            setOpenErr(true);
          }
          handleClose('');
        });
    else return;
  };

  const handleProcessing = (hd) => {
    fetch('http://localhost:8081/api/hoadon/processing', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
      body: JSON.stringify(hd),
    })
      .then((res) => res.json())
      .then((data) => {
        // FIXME: Sửa lại khúc này
        setOpenSuccess(true);
        handleClose('');
        window.location.reload();
      });
  };

  return loading ? (
    'loading...'
  ) : (
    <div className='orderBillList'>
      {/* <Search>
        <SearchIconWrapper>
          <SearchIcon onClick={() => setInput('search')} />
        </SearchIconWrapper>

        <StyledInputBase
          placeholder='Search…'
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => {
            handldeChange(e.value);
          }}
          value={input}
        />
        <BackspaceIconWrapper
          onClick={() => {
            setInput('');
          }}
        >
          <BackspaceOutlinedIcon />
        </BackspaceIconWrapper>
      </Search> */}

      {/* Sửa lại UI Table */}

      <Box sx={{ height: 500, width: '95%', margin: '0 auto' }}>
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
      {data.map((row) => (
        <Modal
          open={open == row.mahd}
          onClose={() => handleClose('')}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='div'>
              <HistoryList data={row} type='admin' />
            </Typography>
            {row.chitietTrangThaiDTO.trangthai.matthd < 3 &&
            row.chitietTrangThaiDTO.trangthai.matthd !== 6 ? (
              <div
                style={{
                  display: 'flex',
                  gap: 5,
                  justifyContent: 'end',
                }}
              >
                <div className='shipper'>
                  <FormControl fullWidth>
                    <InputLabel id='add-clothes-brand-select-label'>
                      Chọn shipper
                    </InputLabel>
                    <Select
                      labelId='add-clothes-brand-select-label'
                      id='add-clothes-brand-select'
                      value={shipper}
                      label='Chọn thương hiệu'
                      onChange={(event) => {
                        setShipper(event.target.value);
                      }}
                    >
                      {shipperData.data.map((e, i) => {
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
                  style={{ color: 'lime' }}
                  onClick={() => handleConfirm(row)}
                />
                <ClearOutlinedIcon
                  style={{ color: 'red' }}
                  onClick={() => handleCancle(row)}
                />
              </div>
            ) : row.chitietTrangThaiDTO.trangthai.matthd === 4 ? (
              <div
                style={{
                  display: 'flex',
                  gap: 5,
                  justifyContent: 'end',
                  alignItems: 'center',
                }}
              >
                <CheckOutlined
                  color='success'
                  onClick={() => handleComplete(row)}
                />{' '}
                Xác nhận hoàn thành
              </div>
            ) : row.chitietTrangThaiDTO.trangthai.matthd === 3 ? (
              <div
                style={{
                  display: 'flex',
                  gap: 5,
                  justifyContent: 'end',
                  alignItems: 'center',
                }}
              >
                <DeliveryDiningOutlined
                  color='success'
                  onClick={() => handleProcessing(row)}
                />{' '}
                Xác nhận đang giao
              </div>
            ) : (
              <></>
            )}
          </Box>
        </Modal>
      ))}
      {/* End Sửa lại UI Table */}

      {/* <TableContainer component={Paper}>
        <Table aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Mã số khách hàng</StyledTableCell>
              <StyledTableCell align='center'>Mã đơn</StyledTableCell>
              <StyledTableCell align='right'>Ngày đặt</StyledTableCell>
              <StyledTableCell align='center'>Trạng thái duyệt</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.mahd}>
                <StyledTableCell align='center'>
                  {row.khachhang.makh}
                </StyledTableCell>
                <StyledTableCell component='th' scope='row'>
                  <Link className='link' to='/'>
                    {row.mahd}
                  </Link>
                </StyledTableCell>
                <StyledTableCell align='right'>{row.ngaytao}</StyledTableCell>
                <StyledTableCell align='right'>
                  <div className='btns'>
                    <div className='info' onClick={() => handleOpen(row.mahd)}>
                      <InfoOutlinedIcon />
                    </div>
                    <Modal
                      open={open == row.mahd}
                      onClose={() => handleClose('')}
                      aria-labelledby='modal-modal-title'
                      aria-describedby='modal-modal-description'
                    >
                      <Box sx={style}>
                        <Typography
                          id='modal-modal-title'
                          variant='h6'
                          component='div'
                        >
                          <HistoryList data={row} type='admin' />
                        </Typography>
                        {row.chitietTrangThaiDTO.trangthai.matthd < 3 &&
                        row.chitietTrangThaiDTO.trangthai.matthd !== 6 ? (
                          <div
                            style={{
                              display: 'flex',
                              gap: 5,
                              justifyContent: 'end',
                            }}
                          >
                            <div className='shipper'>
                              <FormControl fullWidth>
                                <InputLabel id='add-clothes-brand-select-label'>
                                  Chọn shipper
                                </InputLabel>
                                <Select
                                  labelId='add-clothes-brand-select-label'
                                  id='add-clothes-brand-select'
                                  value={shipper}
                                  label='Chọn thương hiệu'
                                  onChange={(event) => {
                                    setShipper(event.target.value);
                                  }}
                                >
                                  {shipperData.data.map((e, i) => {
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
                              style={{ color: 'lime' }}
                              onClick={() => handleConfirm(row)}
                            />
                            <ClearOutlinedIcon
                              style={{ color: 'red' }}
                              onClick={() => handleCancle(row)}
                            />
                          </div>
                        ) : row.chitietTrangThaiDTO.trangthai.matthd === 4 ? (
                          <div
                            style={{
                              display: 'flex',
                              gap: 5,
                              justifyContent: 'end',
                              alignItems: 'center',
                            }}
                          >
                            <CheckOutlined
                              color='success'
                              onClick={() => handleComplete(row)}
                            />{' '}
                            Xác nhận hoàn thành
                          </div>
                        ) : row.chitietTrangThaiDTO.trangthai.matthd === 3 ? (
                          <div
                            style={{
                              display: 'flex',
                              gap: 5,
                              justifyContent: 'end',
                              alignItems: 'center',
                            }}
                          >
                            <DeliveryDiningOutlined
                              color='success'
                              onClick={() => handleProcessing(row)}
                            />{' '}
                            Xác nhận đang giao
                          </div>
                        ) : (
                          <></>
                        )}
                      </Box>
                    </Modal>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity='success'
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>

      <Snackbar open={openErr} autoHideDuration={6000} onClose={handleCloseErr}>
        <Alert onClose={handleCloseErr} severity='error' sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default OrderBillList;
