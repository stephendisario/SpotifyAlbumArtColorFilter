import React from 'react';
import {Image, Col} from "antd"
import { withRouter } from 'react-router-dom';

const Playlist = (props) => {

  //displayed playlist art and title on home page
  return (
    <>
        <Col xs={12} sm={9} md={6} lg={5} xl={4}>
          <div>
            <Image width={150} height={150} src={props.playlistCoverURL} preview={false} onClick={() => props.history.push(
              {
                pathname: '/dashboard/tracklist',
                state: { playlistCoverURL: props.playlistCoverURL, name:props.name, id: props.id}
              }
            )}/>
            <h4 id="titles" style={{paddingRight:"5px"}}>{props.name}</h4>
          </div>
        </Col>
    </>


  );
}

export default withRouter(Playlist);
