import axios from "axios"

const getPlaylistTracks = async (accessToken,id) => {
    let trackData =  await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
        headers: {'Authorization': 'Bearer ' + accessToken},
        params: {market: "from_token"}
    })

    return trackData.data.items
}

export default getPlaylistTracks