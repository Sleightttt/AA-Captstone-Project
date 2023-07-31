import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./CommentFormModal.css";
import { useSelector } from "react-redux";

import { UpdateCommentThunk } from "../../store/comments";

function CommentFormModal({ props }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const commentz = useSelector((state) => state.comments.SingleImagesComments);

  let commzArr = Object.values(commentz);
  let sing = commzArr.find((el) => el.id == props);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!comment || comment.length < 1) {
      newErrors["comment"] =
        "Please enter a comment between 1 and 255 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      closeModal();
      return dispatch(
        UpdateCommentThunk({
          id: props,
          comment: comment,
        })
      );
    }
  };
  useEffect(() => {
    setComment(sing.comment);
  }, []);

  return (
    <>
      <div className="edit-button-modal">
        <h1 className="edit-header">Edit your comment</h1>
        <div className="form-item">
          {" "}
          {errors["comment"] && (
            <div className="error">{errors["comment"]}</div>
          )}
        </div>
        <form className="edit-form" onSubmit={handleSubmit}>
          <label className="edit-desc">Description</label>
          <textarea
            value={comment}
            className="edit-textarea"
            placeholder="Write your comment here"
            type="text"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <button type="submit" className="edit-button-submit">
            Submit Edit
          </button>
        </form>
      </div>
    </>
  );
}

export default CommentFormModal;
