import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    document.body.style.backgroundColor = "rgb(0, 140, 255)";
    const [cred, setCred] = useState({name:'' ,email:'', password:''});

    const navigate = useNavigate();

    const submitClicked = async (e)=> {
        e.preventDefault();
        
        const response = await fetch('http://localhost:5000/api/auth/createUser', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: cred.name, email: cred.email, password: cred.password})
        });
        
        let json = await response.json();
        if (response.status !== 200){
            console.log('status: 200');
            if (json.errorId === 1){
                alert('The email address already exists');
            }
        }
        else{
            localStorage.setItem('authToken', json.authToken);
            navigate('/');
        }
    }

    const formChangeHandle = (event)=> {
        setCred({...cred, [event.target.name]: event.target.value});
    }
  return <div className='sign-in-box'>
        <form className="my-5">
            <h3 className="text-center my-5">Sign Up</h3>

            <div className="form-group">
                <label>Name</label>
                <input name='name' onChange={formChangeHandle} className="form-control" placeholder="Enter your name" />
            </div>
            <div className="form-group my-4">
                <label>Email address</label>
                <input name='email' type="email" onChange={formChangeHandle} className="form-control" placeholder="Enter email" />
            </div>

            <div className="form-group my-4">
                <label>Password</label>
                <input name='password' type="password" onChange={formChangeHandle} className="form-control" placeholder="Enter password" />
            </div>

            <div className="text-center my-4"><button type="submit" className="btn btn-primary btn-block" onClick={submitClicked}>Submit</button></div>
            
        </form>
  </div>;
};

export default Signup;
