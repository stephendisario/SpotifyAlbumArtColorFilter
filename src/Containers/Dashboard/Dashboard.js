import React,{useState,useEffect} from 'react';
import {Row, Col, Image, Typography} from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import getHashParams from "../../util/getHashParams"
import Playlist from "./Playlist"
//import "./styles/Dashboard.css"
import axios from 'axios'

const Dashboard = ({stateKey}) => {

    const { Header, Content, Footer } = Layout;
    const {Title} = Typography

    const params = getHashParams()

    const [userInfo,setUserInfo] = useState()
    const [userPlaylists,setUserPlaylists] = useState()

    //fetch user info and playlists
    useEffect(() => {
        getData()
        console.log("TOKEN 1",params.access_token)
    },[])

    //temporary
    useEffect(() => {
        console.log("INFO",userInfo,"PLAYLIST",userPlaylists)
    },[userInfo,userPlaylists])


    //make this better
    const getData = async () => {
        let responseInfo = await axios.get('https://api.spotify.com/v1/me', {
            headers: {'Authorization': 'Bearer ' + params.access_token}
        })

        let responsePlaylists = await axios.get('https://api.spotify.com/v1/me/playlists', {
            headers: {'Authorization': 'Bearer ' + params.access_token},
            params: {limit: 50}
        })

        setUserInfo(responseInfo.data)
        setUserPlaylists(responsePlaylists.data.items)
    }

    return (
        
        <Layout className="layout">
            <Header style={{backgroundColor:"#00120B"}}>
                <Title style={{color:"white"}}>Spotify Album Cover Color Filter</Title>
            </Header>
            <Content style={{backgroundColor:"#35605A"}}>
                <Row style={{paddingTop: "50px",paddingLeft: "50px"}} align={"middle"}>
                    <Col style={{marginRight:"18px"}}>
                        <Image width={150} src={userInfo ? userInfo.images[0].url : null} />
                    </Col>
                    <Col>
                        <Title>{userInfo ? "Welcome, " + userInfo.display_name.split(" ")[0] : null}</Title>
                    </Col>
                </Row>
                <Row style={{padding: "50px"}}>
                    {userPlaylists && userPlaylists.map((playlist,index) => {
                        
                        return(
                            <Playlist key={index} albumCoverURL={playlist.images[0]?.url} name={playlist.name} id={playlist.id} access_token={params.access_token}/>
                        );
                    })}
                </Row>
            </Content>
        </Layout>

        // <div className="Dashboard">
        //     <Title>Dashboard</Title>
        //     {userInfo ? userInfo.display_name : null}
        // </div>
    );
}

export default Dashboard;
