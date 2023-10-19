import Link from "next/link";
import ImageLoader from "../../components/ImageLoader";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Dropdown from "react-bootstrap/Dropdown";

const NewBookList = ({img, href, title, price, wishlistButton, light, className, author, ...props}) => {
  return (
    <div {...props} className={`position-relative${className ? ` ${className}` : ""}`}>
      {img && (
        <>
          <div className="position-relative d-flex mb-3">
            <ImageLoader src={img.src} width={img.width} height={img.height} alt={img.alt} light={light ? 1 : 0} className="rounded-3" />
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

      {title && (
        <>
          <h3 className="mb-2 fs-lg text-start GmarketSansMedium">
            {href ? (
              <div className="height2rem">
                <Link href={href} className={light ? "nav-link-light stretched-link textBox" : "nav-link stretched-link textBox"}>
                  {title}
                </Link>
              </div>
            ) : (
              <span className={light ? "text-light" : ""}>{title}</span>
            )}
          </h3>
          <div className="text-start pyeongChang-regular fs-sm text-gray500 pt-2">
            <span>{author}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default NewBookList;
