// create delete product modal

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteImage, getAllImages } from "../../store/images";
import "./DeleteImage.css";

function DeleteImage({ setShowModal, imageId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDeleteImage = () => {
    dispatch(deleteImage(imageId)).then(() => {
      dispatch(getAllImages());
      history.push("/images");
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="modal">
      <h3>Are you SURE you want to delete this Image?</h3>
      <button className="delete-button-model yes" onClick={handleDeleteImage}>
        Yes
      </button>
      <button className="delete-button-model" onClick={handleCloseModal}>
        No
      </button>
    </div>
  );
}

export default DeleteImage;
