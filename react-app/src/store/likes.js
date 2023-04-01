const CREATE_LIKE = "likes/CREATE_LIKE";
const DELETE_LIKE = "likes/DELETE_LIKE";
const GET_ALL_LIKES = "likes/GET_ALL_LIKES";

const createLike = (like) => ({
  type: CREATE_LIKE,
  payload: like,
});

const getAllLikes = (likes) => ({
  type: GET_ALL_LIKES,
  payload: likes,
});

const deleteLike = () => ({
  type: DELETE_LIKE,
});

export const createLikeThunk = (like) => async (dispatch) => {
  console.log("hit create thunk");
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

const initialState = { likes: {}, userLikes: {} };

export default function likesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_LIKES:
      return { ...state, likes: action.payload };
    // case SET_ALL_IMAGES_BY_USER:
    //   return { ...state, allImagesByUser: action.payload };
    case CREATE_LIKE:
      return { ...state, likes: action.payload };
    // case DELETE_LIKE:
    //   return { ...state, singleImage: {} };
    default:
      return state;
  }
}
