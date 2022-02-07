import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
// import loginImage from '../images/notebook background1.jpeg'

const Login = () => {
    // document.body.style.backgroundImage = `url('https://images.pexels.com/photos/733857/pexels-photo-733857.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')`
    // // document.body.style.backgroundImage = `url(${loginImage})`;
    // document.body.style.backgroundRepeat = "no-repeat";
    // document.body.style.backgroundSize = "cover";
    // document.body.style.minHeight = '100%';
    // document.body.style.margin = '0px';
    // document.body.style.width = '100%';
    const [cred, setCred] = useState({email:'', password:''});
    let navigate = useNavigate();

    const formChangeHandle = (event)=> {
        setCred({...cred, [event.target.name]: event.target.value});
    }

    const submitClicked = async(e) => {
        e.preventDefault();
        let response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers:{
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: cred.email, password: cred.password})
        });

        let json = await response.json();
        localStorage.setItem('authToken', json.authToken);

        navigate('/');
    }
  return (
        <div>
        <form className="container my-5" style={{width: '500px'}}>
            <div className='sign-in-box' style={{textAlign:'center'}}>
            <h3 className="text-center my-5">Sign In</h3>

            <div className="form-group">
                <label>Email address</label>
                <input name='email' type="email" onChange={formChangeHandle} className="form-control cred-row" placeholder="Enter email" />
            </div>

            <div className="form-group my-4">
                <label>Password</label>
                <input name='password' type="password" onChange={formChangeHandle} className="form-control" placeholder="Enter password" />
            </div>

            <div className="text-center my-4"><button type="submit" className="btn btn-primary btn-block" onClick={submitClicked}>Submit</button></div>
            </div>
        </form>
        </div>
    );
};

export default Login;
