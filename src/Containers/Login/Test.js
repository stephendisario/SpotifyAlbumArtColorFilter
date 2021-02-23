import { ReactPhotoCollage } from "react-photo-collage";
import { withRouter } from "react-router-dom";
 
const Test = () => {

const collageKanye = {
  width: '100%',
  height: '100%',
  layout: [6, 6],
  photos: [
    { src: '../../photos/grad.jpg' },
    { src: '../../photos/grad.jpg' },
    { src: '../../photos/grad.jpg' },
    { src: '../../photos/grad.jpg' },
    { src: '../../photos/grad.jpg' },
    { src: '../../photos/grad.jpg' },
  ]
};


return  (<ReactPhotoCollage {...collageKanye} />);

}

export default withRouter(Test)