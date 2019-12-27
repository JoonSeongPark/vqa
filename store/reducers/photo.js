import { ADD_IMAGES } from "../actions/photo";
import Images from "../../models/images";

const initialState = {
  addedImage: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_IMAGES:
      const newImage = new Images(
        new Date().toString(),
        action.imageData
      );
      return {
        addedImage: newImage
      };
  }
  return state;
};
