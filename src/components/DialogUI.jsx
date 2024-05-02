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
    selectMultiPageAmount: 2,
    selectFunctions: {
      0: "text",
      1: () => console.log("hello"),
    },
  },
};

const DialogUI = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
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
  const { withMultiPage, pageAmount, selectMultiPageAmount, selectFunctions } =
    DialogSelectDict[dialogID] || {
      withMultiPage: false,
      pageAmount: 1,
      selectMultiPageAmount: 1,
    };

  const [dialogKey, setDialogKey] = useState(0);

  const mainTextID = !isSelected
    ? `${dialogID}-${dialogKey}`
    : `${dialogID}-select-${activeIndex}-text-${dialogKey}`;

  useEffect(() => {
    if (
      (!withSelect && dialogKey === pageAmount - 1) ||
      (dialogKey === selectMultiPageAmount - 1 && isSelected)
    ) {
      const id = setTimeout(() => {
        setDialogClose();
      }, 10000);
      return () => {
        clearTimeout(id);
      };
    }
    return;
  }, [dialogID, dialogKey, isSelected]);

  useEffect(() => {
    if (!withMultiPage) return;
    return sub(
      (state) => state.nextPage,
      (pressed) => {
        if (pressed) {
          if (!isSelected && dialogKey < pageAmount - 1) {
            setDialogKey((prev) => prev + 1);
          }
          if (isSelected && dialogKey < selectMultiPageAmount - 1) {
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

  useEffect(() => {
    if (!withSelect) return;
    return sub(
      (state) => state.select,
      (pressed) => {
        if (pressed && selectFunctions[activeIndex] === "text") {
          setIsSelected(true);
          setDialogKey(0);
        } else if (pressed && selectFunctions[activeIndex] !== "text") {
          selectFunctions[activeIndex]();
          setDialogClose();
        }
      }
    );
  }, [activeIndex]);

  if (
    withSelect &&
    selectAmount > 0 &&
    dialogKey === pageAmount - 1 &&
    !isSelected
  ) {
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
