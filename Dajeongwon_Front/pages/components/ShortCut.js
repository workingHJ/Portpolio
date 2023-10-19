import Link from "next/link";

const ShortCut = (props) => {
  return (
    <Link href={props.href} style={{textDecoration: "none"}}>
      <div
        style={{
          width: "200px",
          height: "250px",
          border: "3px solid #e5ccaf",
          borderTopLeftRadius: "45%",
          borderTopRightRadius: "45%",
        }}
      >
        <div className="d-flex align-items-center justify-content-center pt-3">
          <div
            style={{
              width: "170px",
              height: "170px",
              backgroundColor: "#e5ccaf",
              borderRadius: "50%",
            }}
            className="d-flex align-items-center justify-content-center"
          >
            <img
              src={props.imgSrc}
              alt=""
              style={{
                width: "110px",
                height: "110px",
                marginBottom: "10px",
              }}
            />
          </div>
        </div>
        <div className="text-center pt-2 mt-1 hanamdaum h3 text-black">{props.title}</div>
      </div>
    </Link>
  );
};

export default ShortCut;
