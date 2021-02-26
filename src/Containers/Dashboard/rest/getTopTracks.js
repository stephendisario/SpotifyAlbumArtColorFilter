import axios from 'axios'

export const getTopTracks = async (accessToken) => {
    let topTracks = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
        headers: {'Authorization': 'Bearer ' + accessToken},
        params: {time_range: "short_term", limit: 50, offset: 0}
    })

    return topTracks
}

export default getTopTracks