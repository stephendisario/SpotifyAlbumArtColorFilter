import React,{useEffect, useState} from "react"
import {Row,Button,Col} from "antd"
import {ChromePicker} from 'react-color'


const ColorFilter = ({imageArray,filteredImageArray,setFilteredImageArray}) => {

    const [selectedColor,setSelectedColor] = useState({rgb:{r:50,g:50,b:50}})

    const handleFilterClick = (color,event) => {

        const inRange = image => {
            //some tracks dont have album art
            if(image.color)
                return Math.abs(image.color[0] - color.rgb.r) < 20 && Math.abs(image.color[1] - color.rgb.g) < 20 && Math.abs(image.color[2] - color.rgb.b) < 20
            else return false
        }
        
        setSelectedColor(color)
        setFilteredImageArray(imageArray.filter(inRange))

    }

    return(
        <Row style={{backgroundColor: selectedColor ? selectedColor.hex : null,paddingLeft:"50px",paddingTop:"20px"}}>
            <ChromePicker color={selectedColor} onChange={handleFilterClick} disableAlpha={true}/>
            <Button onClick={handleFilterClick}>Filter to this color</Button>
            <Button onClick={() => {
                setSelectedColor({rgb:{r:50,g:50,b:50}})
                setFilteredImageArray(imageArray)
            }}>Reset</Button>
        </Row>
    )
}

export default ColorFilter