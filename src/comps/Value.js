import React from 'react';
import Card from './Card';


const Value = (props) => {
 return (
  <> {
    (props.data.length > 0) ? props.data.map(item => {
             return <Card imgUrl={item.imageUrl} id={item.user} />
    }) : <p style={{ color: "white" }}>No posts Available</p>
  }
  </>
  )
}

export default Value;
