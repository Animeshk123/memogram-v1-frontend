import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../comps/Navbar';
import Grid from '../comps/Grid';
import { getUser } from '../logic/Get';
import { useNavigate } from 'react-router-dom';
import uploadFile from '../config/Upload';
import { showLoader } from '../logic/logic';


const User = (props) => {
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const [file, setFile] = useState(null);
    const [profile, setProfile] = useState("/media/default.jpg");
    const history = useNavigate();

    const getImages = async (id) => {
        let responseImage = await fetch(`${process.env.REACT_APP_URL}/api/v1/user/image?id=${id}`);
        let jsonImage = await responseImage.json();
        setData(jsonImage.data);
    }

    const handleChangeFile = (e) => {
        setFile(e.target.files[0]);
        if (e.target.files[0] == null) {
            props.notification("please Select A file", { appearance: "error", autoDismiss: true, autoDismissTimeout: 4000 });
            return;
        }
        props.setLoader(20);
        uploadFile(e.target.files[0], setFile, async (response) => {
            if (response.status) {
                setFile(null);
                let obj = {
                    id: localStorage.getItem("id"),
                    imageUrl: response.url
                }
                const server = await fetch(`${process.env.REACT_APP_URL}/api/v1/upload`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                    body: JSON.stringify(obj)
                })
                props.setLoader(70);
                const res = await server.json();
                props.setLoader(100);
                getImages(localStorage.getItem('id'));

            }
            else {
                props.notification(response.message, { appearance: "error", autoDismautoDismissTimeout: 4000 });
            }
        })

    }

    useEffect(() => {
        getUser(setUser,setProfile);
        getImages(localStorage.getItem("id"));
        showLoader(props.setLoader);

    }, [])

    const logout = () => {
        localStorage.removeItem("id");
        history('/');
    }

    return (
        <>
            <Navbar url={profile} />
            <UserCard>
                <div className="container">
                    <div className='wrapper'>
                        <div className='rowOne'>
                            <img src={profile} alt='user' />
                            <div>
                                <h2>{user.userName}</h2>
                                <p>{user.userEmail}</p>
                            </div>
                        </div>
                        <button type='button' onClick={logout}>Log out</button>
                    </div>
                </div>
            </UserCard>
            <div className='container'>
                <NewWrapper>
                    <p>My Posts</p>
                    <div>
                        <label htmlFor="new"><i className="fas fa-file-upload"></i> New Posts</label>
                        <input type="file" id="new" accept='image/*' onChange={handleChangeFile} />
                    </div>
                </NewWrapper>
            </div>
            <Grid data={data} />
        </>
    )
}



const UserCard = styled.div`
 width:100%;
 height:auto;
 margin-top:2.1rem;
 margin-bottom:4rem;
 .container{
  .wrapper{
     width:100%;
     height:auto;
     display:flex;
     align-items:center;
     justify-content:space-between;
     @media screen and (max-width:800px){
         flex-direction:column;
     }
     .rowOne{
         display:flex;
         align-items:center;
          @media screen and (max-width:800px){
             width:100%;
             flex-direction:column;
             justify-content:center;
             text-align:center;
          }
         img{
             width:150px;
             height:150px;
             border-radius:50%;
             object-fit:cover;
             margin-right:2rem;
           @media screen and (max-width:800px){
         margin-right:0!important;
     }
         }
         div{
             @media screen and (max-width:800px){
                 text-align:center;
                 margin-top:1.5rem;
             }
         }
         h2{
             color:white;
         }
         p{
             margin-top:0.5rem;
             color:rgba(255,255,255,0.8);
         }
     }
     button{
         padding:0.8rem 1rem;
         border:none;
         outline:none;
         font-weight:bold;
         border-radius:5px;
         cursor:pointer;
         background:rgba(255,255,255,0.8);
         &:hover{
             background:white;
         }
         @media screen and (max-width:800px){
             margin-top:2rem;
         }
     }
 }
}
`;


const NewWrapper = styled.div`
  width:100%;
  height:auto;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding-bottom:1.5rem;
  border-bottom:2px solid white;
  p{
      color:white;
      font-weight:bold;
      font-size:1.2rem;
  }
  div{
      input{
          display:none;
      }
      label{
          padding:0.7rem 1rem;
          border-radius:5px;
          background:white;
          cursor:pointer;
          i{
              margin-right:0.4rem;
          }
      }
  }
`;

export default User
