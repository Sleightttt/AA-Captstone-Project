import React from "react";
import "./About.css";
const About = () => {
  return (
    <>
      <div className="about-container">
        <div className="link-header">
          <div className="bottom-nav-item">About</div>
          <div className="bottom-nav-item">Jobs</div>
          <div className="bottom-nav-item">Blog</div>
          <div className="bottom-nav-item">Developers</div>
          <div className="bottom-nav-item">Guidelines</div>
          <div className="bottom-nav-item">Help</div>
          <div className="bottom-nav-item">Report Abuse</div>
        </div>
        <div className="links">
          Brennan Cota:&nbsp;{" "}
          <a
            className="purple"
            href="https://github.com/Sleightttt"
            target="_blank"
          >
            Github
          </a>
          &nbsp;•&nbsp;
          <a
            className="purple"
            href="https://www.linkedin.com/in/brennan-cota-11768aa6/"
            target="_blank"
          >
            Linkedin
          </a>
        </div>
      </div>
    </>
  );
};

export default About;
