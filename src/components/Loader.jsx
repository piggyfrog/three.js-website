function Loader({ text = "这本相册记录了很多，这个家庭重要的时刻..." }) {
  return (
    <div>
      <div className="centered">
        <div className="loading">
          <img src="/images/title.png" alt="" className="img-title" />
          <img src="/images/loading.png" alt="" className="img-text" />
        </div>
        <p className="loading-text">{text}</p>
      </div>

      <img src="/images/mask.jpg" alt="" />
    </div>
  );
}

export default Loader;
