import React, { useEffect, useState, useRef } from "react";
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
  const [activeTab, setActiveTab] = useState(0);
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
    return Math.random() * (370 - 200) + 200;
  }

  // Pagination
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = allImg[0].slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="all-images-container fade-in-container">
        <div className="images-container">
          <div className="image-bar">
            <div
              className={activeTab === 0 ? "bar-item active-tab" : "bar-item"}
              onClick={() => setActiveTab(0)}
            >
              Explore
            </div>
            <div
              onClick={() => setActiveTab(1)}
              className={activeTab === 1 ? "bar-item active-tab" : "bar-item"}
            >
              Trending
            </div>
            <div
              onClick={() => setActiveTab(2)}
              className={activeTab === 2 ? "bar-item active-tab" : "bar-item"}
            >
              Events
            </div>
          </div>
          <div className="all-images">
            {currentImages.map((image) => (
              <div
                className="image-card"
                key={image.id}
                onClick={() => history.push(`/images/${image.id}`)}
              >
                <div style={{ position: "relative" }}>
                  {images.allImages.images.length > 0 ? (
                    <img
                      className="img-all"
                      style={{
                        width: `${randomWidth()}px`,
                        height: `200px`,
                        borderRadius: "7px",
                        margin: "2px",
                        paddingTop: `1px`,
                        zIndex: "1",
                        boxShadow: "0 0 3px rgba(0,0,0,0.5)",
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

                  <div className="image-overlay">
                    <div className="image-ol-box"> </div>
                    <div className="spacer"></div>
                    <div className="image-info-ctnr">
                      <div className="all-image-name">{image.name}</div>
                      <div className="image-ol-likes">
                        <div className="likes-bar">
                          {image.likes_count}
                          <i className="fas fa-solid fa-heart small-icon" />
                        </div>
                        <div className="likes-bar">
                          {image.comments_count}
                          <i className="fas fa-comment small-icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
