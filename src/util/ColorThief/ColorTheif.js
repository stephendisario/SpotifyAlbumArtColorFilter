import ColorThief from "colorthief"

const getColor = url => {
    return new Promise((resolve,reject) => {
        if (!url)
            resolve([])
        
        let image = new Image();
        image.src = url;
        image.crossOrigin = 'Anonymous';

        image.onload = async () => {
            const colorThief = new ColorThief();
            const color = colorThief.getColor(image,1)
            resolve(color)
        }
    })
}

//path to images are different for playlist arrays and track arrays
const injectWithColor = async (imageArray,listType) => {
    let promiseArray = []
    imageArray.map(item => {
        //some tracks dont have album art, so ? to prevent crash
        promiseArray.push(getColor(listType === "playlist" ? item.images[0]?.url : item.track.album.images[2]?.url))
    })

    let colorForEachImage = await Promise.all(promiseArray)
    return await imageArray.map((obj,index)=> ({ ...obj, color: colorForEachImage[index] }))

}

export default injectWithColor

