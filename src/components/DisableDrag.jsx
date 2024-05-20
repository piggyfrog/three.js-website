import React, { useEffect } from 'react';

const DisableDragForPngImages = () => {
  useEffect(() => {
    const preventDrag = (e) => {
      if (e.target.nodeName === "IMG" && e.target.src.endsWith('.png')) {
        e.preventDefault();
      }
    };

    document.addEventListener('dragstart', preventDrag);
    
    // 清理函数
    return () => {
      document.removeEventListener('dragstart', preventDrag);
    };
  }, []);

  return null;
};

export default DisableDragForPngImages;