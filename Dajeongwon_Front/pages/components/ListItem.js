import Link from "next/link";
import ImageLoader from "../../components/ImageLoader";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Dropdown from "react-bootstrap/Dropdown";

const ListItem = ({img, href, title, rating, prodYear, price, location, wishlistButton, light, className, ranking, age, boxofficeCheck, director, genre, ...props}) => {
  return (
    <div {...props} className={`pyeongChang-regular position-relative${className ? ` ${className}` : ""}`}>
      {img && (
        <div className="position-relative d-flex mb-3">
          <ImageLoader src={img.src} width={img.width} height={img.height} alt={img.alt} light={light ? 1 : 0} className="rounded-3" />
          <div className="d-flex position-absolute top-0 start-0 m-3 zindex-5 fst-italic ">
            <h2 className="boxoffice-text-shadow">{ranking}</h2>
          </div>

          <div className="d-flex position-absolute top-0 end-0 m-3 zindex-5">
            {age === "전체" && (
              <div
                style={{
                  backgroundColor: "black",
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  backgroundColor: "#00964b",
                  color: "white",
                }}
                className="d-flex align-items-center justify-content-center pyeongChang-bold"
              >
                {age}
              </div>
            )}
            {age === "12" && (
              <div
                style={{
                  backgroundColor: "black",
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  backgroundColor: "#eabc00",
                  color: "white",
                }}
                className="d-flex align-items-center justify-content-center pyeongChang-bold"
              >
                {age}
              </div>
            )}
            {age === "15" && (
              <div
                style={{
                  backgroundColor: "black",
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  backgroundColor: "#dc7317",
                  color: "white",
                }}
                className="d-flex align-items-center justify-content-center pyeongChang-bold"
              >
                {age}
              </div>
            )}
            {age === "18" && (
              <div
                style={{
                  backgroundColor: "black",
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  backgroundColor: "#d61d28",
                  color: "white",
                }}
                className="d-flex align-items-center justify-content-center pyeongChang-bold"
              >
                {age}
              </div>
            )}
          </div>
        </div>
      )}

      {title && boxofficeCheck && (
        <h3 className="mb-2 fs-lg text-center">
          {href ? (
            <Link href={href} className={light ? "nav-link-light stretched-link" : "nav-link stretched-link"}>
              {title}
            </Link>
          ) : (
            <span className={light ? "text-light" : ""}>{title}</span>
          )}
        </h3>
      )}

      {title && (
        <div>
          <h3 className="mb-2 fs-lg">
            {href ? (
              <Link href={href} className={light ? "nav-link-light stretched-link" : "nav-link stretched-link"}>
                {title}
              </Link>
            ) : (
              <span className={light ? "text-light" : ""}>{title}</span>
            )}
          </h3>
          <div className="d-flex justify-content-between">
            <span>{director}</span>
            <span>{prodYear}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListItem;
