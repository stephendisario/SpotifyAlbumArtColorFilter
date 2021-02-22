import React,{useEffect, useState} from 'react';
import {withRouter} from "react-router-dom"
import {Layout, Typography,Row,Col,Image} from "antd"
import Track from "./Track"

import axios from 'axios'

const TrackList = (props) => {

    const { Header, Content, Footer } = Layout;
    const {Title} = Typography

    const playlistInfo = props.location.state;

    const [playlistTracks,setPlaylistTracks] = useState()

    useEffect(() => {
        getData()
        console.log(playlistInfo.access_token)
    },[])

    useEffect(() => {
        console.log(playlistTracks)
    },[playlistTracks])

    const getData = async () => {
        let responseTracks = await axios.get(`https://api.spotify.com/v1/playlists/${playlistInfo.id}/tracks`, {
            headers: {'Authorization': 'Bearer ' + playlistInfo.access_token},
            params: {market: "from_token"}
        })

        setPlaylistTracks(responseTracks.data.items)
    }

    return (
        <Layout className="layout">
        <Header>
            <Title style={{color:"white"}}>Track List</Title>
        </Header>
        <Content>
            <Row style={{paddingTop: "50px",paddingLeft: "50px"}} align={"middle"}>
                <Col style={{marginRight:"18px"}}>
                    <Image width={150} src={playlistInfo.albumCoverURL} />
                </Col>
                <Col>
                    <Title>{playlistInfo.name}</Title>
                </Col>
            </Row>
                    {playlistTracks && playlistTracks.map((track,index) => {
                        
                        return(
                            <Row key={index} style={{paddingLeft: "50px"}} align={"middle"}> 
                                <Track key={index} albumCoverURL={track.track.album.images[2].url} name={track.track.name}/>
                            </Row>
                        );
                    })}
        </Content>
        <Footer>

        </Footer>
    </Layout>
    );
}

export default withRouter(TrackList);
