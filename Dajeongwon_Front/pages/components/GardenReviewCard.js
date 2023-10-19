import Link from "next/link";
import {Button} from "react-bootstrap";
import ImageLoader from "../../components/ImageLoader";

const GardenReviewCard = ({type, size, href, img, badges, title, category, company, light, max, headcount, capacity, className, ...props}) => {
  const extraClass = className ? ` ${className}` : "";

  let displayCategory = "";
  if (category === "book") {
    displayCategory = "도서";
  } else if (category === "exhibition") {
    displayCategory = "전시";
  } else if (category === "movie") {
    displayCategory = "영화";
  } else if (category === "perform") {
    displayCategory = "공연";
  }

  // Wrapper css classes and image markup depending on card type
  let wrapperClass, cardImage, cardBodyClass;
  switch (type) {
    case "card":
      wrapperClass = `card card-hover ${light ? "card-light" : "border-0 shadow-sm"} h-100${extraClass}`;
      cardBodyClass = "card-body pb-4";
      if (img) {
        cardImage = href ? (
          <Link href={href} className="card-img-top d-flex position-relative overflow-hidden">
            <ImageLoader src={img.src} width={img.size[0]} height={img.size[1]} alt={img.alt} objectFit={"scale-down"} light={light ? 1 : 0} />
            {badges && (
              <div className="position-absolute end-0 top-0 pt-3 pe-3">
                {badges.map((badge, indx) => {
                  return (
                    <span key={indx} className={`d-table badge bg-${badge[0]} fs-sm mb-1`}>
                      {badge[1]}
                    </span>
                  );
                })}
              </div>
            )}
          </Link>
        ) : (
          <div className="card-img-top d-flex position-relative overflow-hidden">
            <ImageLoader src={img.src} width={img.size[0]} height={img.size[1]} alt={img.alt} objectFit="scale-down" light={light ? 1 : 0} />
            {badges && (
              <div className="position-absolute end-0 top-0 pt-3 pe-3">
                {badges.map((badge, indx) => {
                  return (
                    <span key={indx} className={`d-table badge bg-${badge[0]} fs-sm mb-1`}>
                      {badge[1]}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        );
      }
      break;

    default:
      wrapperClass = className;
      cardBodyClass = "py-3";
      if (img) {
        cardImage = href ? (
          <Link href={href} className="d-flex position-relative rounded-3 overflow-hidden">
            <ImageLoader src={img.src} width={img.size[0]} height={img.size[1]} alt={img.alt} light={light ? 1 : 0} />
            {badges && (
              <div className="position-absolute end-0 top-0 pt-3 pe-3">
                {badges.map((badge, indx) => {
                  return (
                    <span key={indx} className={`d-table badge bg-${badge[0]} fs-sm mb-1`}>
                      {badge[1]}
                    </span>
                  );
                })}
              </div>
            )}
          </Link>
        ) : (
          <div className="d-flex position-relative rounded-3 overflow-hidden">
            <ImageLoader src={img.src} width={img.size[0]} height={img.size[1]} alt={img.alt} light={light ? 1 : 0} />
            {badges && (
              <div className="position-absolute end-0 top-0 pt-3 pe-3">
                {badges.map((badge, indx) => {
                  return (
                    <span key={indx} className={`d-table badge bg-${badge[0]} fs-sm mb-1`}>
                      {badge[1]}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        );
      }
  }

  // Render markup
  return (
    <div className={wrapperClass} {...props}>
      {cardImage}
      <div className={cardBodyClass}>
        <span className="text-primary me-1 fs-sm">#</span>
        <span className="fs-sm">{displayCategory}</span>
        <Link href={href} className="text-decoration-none">
          <h3 className="h5 mt-1 mb-2 hanamdaum fw-normal text-truncate">{title}</h3>
        </Link>
        <span className="fs-mb  ">{company}</span>
        {light && <p>{light}</p>}
        {max && <p>Max: {max}</p>}
        {headcount && <p>Headcount: {headcount}</p>}
        {capacity && <p>Capacity: {capacity}</p>}
      </div>
    </div>
  );
};

export default GardenReviewCard;
