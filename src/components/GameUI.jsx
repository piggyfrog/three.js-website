import { useKeyboardControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import {
  useSettingStore,
  useLockCameraStore,
  useGameStateStore,
} from "../hooks/store";
import { useNavigate } from "react-router";
const GameUI = () => {
  const [sub, get] = useKeyboardControls();

  const sound = useSettingStore((state) => state.sound);
  const openSetting = useSettingStore((state) => state.openSetting);
  const language = useSettingStore((state) => state.language);
  const setLanguage = useSettingStore((state) => state.setLanguage);
  const setOpenSetting = useSettingStore((state) => state.setOpenSetting);
  const setLockCamera = useLockCameraStore((state) => state.setLockCamera);
  const navigate = useNavigate();
  const setGameState = useGameStateStore((state) => state.setGameState);
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

  const restart = () => {
    setGameState([]);
    navigate("/");
  };

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
            onClick={() => {
              setOpenSetting(false);
              setLockCamera(false);
            }}
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
            onClick={restart}
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
