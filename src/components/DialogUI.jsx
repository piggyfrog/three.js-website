import { useState, useEffect } from "react";
import { useKeyboardControls } from "@react-three/drei";

const DialogUI = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sub, get] = useKeyboardControls();
  useEffect(() => {
    return sub(
      (state) => state.selectUp,
      (pressed) => {
        if (pressed) {
          setActiveIndex((prev) => (prev === 0 ? 1 : prev - 1));
        }
      }
    );
  }, []);

  useEffect(() => {
    return sub(
      (state) => state.selectDown,
      (pressed) => {
        if (pressed) {
          setActiveIndex((prev) => (prev === 1 ? 0 : prev + 1));
        }
      }
    );
  }, []);

  return (
    <div className="dialogBackground">
      <img className="person-back" src="/images/person-back.png" />
      <img className="person" src="/images/young-grandma.png" />
      <div className="dialog">
        我记得不论哪次家里来客人，你姥姥、姥爷总会在桌子上摆上果盘...
        哪怕到现在依旧这样，家里的水果永远没吃完又要买...他们总有自己的坚持...
      </div>
      <div className="options">
        <div className="option-item">
          <img
            src="/images/select.png"
            alt="select arrow"
            className={`select-png ${0 === activeIndex ? "" : " hidden"}`}
          />
          <p className="option-text">原来是这样的......</p>
        </div>

        <div className="option-item">
          <img
            src="/images/select.png"
            alt="select arrow"
            className={`select-png ${1 === activeIndex ? "" : " hidden"}`}
          />
          <p className="option-text">能跟我讲讲吗（进入回忆）</p>
        </div>
      </div>
    </div>
  );
};

export default DialogUI;
