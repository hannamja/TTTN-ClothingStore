import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';

export default function PaymentForm({ setIsPaid }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value == 1) setIsPaid(true)
    else setIsPaid(false)
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Chọn phương thức thanh toán</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value={0} control={<Radio />} label="COD" />
          <FormControlLabel value={1} control={<Radio />} label="CHUYỂN KHOẢN" />
        </RadioGroup>
      </FormControl>
      {
        value == 1 ? <div>
          <span style={{ fontWeight: "bolder" }}>Thông tin chuyển khoản</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, borderTop: '2px black solid' }}>
            <span style={{ fontWeight: "bolder" }}>Ngân hàng: Agribank</span>
            <span style={{ fontWeight: "bolder" }}>Số tài khoản: 123456789</span>
            <span>Chủ thẻ: Hukistore</span>
            <span>Nội dung nhắn: {`[Số điện thọai]+"Chuyển khoản thanh toán"`}</span>
          </div>
          <br></br>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, borderTop: '2px black solid' }}>
            <span style={{ fontWeight: "bolder" }}>Ngân hàng: TP Bank</span>
            <span style={{ fontWeight: "bolder" }}>Số tài khoản: 123456789</span>
            <span>Chủ thẻ: Hukistore</span>
            <span>Nội dung nhắn: {`[Số điện thọai]+"Chuyển khoản thanh toán"`}</span>
          </div>
          <br></br>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, borderTop: '2px black solid' }}>
            <span style={{ fontWeight: "bolder" }}>Momo: 0123456789</span>
            <span>Nội dung nhắn: {`[Số điện thọai]+"Chuyển khoản thanh toán"`}</span>
          </div>
          <br></br>
        </div> : <></>
      }
      <div>
        Chúng tôi sẽ liên hệ bạn theo số diện thoại để xác minh đơn.
      </div>
    </React.Fragment >
  );
}
