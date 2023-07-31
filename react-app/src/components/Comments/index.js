import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateCommentThunk, getCommentsByImage } from "../../store/comments";
import { useParams } from "react-router-dom";
import "./Comments.css";
import OpenModalButton from "../OpenModalButton";
import CommentFormModal from "../CommentFormModal";
import { getSingleImage } from "../../store/images";
import CommentDeleteModal from "../CommentDeleteModal";
import OpenDeleteModal from "../OpenDeleteModal";

const Comments = () => {
  const dispatch = useDispatch();

  const comments = useSelector((state) => state.comments.SingleImagesComments);
  const imageId = useSelector((state) => state.images.singleImage.id);
  const { id } = useParams();
  const user = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getCommentsByImage(id));
    dispatch(getSingleImage(id));
  }, [dispatch]);

  const handleNewComment = () => {
    if (showMenu) setShowMenu(false);
    else {
      setShowMenu(true);
    }
  };

  const commentHandler = async () => {
    dispatch(getSingleImage(imageId));
    dispatch(getCommentsByImage(imageId));
    setComment("");
  };

  const handleNewCommentSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!comment || comment.length < 1) {
      newErrors["comment"] =
        "Please enter a comment between 1 and 255 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      closeMenu();
      setErrors({});
      return await dispatch(
        CreateCommentThunk({
          user_id: user.id,
          comment: comment,
          image_id: imageId,
        })
      ).then(commentHandler);
    }
  };

  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };

  const dateHandler = (date) => {
    let formatDate = new Date(date);
    let full = `${formatDate.toDateString()} `;

    return full;
  };

  const newComment = "new-comment" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  const commentArr = Object.values(comments).reverse();

  return (
    <>
      <div className="comments-container">
        <button className="new-comment-button" onClick={handleNewComment}>
          <i className="fas fas fa-comment fa-lg black"></i>
          <i className="fas fas fa-plus fa-lg plus black"></i>{" "}
        </button>
        <div className={newComment}>
          <div className="new-comment-container">
            <div className="form-item">
              {comment.length > 255 ? (
                <div className="error">Comment too long</div>
              ) : (
                ""
              )}
              {errors["comment"] && (
                <div className="error">{errors["comment"]}</div>
              )}
            </div>
            <form
              className="new-comment"
              onSubmit={() => handleNewCommentSubmit}
            >
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="new-comment-text"
              ></textarea>
              <button
                className="new-comment-submit-button"
                onClick={handleNewCommentSubmit}
                disabled={comment.length > 255 || comment.length < 1}
              >
                Create Comment
              </button>
            </form>
          </div>
        </div>

        {commentArr.map((comment) => (
          <div key={comment.id} className="single-comment">
            <div>{dateHandler(comment.created_at)}</div>
            <div className="comment-body">{comment.comment}</div>

            {user?.id !== comment.user_id ? (
              <div></div>
            ) : (
              <>
                <div className="icon-bar">
                  <OpenModalButton
                    className="login-signup"
                    itemText="Delete Review"
                    modalComponent={<CommentFormModal props={comment.id} />}
                  />
                  <OpenDeleteModal
                    className="login-signup"
                    itemText="Delete Review"
                    modalComponent={
                      <CommentDeleteModal
                        imageId={comment.id}
                        setShowModal={id}
                      />
                    }
                  />{" "}
                  {/* <i className="fas fa-trash"></i> */}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Comments;
