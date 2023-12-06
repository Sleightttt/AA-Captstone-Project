const CREATE_FOLLOW = "likes/CREATE_FOLLOW";
const DELETE_FOLLOW = "likes/DELETE_FOLLOW";
const GET_ALL_FOLLOWS = "likes/GET_ALL_FOLLOWS";
// const USER_FOLLOW = "likes/USER_FOLLOW";
const READ_FOLLOWS_IMAGE = "likes/READ_FOLLOWS_IMAGE";
const READ_FOLLOWS_USER = "likes/READ_FOLLOWS_USER";

const createFollow = (follow) => ({
  type: CREATE_FOLLOW,
  payload: follow,
});

const getAllFollows = (follows) => ({
  type: GET_ALL_FOLLOWS,
  payload: follows,
});

const getUserFollows = (id) => ({
  type: READ_FOLLOWS_USER,
  payload: id,
});

const deleteFollow = (id) => ({
  type: DELETE_FOLLOW,
  payload: id,
});

export const createFollowThunk = (follow) => async (dispatch) => {
  const { follower_id, following_id } = follow;

  const res = await fetch("/api/follower/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      follower_id: follower_id,
      following_id: following_id,
    }),
  });
  if (res.ok) {
    const finalResponse = await res.json();
    dispatch(createFollow(finalResponse));
    return finalResponse;
  } else {
    return "something went wrong when creating follow";
  }
};

export const getAllFollowsThunk = () => async (dispatch) => {
  const response = await fetch("/api/follower/");
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllFollows(data));
    return data;
  }
};

// export const getFollowsByImage = (imageId) => async (dispatch) => {
//   let response = await fetch(`/api/likes/image/${imageId}`);
//   if (response.ok) {
//     let data = await response.json();
//     dispatch(imagesLikes(data));
//   }
// };

export const getFollowsByUser = (userId) => async (dispatch) => {
  let response = await fetch(`/api/follower/user/${userId}`);
  if (response.ok) {
    let data = await response.json();
    dispatch(getUserFollows(data));
  }
};

export const deleteFollowThunk = (followId) => async (dispatch) => {
  let response = await fetch(`/api/follower/${followId}`, {
    method: "DELETE",
  });
  // console.log(response.url);
  // console.log(response);
  if (response.ok) {
    // console.log("RESPONSE WAS OK");
    dispatch(deleteFollow(followId));
    return response;
  }
};

const initialState = { imagesFollows: {}, userFollows: {}, follows: {} };

export default function followerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_FOLLOWS:
      // console.log("action", action.payload);
      return { ...state, follows: action.payload };
    // case SET_ALL_IMAGES_BY_USER:
    //   return { ...state, allImagesByUser: action.payload };
    case CREATE_FOLLOW:
      let newnew = { ...state };
      newnew.userFollows[action.payload.id] = action.payload;
      return newnew;

    // case USER_FOLLOW:
    //   return { ...state, userFollows: action.payload };

    case READ_FOLLOWS_IMAGE:
      let afterImageRead = { ...state };

      afterImageRead.imagesFollows = {};
      // console.log("-----", action.payload);
      action.payload.forEach(
        (follow) => (afterImageRead.imagesFollows[follow.id] = follow)
      );
      return afterImageRead;

    case READ_FOLLOWS_USER:
      let afterImageRead2 = { ...state };

      afterImageRead2.userFollows = {};
      action.payload.forEach(
        (follow) => (afterImageRead2.userFollows[follow.id] = follow)
      );

      return afterImageRead2;

    case DELETE_FOLLOW:
      let afterDelete = {
        ...state,
      };

      delete afterDelete["imagesFollows"][action.payload];

      delete afterDelete["userFollows"][action.payload];

      return afterDelete;

    default:
      return state;
  }
}
