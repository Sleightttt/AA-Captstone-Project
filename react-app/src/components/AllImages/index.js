import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllImages } from "../../store/images";
import { useHistory } from "react-router-dom";
import "./AllImages.css";

const AllImages = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const images = useSelector((state) => state.images);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(20);
  let allImg = images.allImages;

  useEffect(() => {
    dispatch(getAllImages());
  }, [dispatch]);

  allImg = Object.values(allImg);

  if (allImg.length === 0) {
    return (
      <div className="spinner">
        <i className="fas fa-spinner"></i>
      </div>
    );
  }

  function randomWidth() {
    return Math.random() * (400 - 200) + 200;
  }

  // Get current images based on pagination
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = allImg[0].slice(indexOfFirstImage, indexOfLastImage);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="all-images-container fade-in-container">
        <div></div>
        <div className="images-container">
          {currentImages.map((image) => (
            <div
              className="image-card"
              key={image.id}
              onClick={() => history.push(`/images/${image.id}`)}
            >
              <div>
                {images.allImages.images.length > 0 ? (
                  <img
                    style={{
                      width: `${randomWidth()}px`,
                      height: `200px`,
                      borderRadius: "7px",
                      margin: "2px",
                      paddingTop: `1px`,
                      zIndex: "1",
                    }}
                    src={image.url}
                    alt={image.name}
                  />
                ) : (
                  <img
                    style={{
                      width: "300px",
                      height: "250px",
                      borderRadius: "7px",
                      border: "2px solid white",
                    }}
                    src="https://i.imgur.com/6XK9X4u.png"
                    alt={image.name}
                  />
                )}
              </div>
              {/* </Link> */}
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        {Array.from({
          length: Math.ceil(allImg[0].length / imagesPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default AllImages;
