import React, { useEffect,useContext,useState } from 'react'
import injectWithColor from "../../../util/ColorThief/ColorTheif"
import {AccessTokenContext} from "../../Dashboard/DashboardRouter"
import {Image,Layout,Menu,Select,Button} from 'antd'
import getUsersLikedSongs from "../rest/getUsersLikedSongs"
import rgbToHsl from "../../../util/rgbToHsl"
import "../Home/Home.css"


const Collage = () => {

    const accessToken = useContext(AccessTokenContext)
    const [allSongs,setAllSongs] = useState()
    const [collageSongs,setCollageSongs] = useState()

    const {Content} = Layout;
    const { Option } = Select;

    const menu = (
        <Menu>
          <Menu.Item>
              1st menu item
          </Menu.Item>
          <Menu.Item>
              2nd menu item
          </Menu.Item>
          <Menu.Item>
              3rd menu item
          </Menu.Item>
        </Menu>
      );
      

    // useEffect(async () => {
    //     let likedSongs = await getUsersLikedSongs(accessToken)
    //     let likedSongsWithRgb = await injectWithColor(likedSongs)
    //     let likedSongsWithHsl = likedSongsWithRgb.map(track => {
    //         let newTrack = {...track}
    //         newTrack.color = rgbToHsl(track.color)
    //         return newTrack
    //     })
    //     setAllSongs(likedSongsWithHsl)
    //     // let sortedByColor = likedSongsWithHsl.sort((track1,track2) => {
    //     //     return track1.color[0] - track2.color[0]
    //     // })
    //     // console.log("1",sortedByColor)

    //     // let newSortedTracks = sortedByColor.filter((e, i, a) => i > 0 ? e.track.album.name !== a[i - 1].track.album.name : true);

    //     // setCollageSongs(newSortedTracks)
    // },[])

    useEffect(() => {
        console.log(allSongs)
    },[allSongs])

    return(
        <>
            <Layout className="main-page">
                <Content className="main-page">
                <Select allowClear={true} defaultValue="Size" style={{ width: 120 }} >
                    <Option value="Size"></Option>
                    <Option value="10">10x10</Option>
                    <Option value="20">20x20</Option>
                    <Option value="30">30x30</Option>
                </Select>
                <Select defaultValue="Style" style={{ width: 120 }} >
                    <Option value="color">Color</Option>
                    <Option value="brightness">Brightness</Option>
                    <Option value="30">30x30</Option>
                </Select>
                <Select defaultValue="Direction" style={{ width: 120 }} >
                    <Option value="horizontal">Horizontal</Option>
                    <Option value="vertical">Vertical</Option>
                    <Option value="diagonal">Diagnonal</Option>
                </Select>
                <Select defaultValue="Quality" style={{ width: 120 }} >
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                </Select>
                <Button>
                    Clear Filters
                </Button>
                </Content>
            </Layout>




            {/* Requred for images to not have whitespace underneath them */}
            {/* <div style={{fontSize:"0"}}>
            {collageSongs.map((track,index) => {
                return(
                    <Image key={index} src={track.track.album.images[2]?.url} preview={false}/>
                )
            })}
            </div> */}

        </>
    )
}

export default Collage