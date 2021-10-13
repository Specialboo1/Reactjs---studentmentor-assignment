import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import { Field, Form, Formik } from 'formik';
import { useHistory } from 'react-router';
function Assign () {
    const [data,setdata] = useState([])
    const [loading,setloading] = useState(true);
    const history = useHistory();
    useEffect(async () => {
        try {
           let apidata = await axios.get("https://studentmentorassignment.herokuapp.com/");
           setdata([...apidata.data]);
           setloading(false);
        } catch (error) {
            console.log(error);
            setloading(false);
        }        
    }, [])

const handleSubmit = async (values) =>
{
    let id = []
    data.forEach((obj) => obj.name == values.mentorassigned && obj.category=='Mentor' ? id.push(obj._id):null)
    let studentassigned = values.studentassigned;
    let mentorassigned = values.mentorassigned;
    let _id = id[0]
    let studentid = [];
    if (studentassigned.length !== 0)
    {
          data.forEach((obj)=>{
            for(let i=0; i<studentassigned.length; i++)
            {
                if(obj.name == studentassigned[i] && obj.category == 'Student')
                {
                    studentid.push(obj._id)
                }
            }

          })
    }
    try {
        console.log(id[0], studentassigned)
        await axios.put(`https://studentmentorassignment.herokuapp.com/${_id}`,{studentassigned});
        setloading(true);
      } catch (error) {
        setloading(false)
        console.log(error);
      }  
      try {
        console.log(studentid)
        for(let i=0; i<studentid.length; i++)
        {
        await axios.put(`https://studentmentorassignment.herokuapp.com/${studentid[i]}`,{mentorassigned});
        setloading(true);
        }        
      } catch (error) {
        setloading(false)
        console.log(error);
      } 
      history.push("/");
    
}
    return (
        <>
        {
             loading ? <img src="https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif" className="img-responsive" alt="Oops" style={{maxHeight:"250px"}}/> :
             <Formik initialValues={{
               mentorassigned: '',
               studentassigned: [],       
              }}       
              onSubmit={async values => {
       
                handleSubmit(values);
       
              }}>
            {({ isSubmitting, getFieldProps, handleChange, handleBlur, values }) => (
             <Form>
             <label htmlFor="mentor">Select the Mentor</label>
             <Field as="select" name="mentorassigned" id ="mentorassigned" style={{"margin": "3%"}} >
             <option value="null" selected>Select the Mentor</option>
             {
                 data.map((obj)=>{
                    if (obj.category == 'Mentor')
                    {
                        return(<option value={obj.name}>{obj.name}</option>)
                    }
                 })
             }
             </Field>
             <div className="label">

                Students Without Mentors 

                </div>
               {
                 data.map((obj)=>{
                    if (obj.category == 'Student' && obj.mentorassigned == '')
                    {
                        return(<label style={{"padding-left":"5%", "margin":"2%"}}><Field type="checkbox" name="studentassigned" id ='studentassigned' value={obj.name} /> {obj.name} </label>)
                    }
                 })
             }
            

         

       

        <br/>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
                        Submit
            </button>
             </Form> )}
             </Formik>
           
        }
        </>
    )

}

export default Assign