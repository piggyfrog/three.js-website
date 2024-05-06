import { useTranslation } from "react-i18next";

function Loader({ text = "loading-default" }) {
  const { t } = useTranslation();
  return (
    <div>
      <div className="centered">
        <div className="loading">
          <img src="/images/title.png" alt="" className="img-title" />
          <img src="/images/loading.png" alt="" className="img-text" />
        </div>
        <p className="loading-text">{t(text)}</p>
      </div>

      <img src="/images/mask.jpg" alt="" />
    </div>
  );
}

export default Loader;
