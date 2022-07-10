import React, { useState, useEffect } from 'react';
import Wrapper from '../styled/Wrapper';
import { NavLink, useNavigate } from 'react-router-dom';
import { onClickFileUpload, showLoader } from "../logic/logic";



const Register = (props) => {

    useEffect(() => {
        props.setLoader(100);
    }, []);

    const history = useNavigate();
    const [fileState, setFileState] = useState({ file: null, label: "Upload Profile Photo" });
    const [typeOne, setTypeOne] = useState({ type: 'password', icon: "fas fa-eye" });
    const [typeTwo, setTypeTwo] = useState({ type: 'password', icon: "fas fa-eye" });
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        cPassword: ""
    })

    // handleing File 
    const handleFile = (e) => {
        let targetFile = e.target.files;
        if (targetFile.length > 0) {
            setFileState({ file: targetFile[0], label: targetFile[0].name });
        }
        else {
            setFileState({ file: null, label: "Upload Profile Photo" });
        }
    }

    //show hiding password 
    const ShowPasswords = (state, setState) => {
        if (state.type == 'password') {
            setState({ type: 'text', icon: "fas fa-eye-slash" });
        }
        else {
            setState({ type: 'password', icon: "fas fa-eye" });
        }
    }

    // getting input value 
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    //submit form
    const handleSubmit = async () => {
        try {
            if (data.password != data.cPassword) {
                props.notification(`Passwords doesn't match`, { appearance: "error", autoDismiss: true, autoDismissTimeout: 300, autoDismissTimeout: 4000 });
                return;
            }
            else if (!(data.cPassword && data.password && data.email && data.name)) {
                props.notification(`Please Fill The form properly`, { appearance: "error", autoDismiss: true, autoDismissTimeout: 4000 });
                return;
            }
            else {
                onClickFileUpload(fileState, setFileState, props.notification, props.setLoader,async (url) => {
                    let obj = {
                        name: data.name,
                        email: data.email,
                        password: data.password,
                        profileUrl: url
                    }
                    props.setLoader(20);
                    const server = await fetch(`${process.env.REACT_APP_URL}/api/v1/register`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                        body: JSON.stringify(obj)
                    })
                    props.setLoader(40);
                    const res = await server.json();
                    props.setLoader(80);
                    if (res.regStatus) {
                        localStorage.setItem('id', res.user._id);
                        props.notification(res.message, { appearance: "success", autoDismiss: true, autoDismissTimeout: 4000 });
                        props.setLoader(100);
                        setTimeout(() => {
                            history('/');
                        }, 1000);
                    }
                    else {
                        props.notification(res.message, { appearance: "error", autoDismiss: true, autoDismissTimeout: 4000 });
                    }
                    setData({
                        name: "",
                        email: "",
                        password: "",
                        cPassword: ""
                    })

                })
            }
       props.setLoader(100);
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
                        <img src='/media/register.svg' alt='register' />
                    </div>
                    <div>
                        <h1>Register Here</h1>
                        <div className='input-wrapper'>
                            <input type='text' placeholder="UserName" value={data.name} name="name" onChange={handleChange} />
                        </div>
                        <div className='input-wrapper'>
                            <input type='email' placeholder="userEmail" value={data.email} name="email" onChange={handleChange} />
                        </div>
                        <div className='input-wrapper'>
                            <input type={typeTwo.type} placeholder="Password" value={data.password} name="password" onChange={handleChange} />
                            <button type='button' onClick={() => { ShowPasswords(typeTwo, setTypeTwo) }}>
                                <i className={typeTwo.icon}></i>
                            </button>
                        </div>
                        <div className='input-wrapper'>
                            <input type={typeOne.type} placeholder="Confirm Password" value={data.cPassword} name="cPassword" onChange={handleChange} />
                            <button type='button' onClick={() => { ShowPasswords(typeOne, setTypeOne) }}>
                                <i className={typeOne.icon}></i>
                            </button>
                        </div>
                        <div className='input-wrapper'>
                            <label htmlFor="fileUpload">
                                <i className="fas fa-file-upload"></i> {fileState.label}
                            </label>
                            <input type='file' id='fileUpload' accept='image/*' onChange={handleFile} />
                        </div>
                        <p className='link'>
                            Already Have an Account ? <NavLink to="/auth/login"><a>Click here</a></NavLink>
                        </p>
                        <button type='button' className='submit-button' onClick={handleSubmit}>Submit</button>
                    </div>
                </Wrapper>
            </div>
        </>
    )
}


export default Register;
