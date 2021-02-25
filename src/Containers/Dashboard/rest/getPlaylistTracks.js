import axios from "axios"

const getPlaylistTracks = async (accessToken,id) => {
    return await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
        headers: {'Authorization': 'Bearer ' + accessToken},
        params: {market: "from_token"}
    })
}

export default getPlaylistTracks