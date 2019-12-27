export const SET_IMAGES = "SET_IMAGES";

import Images from "../../models/images";

export const fetchImages = () => {
  return async dispatch => {
    const response = await fetch("http://34.80.51.170:5000/get_images").catch(err => {console.error(err)});
    const responseJson = await response.json()
    const loadedImages = [];

    for (const key in responseJson) {
      loadedImages.push(
        new Images(responseJson[key].imageId, 'http://34.80.51.170:5000/get_image?image_url='+responseJson[key].imageUrl)
      );
    }
    dispatch({ type: SET_IMAGES, images: loadedImages });
  };
};
