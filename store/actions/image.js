export const SET_IMAGES = "SET_IMAGES";

import Images from "../../models/images";

export const fetchImages = () => {
  return async dispatch => {
    const response = await fetch("http://35.229.162.86:5000/get_images");
    const responseJson = await response.json()
    const images = await responseJson.images;
    const loadedImages = [];

    for (const key in images) {
      loadedImages.push(
        new Images(images[key].imageId, 'http://35.229.162.86:5000/get_image?image_url='+images[key].imageUrl)
      );
    }
    dispatch({ type: SET_IMAGES, images: loadedImages });
  };
};
