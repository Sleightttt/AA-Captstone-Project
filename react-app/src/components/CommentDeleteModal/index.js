import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteCommentThunk, getCommentsByImage } from "../../store/comments";
import "./CommentDeleteModal.css";

function CommentDeleteModal({ setShowModal, imageId }) {
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const handleDeleteComment = async (e) => {
    e.preventDefault();
    dispatch(deleteCommentThunk(imageId))
      .then(() => {
        dispatch(getCommentsByImage(setShowModal));
      })
      .then(closeModal());
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div className="modal delete-button-modal">
      <div className="delete-header">
        Are you SURE you want to delete this Comment?
      </div>
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
