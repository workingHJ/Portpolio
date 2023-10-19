import Link from "next/link";
import StarRating from "/components/StarRating";

const GardenReview = ({title, author, accessType, rating, children, gNo, aNo, rNo, light, writerSNStype, ...props}) => {
  const thumbShape = author.thumbShape ? author.thumbShape : "rounded";
  const thumbClass = `flex-shrink-0 bg-repeat-0 bg-position-center bg-size-cover ${thumbShape} me-3`;
  const thumbSize = author.thumbSize + "px";
  const name = author.name;

  let imgSrc = "";
  if (writerSNStype == null || writerSNStype === "none") {
    imgSrc = "http://localhost:80" + author.thumbSrc;
  } else {
    imgSrc = author.thumbSrc;
  }

  return (
    <div
      {...props}
      style={{
        backgroundColor: "#f5f4f8",
        borderRadius: "1rem",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="w-85 d-flex">
          <h5 className={`pe-3 mb-0 ${light ? " text-light" : ""}, text-truncate`}>{title}</h5>
          <StarRating
            light={light ? 1 : 0}
            rating={rating}
            className="ms-3 pt-1"
            // style={{
            // background: 'white',
            // padding: '10px',
            // borderRadius:'10px',}}
          />
        </div>
        <div className="d-flex">
          <Link href={`artReview?accessType=${accessType}&gNo=${gNo}&aNo=${aNo}&rNo=${rNo}`} className="ms-3 nav-link fw-bold text-primary">
            자세히 보기
          </Link>
        </div>
      </div>
      <div
        className={`pb-2 mb-2${light ? " text-light opacity-70" : ""}`}
        style={{
          height: "5rem",
          overflow: "hidden",
          display: "inline-block",
        }}
      >
        <p style={{lineHeight: "160%", margin: 0}}>{children}</p>
      </div>
      <div className="d-flex justify-content-end align-items-center">
        {imgSrc && (
          <div
            className={thumbClass}
            style={{
              width: thumbSize,
              height: thumbSize,
              backgroundImage: "url(" + imgSrc + ")",
            }}
          ></div>
        )}
        <h6 className={`fs-sm mb-0${light ? " text-light" : ""}`}>{name}</h6>
      </div>
    </div>
  );
};

export default GardenReview;
