import React,{useEffect} from 'react';
import {Typography, Button,Row,Col} from 'antd';

const Login = ({stateKey, setStateKey}) => {

  const {Title} = Typography;

  const client_id = '53e53a540f804d048a8f6fc2c653ee0e'; // Your client id
  const redirect_uri = 'http://localhost:3000/dashboard'; // Your redirect uri
  const scope = 'user-read-private user-read-email playlist-read-private'
  let url = 'https://accounts.spotify.com/authorize' + '?response_type=token' + 
            '&client_id=' + encodeURIComponent(client_id) + 
            '&scope=' + encodeURIComponent(scope) + 
            '&redirect_uri=' + encodeURIComponent(redirect_uri) +
            '&state=' + encodeURIComponent(stateKey);

  useEffect(() => {
    setStateKey(generateRandomString(16))
  },[])

  const generateRandomString = (length) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  return (
      <Row style={{height:"100vh", width:"100vw",backgroundColor:"black"}} justify={"center"} align={"middle"}>
        <Col style={{backgroundColor:"#1DB954", padding:"3%", borderRadius:"25px"}}>
          <Title>Spotify Album Art Color Filter</Title>
          <Button href={url} style={{display:"block"}}>Log In</Button>
        </Col>
      </Row>
  );
}

export default Login;
