import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsByImage, imagesComments } from "../../store/comments";
import { useHistory, useParams } from "react-router-dom";
// import "./AllImages.css";

const Comments = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const images = useSelector((state) => state.images);
  const comments = useSelector((state) => state.comments.SingleImagesComments);
  const { id } = useParams();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getCommentsByImage(id));
  }, [dispatch]);
  console.log("these be they", comments);

  const commentArr = Object.values(comments);
  console.log(commentArr);
  return (
    <>
      <div className="comments-container">
        <div> Hello </div>
        {commentArr.map((comment) => (
          <div key={comment.id} className="single-comment">
            <div>{comment.comment}</div>
            <div>{comment.created_at}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Comments;
