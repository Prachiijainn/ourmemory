import React from "react";
import HTMLFlipBook from "react-pageflip";
import "./Flipbook.css";

const Flipbook = () => {
  return (
    <div className="flipbook-wrapper">
      <HTMLFlipBook width={300} height={400} showCover={true} className="flipbook">

    <div className="page cover-page">
    <img src="/assets/cover.jpg" alt="Memory Lane Cover" />
    </div>

        <div className="page"><img src="/assets/flipbook_page_1.jpg" alt="Page 1" /></div>
        <div className="page"><img src="/assets/flipbook_page_2.jpg" alt="Page 2" /></div>
        <div className="page"><img src="/assets/flipbook_page_3.jpg" alt="Page 3" /></div>
       
    <div className="page cover-page">
    <img src="/assets/back.jpg" alt="Back Cover" />
    </div>
      </HTMLFlipBook>
    </div>
  );
};

export default Flipbook;
