import React from "react";
import "./Prints.css";
const Prints = () => {


 

  return (
    <>
      <div className="prints-page-container">
        <div className="choose-container">
          <div className="choose-header"> Prints & Wall Art</div>
          <div className="choose-desc">
            Get stunning wall art and high-quality prints of your photos
          </div>
          <button
            onClick={() => alert("Feature coming soon")}
            className="choose-button"
          >
            Choose Photos
          </button>
        </div>
      </div>
      <div className="image-banner-1"></div>
      <div className="info-row">
        <div className="info-container">
          <div className="info">
            Metal Prints
            <div className="info-header">
              Metal prints deliver unparalleled color and vibrance to produce a
              depth and clarity unlike any other photographic wall art. If you
              want a print as bold as your most epic photos, look no further
              than metal prints.
            </div>
          </div>
        </div>
        <div className="info-container">
          <div className="info">
            Paper prints
            <div className="info-header">
              Paper prints are a time-honored way to show off and share your
              favorite photos. From stacks of 4x6s to frameable statement
              pieces, you’ll be able to find the perfect size and paper finish
              for any photo.
            </div>
          </div>
        </div>
        <div className="info-container">
          <div className="info">
            Canvas prints
            <div className="info-header">
              Add a little class to your home, office, or whatever other space
              needs a classic canvas print. With shapes and sizes perfect for
              wherever you want to hang your photos, your images will look
              outstanding.
            </div>
          </div>
        </div>
      </div>
      <div className="image-banner-2"></div>
      <div className="faq">FAQ</div>
      <div className="info-row2">
        <div className="info-container2">
          <div className="info">
            Who can print my photos?
            <div className="info-header">
              Only you can print your photos through ImageSpace. Visitors to
              your account will not see the option to buy prints of your photos.
            </div>
          </div>
        </div>
        <div className="info-container2">
          <div className="info">
            Where can I make a photo book?
            <div className="info-header">
              We partner with Blurb for both hard-cover and soft-cover photo
              books. Your ImageSpace photo stream and albums are seamlessly
              integrated into the book-making process. Check out photo books.
            </div>
          </div>
        </div>
        <div className="info-container2">
          <div className="info">
            What if something is wrong with my order?
            <div className="info-header">
              If you’re ever unhappy with your prints or wall art, ImageSpace
              will make it right. Simply send us an email within 30 days of
              receiving your order and we’ll help you out. If you have any
              issues, reach out to our Support Heroes.
            </div>
          </div>
        </div>
        <div className="info-container2">
          <div className="info">
            Who makes the prints and wall art?
            <div className="info-header">
              ImageSpace Prints benefit from years of experience that SmugMug
              has in printing beautiful imagery. Depending on your location,
              your prints will come from Bay Photo, White House Custom Colour,
              or Loxley Colour. All the labs we use have excellent color
              reproduction and fantastic reputations.
            </div>
          </div>
        </div>
        <div className="info-container2">
          <div className="info">
            How long does shipping take?
            <div className="info-header">
              We ship all over the world, including more than 160 countries. No
              matter where you are, we’ll get your prints to you as fast as we
              can. Expedited shipping is available to get your prints even
              faster.
            </div>
          </div>
        </div>
        <div className="info-container2">
          <div className="info">
            More questions on your mind?
            <div className="info-header">
              Please visit the ImageSpace Help Center for more information or to
              connect with a Support Hero.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prints;
