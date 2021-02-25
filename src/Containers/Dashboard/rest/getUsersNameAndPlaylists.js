import axios from 'axios'

export const getUsersNameAndPlaylists = async (accessToken) => {
    let userNameAndPicture = await axios.get('https://api.spotify.com/v1/me', {
        headers: {'Authorization': 'Bearer ' + accessToken}
    })

    let userPlaylists = await axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {'Authorization': 'Bearer ' + accessToken},
        params: {limit: 50}
    })

    return await Promise.all([userNameAndPicture.data,userPlaylists.data.items])
}

export default getUsersNameAndPlaylists