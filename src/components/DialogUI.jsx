import { useState, useEffect } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useDialogStore } from "../hooks/store";
import { useTranslation } from "react-i18next";

const DialogSelectDict = {
  fruit: {
    withSelect: true,
    selectAmount: 2,
    pageAmount: 1,
    withMultiPage: false,
  },
  radio: {
    withMultiPage: true,
    pageAmount: 2,
    withSelect: true,
    selectAmount: 2,
    selectFunctions: {
      0: "radio2",
      1: () => console.log("hello"),
    },
  },
  radio2: {
    withMultiPage: true,
    pageAmount: 2,
    withSelect: true,
    selectAmount: 2,
    selectFunctions: {
      0: "radio3",
      1: () => console.log("hello"),
    },
  },
  radio3: {
    withMultiPage: true,
    pageAmount: 2,
    withSelect: false,
    selectAmount: 0,
  },
};

const DialogUI = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sub, get] = useKeyboardControls();
  const dialogID = useDialogStore((state) => state.dialogID);
  const setDialogID = useDialogStore((state) => state.setDialogID);
  const setDialogClose = useDialogStore((state) => state.setClose);
  const { t } = useTranslation();

  // determinate if the dialog has select options
  const { withSelect, selectAmount, selectFunctions } = DialogSelectDict[
    dialogID
  ] || {
    withSelect: false,
    selectAmount: 0,
  };

  // determinate if the dialog has multiple pages
  const { withMultiPage, pageAmount } = DialogSelectDict[dialogID] || {
    withMultiPage: false,
    pageAmount: 1,
  };

  const [dialogKey, setDialogKey] = useState(0);

  const mainTextID = `${dialogID}-${dialogKey}`;

  const nextPageExist = dialogKey < pageAmount - 1;

  // reset when dialog is cloesd or dialogID changes

  useEffect(() => {
    setDialogKey(0);
    setActiveIndex(0);
  }, [dialogID]);

  useEffect(() => {
    if (!withSelect && !nextPageExist) {
      const id = setTimeout(() => {
        setDialogClose();
      }, 10000);
      return () => {
        clearTimeout(id);
      };
    }
    return;
  }, [dialogID, dialogKey]);

  useEffect(() => {
    if (!withMultiPage) return;
    return sub(
      (state) => state.nextPage,
      (pressed) => {
        if (pressed) {
          if (nextPageExist) {
            setDialogKey((prev) => prev + 1);
          }
        }
      }
    );
  }, [dialogKey, dialogID]);

  useEffect(() => {
    if (!withSelect) return;
    return sub(
      (state) => state.selectUp,
      (pressed) => {
        if (pressed && withSelect) {
          setActiveIndex((prev) => (prev === 0 ? 1 : prev - 1));
        }
      }
    );
  }, [withSelect]);

  useEffect(() => {
    if (!withSelect) return;
    return sub(
      (state) => state.selectDown,
      (pressed) => {
        if (pressed && withSelect) {
          setActiveIndex((prev) => (prev === 1 ? 0 : prev + 1));
        }
      }
    );
  }, [withSelect]);

  useEffect(() => {
    if (!withSelect) return;
    return sub(
      (state) => state.select,
      (pressed) => {
        if (dialogKey === pageAmount - 1) {
          if (pressed && typeof selectFunctions[activeIndex] === "string") {
            setDialogID(selectFunctions[activeIndex]);
          } else if (
            pressed &&
            typeof selectFunctions[activeIndex] !== "string"
          ) {
            selectFunctions[activeIndex]();
            setDialogClose();
          }
        }
      }
    );
  }, [activeIndex, dialogKey, withSelect]);

  if (withSelect && selectAmount > 0 && !nextPageExist) {
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
      <div className="dialog">
        {t(mainTextID)}{" "}
        {nextPageExist && <div className="dialog-next"> ⇒ </div>}
      </div>
    </div>
  );
};

export default DialogUI;
