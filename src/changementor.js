import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import { Field, Form, Formik } from 'formik';
import { useHistory } from 'react-router';

function Changementor () {
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
    let studentassigned = values.studentassigned;
    let mentorassigned = values.mentorassigned;
    let id
    data.forEach((obj) => obj.name == values.mentorassigned && obj.category=='Mentor' ? id = (obj._id):null)
    let studentid = [];
    data.forEach((obj) => obj.name == values.studentassigned && obj.category=='Student' ? studentid = (obj._id):null)
    try {
        console.log(id, studentassigned)
        await axios.put(`https://studentmentorassignment.herokuapp.com/${id}`,{studentassigned});
        setloading(true);
      } catch (error) {
        setloading(false)
        console.log(error);
      }  
      try {      
        console.log(studentid, mentorassigned)  
        await axios.put(`https://studentmentorassignment.herokuapp.com/${studentid}`,{mentorassigned});
        setloading(true);              
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
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0" style={{'marginTop':'1%'}}>
            <thead>
                <tr>                            
                    <th className="text-center">Student</th>
                    <th className="text-center">Mentor</th>
                </tr>
            </thead> 
            <tbody>
                       {
                         data.map((obj) =>{

                            if (obj.category == 'Student')
                            {                        
                           return(
                                <tr className='text-center'>
                                   <td >{obj.name}</td>
                                  { obj.mentorassigned !== '' ? <td >{obj.mentorassigned}</td> :<td >Mentor Not Assigned</td>}
                                 </tr>) 
                            }
                         } )                       
                       }   
                    </tbody>
            
            </table>
        }
         {
             loading ? <img src="https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif" className="img-responsive" alt="Oops" style={{maxHeight:"250px"}}/> :
             <Formik initialValues={{
               mentorassigned: '',
               studentassigned: '',       
              }}       
              onSubmit={async values => {
       
                handleSubmit(values);
       
              }}>
            {({ isSubmitting, getFieldProps, handleChange, handleBlur, values }) => (
             <Form>
             
             <label htmlFor="student">Select the Student</label>
                <Field as="select" name="studentassigned" id ="studentassigned" style={{"margin": "3%"}} >
             <option value="null" selected>Select the Student</option>
             {
                 data.map((obj)=>{
                    if (obj.category == 'Student')
                    {
                        return(<option value={obj.name}>{obj.name}</option>)
                    }
                 })
             }
             </Field>
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
        <br/>
           <div className="text-center"><button type="submit" className="btn-primary my-auto" disabled={isSubmitting}>
                        Assign
            </button></div>
             </Form> )}
             </Formik>
           
        }
        </>
    )

}

export default Changementor