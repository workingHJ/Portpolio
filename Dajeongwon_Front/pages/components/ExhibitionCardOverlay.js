import {useState} from "react";
import Link from "next/link";
import ImageLoader from "../../components/ImageLoader";

const styles = {
  contentHide: {
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  contentShow: {
    opacity: 1,
    transition: "opacity 0.3s ease",
  },

  cardImageDark: {
    filter: "blur(5px)",
    transition: "filter 0.3s ease",
  },
};

const ExhibitionCardOverlay = ({href, img, title, date, time, button, overlay, className, ...props}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href}>
      <div {...props} className={`card border-0 pyeongChang-regular pt-5${className ? ` ${className}` : ""}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {overlay && <span className="img-gradient-overlay"></span>}
        {img && <ImageLoader src={img.src} layout="fill" objectFit="cover" quality={100} alt={img.alt} className="rounded-3 img-overlay" style={hovered ? styles.cardImageDark : styles.contentShow} />}
        <div className="d-none d-md-block" style={{height: "13rem"}}></div>
        <div className="card-body content-overlay text-center text-md-start pt-4 pt-xl-0" style={hovered ? styles.contentShow : styles.contentHide}>
          <div className="d-md-flex justify-content-between align-items-end">
            <div className="me-2 mb-4 mb-md-0">
              <div className="d-flex justify-content-center justify-content-md-start text-light fs-sm mb-2">
                {date && (
                  <div className="text-nowrap me-3">
                    <i className="fi-calendar-alt me-1 opacity-70"></i>
                    <span className="align-middle">{date}</span>
                  </div>
                )}
                {time && (
                  <div className="text-nowrap">
                    <i className="fi-clock me-1 opacity-70"></i>
                    <span className="align-middle">{time}</span>
                  </div>
                )}
              </div>
              {title && <h3 className="h5 text-dark mb-0">{title}</h3>}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ExhibitionCardOverlay;
