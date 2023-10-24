import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  Snackbar,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';

import React, { useState } from 'react';
import { validatePassword } from '../../../utilities/validation';
import { useNavigate } from 'react-router-dom';

const NewPassword = props => {
  const { forgotAccountId } = props;
  const [message, setMessage] = useState({ severity: '', message: '' });
  const [messageEnable, setMessageEnable] = useState(false);
  const navigate = useNavigate();
  const formikNewPassword = useFormik({
    initialValues: {
      newPassword: '',
      reTypePassword: '',
    },
    onSubmit: async values => {
      const response = await fetch(
        `http://localhost:8081/api/auth/change-password-no-old-password?accountId=${forgotAccountId}&newPassword=${values.newPassword}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      setMessageEnable(true);

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.error) {
          setMessage({ severity: 'error', message: responseData.error });
        } else {
          setMessage({
            severity: 'success',
            message:
              'Thay đổi mật khẩu thành công. Đang chuyển về giao diện đăng nhập',
          });

          setTimeout(() => {
            navigate('/', {replace: true});
          }, 3000);
        }
      } else {
        setMessage({ severity: 'error', message: 'Request không thành công.' });
      }
    },
    validate: values => {
      // { newPassword?: string; reTypePassword?: string }
      const errors = {};

      if (!values.newPassword) {
        errors.newPassword = 'Mật khẩu không được để trống';
        return errors;
      }
      validatePassword(errors, values.newPassword, 'newPassword');

      if (!values.reTypePassword) {
        errors.reTypePassword = 'Mật khẩu nhập lại không được để trống';
        return errors;
      }
      if (values.newPassword && values.reTypePassword) {
        if (values.newPassword !== values.reTypePassword) {
          errors.reTypePassword = 'Mật khẩu nhập lại không chính xác';
        }
      }
      return errors;
    },
  });
  return (
    <>
      <Snackbar
        open={messageEnable}
        autoHideDuration={4000}
        onClose={() => setMessageEnable(false)}
        message={message.message}
        severity={message.severity}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setMessageEnable(false)}
          severity={message.severity}
          sx={{ width: '95%' }}
        >
        {message.message + '...  '} {message.severity === 'success' && <CircularProgress size={20}/>}
        </Alert>
      </Snackbar>
      <Box
        component='form'
        noValidate
        onSubmit={formikNewPassword.handleSubmit}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              error={
                formikNewPassword.errors.newPassword &&
                formikNewPassword.touched.newPassword
              }
              required
              fullWidth
              type='password'
              id='newPassword'
              label='Mật khẩu mới'
              name='newPassword'
              helperText={
                formikNewPassword.errors.newPassword &&
                formikNewPassword.touched.newPassword
                  ? formikNewPassword.errors.newPassword
                  : ''
              }
              {...formikNewPassword.getFieldProps('newPassword')}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              error={
                formikNewPassword.errors.reTypePassword &&
                formikNewPassword.touched.reTypePassword
              }
              required
              fullWidth
              type='password'
              id='reTypePassword'
              label='Nhập lại mật khẩu mới'
              name='reTypePassword'
              helperText={
                formikNewPassword.errors.reTypePassword &&
                formikNewPassword.touched.reTypePassword
                  ? formikNewPassword.errors.reTypePassword
                  : ''
              }
              {...formikNewPassword.getFieldProps('reTypePassword')}
            />
          </Grid>
        </Grid>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Reset
        </Button>
        <Grid container justifyContent='center'>
          <Grid item>
            <Link href='../signin' variant='body2'>
              Remember password? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default NewPassword;
