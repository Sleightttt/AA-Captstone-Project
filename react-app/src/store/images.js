const SET_ALL_IMAGES = "images/SET_ALL_IMAGES";
const SET_SINGLE_IMAGE = "images/SET_SINGLE_IMAGE";
const REMOVE_IMAGE = "images/REMOVE_IMAGE";
const SET_ALL_IMAGES_BY_USER = "images/SET_ALL_IMAGES_BY_USER";

const setAllImages = (images) => ({
  type: SET_ALL_IMAGES,
  payload: images,
});

export const getAllImages = () => async (dispatch) => {
  const response = await fetch("/api/images/");

  if (response.ok) {
    const data = await response.json();
    dispatch(setAllImages(data));
    return data;
  }
};

const initialState = { allImages: {}, singleImage: {} };

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_IMAGES:
      return { ...state, allImages: action.payload };
    case SET_ALL_IMAGES_BY_USER:
      return { ...state, allImagesByUser: action.payload };
    case SET_SINGLE_IMAGE:
      return { ...state, singleImage: action.payload };
    case REMOVE_IMAGE:
      return { ...state, singleImage: {} };
    default:
      return state;
  }
}
