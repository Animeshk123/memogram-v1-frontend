import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Card = (props) => {
    const [profile, setProfile] = useState({});

    const getUser = async (setUser, id) => {
        let response = await fetch(`${process.env.REACT_APP_URL}/api/v1/user?id=${id}`);
        let data = await response.json();
        if (data.auth) {
            setUser(data.user);
        }
    }

    useEffect(() => {
        getUser(setProfile, props.id);
    }, []);


    return (
        <>
            <CardWrapper>
                <img src={props.imgUrl} alt="images" />
                <div className="card_overlay">
                    <div className="bar">
                        <div className="left">
                            <img src={profile.userProfile} />
                            <h3>{(localStorage.getItem("id") == props.id) ? "You" : profile.userName}</h3>
                        </div>
                        <a href={props.imgUrl} download={true}>
                            <i class="fas fa-arrow-down"></i>
                        </a>

                    </div>
                </div>
            </CardWrapper>
        </>
    )
}

const CardWrapper = styled.div`
 margin-bottom:1.2rem;
 break-inside:avoid;
 position:relative;
 cursor:pointer;
 transtion:0.2s ease;
 &>img{
     width:100%;
     object-fit:cover;
     object-position:center;
     
 }
 .card_overlay{
     position:absolute;
     top:0;
     right:0;
     bottom:0;
     left:0;
     background:rgba(0,0,0,0.7);
     opacity:0;
     display:flex;
     align-items:flex-end;
     .bar{
         width:100%;
         height:auto;
         padding:0.5rem 0.5rem;
         display:flex;
         align-items:center;
         justify-content:space-between;
         .left{
             display:flex;
             align-items:center;
             img{
                 width:30px;
                 height:30px;
                 border-radius:50%;
                 object-fit:cover;
             }
             h3{
                 color:white;
                 font-size:0.7rem;
                 margin-left:0.5rem;
                 font-weight:normal;
             }
         }
         a{
             text-decoration:none;
             color:white;
         }
     }
 }

 &:hover .card_overlay{
   opacity:1;
 }

`;


export default Card;