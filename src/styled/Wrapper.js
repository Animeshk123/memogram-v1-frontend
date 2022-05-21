import styled from 'styled-components';



const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    gap:4rem;
    @media screen and (max-width:600px){
        flex-direction: column!important;
    }
    
    div:first-child{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        img{
            width:80%;
            object-fit: contain;
        }
        @media screen and (max-width:800px){
          img{
              object-fit:cover;
          }
        }
    @media screen and (max-width:600px){
        justify-content: center!important;
        margin-top:4rem!important;
        img{
            display:none!important;
        }
    }
      
    }
    div:last-child{
        display:flex;
        flex-direction:column;
        justify-content: center;
        @media screen and (max-width:600px){
                  align-items:center!important;
            }
        h1{
            color:white;
            padding-bottom:1.4rem;
            @media screen and (max-width:600px){
                  font-size:2rem!important;
            }
        }
          .input-wrapper{
            margin-top:1.2rem;
            position:relative;
            input{
                border:none;
                outline:none;
                padding:0.8rem 1rem;
                border-radius:5px;
                width:50%;
                background-color:rgba(255,255,255,0.1);
                color:white;
                &::placeholder{
                    color:rgba(255,255,255,0.5);
                }
                @media screen and (max-width:600px){
                  width:80vw!important;
                  font-size:1.1rem!important;
            }
            @media screen and (max-width:800px){
                width:70%;
            }
            }
            input[type="file"]{
                display:none;
            }
            label{
                color:rgba(255,255,255,0.4);
                i{
                    margin-right:0.4rem;
                }
                cursor:pointer;
            }
            button{
                position:absolute;
                left:45%;
                top:50%;
                transform:translateY(-50%);
                background:transparent;
                border:none;
                outline:none;
                cursor:pointer;
                color:rgba(255,255,255,0.6);
                &:hover{
                    color:white;
                }
                @media screen and (max-width:600px){
                  left:90%!important;
                  font-size:1rem!important;
                }
                @media screen and (max-width:800px){
                    left:62%;
                }
            }
            
        }
    &>button{
        margin-top:1.1rem;
        cursor:pointer;
        border:none;
        outline:none;
        bakcground:rgba(255,255,255,0.7);
        padding:0.8rem 1rem;
        width:28%;
        border-radius:8px;
        &:hover{
           background:rgba(255,255,255,1);
        }
        font-weight:bold;
        @media screen and (max-width:600px){
                font-size:1.1rem!important;
                margin-top:1.3rem!important;
        }

    }
    .link{
        margin-top:2rem;
        color:white;
        a{
            color:rgba(255,255,255,0.6);
        }
        @media screen and (max-width:600px){
                  margin-top:2.2rem;
            }
    }

    }
    &>div{
        width:50%;
        height:100%;
        @media screen and (max-width:600px){
            width:100%;
            height:auto;
        }
    }
    
`;


export default Wrapper;