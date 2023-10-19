import Link from "next/link";
import {Button} from "react-bootstrap";
import ImageLoader from "./ImageLoader";

const RecommendCard = ({type, size, href, img, title, author, categories, light, aNo, company, onClick, searchLink, className, ...props}) => {
  const extraClass = className ? ` ${className}` : "";

  // Wrapper css classes and image markup depending on card type
  let wrapperClass, cardImage, cardBodyClass;
  switch (type) {
    case "card":
      wrapperClass = `card card-hover ${light ? "card-light" : "border-0 shadow-sm"} h-100${extraClass}`;
      cardBodyClass = "card-body pb-0";
      if (img) {
        cardImage = href ? (
          <Link href={href} className="card-img-top d-flex position-relative overflow-hidden">
            <ImageLoader src={img.src} width={img.size[0]} height={img.size[1]} objectFit="scale-down" alt={img.alt} light={light ? 1 : 0} />
          </Link>
        ) : (
          <div className="card-img-top d-flex position-relative overflow-hidden">
            <ImageLoader src={img.src} width={img.size[0]} height={img.size[1]} alt={img.alt} light={light ? 1 : 0} />
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
          </Link>
        ) : (
          <div className="d-flex position-relative rounded-3 overflow-hidden">
            <ImageLoader src={img.src} width={img.size[0]} height={img.size[1]} alt={img.alt} light={light ? 1 : 0} />
          </div>
        );
      }
  }

  // Render markup
  return (
    <article {...props} className={wrapperClass}>
      {cardImage}
      <div className={cardBodyClass}>
        <div className="fs-sm text-hdGray fw-normal mb-2">
          {categories && (
            <>
              {categories.map((category, index) => (
                <div key={index} className={`${size === "lg" ? "fs-base" : "fs-base"}`}>
                  <span className="text-primary">#</span>
                  <span className="me-2">{category}</span>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="d-flex justify-content-between">
          {title && (
            <>
              <h4 className={`${size === "lg" ? "h3" : "h4"} mb-2 hanamdaum fw-normal d-inline-block`}>
                {href ? (
                  <Link href={href} className={light ? "nav-link-light" : "nav-link"}>
                    {title}
                  </Link>
                ) : (
                  <span className={light ? "text-light opacity-80" : "text-nav"}>{title}</span>
                )}
              </h4>
            </>
          )}
        </div>
        <div className="d-flex me-0 mb-3">
          <>
            <span className="fw-bold text-gray600">{company}</span>
            <span className="ms-auto me-0">
              <Button onClick={onClick} value={aNo} name="aNo" variant="primary rounded-pill hanamdaum py-1 fw-normal" size="sm">
                작품 포함된 모임
              </Button>
            </span>
          </>
        </div>
      </div>
    </article>
  );
};

export default RecommendCard;
