import React from 'react';
import './Authors.css';
import { TextField, Button, InputAdornment } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import axios from 'axios';

const AddAuthor = (props) => {
  let [authInput, setAuthInput] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });
  function handleSubmit(event) {
    // TODO: Handle form submission
    event.preventDefault();

    console.log(authInput);

    axios({
      method: 'post',
      url: `${process.env.APIBASEURL}/author/addauth`,
      data: authInput,
      headers: {
            token: localStorage.getItem('token')
      }
    })
    .then(function (response) {
      // handle success
      console.log(response)
      console.log('added successfully')
      props.setIsAdding(false)
      
  
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }
  function cancleHandler () {
    props.setIsAdding(false);
  }

  return (
    <div id="content" className="formstyle">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Author Add Form</h2>
        <TextField
          id="first_name"
          label="First Name"
          onChange={event => setAuthInput({...authInput, first_name: event.target.value})}
          InputProps={{
            startAdornment: <InputAdornment position="start"><AccountCircleIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          required
          id="last_name"
          label="Last Name" 
          onChange={event => setAuthInput({...authInput, last_name: event.target.value})}
          InputProps={{
            startAdornment: <InputAdornment position="start"><AccountCircleIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />
        <TextField
          id="email"
          label="Email" 
          onChange={event => setAuthInput({...authInput, email: event.target.value})}
          InputProps={{
            startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          required
          id="phone"
          label="Phone Number" 
          onChange={event => setAuthInput({...authInput, phone: event.target.value})}
          InputProps={{
            startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment>,
          }}
          fullWidth
          sx={{ mb: 3 }}
        />
        <Button variant="outlined" color="secondary" onClick={cancleHandler}>
          Cancle
        </Button>
        <Button variant="outlined" color="secondary" type="submit">
          Submit 
        </Button>
      </form>
    </div>
  );
};

export default AddAuthor;
