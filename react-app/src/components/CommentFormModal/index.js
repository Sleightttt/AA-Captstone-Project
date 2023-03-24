import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./CommentFormModal.css";
import { useSelector } from "react-redux";
import { getSingleImage } from "../../store/images";
import {
  getCommentsByImage,
  updateComment,
  grabACommentThunk,
  SingleComment,
  UpdateCommentThunk,
} from "../../store/comments";

function CommentFormModal({ props }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);
  const commentz = useSelector((state) => state.comments.SingleImagesComments);

  let commzArr = Object.values(commentz);
  let sing = commzArr.find((el) => el.id == props);
  console.log(sing, "sing");

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeModal();
    return dispatch(
      UpdateCommentThunk({
        id: props,
        comment: comment,
      })
    );
  };

  useEffect(() => {
    setComment(sing.comment);
  }, []);

  return (
    <>
      <div className="reviewModal">
        <h1>Edit your comment</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Description</label>
          <textarea
            value={comment}
            className="review-textarea"
            placeholder="Write your comment here"
            type="text"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <button type="submit" className="review-button-submit">
            Submit Comment
          </button>
        </form>
      </div>
    </>
  );
}

export default CommentFormModal;
