// ! constants
const CREATE_COMMENT = "create Comment";

const READ_COMMENT_ONE = "Read Comments by id";
const READ_COMMENT_USERS = "Read a Users Comments";
const READ_COMMENT_IMAGE = "Read a images comments";
const UPDATE_COMMENT = "update Comment";
const DELETE_COMMENT = "delete Comment";

// # actions creators

export function createComment(formData) {
  return { type: CREATE_COMMENT, payload: formData };
}
export function deleteComment(commentId) {
  return { type: DELETE_COMMENT, payload: commentId };
}

export function updateComment(comment) {
  return { type: UPDATE_COMMENT, payload: comment };
}

export function SingleComment(comment) {
  return { type: READ_COMMENT_ONE, payload: comment };
}

export function UsersComments(comment) {
  return { type: READ_COMMENT_USERS, payload: comment };
}

export function imagesComments(comment) {
  return { type: READ_COMMENT_IMAGE, payload: comment };
}
// Thunks

export const CreateCommentThunk = (CommentData) => async (dispatch) => {
  // console.log("---", CommentData);
  let { user_id, image_id, comment } = CommentData;

  const response = await fetch(`/api/comments/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id, image_id, comment }),
  });
  if (response.ok) {
    let formData = await response.json();
    dispatch(createComment(formData));
    return formData;
  }
};

export const UpdateCommentThunk = (CommentData) => async (dispatch) => {
  let { comment } = CommentData;

  const response = await fetch(`/api/comments/${CommentData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comment,
    }),
  });
  if (response.ok) {
    let data = await response.json();
    dispatch(updateComment(data));
    return data;
  }
};

export const grabACommentThunk = (commentId) => async (dispatch) => {
  let comment = await fetch(`api/comments/${commentId}`, { method: "GET" });
  // console.log("prethunk");

  if (comment.ok) {
    let res = await comment.json();
    dispatch(SingleComment(res));
    // console.log("thunk hit", res);
    return res;
  }
};

export const getCommentsByUser = (userId) => async (dispatch) => {
  let response = await fetch(`/api/comments/user/${userId}`);
  if (response.ok) {
    let data = await response.json();
    dispatch(UsersComments(data));
  }
};

export const getCommentsByImage = (imageId) => async (dispatch) => {
  let response = await fetch(`/api/comments/image/${imageId}`);
  if (response.ok) {
    let data = await response.json();
    dispatch(imagesComments(data));
  }
};

export const deleteCommentThunk = (commentId) => async (dispatch) => {
  // console.log("INSIDE DELETE THUNK");
  let response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  // console.log(response.url);
  // console.log(response);
  if (response.ok) {
    // console.log("RESPONSE WAS OK");
    dispatch(deleteComment(commentId));
    return response;
  }
};

const initialState = { LoggedInUsersComments: {}, SingleImagesComments: {} };

const CommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMMENT:
      let afterCreate = { ...state };
      afterCreate["LoggedInUsersComments"] = {
        ...state.LoggedInUsersComments,
        [action.payload.id]: action.payload,
      };
      afterCreate["SingleImagesComments"] = {
        ...state.SingleImagesComments,
        [action.payload.id]: action.payload,
      };

      return afterCreate;

    case UPDATE_COMMENT:
      let afterUpdate = { ...state };
      afterUpdate["LoggedInUsersComments"] = {
        ...state.LoggedInUsersComments,
        [action.payload.id]: action.payload,
      };
      afterUpdate["SingleImagesComments"] = {
        ...state.SingleImagesComments,
        [action.payload.id]: action.payload,
      };

      return afterUpdate;

    case READ_COMMENT_IMAGE:
      let afterImageRead = { ...state };

      afterImageRead.SingleImagesComments = {};
      action.payload.forEach(
        (comment) => (afterImageRead.SingleImagesComments[comment.id] = comment)
      );
      // console.log("read hit", action.payload);
      return afterImageRead;

    case READ_COMMENT_USERS:
      let afterRead = { ...state };
      action.payload.forEach(
        (comment) => (afterRead.LoggedInUsersComments[comment.id] = comment)
      );
      return afterRead;

    case DELETE_COMMENT:
      let afterDelete = {
        ...state,
      };
      // console.log(action.payload, "---");
      delete afterDelete["LoggedInUsersComments"][action.payload];
      delete afterDelete["SingleImagesComments"][action.payload];

      return afterDelete;

    default:
      return state;
  }
};

export default CommentsReducer;
