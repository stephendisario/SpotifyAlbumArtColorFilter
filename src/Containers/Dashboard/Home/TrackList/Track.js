import React from 'react';
import {Image} from "antd"
import { withRouter } from 'react-router-dom';

const Track = (props) => {

  return (
    <>
        <Image  src={props.albumCoverURL} preview={false} />
        <h3 id="titles" style={{marginLeft:"20px"}}>{props.name}</h3>
    </>


  );
}

export default withRouter(Track);
