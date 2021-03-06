import React, { useEffect,useContext,useState } from 'react'
import getTopTracks from "../rest/getTopTracks"
import injectWithColor from "../../../util/ColorThief/ColorTheif"
import ColorFilter from "../../../util/ColorThief/ColorFilter"
import {AccessTokenContext} from "../../Dashboard/DashboardRouter"
import {Image,Layout} from 'antd'
import getUsersLikedSongs from "../rest/getUsersLikedSongs"
import "../Home/Home.css"


const Collage = () => {

    const accessToken = useContext(AccessTokenContext)
    const [tracksWithColor,setTracksWithColor] = useState()

    const {Content} = Layout;

    useEffect(async () => {
        let likedSongs = await getUsersLikedSongs(accessToken)
        let likedSongsWithRgb = await injectWithColor(likedSongs)
        let likedSongsWithHsl = likedSongsWithRgb.filter(track => {
            let newTrack = track
            newTrack.color = rgbToHsl(track.color)
            if(newTrack.color[1] >= 50 && (newTrack.color[2] > 25 && newTrack.color[2] < 75))
                return newTrack
        })
        let sortedByColor = likedSongsWithHsl.sort((track1,track2) => {
            return track1.color[0] - track2.color[0]
        })
        console.log("1",sortedByColor)

        let newSortedTracks = sortedByColor.filter((e, i, a) => i > 0 ? e.track.album.name !== a[i - 1].track.album.name : true);

        setTracksWithColor(newSortedTracks)
    },[])

    useEffect(() => {
        console.log(tracksWithColor)
    },[tracksWithColor])

    const rgbToHsl = c => {
        var r = c[0]/255, g = c[1]/255, b = c[2]/255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if(max == min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return new Array(h * 360, s * 100, l * 100);
    }

    return(
        <>
        {tracksWithColor ? 
            <Layout className="main-page">
                <Content className="main-page">
                {/* Requred for images to not have whitespace underneath them */}
                <div style={{fontSize:"0"}}>
                {tracksWithColor.map((track,index) => {
                    return(
                        <Image key={index} src={track.track.album.images[2]?.url} preview={false}/>
                    )
                })}
                </div>
                </Content>
            </Layout>
        : null}
        </>
    )
}

export default Collage