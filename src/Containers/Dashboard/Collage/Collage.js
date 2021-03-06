import React, { useEffect,useContext,useState } from 'react'
import injectWithColor from "../../../util/ColorThief/ColorTheif"
import {AccessTokenContext} from "../../Dashboard/DashboardRouter"
import {Image,Layout,Menu,Select,Button,Form,Row,Col} from 'antd'
import getUsersLikedSongs from "../rest/getUsersLikedSongs"
import rgbToHsl from "../../../util/rgbToHsl"
import "../Home/Home.css"


const Collage = () => {

    const accessToken = useContext(AccessTokenContext)
    const [allSongs,setAllSongs] = useState()
    const [collageSongs,setCollageSongs] = useState()

    const {Content} = Layout;
    const { Option } = Select;

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    useEffect(async () => {
        let likedSongs = await getUsersLikedSongs(accessToken)
        let likedSongsWithRgb = await injectWithColor(likedSongs)
        let likedSongsWithHsl = likedSongsWithRgb.map(track => {
            let newTrack = {...track}
            newTrack.color = rgbToHsl(track.color)
            return newTrack
        })
        setAllSongs(likedSongsWithHsl)
        let sortedByColor = likedSongsWithHsl.sort((track1,track2) => {
            return track1.color[0] - track2.color[0]
        })
        console.log("1",sortedByColor)

        let newSortedTracks = sortedByColor.filter((e, i, a) => i > 0 ? e.track.album.name !== a[i - 1].track.album.name : true);

        setCollageSongs(newSortedTracks)
    },[])

    useEffect(() => {
        console.log(allSongs)
    },[allSongs])

    //30x30 37px
    //20x20 54px

    return(
        <>
            <Layout className="main-page">
                <Content className="main-page" style={{paddingTop:"20px"}}>
                    <Form form={form} layout="inline" onFinish={onFinish}>
                        <Col span={4} offset={2}>
                            <Form.Item name="size" rules={[{required: true}]}>
                                <Select placeholder="Size" allowClear>
                                    <Option value="10">10x10</Option>
                                    <Option value="20">20x20</Option>
                                    <Option value="30">30x30</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item  name="sort" rules={[{required: true}]} >
                                <Select placeholder="Sort By" allowClear>
                                    <Option value="color">Color</Option>
                                    <Option value="brightness">Brightness</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item  name="direction" rules={[{required: true}]}>
                                <Select placeholder="Direction" allowClear>
                                    <Option value="vertical">Vertical</Option>
                                    <Option value="horizontal">Horizontal</Option>
                                    <Option value="diagonal">Diagnonal</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item  name="vibrance" rules={[{required: true}]} >
                                <Select placeholder="Vibrance" allowClear>
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4} style={{textAlign:"end"}}>
                            <Form.Item>
                                <Button htmlType="button" onClick={onReset}>Reset</Button> &emsp;
                                <Button htmlType="submit">Generate</Button>
                            </Form.Item>
                        </Col>
                    </Form>
                    <Row justify="center" style={{marginTop:"20px"}}>
                        <Col style={{height:"80vw",width:"80vw"}}>
                                        {/* Requred for images to not have whitespace underneath them */}
                            <div style={{fontSize:"0"}}>
                            {collageSongs && collageSongs.map((track,index) => {
                                return(
                                    <Image width={"54px"} height={"54px"} key={index} src={track.track.album.images[2]?.url} preview={false}/>
                                )
                            })}
                            </div>
                        </Col>
                    </Row>
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