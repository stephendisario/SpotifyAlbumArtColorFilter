import React,{useState} from 'react'
import {withRouter} from "react-router-dom"
import {Menu,Layout} from 'antd'
import "./Navbar.css"


const Navbar = (props) => {

  const { Header } = Layout;

  const [currentKey,setCurrentKey] = useState("")

  const selectedMenuItemStyle = {
    color: "#1DB954",
    borderBottom: "2px solid #1DB954"
  }

  const handleClick = e => {
    setCurrentKey(e.key)
    props.history.push(`/dashboard/${e.key}`)
  }

    return (
      <Layout className="layout">
        <Header style={{backgroundColor:"black"}}>
            <Menu onClick={handleClick} selectedKeys={[currentKey]} id="navbar"mode="horizontal">
              <Menu.Item key="home" id="navbar-home" style={currentKey === "home" ? selectedMenuItemStyle : {}}>
                Home
              </Menu.Item>
              <Menu.Item key="collage-creator" id="navbar-collage" style={currentKey === "collage-creator" ? selectedMenuItemStyle : {}}>
                Collage Creator
              </Menu.Item>
            </Menu>
        </Header>      
      </Layout>  
    );

}

export default withRouter(Navbar)