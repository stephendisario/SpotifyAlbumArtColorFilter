import React,{useEffect, useState} from 'react';
import {Image, Col, Row} from "antd"
import { Redirect,withRouter } from 'react-router-dom';

const Playlist = (props) => {

  useEffect(() => {
    console.log("TOKEN 1",props.access_token)
},[])


  return (
    <>
        <Col span={3}>
          <div>
            <Image width={150} height={150} src={props.albumCoverURL} preview={false} onClick={() => props.history.push(
              {
                pathname: '/tracklist',
                state: { albumCoverURL: props.albumCoverURL, name:props.name, id: props.id, access_token:props.access_token}
              }
            )}/>
            <h3>{props.name}</h3>
          </div>
        </Col>
    </>


  );
}

export default withRouter(Playlist);
