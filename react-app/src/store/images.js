const SET_ALL_IMAGES = "images/SET_ALL_IMAGES";
const SET_SINGLE_IMAGE = "images/SET_SINGLE_IMAGE";
const REMOVE_IMAGE = "images/REMOVE_IMAGE";
const SET_ALL_IMAGES_BY_USER = "images/SET_ALL_IMAGES_BY_USER";

const setAllImages = (images) => ({
  type: SET_ALL_IMAGES,
  payload: images,
});

const setSingleImage = (image) => ({
  type: SET_SINGLE_IMAGE,
  payload: image,
});

const setImagesByUser = (images) => ({
  type: SET_ALL_IMAGES_BY_USER,
  payload: images,
});

const removeImage = () => ({
  type: REMOVE_IMAGE,
});

export const getAllImages = () => async (dispatch) => {
  const response = await fetch("/api/images/");

  if (response.ok) {
    const data = await response.json();
    dispatch(setAllImages(data));
    return data;
  }
};

export const getSingleImage = (imageId) => async (dispatch) => {
  const response = await fetch(`/api/images/${imageId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setSingleImage(data));
    return data;
  }
};

export const getImagesByUser = (userId) => async (dispatch) => {
  // console.log("hittt");
  const response = await fetch(`/api/images/owner/${userId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(setImagesByUser(data));
    // console.log("hit");
    return data;
  }
};

//edit image
export const editImage = (image) => async (dispatch) => {
  const { id, name, description, lat, lng, userId, url } = image;

  const response = await fetch(`/api/images/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      name,
      description,
      url,
      lat,
      lng,
      owner_id: userId,
    }),
  });

  if (response.ok) {
    const imageData = await response.json();
    dispatch(setSingleImage(imageData));
    return imageData;
  }
};

export const createImage = (image) => async (dispatch) => {
  const { name, description, url, lat, lng, owner_id } = image;

  const response = await fetch("/api/images/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      url,
      lat,
      lng,
      owner_id,
    }),
  });
  const imageData = await response.json();

  if (response.ok) {
    const final = await fetch(`/api/images/${imageData.id}`);
    if (final.ok) {
      const finalResponse = await final.json();
      dispatch(setSingleImage(finalResponse));
      return finalResponse;
    }
  } else {
    return "something went wrong when creating images";
  }
};

export const deleteImage = (imageId) => async (dispatch) => {
  // console.log("hit delete1");
  const response = await fetch(`/api/images/${imageId}`, {
    method: "DELETE",
  });
  // console.log("hit delete2");
  if (response.ok) {
    // console.log("hit delete3");
    const data = await response.json();
    dispatch(removeImage());
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
