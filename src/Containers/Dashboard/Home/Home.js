import React,{useState,useEffect, useContext} from 'react';
import {Row, Col, Image, Typography} from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import Playlist from "./Playlist/Playlist"
import {AccessTokenContext} from "../DashboardRouter"
import axios from 'axios'
import "./Home.css"

const Home = () => {

    const { Content } = Layout;
    const {Title} = Typography

    const accessToken = useContext(AccessTokenContext)

    const [userData,setUserData] = useState()

    //fetch user info and playlists
    useEffect(() => {
        getUsersNameAndPlaylists()
    },[])
    
    const getUsersNameAndPlaylists = async () => {
        let userInfo = await axios.get('https://api.spotify.com/v1/me', {
            headers: {'Authorization': 'Bearer ' + accessToken}
        })

        let userPlaylists = await axios.get('https://api.spotify.com/v1/me/playlists', {
            headers: {'Authorization': 'Bearer ' + accessToken},
            params: {limit: 50}
        })

        setUserData(await Promise.all([userInfo.data,userPlaylists.data.items]))
    }

    return (

        <>
        {userData ?  
            <Layout className="layout">
                <Content className="main-page">
                    <Row className="heading" align={"middle"}>
                        <Col className="heading-picture">
                            <Image width={150} src={userData[0].images[0].url} />
                        </Col>
                        <Col>
                            <Title id="titles">{"Welcome, " + userData[0].display_name.split(" ")[0]}</Title>
                        </Col>
                    </Row>
                    <Row style={{padding: "50px"}}>
                        {userData[1].map((playlist,index) => {
                            return(
                                <Playlist key={index} playlistCoverURL={playlist.images[0]?.url} name={playlist.name} id={playlist.id}/>
                            );
                        })}
                    </Row>
                </Content>
            </Layout>
        : null}

        </>

        // <div className="Dashboard">
        //     <Title>Dashboard</Title>
        //     {userInfo ? userInfo.display_name : null}
        // </div>
    );
}

export default Home;
