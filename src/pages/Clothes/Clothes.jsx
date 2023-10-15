import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Autocomplete,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import "./Clothes.scss";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import useFetchAdmin from "../../hooks/useFetchAdmin";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { ClearOutlined } from "@mui/icons-material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ttOpt = [
  { tt: "0", ttName: "Có sẵn" },
  { tt: "1", ttName: "Không có sẵn" },
];

const initialErrors = {
  brand: "",
  cl: "",
  loai: "",
  name: "",
  price: "",
  tt: "",
  cachlam: "",
};

const Clothes = ({ type }) => {
  const { id } = useParams();
  const { data, loading } = useFetch(
    `${type === "add" ? `/mathang` : `/mathang/` + id}`
  );

  const clData = useFetchAdmin(`/chatlieu`);
  const brandData = useFetchAdmin(`/nhanhieu`);
  const typeData = useFetchAdmin(`/loaimh`);

  const [errors, setErrors] = useState(initialErrors);

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [cachlam, setCachlam] = useState("");

  const [tt, setTT] = useState(ttOpt[0]);

  const [sizeValue, setSizeValue] = React.useState(null);
  const [colorValue, setColorValue] = React.useState("");

  const [manh, setMamh] = useState();
  const [cl, setCl] = useState("none");
  const [brand, setBrand] = useState("none");
  const [loai, setLoai] = useState("none");
  const [pl, setPl] = useState(null);

  const [size, setSize] = useState("");
  const [sl, setSl] = useState(0);

  const [color, setColor] = React.useState("");

  const [url, setUrl] = useState("");

  const [ctmhRows, setCtmhRows] = React.useState([]);
  const [haRows, setHaRows] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const validate = () => {
    const errors = {};
    if (cl === undefined) {
      errors.cl = "Chưa chọn chất liệu!";
    }
    if (loai === undefined) {
      errors.loai = "Chưa chọn loại!";
    }
    if (brand === undefined) {
      errors.brand = "Chưa chọn thương hiệu!";
    }
    if (!name) {
      errors.name = "Tên không được để trống!";
    }
    if (tt == null) {
      errors.tt = "Chưa chọn trạng thái!";
    }
    if (!cachlam) {
      errors.cachlam = "Chưa chọn cách làm!";
    }
    if (!price) {
      errors.price = "Giá không được để trống!";
    } else if (parseFloat(price) < 0) {
      errors.price = "Giá không được nhỏ hơn 0";
    }
    return errors;
  };

  const handleAdd = () => {
    const returnErrors = validate();
    if (Object.keys(returnErrors).length > 0) {
      setErrors(returnErrors);
      alert("Vui lòng nhập đầy đủ thông tin!");
    } else {
      setErrors(initialErrors);
      const sp = {
        chatlieuDTO: cl,
        loaimhDTO: loai,
        nhanhieuDTO: brand,
        tenmh: name,
        mota: "KO",
        trangthai: tt.tt,
        cachlam: cachlam,
        phanloai: pl,
        gia: price,
        hinhanhDTOs: haRows,
        ctMathangs: ctmhRows,
      };
      console.log(sp);
      fetch("http://localhost:8081/api/mathang", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sp),
      })
        .then((res) => res.json())
        .then((data) => {
          setOpen(true);
          setName("");
          setCachlam(null);
          setTT(null);

          setPrice("");

          setCl(undefined);
          setBrand(undefined);
          setLoai(undefined);
          // ctmh
          setColor(null);
          setSize(null);
          setSl(0);
        });
    }
  };

  const handleMod = () => {
    if (
      cl === "" ||
      loai === "" ||
      brand === "" ||
      name === "" ||
      tt == null ||
      price == null
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const sp = {
      mamh: manh,
      chatlieuDTO: cl,
      loaimhDTO: loai,
      nhanhieuDTO: brand,
      tenmh: name,
      mota: "KO",
      trangthai: tt.tt,
      cachlam: cachlam,
      phanloai: pl,
      gia: price,
      hinhanhDTOs: haRows,
      ctMathangs: ctmhRows,
    };

    fetch("http://localhost:8081/api/mathang", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sp),
    })
      .then((res) => res.json())
      .then((data) => setOpen(true));
  };
  useEffect(() => {
    if (data) {
      setMamh(data.mamh);
      setLoai(data.loaimhDTO);
      setName(data.tenmh);
      setBrand(data.nhanhieuDTO);
      setCachlam(data.cachlam);
      setCl(data.chatlieuDTO);
      setTT(ttOpt[parseInt(data.trangthai)]);
      setPrice(data.gia);
      setPl(data.phanloai);
      if (type !== "add") {
        console.log(data.ctMathangs);
        setCtmhRows(data.ctMathangs);
        setHaRows(data.hinhanhDTOs);
      }
    }
  }, [loading]);

  const removeError = (fieldName) => {
    setErrors((e) => ({
      ...e,
      [fieldName]: "",
    }));
  };

  const handleDelCtmh = (i) => {
    const filtered = ctmhRows.filter(
      (item) => item.color !== i.color && item.size !== i.size
    );
    setCtmhRows(filtered);
  };
  const handleAddCtmh = (i) => {
    // console.log("handleAddCtmh", i);
    if (!i.color || !i.size || parseInt(i.currentNumbeer) < 0) {
      console.log("handleAddCtmh", "FAIL");
      return;
    }
    console.log("handleAddCtmh", "OK");
    let filtered = ctmhRows.filter(
      (item) => item.color === i.color && item.size === i.size
    );

    if (filtered.length > 0) {
      filtered[0].currentNumbeer =
        parseInt(filtered[0].currentNumbeer) + parseInt(i.currentNumbeer);
      setCtmhRows([
        ...ctmhRows.filter(
          (item) => item.color !== i.color && item.size !== i.size
        ),
        filtered[0],
      ]);
    } else {
      setCtmhRows([...ctmhRows, i]);
    }
  };
  return clData.loading || brandData.loading || typeData.loading ? (
    "loading..."
  ) : (
    <React.Fragment>
      <Grid
        container
        spacing={3}
        style={{ margin: "50px", alignItems: "center" }}
      >
        <Grid item xs={12} sm={12}>
          <img
            className="catImg"
            src="https://images.pexels.com/photos/6347533/pexels-photo-6347533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <h1>Thông tin quần áo</h1>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            error={!!errors.name}
            helperText={errors.name}
            required
            inputProps={{ maxLength: 100 }}
            id="firstName"
            name="name"
            label="Tên quần áo"
            fullWidth
            autoComplete="off"
            variant="standard"
            value={name}
            onChange={(e) => {
              removeError(e.target.name);
              setName(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="add-clothes-status-select-label">
              Trạng thái
            </InputLabel>
            <Select
              labelId="add-clothes-status-select-label"
              id="add-clothes-status-select"
              value={tt}
              name="tt"
              label="Trạng thái"
              onChange={(event) => {
                setTT(event.target.value);
                removeError(event.target.name);
              }}
            >
              {ttOpt.map((e, i) => {
                return (
                  <MenuItem key={i} value={e}>
                    {e.ttName}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText sx={{ color: "red" }}>{errors.tt}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={!!errors.price}
            helperText={errors.price}
            required
            id="address1"
            name="price"
            label="Giá"
            fullWidth
            autoComplete="off"
            variant="standard"
            type="number"
            value={price}
            onChange={(e) => {
              removeError(e.target.name);
              setPrice(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth sx={{ width: 300 }}>
            <InputLabel id="add-clothes-cach-lam-select-label">
              Chọn cách làm
            </InputLabel>
            <Select
              labelId="add-clothes-cach-lam-select-label"
              id="add-clothes-cach-lam-select"
              name="cachlam"
              value={cachlam}
              label="Chọn cách làm"
              onChange={(event) => {
                removeError(event.target.name);
                setCachlam(event.target.value);
              }}
            >
              {["HAND", "MACHINE"].map((e, i) => {
                return (
                  <MenuItem key={i} value={e}>
                    {e}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText sx={{ color: "red" }}>
              {errors.cachlam}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="add-clothes-brand-select-label">
              Chọn thương hiệu
            </InputLabel>
            <Select
              labelId="add-clothes-brand-select-label"
              id="add-clothes-brand-select"
              name="brand"
              value={brand}
              label="Chọn thương hiệu"
              onChange={(event) => {
                removeError(event.target.name);
                setBrand(event.target.value);
              }}
            >
              {brandData.data.map((e, i) => {
                return (
                  <MenuItem key={i} value={e}>
                    {e.tennh}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText sx={{ color: "red" }}>
              {errors.brand}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="add-clothes-type-select-label">
              Chọn loại
            </InputLabel>
            <Select
              labelId="add-clothes-type-select-label"
              id="add-clothes-type-select"
              name="loai"
              value={loai}
              label="Chọn loại"
              onChange={(event) => {
                setLoai(event.target.value);
                removeError(event.target.name);
              }}
            >
              {typeData.data.map((e, i) => {
                return (
                  <MenuItem key={i} value={e}>
                    {e.tenloadimh}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText sx={{ color: "red" }}>{errors.loai}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth>
            <InputLabel id="add-clothes-chat-lieu-select-label">
              Chọn chất liệu
            </InputLabel>
            <Select
              sx={{ width: 300 }}
              labelId="add-clothes-chat-lieu-select-label"
              id="add-clothes-chat-lieu-select"
              name="cl"
              value={cl}
              label="Chọn chất liệu"
              onChange={(event) => {
                setCl(event.target.value);
                removeError(event.target.name);
              }}
            >
              {clData.data.map((e, i) => {
                return (
                  <MenuItem key={i} value={e}>
                    {e.tenvai}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText sx={{ color: "red", width: "100%" }}>
              {errors.cl}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid container item xs={12} sm={6}>
          <h5>Chi tiết kích thước sản phẩm</h5>
          <TableContainer
            component={Paper}
            sx={{ height: 400, overflow: "scroll", marginTop: 1 }}
          >
            <Table aria-label="simple table">
              <TableHead
                sx={{ position: "sticky", top: 0, backgroundColor: "yellow" }}
              >
                <TableRow>
                  <TableCell>Màu sắc</TableCell>
                  <TableCell>Kích thước</TableCell>
                  <TableCell>Số lượng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ctmhRows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.color}</TableCell>
                    <TableCell>{row.size}</TableCell>
                    <TableCell>{row.currentNumbeer}</TableCell>
                    <TableCell>
                      <ClearOutlined
                        onClick={() => handleDelCtmh(row)}
                        sx={{ color: "red" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid item xs={12} sm={4}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              value={color}
              onChange={(event, newValue) => {
                setColor(newValue);
              }}
              inputValue={colorValue}
              onInputChange={(event, newInputValue) => {
                setColorValue(newInputValue);
              }}
              options={["BLUE", "YELLOW", "WHITE", "RED", "BLACK", "GRAY"]}
              sx={{ marginTop: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="Màu sắc" />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              value={size}
              onChange={(event, newValue) => {
                setSize(newValue);
              }}
              inputValue={sizeValue}
              onInputChange={(event, newInputValue) => {
                setSizeValue(newInputValue);
              }}
              options={["L", "S", "M", "XL", "XL", "XXL"]}
              sx={{ marginTop: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="Kích cỡ" />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              sx={{ marginTop: 1 }}
              value={sl}
              id="outlined-basic"
              label="Số lượng"
              variant="outlined"
              type="number"
              onChange={(e) => setSl(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              sx={{ marginTop: 1 }}
              variant="outlined"
              onClick={() => {
                handleAddCtmh({ color: color, size: size, currentNumbeer: sl });
                setColor(null);
                setSize(null);
                setSl(0);
              }}
            >
              Thêm chi tiết sản phẩm
            </Button>
          </Grid>
        </Grid>

        <Grid container item xs={12} sm={6}>
          <h5>Hình ảnh sản phẩm</h5>
          <TableContainer
            component={Paper}
            sx={{ height: 400, overflow: "scroll", marginTop: 1 }}
          >
            <Table aria-label="simple table">
              <TableHead
                sx={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "Highlight",
                }}
              >
                <TableRow>
                  <TableCell>Số thứ tự</TableCell>
                  <TableCell>Đường dẫn</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {haRows.map((row, idx) => (
                  <TableRow
                    key={idx}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{idx}</TableCell>
                    <TableCell>{row.duongdan}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {type === "detail" ? (
            <></>
          ) : (
            <>
              <Grid item xs={12} sm={5}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="URL"
                  fullWidth
                  autoComplete="off"
                  variant="outlined"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  sx={{ marginTop: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={7}></Grid>
              <Grid item xs={12}>
                <Button
                  disabled={url === "" ? true : false}
                  variant="outlined"
                  onClick={() => {
                    setHaRows([...haRows, { duongdan: url }]);
                    setUrl("");
                  }}
                  sx={{ marginTop: 1 }}
                >
                  Thêm đường dẫn
                </Button>
              </Grid>
            </>
          )}
        </Grid>
        {type === "detail" ? (
          <></>
        ) : (
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={
                type === "add"
                  ? () => {
                      handleAdd();
                    }
                  : handleMod
              }
            >
              Save
            </Button>
          </Grid>
        )}
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {type === "add"
            ? "Thêm quần áo thành công!"
            : "Sửa quần áo thành công!"}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default Clothes;
