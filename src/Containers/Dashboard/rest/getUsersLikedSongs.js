import axios from 'axios'

// const getUsersLikedSongs = async (accessToken) => {
//     let songs = []
//     let count = 0
//     let result = {}
//     do{
//         result = await get50Songs(accessToken,count * 50);
//         songs.push(result.items)
//         console.log(songs)
//         count = count + 1
//     } while(result.next !== null)

//     return [].concat(...songs)

//   };
  
// const get50Songs = (accessToken,offsetLocation) => {
//     return new Promise(resolve => {
//         axios.get("https://api.spotify.com/v1/me/tracks", {
//             headers: {'Authorization': 'Bearer ' + accessToken},
//             params: {limit:50 ,offset:offsetLocation}
//         }).then(resp => resolve(resp.data))
//     })
//   };

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