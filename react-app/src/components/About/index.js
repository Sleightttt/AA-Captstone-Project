import React from "react";
import "./About.css";
const About = () => {
  return (
    <>
      <div className="about-container">
        <div className="link-header">
          <div
            className="bottom-nav-item"
            onClick={() => alert("Feature coming soon")}
          >
            About
          </div>
          <div
            className="bottom-nav-item"
            onClick={() => alert("Feature coming soon")}
          >
            Jobs
          </div>
          <div
            className="bottom-nav-item"
            onClick={() => alert("Feature coming soon")}
          >
            Blog
          </div>
          <div
            className="bottom-nav-item"
            onClick={() => alert("Feature coming soon")}
          >
            Developers
          </div>
          <div
            className="bottom-nav-item"
            onClick={() => alert("Feature coming soon")}
          >
            Guidelines
          </div>
          <div
            className="bottom-nav-item"
            onClick={() => alert("Feature coming soon")}
          >
            Help
          </div>
          <div
            className="bottom-nav-item"
            onClick={() => alert("Feature coming soon")}
          >
            Report Abuse
          </div>
        </div>
        <div className="links">
          Brennan Cota:&nbsp; <a href="https://github.com/Sleightttt">Github</a>
          &nbsp;•&nbsp;
          <a href="https://www.linkedin.com/in/brennan-cota-11768aa6/">
            Linkedin
          </a>
        </div>
      </div>
    </>
  );
};

export default About;
