import React from "react";
import "./AboutPage.css";

function AboutPage() {
  return (
    <>
      <div className="aboutpage-container">
        <div className="aboutpage-left">
          <ul className="aboutpagee-left-links">
            <li className="aboutpage-left-link">ImageSpace blog</li>
            <li className="aboutpage-left-link">Community Guidelines</li>
            <li className="aboutpage-left-link">Jobs</li>
          </ul>
          <div className="needhelp">Need help?</div>
          <ul className="aboutpagee-left-links">
            <li className="aboutpage-left-link2">Visit our FAQ</li>
            <li className="aboutpage-left-link2">Get help by email</li>
          </ul>
        </div>
        <div className="aboutpage-right">
          <div className="aboutpage-header">About ImageSpace</div>
          <div className="aboutpage-h2">
            ImageSpace - almost certainly the best online photo management and
            sharing application in the world - has two main goals:
          </div>
          <div className="about-info">
            1. We want to help people make their photos available to the people
            who matter to them.
          </div>
          <div className="about-info-p">
            Maybe they want to keep a blog of moments captured on their
            cameraphone, or maybe they want to show off their best pictures or
            video to the whole world in a bid for web celebrity. Or maybe they
            want to securely and privately share photos of their kids with their
            family across the country. ImageSpace makes all these things
            possible and more!
          </div>
          <div className="about-info-p">
            To do this, we want to get photos and video into and out of the
            system in as many ways as we can: from the web, from mobile devices,
            from the users' home computers and from whatever software they are
            using to manage their content. And we want to be able to push them
            out in as many ways as possible: on the ImageSpace website, in RSS
            feeds, by email, by posting to outside blogs or ways we haven't
            thought of yet. What else are we going to use those smart
            refrigerators for?
          </div>
          <div className="about-info">
            2. We want to enable new ways of organizing photos and video.
          </div>
          <div className="about-info-p">
            Once you make the switch to digital, it is all too easy to get
            overwhelmed with the sheer number of photos you take or videos you
            shoot with that itchy trigger finger. Albums, the principal way
            people go about organizing things today, are great -- until you get
            to 20 or 30 or 50 of them. They worked in the days of getting rolls
            of film developed, but the "album" metaphor is in desperate need of
            a Florida condo and full retirement.
          </div>

          <div className="about-info-p">
            Part of the solution is to make the process of organizing photos or
            videos collaborative. In ImageSpace, you can give your friends,
            family, and other contacts permission to organize your stuff - not
            just to add comments, but also notes and tags. People like to ooh
            and ahh, laugh and cry, make wisecracks when sharing photos and
            videos. Why not give them the ability to do this when they look at
            them over the internet? And as all this info accretes as metadata,
            you can find things so much easier later on, since all this info is
            also searchable.
          </div>
          <div className="aboutpage-h2-2">
            ImageSpace continues to evolve in myriad ways, all of which are
            designed to make it easier and better. Check out the Flickr Blog to
            stay apprised of the latest developments. The fact that you've read
            to the end of this entire document and are hanging out at the bottom
            of this page with nothing but this silly text to keep you company is
            proof of a deep and abiding interest on your part. What are you
            waiting for? Go explore!
          </div>
          <div className="aboutpage-header">The Team</div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
