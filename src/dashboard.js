import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
export default function Dashboard()
{
    const [data,setdata] = useState([])
    const [loading,setloading] = useState(true);
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

    return(
        <>
        <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Mentors and Students List</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
            {
                loading ? <img src="https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif" className="img-responsive" alt="Oops" style={{maxHeight:"250px"}}/> :
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>                            
                            <th className="text-center">Mentors</th>
                        </tr>
                    </thead>
                    { data.length !==0 ?
                    <tbody>
                       {
                         data.map((obj) =>{

                            if (obj.category == 'Mentor')
                            {                        
                           return(
                                <tr>
                                   <td >{obj.name}</td>
                                 </tr>) 
                            }
                         } )                       
                       }   
                    </tbody> : <tbody><tr>
                                   <td >No Mentors !!! Please Add One</td>
                                 </tr></tbody>
                    }
                </table>
                    }
                     {
                loading ? <img src="https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif" className="img-responsive" alt="Oops" style={{maxHeight:"250px"}}/> :
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>                            
                            <th className="text-center">Students</th>
                        </tr>
                    </thead>
                    { data.length !==0 ?
                    <tbody>
                       {
                         data.map((obj) =>{

                            if (obj.category == 'Student')
                            {                        
                           return(
                                <tr>
                                   <td >{obj.name}</td>
                                 </tr>) 
                            }
                         } )                       
                       }     
                    </tbody> : <tbody><tr>
                                   <td >No Students !!! Please Add One</td>
                                 </tr></tbody>
                    }
                </table>
                    }
            </div>
        </div>
    </div>
    </>
    )
}