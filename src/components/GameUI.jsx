import { useKeyboardControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import { useSettingStore, useLockCameraStore } from "../hooks/store";
const GameUI = () => {
  const [sub, get] = useKeyboardControls();

  const sound = useSettingStore((state) => state.sound);
  const openSetting = useSettingStore((state) => state.openSetting);
  const language = useSettingStore((state) => state.language);
  const setLanguage = useSettingStore((state) => state.setLanguage);
  const setOpenSetting = useSettingStore((state) => state.setOpenSetting);
  const setLockCamera = useLockCameraStore((state) => state.setLockCamera);
  useEffect(() => {
    return sub(
      (state) => state.toggleSetting,
      (pressed) => {
        if (pressed) {
          setOpenSetting(!openSetting);
          setLockCamera(!openSetting);
        }
      }
    );
  }, [openSetting]);

  return (
    <>
      <img src="/images/title.png" alt="Title" className="title-png" />
      <img src="/images/settings.png" alt="settings" className="settings-png" />
      {!sound ? (
        <img src="/images/music.png" alt="sound-off" className="mute-png" />
      ) : (
        <img src="/images/mute.png" alt="sound-on" className="mute-png" />
      )}
      <img src="/images/mask.jpg" alt="Mask" className="mask-jpg" />
      {openSetting && (
        <div className="settings-background">
          <img
            src="/images/settingsClose.png"
            alt="close setting"
            className="setting-close"
            onClick={() => setOpenSetting(false)}
          />
          {language === "en" ? (
            <img
              src="/images/en-to-ch.png"
              alt="change language"
              className="change-lng-png"
              onClick={() => setLanguage("ch")}
            />
          ) : (
            <img
              src="/images/ch-to-en.png"
              alt="change language"
              className="change-lng-png"
              onClick={() => setLanguage("en")}
            />
          )}
          <img
            src="/images/restart.png"
            alt="restart"
            className="restart-png"
          />
          <img
            src="/images/settingsBackground.png"
            alt="settings"
            className="settings-content"
          />
        </div>
      )}
    </>
  );
};

export default GameUI;
