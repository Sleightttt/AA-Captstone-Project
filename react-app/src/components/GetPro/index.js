import React from "react";
import "./GetPro.css";
const GetPro = () => {
  return (
    <>
      <section>
        <div className="get-pro-container">
          <div className="get-pro-image">
            <div>
              <span className="blue">Image</span>
              <span className="purple">Space</span> pro
            </div>
            <div className="get-pro-tag">The ideal ImageSpace experience</div>
            <button className="get-pro-button">Get Started</button>
          </div>
          <div className="slide-info-l">
            <div className="slide-info-l-container">
              <div className="slide-info-left">
                <div className="info">
                  Advanced stats on your photos and videos
                  <div className="info-header">
                    Gain an understanding of how people are discovering your
                    ImageSpace Photos. See which of your photos are trending
                    now, and which have performed the best over the life of your
                    ImaceSpace Pro account.
                  </div>
                </div>
              </div>
              <div className="slide-info-right"></div>
            </div>
          </div>
          <div className="slide-info-l">
            <div className="slide-info-l-container-2">
              <div className="slide-info-right"></div>
              <div className="slide-info-left">
                {" "}
                <div className="info space-text">
                  Ad-free browsing on Flickr for you and your visitors
                  <div className="info-header">
                    Enjoy a fully ad-free experience across all of Flickr.
                    Visitors to your account will never see an ad on your
                    photostream, albums, profile, or any of your photos. Learn
                    more.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="slide-info-l">
            <div className="slide-info-l-container">
              <div className="slide-info-left">
                <div className="info">
                  Unlimited uploads and worry-free photo backup
                  <div className="info-header">
                    Upload as many photos as you can take, always at true full
                    resolution. With Auto-Uploadr, quickly and easily back up
                    your entire photo collection from your phone, computer, hard
                    drives, Dropbox, Adobe Lightroom, and more.
                  </div>
                </div>
              </div>
              <div className="slide-info-right"></div>
            </div>
          </div>
          <div className="slide-info-l">
            <div className="slide-info-l-container-2">
              <div className="slide-info-right"></div>
              <div className="slide-info-left">
                {" "}
                <div className="info space-text">
                  Premier product support.
                  <div className="info-header">
                    Why wait in line for help? Flickr Pros receive top-priority
                    assistance from our world-class support heroes, so you can
                    resolve your questions and get back to your photography.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="get-pro-image">
          <div>
            <span className="blue">Image</span>
            <span className="purple">Space</span> pro
          </div>
          <div className="get-pro-tag">The ideal ImageSpace experience</div>
          <button className="get-pro-button">Get Started</button>
        </div>
      </section>
    </>
  );
};

export default GetPro;
