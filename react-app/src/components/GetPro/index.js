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
            <button
              onClick={() => alert("Pro coming soon!")}
              className="get-pro-button"
            >
              Get Started
            </button>
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
          <div className="slide-info-l1">
            <div className="slide-info-l-container-2">
              <div className="slide-info-right2"></div>
              <div className="slide-info-left">
                {" "}
                <div className="info space-text">
                  Ad-free browsing on ImageSpace for you and your visitors
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
              <div className="slide-info-right3"></div>
            </div>
          </div>
          <div className="slide-info-l1">
            <div className="slide-info-l-container-2">
              <div className="slide-info-right4"></div>
              <div className="slide-info-left">
                {" "}
                <div className="info space-text">
                  Premier product support.
                  <div className="info-header">
                    Why wait in line for help? ImageSpace Pros receive
                    top-priority assistance from our world-class support heroes,
                    so you can resolve your questions and get back to your
                    photography.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="slide-info-l-bottom">
          <div className="feature-card">
            <div className="feature-header-image">
              <img
                className="feature-header-image"
                src="https://images.unsplash.com/photo-1614285344846-2ac84a3acd92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                alt="promo"
              />
              <div className="feture-info-container">
                <div className="feature-title">SmugMug</div>
                <div className="feature-info">
                  With unlimited photo storage and website customization,
                  SmugMug is perfect for every photographer. Take 50% off the
                  first year for new subscriptions.
                </div>
              </div>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-header-image">
              <img
                className="feature-header-image"
                src="https://images.unsplash.com/photo-1621600411688-4be93cd68504?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
                alt="promo"
              />
              <div className="feture-info-container">
                <div className="feature-title">Blurb</div>
                <div className="feature-info">
                  Get $35 dollars off your Photo Book purchase up to 4 times a
                  year. Valid for orders of $70 or more.
                </div>
              </div>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-header-image">
              <img
                className="feature-header-image"
                src="https://images.unsplash.com/photo-1541257317361-ceec071c4b36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2673&q=80"
                alt="promo"
              />
              <div className="feture-info-container">
                <div className="feature-title">PHLEARN</div>
                <div className="feature-info">
                  ImageSpace Pro members get 1 free month, and unlimited access
                  to the #1 Photoshop & Lightroom course catalog in the world
                  for 35% off.
                </div>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-header-image">
              <img
                className="feature-header-image"
                src="https://images.unsplash.com/photo-1620674156044-52b714665d46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                alt="promo"
              />
              <div className="feture-info-container">
                <div className="feature-title">Priime</div>
                <div className="feature-info">
                  Get 20% off Priime’s Lightroom presets bundle, with 13
                  presents based on film aesthetics, and more than 100 total
                  variations.
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
          <button
            onClick={() => alert("Pro coming soon!")}
            className="get-pro-button"
          >
            Get Started
          </button>
        </div>
      </section>
    </>
  );
};

export default GetPro;
