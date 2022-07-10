import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <>
            <Header>
                <div className='container'>
                    <nav>

                        <div className='logo'>
                            <NavLink to="/">
                                <a>MemoGram</a>
                            </NavLink>
                        </div>
                        <NavLink to="/user">
                            <div className='user'>
                                <img src={props.url} />
                            </div>
                        </NavLink>
                    </nav>
                </div>
            </Header>
        </>
    )
}


const Header = styled.div`
 width:100%;
 height:auto;
 padding:0.7rem 0;
 background:#E0DDAA;
 box-shadow:0px 0px 15px 2px rgba(0,0,0,0.2);
 nav{
     height:100%;
     width:100%;
     display:flex;
     align-items:center;
     justify-content:space-between;
     .logo{
         padding:0.7rem 0;
         font-size:1.5rem;
         a{
            color:#141E27;
            text-decoration:none;
        }
     }
     .user{
         width:45px;
         height:45px;
         border-radius:50%;
         font-size:1.5rem;
         cursor:pointer;
        img{
            width:100%;
            height:100%;
            object-fit:cover;
            object-position:center;
            border-radius:50%;
            cursor:pointer;
            background-color:rgba(0,0,0,0.7);
        }
     }
 }

`;



export default Navbar;
