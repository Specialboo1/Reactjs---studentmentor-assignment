import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useFormik } from 'formik';

function Creatementor() {
    const[loading,setloading] = useState(false);   
    const history = useHistory();
    
    const formik = useFormik({
      initialValues : {
          name : '',
      },
      validate : (values) => 
      {
        const errors = {};
        if(!values.name){
          errors.name = "Required"
        }
      return errors;
      },
      onSubmit : async(values) => {
        let name = values.name;
        let category = 'Mentor';
        let studentassigned = [];
        try {
          await axios.post("https://studentmentorassignment.herokuapp.com/",{name, category, studentassigned});
          setloading(true);
        } catch (error) {
          setloading(false)
          console.log(error);
        }  
        history.push("/");
      }
    })

return (
    <>
<form onSubmit={formik.handleSubmit}>
  <div className='row'>
  <div class="col-auto mt-2">
    <label >Name</label>
    <input type='text' name='name' className='form-control' value={formik.values.name} onChange={formik.handleChange}/>
   {
      formik.errors.name ? <span style={{color:'red'}}>{formik.errors.name}</span> : null
   }
  </div>
  <div class="row mt-3" >
  <input type="submit" class="btn-sm btn-primary ms-3" style={{"width":"25%"}} disabled={loading}/>
  </div>
  </div>
  </form> 
  </>
    )
}

export default Creatementor
