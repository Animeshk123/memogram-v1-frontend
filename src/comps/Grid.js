import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const Grid = (props) => {
    return (
        <>
            <div className='container'>
                <GridWrapper>
                    {
                        (props.data.length > 0) ?
                            props.data.map(item => {
                                return <Card imgUrl={item.imageUrl} id={item.user} />
                            }) : <p style={{ color: "white" }}>No post Available</p>

                    }
                </GridWrapper>
            </div>
        </>
    )
}


const GridWrapper = styled.div`
    margin-top:2rem;
    width:100%;
    height:auto;
    columns:4;
    columns-gap:1rem;
    margin-bottom:2rem;
    @media screen and (max-width:500px){
        columns:1!important;
    }
    @media screen and (max-width:800px){
        columns:3;
    }
`;

export default Grid;