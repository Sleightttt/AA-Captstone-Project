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

  // let imageResponse;

  // if (response.ok) {
  //   for (let i = 0; i < images.length; i++) {
  //     if (images[i] === "") continue;
  //     const imageUrl = images[i].url;
  //     const imageByProduct = await fetch(`/api/product/${productData.id}/image`);
  //     const imageByProductData = await imageByProduct.json();
  //     const imageId = imageByProductData.images[0].id;
  //     imageResponse = await fetch(`/api/product/${productData.id}/image/${imageId}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id: imageId,
  //         url: imageUrl,
  //         preview: true,
  //         productId: productData.id,
  //       }),

  //     });
  //     if (!imageResponse.ok) {
  //       return `something went wrong when creating image number ${i}`;
  //     }
  //   }
  // } else {
  //   return "something went wrong when creating product";
  // }
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

  // let imageResponse;

  // if (response.ok) {
  //   for (let i = 0; i < images.length; i++) {
  //     if (images[i] === "") continue;
  //     imageResponse = await fetch(`/api/product/${productData.id}/image`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         url: images[i],
  //         preview: true,
  //         productId: productData.id,
  //       }),
  //     });
  //     if (!imageResponse.ok) {
  //       return `something went wrong when creating image number ${i}`;
  //     }
  //   }
  // } else {
  //   return "something went wrong when creating product";
  // }

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
