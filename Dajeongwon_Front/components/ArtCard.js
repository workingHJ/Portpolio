import Link from "next/link";
import {useEffect, useState, useContext} from "react";
import ImageLoader from "./ImageLoader";
import Button from "react-bootstrap/Button";

const ArtCard = ({type, href, size, ano, img, badges, title, category, creator, light, className, editMode, reviewCount, rating, status, onClick, ...props}) => {
  const extraClass = className ? ` ${className}` : "";

  // Wrapper css classes and image markup depending on card type
  let wrapperClass, cardImage, cardBodyClass;
  wrapperClass = className;
  cardBodyClass = "py-3";

  if (img) {
    cardImage = href ? (
      editMode ? (
        <div className="position-relative rounded-3 overflow-hidden d-flex" style={{width: "fit-content"}}>
          <ImageLoader src={img.src} width={img.size[0]} height={img.size[1]} alt={img.alt} light={light ? 1 : 0} />
          <div className="position-absolute fs-lg end-0 badge zIndex-5">
            <Button variant="primary rounded-3 btn-icon" size="sm" onClick={() => onClick(ano, reviewCount)}>
              <i className="fi-minus-circle fs-lg"></i>
            </Button>
          </div>
        </div>
      ) : (
        <Link href={href} className="rounded-3 overflow-hidden d-flex" style={{width: "fit-content"}}>
          <ImageLoader src={img.src} width={img.size[0]} height={img.size[1]} alt={img.alt} light={light ? 1 : 0} />
        </Link>
      )
    ) : (
      <div className="d-flex position-relative rounded-3 overflow-hidden">
        <ImageLoader src={img.src} width={img.size[0]} height={img.size[1]} alt={img.alt} light={light ? 1 : 0} />
      </div>
    );
  }

  let displayCategory;
  if (category === "book") {
    displayCategory = "도서";
  } else if (category === "exhibition") {
    displayCategory = "전시";
  } else if (category === "movie") {
    displayCategory = "영화";
  } else if (category === "perform") {
    displayCategory = "공연";
  }

  // Render markup
  return (
    <article {...props} className={wrapperClass} style={{width: "200px"}}>
      <div>{cardImage}</div>
      <div>
        <div className={cardBodyClass}>
          <div className="d-flex">
            {creator ? (
              <>
                <div className="me-2 text-gray500">
                  <div>
                    <h6 className={`fs-sm ${light ? "text-light opacity-80" : "text-nav"} lh-base mb-1 textBox`} style={{width: "110px"}}>
                      {creator}
                    </h6>
                    <div className={`d-flex ${light ? "text-light opacity-60" : "text-body"} fs-xs`}></div>
                  </div>
                </div>
              </>
            ) : (
              <div className={`d-flex ${light ? "text-light opacity-60" : "text-body"} fs-xs`}></div>
            )}
            <div className="ms-auto">
              {displayCategory && <span className="text-primary">#</span>}
              <span>{displayCategory}</span>
            </div>
          </div>

          {title && (
            <h5>
              {editMode === false ? (
                <Link href={href} className={status === "COMPLETE" ? "text-gray600 nav-link textBox" : "nav-link textBox"}>
                  {title}
                </Link>
              ) : (
                <span className={status === "COMPLETE" ? "text-nav textBox text-gray600" : "text-nav"}>{title}</span>
              )}
            </h5>
          )}
        </div>
      </div>
    </article>
  );
};

export default ArtCard;
