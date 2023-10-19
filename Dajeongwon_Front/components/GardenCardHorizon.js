import Link from "next/link";
import ImageLoader from "./ImageLoader";
import {Badge, Button} from "react-bootstrap";

const GardenCardHorizon = ({size, href, img, gno, title, text, accessType, categories, light, headcount, capacity, participateLink, startDate, endDate, organizer, className, ...props}) => {
  const extraClass = className ? ` ${className}` : "";

  // Wrapper css classes and image markup depending on card type
  let wrapperClass, cardImage, cardBodyClass;
  wrapperClass = `card card-horizontal border-0${extraClass}`;
  cardBodyClass = "card-body px-0 pt-0 pb-lg-5 pb-sm-4 pb-2";
  wrapperClass = `card card-horizontal card-hover ${light ? "card-light" : "border-0 shadow-sm"}${extraClass}`;
  cardBodyClass = "card-body";
  if (img) {
    cardImage = href ? (
      <Link href={href} className="card-img-top d-flex position-relative overflow-hidden">
        <ImageLoader src={img.src} layout="fill" objectFit="cover" quality={100} alt={img.alt} light={light ? 1 : 0} />
      </Link>
    ) : (
      <div className="card-img-top d-flex position-relative overflow-hidden">
        <ImageLoader src={img.src} layout="fill" objectFit="cover" quality={100} alt={img.alt} light={light ? 1 : 0} />
      </div>
    );

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

    let displayAccessType = "";
    if (accessType === "public") {
      displayAccessType = "공개";
    } else if (accessType === "private") {
      displayAccessType = "비밀";
    }

    // Render markup
    return (
      <article {...props} className={wrapperClass}>
        {cardImage}
        <div className={cardBodyClass}>
          <div className="d-flex">
            {accessType === "public" ? (
              <Badge className="pt-2 rounded-pill text-black me-3 mb-1 fs-sm" bg="secondary">
                {displayAccessType}
              </Badge>
            ) : (
              <Badge className="pt-2 rounded-pill text-dark-brown me-3 mb-1" bg="warning">
                {displayAccessType}
              </Badge>
            )}
            <div className="mb-2">
              {categories && (
                <>
                  {displayCategories.map((category, index) => (
                    <span key={index} className={`${size === "lg" ? "fs-base" : "fs-base"} fw-bold`}>
                      <span className="text-primary">#</span>
                      <span className="me-2">{category}</span>
                    </span>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="d-flex mt-1">
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
          </div>
          <h6 className="cardDesc">
            {text && (
              <Link href={href} className="nav-link fw-normal fs-base">
                {text}
              </Link>
            )}
          </h6>
          <div className="d-flex align-items-end">
            <div className="pe-2">
              {organizer.img && (
                <div className="position-relative flex-shrink-0 rounded-circle overflow-hidden me-2 mb-1" style={size === "lg" ? {width: "48px", height: "48px"} : {width: "44px", height: "44px"}}>
                  <ImageLoader src={organizer.img} layout="fill" objectFit="cover" quality={90} alt={organizer.name} light={light ? 1 : 0} />
                </div>
              )}
            </div>
            <div>
              <h6 className={`fs-sm ${light ? "text-light opacity-80" : "text-nav"} lh-base mb-1`}>{organizer.name}</h6>
              <div className={`d-flex ${light ? "text-light opacity-60" : "text-body"} fs-xs`}>
                <span className="me-2 pe-1 text-gray500">
                  <i className="fi-calendar-alt opacity-70 me-1"></i>
                  {startDate} ~ {endDate}
                </span>
                <i className="fi-users ms-1 me-2 text-gray600"></i>
                {headcount} / {capacity}
              </div>
            </div>
            <span className="ms-auto">
              <Button href={href} variant="translucent-dark rounded-pill hanamdaum py-1 fw-normal">
                이동
              </Button>
            </span>
          </div>
        </div>
      </article>
    );
  }
};
export default GardenCardHorizon;
