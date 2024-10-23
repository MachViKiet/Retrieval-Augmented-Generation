import React, { useEffect, useState } from 'react'

function TypingEffect ({ text, speed }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;

      if (index === text.length) {
        clearInterval(intervalId);  // Dừng khi hoàn thành chuỗi
      }
    }, speed);

    return () => clearInterval(intervalId);  // Xóa interval khi component unmount
  }, [text, speed]);

  return <div>{displayedText}</div>;
};

export default TypingEffect 
