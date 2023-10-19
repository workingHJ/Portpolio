import Link from "next/link";
import {Button} from "react-bootstrap";
import ImageLoader from "./ImageLoader";

const GardenCard = ({type, size, href, img, badges, title, categories, light, max, headcount, gno, capacity, objectFit, participateLink, className, ...props}) => {
  const extraClass = className ? ` ${className}` : "";

  let displayCategories = [];

  for (let category of categories) {
    if (category === "book") {
      displayCategories.push("도서");
    } else if (category === "exhibition") {
      displayCategories.push("전시");
    } else if (category === "movie") {
      displayCategories.push("영화");
    } else if (category === "perform") {
      displayCategories.push("공연");
    }
  }

  // Wrapper css classes and image markup depending on card type
  let wrapperClass, cardImage, cardBodyClass;
  switch (type) {
    case "card":
      wrapperClass = `card card-hover ${light ? "card-light" : "border-0 shadow-sm"} h-100${extraClass}`;
      cardBodyClass = "card-body pb-0";
      if (img) {
        cardImage = href ? (
          <Link href={href} className="card-img-top d-flex position-relative overflow-hidden">
            <ImageLoader src={img.src} width={img.size[0]} height={img.size[1]} alt={img.alt} objectFit="cover" light={light ? 1 : 0} />
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
      break;
    case "card-horizontal":
      wrapperClass = `card card-horizontal card-hover ${light ? "card-light" : "border-0 shadow-sm"}${extraClass}`;
      cardBodyClass = "card-body";
      if (img) {
        cardImage = href ? (
          <Link href={href} className="card-img-top d-flex position-relative overflow-hidden">
            <ImageLoader src={img.src} layout="fill" objectFit="cover" quality={100} alt={img.alt} light={light ? 1 : 0} />
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
            <ImageLoader src={img.src} layout="fill" objectFit="cover" quality={100} alt={img.alt} light={light ? 1 : 0} />
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
    <article {...props} className={wrapperClass}>
      {cardImage}
      <div className={cardBodyClass}>
        <div className="d-flex justify-content-between">
          {title && (
            <h3 className={`${size === "lg" ? "h4" : "h5"} mb-2 hanamdaum fw-normal d-inline-block`}>
              {href ? (
                <Link href={href} className={light ? "nav-link-light" : "nav-link"}>
                  {title}
                </Link>
              ) : (
                <span className={light ? "text-light opacity-80" : "text-nav"}>{title}</span>
              )}
            </h3>
          )}
          <span className="text-end fs-sm text-gray500">
            <i className="fi-users me-2"></i>
            {headcount} / {capacity}
          </span>
        </div>
        <div className="d-flex me-0 mb-3">
          {displayCategories && (
            <>
              {displayCategories.map((category, index) => (
                <div key={index} className={`${size === "lg" ? "fs-base" : "fs-base"} fw-bold`}>
                  <span className="text-primary">#</span>
                  <span className="me-2">{category}</span>
                </div>
              ))}
            </>
          )}
          <>
            <span className="ms-auto me-0">
              <Link href={href}>
                <Button variant="translucent-dark rounded-pill hanamdaum py-1 fw-normal">이동</Button>
              </Link>
            </span>
          </>
        </div>
      </div>
    </article>
  );
};

export default GardenCard;
