import ColorThief from "colorthief"

const getColor = url => {
    return new Promise((resolve,reject) => {
        if (!url)
            reject()
        
        let image = new Image();
        image.src = url;
        image.crossOrigin = 'Anonymous';

        image.onload = async () => {
            const colorThief = new ColorThief();
            const color = colorThief.getColor(image)
            resolve(color)
        }
    })
}

//path to images are different for playlist arrays and track arrays
const injectWithColor = (imageArray,listType) => {
    imageArray.map(item => {
        //some tracks dont have album art, so ? to prevent crash
        getColor(listType === "playlist" ? item.images[0]?.url : item.track.album.images[2]?.url)
            .then(color => item.color = color)
    })

    return imageArray
}

export default injectWithColor

