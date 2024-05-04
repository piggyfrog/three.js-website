import React, { useState } from "react";
const FlipPhoto = ({ photo, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  const flipPhotoClass = isFlipped
    ? "flipPhoto-inner flipped"
    : "flipPhoto-inner";
  const positionClass = `flipPhoto-pos-${index}`;
  return (
    <div className={positionClass} onClick={handleClick}>
      <div className={flipPhotoClass}>
        <img
          src={`/images/${photo}-front.png`}
          alt="photo"
          className="flipPhoto-front"
        />
        <img
          src={`/images/${photo}-back.png`}
          alt="photo"
          className="flipPhoto-back"
        />
      </div>
    </div>
  );
};

export default FlipPhoto;
