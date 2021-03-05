import React,{useEffect, useState} from "react"
import {Row,Button,Col} from "antd"
import {ChromePicker} from 'react-color'


const ColorFilter = ({imageArray,filteredImageArray,setFilteredImageArray}) => {

    const [selectedColor,setSelectedColor] = useState({rgb:{r:50,g:50,b:50}})

    const handleFilterClick = (color,event) => {

        setSelectedColor(color)

        //gets all tracks in range of selected color
        //selectedColor: {rgb:{r:int,g:int,b:int}}
        //image: color[r,g,b]
        const inRange = image => {
            //some tracks dont have album art and their color object is an empty array
            if(image.color.length > 0)
                return Math.abs(image.color[0] - color.rgb.r) < 20 && Math.abs(image.color[1] - color.rgb.g) < 20 && Math.abs(image.color[2] - color.rgb.b) < 20
            else return false
        }

        //compares tracks within range to each other, sorts tracks by closeness to selected color
        //a,b track a and track b
        const compareColorValue = (a, b) => {
            //color spectrum sort
            // return Math.sqrt((0.299 *  Math.pow(a.color[0],2)) + (0.587 * a.color[1]) + (0.114 * Math.pow(a.color[2],2))) - 
            //        Math.sqrt((0.299 *  Math.pow(b.color[0],2)) + (0.587 * b.color[1]) + (0.114 * Math.pow(b.color[2],2)))

            return (Math.abs(a.color[0] - color.rgb.r) + Math.abs(a.color[1] - color.rgb.g) + Math.abs(a.color[2] - color.rgb.b)) - 
                    (Math.abs(b.color[0] - color.rgb.r) + Math.abs(b.color[1] - color.rgb.g) + Math.abs(b.color[2] - color.rgb.b))
        }
        
        let preSortedFilteredArray = imageArray.filter(inRange)
        setFilteredImageArray(preSortedFilteredArray.sort(compareColorValue))

    }

    return(
        <Row style={{backgroundColor: selectedColor ? selectedColor.hex : null,paddingLeft:"50px",paddingBottom:"20px"}}>
            <ChromePicker color={selectedColor} onChange={handleFilterClick} disableAlpha={true}/>
            <Button onClick={() => {
                setSelectedColor({rgb:{r:50,g:50,b:50}})
                setFilteredImageArray(imageArray)
            }}>Reset</Button>
        </Row>
    )
}

export default ColorFilter