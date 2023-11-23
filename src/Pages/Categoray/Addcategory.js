import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, InputAdornment } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';

const Addcategory = (props) => {
 
  const [catInput, setcatInput] = useState({
    cat_name: '',
    cat_desc: '',
    status: '',
    created: '',
  });


  function handleSubmit(event) {
    event.preventDefault();

    axios({
      method: 'post',
      url: 'http://localhost:5000/category/addcat',
      data: catInput,
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then(function (response) {
        console.log(response);
        console.log('Added successfully');
        props.setIsAdding(false);
        // Reload the authors after adding
        axios
        .get('http://localhost:5000/category/catlist')
          .then((response) => {
            console.log(response.data);
            props.setCategories(response.data);
          })
          .catch(function (error) {
            console.error('Error fetching data:', error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  function cancleHandler() {
    props.setIsAdding(false);
  }

  return (
    <div id="content" style={{ padding: '20px', backgroundColor: 'rgb(237, 229, 229)', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '20px' }}>Category  </h2>
        <TextField
          id="cat_name"
          name="cat_name"
          label="Category Name"
          value={catInput.cat_name}
          onChange={(event) =>
            setcatInput({ ...catInput, cat_name: event.target.value })
          }
         
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CategoryIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          required
          id="cat_desc"
          name="cat_desc"
          label="Category Description"
          value={catInput.cat_desc}
          onChange={(event) =>
            setcatInput({ ...catInput, cat_desc: event.target.value })
          }
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        
        <TextField
          id="status"
          name="status"
          label="Status"
          value={catInput.status}
          onChange={(event) =>
            setcatInput({ ...catInput, status: event.target.value })
          }
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VisibilityIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          
          id="created"
          name="created"
          label="Date"
          type='date'
          value={catInput.created}
          onChange={(event) =>
            setcatInput({ ...catInput, created: event.target.value })
          }
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <Button variant="outlined" color="secondary" type="submit">
          Submit
        </Button>
        <Button variant="outlined" color="secondary" onClick={cancleHandler}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default Addcategory;
