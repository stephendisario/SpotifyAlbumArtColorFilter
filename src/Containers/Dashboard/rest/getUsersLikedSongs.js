import axios from 'axios'

 const getUsersLikedSongs = async (accessToken) => {

    //get total # of liked songs 
    let findTotal = await axios.get("https://api.spotify.com/v1/me/tracks", {
        headers: {'Authorization': 'Bearer ' + accessToken},
        params: {limit:1}
    })

    let total = findTotal.data.total     
    let promiseArray = [];
    let count = 0
    while(count < total) {
        promiseArray.push(new Promise(resolve => {
            axios.get("https://api.spotify.com/v1/me/tracks", {
                headers: {'Authorization': 'Bearer ' + accessToken},
                params: {limit:50 ,offset:count}
            }).then(resp => resolve(resp.data.items))
        }))
        count = count + 50
    }

    return [].concat(...await Promise.all(promiseArray))

}

export default getUsersLikedSongs