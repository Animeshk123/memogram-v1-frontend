import React, { useState, useEffect } from 'react';
import Wrapper from '../styled/Wrapper';
import { NavLink, useNavigate } from 'react-router-dom';
import { showLoader } from '../logic/logic';


const Login = (props) => {

  useEffect(() => {
    showLoader(props.setLoader);
  }, []);

  const [type, setType] = useState({ type: 'password', icon: "fas fa-eye" });
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const history = useNavigate();

  const ShowPasswords = () => {
    if (type.type == 'password') {
      setType({ type: 'text', icon: "fas fa-eye-slash" });
    }
    else {
      setType({ type: 'password', icon: "fas fa-eye" });
    }
  }

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {
    try {
      if (!(data.password && data.email)) {
        props.notification(`Please Fill The form properly`, { appearance: "error", autoDismiss: true, autoDismissTimeout: 4000 });
        return;
      }
      else {
        props.setLoader(50);
        const server = await fetch(`${process.env.REACT_APP_URL}/api/v1/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ email: data.email, password: data.password })
        })
        props.setLoader(70);
        const res = await server.json();
        props.setLoader(100);
        if (res.loginStatus) {
          localStorage.setItem('id', res.user._id);
          props.notification(res.message, { appearance: "success", autoDismiss: true, autoDismissTimeout: 4000 });
          setTimeout(() => {
            history('/');
          }, 2000);
        }
        else {
          props.notification(res.message, { appearance: "error", autoDismiss: true, autoDismissTimeout: 4000 });
        }
        setData({
          email: "",
          password: ""

        })


      }
    }
    catch (err) {
      props.setLoader(100);
      props.notification(err.message, { appearance: "error", autoDismiss: true, autoDismissTimeout: 4000 });
    }

  }


  return (
    <>
      <div className='container'>
        <Wrapper>
          <div>
            <img src='/media/login.svg' alt='register' />
          </div>
          <div>
            <h1>Login Here</h1>
            <div className='input-wrapper'>
              <input type='email' placeholder="userEmail" name="email" value={data.email} onChange={handleChange} />
            </div>
            <div className='input-wrapper'>
              <input type={type.type} placeholder="Password" name="password" value={data.password} onChange={handleChange} />
              <button type='button' onClick={ShowPasswords}>
                <i className={type.icon}></i>
              </button>
            </div>
            <p className='link'>
              Don't Have an Account ? <NavLink to="/auth/register"><a>Click here</a></NavLink>
            </p>
            <button type='button' className='submit-button' onClick={handleSubmit}>Submit</button>
          </div>
        </Wrapper>
      </div>
    </>
  )
}

export default Login;