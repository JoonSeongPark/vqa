export const ADD_IMAGES = "SET_IMAGES"

export const addImage = (imageData) => {
  return {
    type: ADD_IMAGES,
    imageData: imageData
  }
}