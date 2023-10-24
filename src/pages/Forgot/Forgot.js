import { useState } from 'react';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Form from '../../utilities/Forms';
import { LockResetOutlined } from '@mui/icons-material';
import { validateEmail, validateNotNull } from '../../utilities/validation';
import { useFormik } from 'formik';
import useFetch from '../../hooks/useFetch';
import { Alert, Snackbar } from '@mui/material';
import NewPassword from './NewPassword/NewPassword';

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='http://localhost:3000'>
        Hukistore
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

let forgotAccountId;

const Forgot = () => {
  const [enableOTP, setEnableOTP] = useState(false);
  const [isTrueOTP, setIsTrueOTP] = useState(false);
  const [message, setMessage] = useState({ severity: '', message: '' });
  const [messageEnable, setMessageEnable] = useState(false);

  // validate email, otp
  const validateEmailAndOTP = values => {
    const returnErrors = {};
    validateNotNull(returnErrors, values.email, 'email');
    if (!returnErrors.email) {
      validateEmail(returnErrors, values.email);
    }
    if (enableOTP) {
      validateNotNull(returnErrors, values.otp, 'otp');
    }
    return returnErrors;
  };
  const formikForgotPassword = useFormik({
    initialValues: {
      email: '',
      otp: '',
    },
    onSubmit: async values => {
      console.log('onSubmit: ', values);
      if (!enableOTP) {
        const response = await fetch(
          `http://localhost:8081/api/auth/check-email-exist?email=${values.email}&isCreateOTP=true`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('response: ', response);
        if (response.ok) {
          const accountId = await response.json();
          setMessageEnable(true);
          if (accountId) {
            forgotAccountId = accountId;
            setEnableOTP(true);
            setMessage({
              severity: 'info',
              message: 'Xin hãy điền OTP nhận từ email của bạn',
            });
            console.log('accountId: ', accountId);
          } else {
            setMessage({ severity: 'error', message: 'Email không tồn tại' });
          }
        } else {
          console.log('check-email-exist error');
        }
      } else {
        // Tồn tại email rồi
        const response = await fetch(
          `http://localhost:8081/api/auth/check-email-and-otp?email=${values.email}&otp=${values.otp}`
        );
        if (response.ok) {
          const isSuccessfull = await response.json();
          setMessageEnable(true);
          if (isSuccessfull) {
            setMessage({
              severity: 'success',
              message: 'Xác nhận đổi mật khẩu thành công',
            });
            setIsTrueOTP(true);
          } else {
            setMessage({ severity: 'error', message: 'Mã OTP không chính xác' });
          }
        }
      }
    },
    validate: validateEmailAndOTP,
  });
  

  return (
    <ThemeProvider theme={defaultTheme}>
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
          sx={{ width: '100%' }}
        >
          {message.message}
        </Alert>
      </Snackbar>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockResetOutlined />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Forgot
          </Typography>
          {!isTrueOTP ? (
<Box
            component='form'
            noValidate
            onSubmit={formikForgotPassword.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={
                    formikForgotPassword.errors.email &&
                    formikForgotPassword.touched.email
                  }
                  required
                  fullWidth
                  type='email'
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  helperText={
                    formikForgotPassword.errors.email &&
                    formikForgotPassword.touched.email
                      ? formikForgotPassword.errors.email
                      : ''
                  }
                  {...formikForgotPassword.getFieldProps('email')}
                />
              </Grid>
              {enableOTP && (
                <Grid item xs={12}>
                  <TextField
                    error={
                      formikForgotPassword.errors.otp &&
                      formikForgotPassword.touched.otp
                    }
                    required
                    fullWidth
                    type='text'
                    id='otp'
                    label='Mã OTP'
                    name='otp'
                    helperText={
                      formikForgotPassword.errors.otp &&
                      formikForgotPassword.touched.otp
                        ? formikForgotPassword.errors.otp
                        : ''
                    }
                    {...formikForgotPassword.getFieldProps('otp')}
                  />
                </Grid>
              )}
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
          ): (
            <NewPassword forgotAccountId={forgotAccountId}/>
          )}
          
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Forgot;
