import React,{useEffect, useState} from 'react';
import {Image, Popover} from "antd"
import { Redirect,withRouter } from 'react-router-dom';

const Track = (props) => {

  useEffect(() => {
    console.log("track",props.color)
  })

  const content = (
    <div>
      <p>{props.artist}</p>
    </div>
  )

  return (
    <Popover color={props.color ? `rgb(${props.color[0]},${props.color[1]},${props.color[2]})`: "white"} content={content} title={props.name} trigger="hover">
      <Image  src={props.albumCoverURL} preview={false}/>
    </Popover>
  );
}

export default withRouter(Track);
