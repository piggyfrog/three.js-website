import { useState, useEffect } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useDialogStore } from "../hooks/store";
import { useTranslation } from "react-i18next";

const DialogSelectDict = {
  fruit: {
    withSelect: true,
    selectAmount: 2,
  },
  radio: {
    withMultiPage: true,
    pageAmount: 2,
  },
};
const DialogUI = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sub, get] = useKeyboardControls();
  const dialogID = useDialogStore((state) => state.dialogID);
  const setDialogClose = useDialogStore((state) => state.setClose);
  const { t } = useTranslation();

  // determinate if the dialog has select options
  const { withSelect, selectAmount } = DialogSelectDict[dialogID] || {
    withSelect: false,
    selectAmount: 0,
  };

  // determinate if the dialog has multiple pages
  const { withMultiPage, pageAmount } = DialogSelectDict[dialogID] || {
    withMultiPage: false,
    pageAmount: 0,
  };

  const [dialogKey, setDialogKey] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setDialogClose();
    }, 10000);
    return () => {
      clearTimeout(id);
    };
  }, [dialogID]);

  useEffect(() => {
    if (!withMultiPage) return;
    return sub(
      (state) => state.nextPage,
      (pressed) => {
        if (pressed) {
          console.log(dialogKey, pageAmount);
          if (dialogKey < pageAmount - 1) {
            setDialogKey((prev) => prev + 1);
          }
        }
      }
    );
  }, [dialogKey]);

  useEffect(() => {
    if (!withSelect) return;
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
    if (!withSelect) return;
    return sub(
      (state) => state.selectDown,
      (pressed) => {
        if (pressed) {
          setActiveIndex((prev) => (prev === 1 ? 0 : prev + 1));
        }
      }
    );
  }, []);

  const mainTextID = `${dialogID}-${dialogKey}`;

  if (withSelect && selectAmount > 0) {
    return (
      <div className="dialogBackground">
        <img className="person-back" src="/images/person-back.png" />
        <img className="person" src="/images/young-grandma.png" />
        <div className="dialog">{t(mainTextID)}</div>
        <div className="options">
          {Array.from({ length: selectAmount }).map((_, index) => (
            <div className="option-item" key={index}>
              <img
                src="/images/select.png"
                alt="select arrow"
                className={`select-png ${
                  index === activeIndex ? "" : " hidden"
                }`}
              />
              <p className="option-text">{t(`${dialogID}-select-${index}`)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="dialogBackground">
      <img className="person-back" src="/images/person-back.png" />
      <img className="person" src="/images/young-grandma.png" />
      <div className="dialog">{t(mainTextID)}</div>
    </div>
  );
};

export default DialogUI;
