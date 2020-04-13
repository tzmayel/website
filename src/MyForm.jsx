import React, { useState } from 'react';
import axios from 'axios';
import { Grid, TextField, Button } from '@material-ui/core';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';

const MyForm = () => {
  const [state, setState] = useState({
    fullName: '',
    email: '',
    message: '',
  });

  const [submitSuccess, setSubmitSuccress] = useState(false);
  const [backendErrors, setBackendErrors] = useState('');
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    message: '',
  });

  const errorField = (name, value) => {
    // console.log('vliza v errorField. name=', name, ', value=', value);
    switch (name) {
      case 'fullName':
        if (value.length < 2) {
          return 'Minimum 2 characters';
        }
        if (value.length > 100) {
          return 'Too long!';
        }

        break;
      case 'email':
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          return 'Invalid email address';
        }
        if (value.length > 100) {
          return 'Too long!';
        }

        break;
      case 'message':
        if (value.length > 600) {
          return 'Too long!';
        }

        break;
      default:
        break;
    }

    return '';
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const errMsg = errorField(name, value);

    setErrors((oldState) => {
      return {
        ...oldState,
        [name]: errMsg,
      };
    });

    setState((oldState) => {
      const newObj = {
        ...oldState,
        [name]: value,
      };
      // console.log(newObj);
      return newObj;
    });
  };
  const validateForm = () => {
    let isErrors = false;
    const newObj = {};

    errors.keys.forEach((fieldName) => {
      const errorMsg = errorField(fieldName, state[fieldName]);
      // console.log('errorMsg=', errorMsg);
      if (!isErrors) {
        isErrors = errorMsg !== '';
      }
      newObj[fieldName] = errorMsg;
    });
    setErrors(newObj);

    return !isErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('submit');
    setBackendErrors('');

    // console.log('validateForm()', validateForm());

    if (!validateForm()) {
      setBackendErrors('Please fill the form correctly');
      return;
    }

    axios
      .post(`http://localhost:3001/api/subscribers`, {
        name: state.fullName,
        email: state.email,
        message: state.message,
        token,
      })
      .then(() => {
        // console.log(res);
        setSubmitSuccress(true);
      })
      .catch((e) => {
        setBackendErrors(`Error subscribing: ${e.response.data.msg}`);
      });
  };

  const thankYouMessage = <h1>Thank you for subscribing!</h1>;

  const subscribeForm = (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={4}
      style={{ padding: '20px' }}
    >
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <GoogleReCaptcha onVerify={(t) => setToken(t)} />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="E-mail address"
                variant="outlined"
                error={errors.email !== ''}
                name="email"
                onChange={handleChange}
                value={state.email}
                style={{ width: '100%' }}
                helperText={errors.email || ' '}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Your names"
                variant="outlined"
                error={errors.fullName !== ''}
                name="fullName"
                onChange={handleChange}
                value={state.fullName}
                style={{ width: '100%' }}
                helperText={errors.fullName || ' '}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Message (optional)"
                variant="outlined"
                error={errors.message !== ''}
                name="message"
                onChange={handleChange}
                value={state.message}
                style={{ width: '100%' }}
                helperText={errors.message || ' '}
                multiline
                rows={6}
              />
            </Grid>
            <Grid item xs={12}>
              <span style={{ fontSize: '18px', color: 'red' }}>
                {backendErrors}
              </span>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Subscribe
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );

  return <>{submitSuccess ? thankYouMessage : subscribeForm}</>;
};

export default MyForm;
