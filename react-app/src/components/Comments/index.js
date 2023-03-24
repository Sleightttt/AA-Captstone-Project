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

  const handleDelete = () => {};
  const handleEdit = () => {};

  const handleNewCommentSubmit = async (e) => {
    // console.log(props, "props");
    e.preventDefault();

    closeMenu();
    return await dispatch(
      CreateCommentThunk({
        user_id: user.id,
        comment: comment,
        image_id: imageId,
      })
    ).then(commentHandler);
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  const newComment = "new-comment" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  const commentArr = Object.values(comments);
  console.log(commentArr);
  return (
    <>
      <div className="comments-container">
        <button className="new-comment-button" onClick={handleNewComment}>
          <i className="fas fas fa-comment fa-lg black"></i>
          <i className="fas fas fa-plus fa-lg plus black"></i>{" "}
        </button>
        <div className={newComment}>
          <div className="new-comment-container">
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
              >
                Create Comment
              </button>
            </form>
          </div>
        </div>

        {commentArr.map((comment) => (
          <div key={comment.id} className="single-comment">
            <div>{comment.created_at}</div>
            <div className="comment-body">{comment.comment}</div>

            {user.id !== comment.user_id ? (
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
