import React,{useEffect, useState, useContext} from 'react';
import {withRouter} from "react-router-dom"
import {Layout, Typography,Row,Col,Image} from "antd"
import Track from "./Track"
import {AccessTokenContext} from "../../DashboardRouter"
import injectWithColor from "../../../../util/ColorThief/ColorTheif"
import ColorFilter from "../../../../util/ColorThief/ColorFilter"
import getPlaylistTracks from "../../rest/getPlaylistTracks"
import "../Home.css"


import axios from 'axios'

const TrackList = (props) => {

    const {Content} = Layout;
    const {Title} = Typography

    const {playlistCoverURL,name,id} = props.location.state

    const accessToken = useContext(AccessTokenContext)
    const [playlistTracks,setPlaylistTracks] = useState()
    const [filteredPlaylistTracks,setFilteredPlaylistTracks] = useState()

    useEffect(() => {
        getPlaylistTracks(accessToken,id).then(response => {
            console.log(response)
            setPlaylistTracks(injectWithColor(response.data.items,"track"))
            setFilteredPlaylistTracks(injectWithColor(response.data.items,"track"))
        })
    },[])

    return (
        <>
            {playlistTracks && filteredPlaylistTracks? 
                <Layout className="layout">
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
                            {filteredPlaylistTracks.map((track,index) => {
                                return(
                                    <Row key={index} className="track" align={"middle"}> 
                                        <Track albumCoverURL={track.track.album.images[2]?.url} name={track.track.name}/>
                                    </Row>
                                );
                            })}
                    </Content>
                </Layout>
            :null}
        </>
    );
}

export default withRouter(TrackList);
