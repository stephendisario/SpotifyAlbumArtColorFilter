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
    const [imageArray,setImageArray] = useState([])
    const [filteredImageArray,setFilteredImageArray] = useState()

    //fetch user info and playlists
    useEffect(() => {
        getUsersNameAndPlaylists(accessToken).then(response => {
            setUserInfo(response[0])
            setImageArray(injectWithColor(response[1],"playlist"))
            setFilteredImageArray(injectWithColor(response[1],"playlist"))

        })
        getTopTracks(accessToken).then(response => console.log(response))
        getUsersLikedSongs(accessToken).then(response => console.log(response))
    },[])

    useEffect(() => {
        console.log(imageArray)
    },[imageArray])



    return (

        <>
        {userInfo && imageArray && filteredImageArray ?
            <Layout className="layout">
                <Content className="main-page">
                    <ColorFilter 
                        imageArray={imageArray} 
                        filteredImageArray={filteredImageArray} 
                        setFilteredImageArray={setFilteredImageArray}
                    />
                    <Row className="heading" align={"middle"}>
                        <Col className="heading-picture">
                            <img width={150} src={userInfo.images[0].url} />
                        </Col>
                        <Col>
                            <Title id="titles">{"Welcome, " + userInfo.display_name.split(" ")[0]}</Title>
                        </Col>
                    </Row>
                    <Row style={{padding: "50px"}}>
                        {filteredImageArray.map((playlist,index) => {
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
