import Link from "next/link";
import {useEffect, useState} from "react";
import ImageLoader from "../../components/ImageLoader";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Dropdown from "react-bootstrap/Dropdown";

const BookItem = ({img, isbn13, title, author, wishlistButton, bestRank, cover, selectCount, className, onClick, item, ...props}) => {
  const [light, setLight] = useState(false);

  const handleMouseEnter = () => {
    setLight(true);
  };

  const handleMouseLeave = () => {
    setLight(false);
  };

  return (
    <div {...props} className={`position-relative${className ? ` ${className}` : ""}`}>
      {img && (
        <>
          <div className="position-relative d-flex mb-3">
            <Link href={`bookDetail?id=${isbn13}`} key={isbn13}>
              <ImageLoader src={img.src} width={img.width} height={img.height} alt={img.alt} light={light ? 1 : 0} className="rounded-3" />
            </Link>
          </div>
          {/* 로그인 되어 있는지 여부 체크해야 함 */}
          <div className="d-flex position-absolute top-0 end-6px m-3 zindex-5">
            {wishlistButton && (
              <>
                {wishlistButton.tooltip ? (
                  <OverlayTrigger placement="left" overlay={<Tooltip>{wishlistButton.tooltip}</Tooltip>}>
                    <button {...wishlistButton.props} type="button" className="btn btn-icon btn-light-primary btn-xs text-primary rounded-circle">
                      <i className={wishlistButton.active ? "fi-heart-filled" : "fi-heart"}></i>
                    </button>
                  </OverlayTrigger>
                ) : (
                  <button {...wishlistButton.props} type="button" className="btn btn-icon btn-light-primary btn-xs text-primary rounded-circle">
                    <i className={wishlistButton.active ? "fi-heart-filled" : "fi-heart"}></i>
                  </button>
                )}
              </>
            )}
          </div>
        </>
      )}

      {title && author && (
        <>
          <Link href={`bookDetail?id=${isbn13}`} className="text-decoration-none GmarketSansMedium" key={isbn13} onMouseOver={handleMouseEnter} onMouseOut={handleMouseLeave}>
            <h3 className={`mb-2 fs-lg text-start ${light ? "text-primary" : ""}`}>{title}</h3>
          </Link>
          <div className="d-flex pyeongChang-regular fs-sm text-gray500 pt-2">
            <div>{author}</div>
            {selectCount && (
              <div className="ms-auto">
                <i className="fi-star text-warning"></i> {selectCount}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BookItem;
