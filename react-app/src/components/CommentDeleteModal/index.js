// create delete product modal

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteCommentThunk, getCommentsByImage } from "../../store/comments";
import {
  deleteImage,
  getImagesDetails,
  getAllImages,
} from "../../store/images";
import "./CommentDeleteModal.css";

function CommentDeleteModal({ setShowModal, imageId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleDeleteComment = () => {
    dispatch(deleteCommentThunk(imageId)).then(() => {
      dispatch(getCommentsByImage(imageId));
      closeModal();
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="modal">
      <h3>Are you SURE you want to delete this Image?</h3>
      <button className="delete-button-model yes" onClick={handleDeleteComment}>
        Yes
      </button>
      <button className="delete-button-model" onClick={handleCloseModal}>
        No
      </button>
    </div>
  );
}

export default CommentDeleteModal;
