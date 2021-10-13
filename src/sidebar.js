import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar()
{
return(
<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
<a class="sidebar-brand d-flex align-items-center justify-content-center" href="#" style={{pointerEvents: 'none'}}>
    <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-graduation-cap"></i>
    </div>
    <div class="sidebar-brand-text mx-3"> Guvi </div>
</a>
<hr class="sidebar-divider my-0"/>
<li class="nav-item active">
    <Link class="nav-link" to="/">
        <i class="fas fa-chalkboard"></i>
        <span>Dashboard</span></Link>
</li>
<hr class="sidebar-divider my-0"/>
<li class="nav-item active">
    <Link class="nav-link" to="/createstudent">
        <i class="far fa-user"></i>
        <span>Create Student</span></Link>
</li>
<li class="nav-item active">
    <Link class="nav-link" to="/creatementor">
        <i class="fas fa-chalkboard-teacher"></i>
        <span>Create Mentor</span></Link>
</li>
<hr class="sidebar-divider my-0"/>
<li class="nav-item active">
    <Link class="nav-link" to="/assign">
        <i class="fas fa-user-plus"></i>
        <span>Assign Mentor</span></Link>
</li>
<li class="nav-item active">
    <Link class="nav-link" to="/changementor">
        <i class="fas fa-user-edit"></i>
        <span>Change Mentor</span></Link>
</li>
<hr class="sidebar-divider d-none d-md-block"/>
<div class="sidebar-card d-none d-lg-flex">
    <button class="btn btn-success btn-sm btn-disabled" href="#" style={{cursor: "default", pointerEvents: 'none'}}>Beacome a Pro with Guvi !</button>
</div> 
</ul>)
}