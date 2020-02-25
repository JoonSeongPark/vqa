import { SET_IMAGES } from "../actions/image";

const initialState = {
  images: []
}

export default (state=initialState, action) => {
  switch (action.type) {
    case SET_IMAGES:
      return {
        images:action.images
      }
  }
  return state
}