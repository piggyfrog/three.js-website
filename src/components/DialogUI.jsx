import { useState, useEffect } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useDialogStore } from "../hooks/store";
import { useTranslation } from "react-i18next";
import { useLockCameraStore } from "../hooks/store";
import { useActionStore } from "../hooks/store";
import FlipPhoto from "./flipPhoto";

const DialogSelectDict = {
  fruit: {
    withMultiPage: true,
    pageAmount: 5,
    withSelect: false,
    withPersonArt: true,
    personArtPath: "/images/young-grandma.png",
  },
  radio: {
    withMultiPage: true,
    pageAmount: 3,
    isItem: true,
    withPersonArt: true,
    personArtPath: "/images/young-grandma.png",
    itemImgPath: "/images/radio.png",
    withSelect: true,
    selectAmount: 2,
    selectFunctions: {
      0: "action-ChangeScene3",
      1: "action-ChangeScene3",
    },
  },
  diary: {
    withMultiPage: true,
    pageAmount: 2,
    withSelect: true,
    selectAmount: 2,
    isItem: true,
    itemImgPath: "/images/radio.png",
    selectFunctions: {
      0: "diary2",
      1: "diary3",
    },
  },
  diary2: {
    withMultiPage: true,
    pageAmount: 2,
    withSelect: true,
    selectAmount: 2,
    isItem: true,
    itemImgPath: "/images/radio.png",
    selectFunctions: {
      0: "diary4",
      1: "diary5",
    },
  },
  diary3: {
    withMultiPage: true,
    pageAmount: 2,
    withSelect: true,
    selectAmount: 2,
    isItem: true,
    itemImgPath: "/images/radio.png",
    selectFunctions: {
      0: "diary5",
      1: () => console.log("hello"),
    },
  },
  diary4: {
    withMultiPage: true,
    pageAmount: 2,
    withSelect: true,
    selectAmount: 2,
    isItem: true,
    itemImgPath: "/images/radio.png",
    selectFunctions: {
      0: "diary6",
      1: "diary7",
    },
  },
  diary5: {
    withMultiPage: false,
    pageAmount: 1,
    withSelect: false,
  },
  diary6: {
    withMultiPage: false,
    pageAmount: 1,
    withSelect: false,
  },
  diary7: {
    withMultiPage: false,
    pageAmount: 1,
    withSelect: false,
  },
  album: {
    withMultiPage: true,
    pageAmount: 2,
    withSelect: true,
    selectAmount: 2,
    selectFunctions: {
      0: "album2",
      1: "album4",
    },
  },
  album2: {
    withMultiPage: false,
    pageAmount: 1,
    withSelect: true,
    selectAmount: 1,
    isItem: true,
    itemImgPath: "/images/radio.png",
    selectFunctions: {
      0: "album3",
    },
  },
  album3: {
    withMultiPage: false,
    pageAmount: 1,
    withSelect: false,
  },
  album4: {
    withMultiPage: false,
    pageAmount: 1,
    withSelect: true,
    selectAmount: 1,
    isItem: true,
    itemImgPath: "/images/radio.png",
    selectFunctions: {
      0: "album5",
    },
  },
  album5: {
    withMultiPage: false,
    pageAmount: 1,
    withSelect: false,
  },
  video1: {
    withMultiPage: false,
    pageAmount: 1,
    withSelect: false,
  },
  video2: {
    withMultiPage: false,
    pageAmount: 1,
    withSelect: false,
  },
  video3: {
    withMultiPage: false,
    pageAmount: 1,
    withSelect: false,
  },
  video4: {
    withMultiPage: false,
    pageAmount: 1,
    withSelect: false,
  },
  video5: {
    withMultiPage: false,
    pageAmount: 1,
    withSelect: false,
  },
  laolao: {
    withMultiPage: true,
    pageAmount: 4,
    withSelect: true,
    selectAmount: 1,
    isItem: false,
    selectFunctions: {
      0: "action-playLaoLaoAnimation",
    },
  },
  laolao2: {
    withMultiPage: true,
    pageAmount: 3,
    withSelect: false,
    isItem: false,
  },
  laoyeback: {
    withMultiPage: false,
    isItem: false,
    withSelect: true,
    pageAmount: 1,
    selectAmount: 2,
    selectFunctions: {
      0: "action-closeDialog",
      1: "action-ChangeScene2",
    },
  },
  mamaback: {
    withMultiPage: false,
    isItem: false,
    withSelect: true,
    pageAmount: 1,
    selectAmount: 2,
    selectFunctions: {
      0: "action-closeDialog",
      1: "action-ChangeScene3",
    },
  },
};

const DialogUI = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sub, get] = useKeyboardControls();
  const dialogID = useDialogStore((state) => state.dialogID);
  const setDialogID = useDialogStore((state) => state.setDialogID);
  const setDialogClose = useDialogStore((state) => state.setClose);
  const { t } = useTranslation();
  const setLockCamera = useLockCameraStore((state) => state.setLockCamera);
  const setAction = useActionStore((state) => state.setAction);

  // determinate if the dialog is an item
  const { isItem, itemImgPath } = DialogSelectDict[dialogID] || {
    isItem: false,
    itemImgPath: "",
  };

  // determinate if the dialog has select options
  const { withSelect, selectAmount, selectFunctions } = DialogSelectDict[
    dialogID
  ] || {
    withSelect: false,
    selectAmount: 0,
  };

  // determinate if the dialog has person art
  const { withPersonArt, personArtPath } = DialogSelectDict[dialogID] || {
    withPersonArt: false,
    personArtPath: "",
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
    return sub(
      (state) => state.closeDialog,
      (pressed) => {
        if (pressed) {
          setDialogClose();
          setAction("");
          setLockCamera(false);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (!withSelect && !nextPageExist) {
      const id = setTimeout(() => {
        setDialogClose();
        setLockCamera(false);
      }, 5000);
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
          if (
            pressed &&
            typeof selectFunctions[activeIndex] === "string" &&
            !selectFunctions[activeIndex].includes("action")
          ) {
            setDialogID(selectFunctions[activeIndex]);
          } else if (
            pressed &&
            selectFunctions[activeIndex].includes("action")
          ) {
            setAction(selectFunctions[activeIndex].split("-")[1]);
            setDialogClose();
          }
        }
      }
    );
  }, [activeIndex, dialogKey, withSelect]);

  if (withSelect && selectAmount > 0 && !nextPageExist) {
    return (
      <div className="dialogBackground">
        {withPersonArt && (
          <img className="person-back" src="/images/person-back.png" />
        )}
        {withPersonArt && <img className="person" src={personArtPath} />}
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
    <>
      {isItem && (
        <div className="item-pic-background">
          <img src={itemImgPath} alt="item" className="item-img" />
        </div>
      )}

      <div className="dialogBackground">
        {withPersonArt && (
          <img className="person-back" src="/images/person-back.png" />
        )}
        {withPersonArt && <img className="person" src={personArtPath} />}
        <div className="dialog">
          {t(mainTextID)}
          {nextPageExist && (
            <div className="dialog-next">
              <img src="/images/next.png" className="next-png" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DialogUI;
