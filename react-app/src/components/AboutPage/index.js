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
          <div>
            ImageSpace - almost certainly the best online photo management and
            sharing application in the world - has two main goals:
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
