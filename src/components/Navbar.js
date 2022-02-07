import React, { useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {

    let location = useLocation();
    const navigate = useNavigate();

    const logoutClicked = () => {
        navigate('/login');
        localStorage.removeItem('authToken');
    }

    
  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" to="/">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-fill">
        <li className="nav-item">
          {localStorage.getItem('authToken') ? <Link className={`nav-link ${location.pathname==="/"?'active': ''}`} aria-current="page" to="/">My Notes</Link>
          : <Link className={`nav-link ${location.pathname==="/"?'active': ''}`} aria-current="page" to="/login">Home</Link>}
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">About</Link>
        </li>
      </ul>

      <div className="d-flex justify-content-end align-items-center flex-fill">
        {!localStorage.getItem('authToken') ? <div><Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign Up</Link></div>
        : <div className='d-flex' style={{width: '300px', flexDirection:'row-reverse', justifyContent:'space-around'}}>
        <Link className="btn btn-primary mx-1" to="/login" onClick={logoutClicked} role="button" style={{width:'28%'}}>Logout</Link>
        <button className="btn btn-outline-success mx-2" style={{width:'28%'}} type="submit">Search</button>
        <input className="form-control me-2" type="search" style={{width:'40%'}} placeholder="Search" aria-label="Search" style={{width:'20%', margin:'0px'}}/>
        </div>}
        </div>
    </div>
  </div>
</nav>

)};

export default Navbar;
