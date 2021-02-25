import React,{useEffect, useState} from 'react';
import {Image, Col, Row} from "antd"
import { Redirect,withRouter } from 'react-router-dom';

const Track = (props) => {

  return (
    <>
        <Image  src={props.albumCoverURL} preview={false} />
        <h3 style={{marginLeft:"20px",color:"white"}}>{props.name}</h3>
    </>


  );
}

export default withRouter(Track);
