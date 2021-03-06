import React,{useState,useEffect, useContext} from 'react';
import {Row, Col, Typography} from 'antd';
import Playlist from "./Playlist/Playlist"
import {AccessTokenContext} from "../DashboardRouter"
import "./Home.css"
import { Layout, Button } from 'antd';
import injectWithColor from "../../../util/ColorThief/ColorTheif"
import ColorFilter from "../../../util/ColorThief/ColorFilter"
import getUsersNameAndPlaylists from "../rest/getUsersNameAndPlaylists"
import getUsersLikedSongs from "../rest/getUsersLikedSongs"
import getTopTracks from "../rest/getTopTracks"
import { access } from 'fs';

const Home = () => {

    const { Content } = Layout;
    const {Title} = Typography

    const accessToken = useContext(AccessTokenContext)

    const [userInfo,setUserInfo] = useState()
    const [playlistArray,setPlaylistArray] = useState([{name: "Liked Songs",images: [{url: "/likedSongs.jpg"}],id: ""}])

    //fetch user info and playlists
    useEffect(() => {
        getUsersNameAndPlaylists(accessToken).then(response => {
            setUserInfo(response[0])
            setPlaylistArray(playlistArray.concat(response[1]))
        })
        // getTopTracks(accessToken).then(response => console.log(response))
        // getUsersLikedSongs(accessToken).then(response => console.log(response))
    },[])

    useEffect(() => {
        console.log(playlistArray)
    },[playlistArray])

    return (

        <>
        {userInfo && playlistArray ?
            <Layout className="main-page">
                <Content className="main-page">
                    {/* <ColorFilter 
                        imageArray={imageArray} 
                        filteredImageArray={filteredImageArray} 
                        setFilteredImageArray={setFilteredImageArray}
                    /> */}
                    <Row className="heading" align={"middle"}>
                        <Col className="heading-picture">
                            <img width={150} src={userInfo.images[0] ? userInfo.images[0].url : null} alt={"ur a bot"}/>
                        </Col>
                        <Col>
                            <Title id="titles">{"Welcome, " + userInfo.display_name.split(" ")[0]}</Title>
                        </Col>
                    </Row>
                    <Row style={{padding: "50px"}}>
                        {playlistArray.map((playlist,index) => {
                            return(
                                <Playlist key={index} playlistCoverURL={playlist.images[0]?.url} name={playlist.name} id={playlist.id}/>
                            );
                        })}
                    </Row>
                </Content>
            </Layout>
        : null}
        </>
    );
}

export default Home;
