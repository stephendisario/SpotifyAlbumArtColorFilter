import React,{useState,useEffect, useContext} from 'react';
import {Row, Col, Typography} from 'antd';
import Playlist from "./Playlist/Playlist"
import {AccessTokenContext} from "../DashboardRouter"
import axios from 'axios'
import "./Home.css"
import { Layout, Button } from 'antd';
import injectWithColor from "../../../util/ColorThief/ColorTheif"
import ColorFilter from "../../../util/ColorThief/ColorFilter"

const Home = () => {

    const { Content } = Layout;
    const {Title} = Typography

    const accessToken = useContext(AccessTokenContext)

    const [userInfo,setUserInfo] = useState()
    const [imageArray,setImageArray] = useState([])
    const [filteredImageArray,setFilteredImageArray] = useState()

    //fetch user info and playlists
    useEffect(() => {
        getUsersNameAndPlaylists()
    },[])

    //export into its own file
    const getUsersNameAndPlaylists = async () => {
        let userNameAndPicture = await axios.get('https://api.spotify.com/v1/me', {
            headers: {'Authorization': 'Bearer ' + accessToken}
        })

        let userPlaylists = await axios.get('https://api.spotify.com/v1/me/playlists', {
            headers: {'Authorization': 'Bearer ' + accessToken},
            params: {limit: 50}
        })

        let userData = await Promise.all([userNameAndPicture.data,userPlaylists.data.items])
        setUserInfo(userData[0])

        //dont call inject twice but make pretty
        setImageArray(injectWithColor(userData[1],"playlist"))
        setFilteredImageArray(injectWithColor(userData[1],"playlist"))
    }

    return (

        <>
        {userInfo && imageArray && filteredImageArray?
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
