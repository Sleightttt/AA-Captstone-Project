const CREATE_LIKE = "likes/CREATE_LIKE";
const DELETE_LIKE = "likes/DELETE_LIKE";
const GET_ALL_LIKES = "likes/GET_ALL_LIKES";
const USER_LIKE = "likes/USER_LIKE";
const READ_LIKES_IMAGE = "likes/READ_LIKES_IMAGE";
const READ_LIKES_USER = "likes/READ_LIKES_USER";

const createLike = (like) => ({
  type: CREATE_LIKE,
  payload: like,
});

const getUserLikes = (id) => ({
  type: READ_LIKES_USER,
  payload: id,
});

const deleteLike = (id) => ({
  type: DELETE_LIKE,
  payload: id,
});

const imagesLikes = (like) => ({
  type: READ_LIKES_IMAGE,
  payload: like,
});

export const createLikeThunk = (like) => async (dispatch) => {
  const { image_id, liker_id } = like;

  const res = await fetch("/api/likes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: image_id,
      liker_id: liker_id,
    }),
  });
  if (res.ok) {
    const finalResponse = await res.json();
    dispatch(createLike(finalResponse));
    return finalResponse;
  } else {
    return "something went wrong when creating like";
  }
};

export const getLikesByImage = (imageId) => async (dispatch) => {
  let response = await fetch(`/api/likes/image/${imageId}`);
  if (response.ok) {
    let data = await response.json();
    dispatch(imagesLikes(data));
  }
};

export const getLikesByUser = (userId) => async (dispatch) => {
  let response = await fetch(`/api/likes/user/${userId}`);
  if (response.ok) {
    let data = await response.json();
    dispatch(getUserLikes(data));
  }
};

export const deleteLikeThunk = (likeId) => async (dispatch) => {
  let response = await fetch(`/api/likes/${likeId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteLike(likeId));
    return response;
  }
};

const initialState = { imagesLikes: {}, userLikes: {} };

export default function likesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_LIKES:
      return { ...state, likes: action.payload };

    case CREATE_LIKE:
      return { ...state, userLikes: action.payload };

    case USER_LIKE:
      return { ...state, userLikes: action.payload };

    case READ_LIKES_IMAGE:
      let afterImageRead = { ...state };

      afterImageRead.imagesLikes = {};

      action.payload.forEach(
        (like) => (afterImageRead.imagesLikes[like.id] = like)
      );
      return afterImageRead;

    case READ_LIKES_USER:
      let afterImageRead2 = { ...state };

      afterImageRead2.userLikes = {};
      action.payload.forEach(
        (like) => (afterImageRead2.userLikes[like.id] = like)
      );

      return afterImageRead2;

    case DELETE_LIKE:
      let afterDelete = {
        ...state,
      };

      delete afterDelete["imagesLikes"][action.payload];

      delete afterDelete["userLikes"][action.payload];

      return afterDelete;

    default:
      return state;
  }
}
