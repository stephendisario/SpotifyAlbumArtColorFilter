import React,{useEffect, useState, useContext} from 'react';
import {withRouter} from "react-router-dom"
import {Layout, Typography,Row,Col,Image,Popover} from "antd"
import Track from "./Track"
import {AccessTokenContext} from "../../DashboardRouter"
import injectWithColor from "../../../../util/ColorThief/ColorTheif"
import ColorFilter from "../../../../util/ColorThief/ColorFilter"
import getPlaylistTracks from "../../rest/getPlaylistTracks"
import getUsersLikedSongs from "../../rest/getUsersLikedSongs"
import "../Home.css"


import axios from 'axios'

const TrackList = (props) => {

    const {Content,Sider} = Layout;
    const {Title} = Typography

    const {playlistCoverURL,name,id} = props.location.state

    const accessToken = useContext(AccessTokenContext)
    const [playlistTracks,setPlaylistTracks] = useState()
    const [filteredPlaylistTracks,setFilteredPlaylistTracks] = useState()

    //liked songs is not a spotify playlist, so different API call to get tracks
    useEffect(() => {
        if(name === "Liked Songs") getUsersLikedSongs(accessToken).then(response => {
            injectWithColor(response).then(resp => {setPlaylistTracks(resp); setFilteredPlaylistTracks(resp)})
        })
        else getPlaylistTracks(accessToken,id).then(response => {
            injectWithColor(response).then(resp => {setPlaylistTracks(resp); setFilteredPlaylistTracks(resp)})
        })
    },[])

    return (
        <>
            {filteredPlaylistTracks ? 
            <Layout className="main-page">
                {/* handle empty arrays */}
                <Content className="main-page">
                    <ColorFilter 
                        imageArray={playlistTracks}
                        filteredImageArray={filteredPlaylistTracks}
                        setFilteredImageArray={setFilteredPlaylistTracks}
                    />
                    <Row className="heading" align={"middle"}>
                        <Col className="heading-picture">
                            <Image width={150} src={playlistCoverURL} />
                        </Col>
                        <Col>
                            <Title id="titles">{name}</Title>
                        </Col>
                    </Row>
                </Content>
                <Sider width="50vw" className="main-page">
                    {/* Requred for images to not have whitespace underneath them */}
                    <div style={{fontSize:"0"}}>
                    {filteredPlaylistTracks && filteredPlaylistTracks.map((track,index) => {
                        const content = (
                            <div>
                                <p>{track.track.artists[0].name}</p>
                            </div>
                            )

                        const blackOrWhiteText = track.color[0] + track.color[1] + track.color[2]

                        return(
                            <Popover 
                                key={index} 
                                overlayClassName={blackOrWhiteText < 384 ? "popover-white-text" : null} 
                                color={`rgb(${track.color[0]},${track.color[1]},${track.color[2]})`} 
                                content={content} 
                                title={track.track.name} 
                                trigger="hover">
                                <Image src={track.track.album.images[2]?.url} preview={false}/>
                            </Popover>
                        );
                    })}      
                    </div>              
                </Sider>
            </Layout>
            : null}
        </>
    );
}

export default withRouter(TrackList);
