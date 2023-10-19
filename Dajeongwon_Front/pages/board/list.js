import Layout from "../components/Layout";
import {useState} from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ImageLoader from "../../components/ImageLoader";
import Badge from "react-bootstrap/Badge";
import Avatar from "../../components/Avatar";
import BlogCard from "../../components/BlogCard";
import Pagination from "react-bootstrap/Pagination";
import {Navigation, EffectFade} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Board = () => {
  // Sponsored posts array
  const sponsoredPosts = [
    {
      href: "/real-estate/blog-single",
      image: "/images/crimecity.jpeg",
      category: ["#", "베스트게시글"],
      title: "범죄도시 3 감상 후기",
      text: "마동석의 영화 범죄도시3가 드디어 개봉을 했네요. 계속 한국 영화가 제대로 기를 못피고 있었는데, 이번 마동석의 범죄도시3가 과연 한국영화를 살릴 것인가 생각이드는데, 살릴것 같네요 5일만에 400만.. 와우 (범죄도시2가 7일만에 400만)이니까 속도가 더 빨라요. 1천만 관객 가능할 것 같아요. 보고 온 평은 확실히 시원한 액션 타겸감.. 정말최고네요......",

      author: ["#", "/images/avatars/26.png", "마봉봉"],
      date: "7월 12일",
      comments: "댓글",
    },
  ];

  // Posts array
  const posts = [
    {
      href: "/real-estate/blog-single",
      img: "/images/exhibition.jpeg",
      size: [400, 300], // 가로 크기를 400으로 수정, 세로 크기는 자유롭게 조정
      alt: "Image",
      category: {
        href: "#",
        title: "추천",
      },
      title: "실내 데이트로 강력 추천! 놓칠 수 없는 서울 전시회",
      text: "망고와 파인애플이 쑥쑥 자랄 거 같은 무더운 날씨 .. 이럴 땐 에어컨 빵빵한 곳에서 실내 데이트가 국룰이죠 bb쾌적하고 로맨틱한 하루를 위해 가볼 만한 서울 전시회를 추천드리고자 합니다!",
      author: {
        href: "#",
        img: "/images/avatars/26.png",
        name: "김삼순",
      },

      date: "8월 1일",
      comments: "8 댓글",
    },
    {
      href: "/real-estate/blog-single",
      img: "/images/book.jpeg",
      category: {
        href: "#",
        title: "독후감",
      },
      title: "독후감 - 끈기보다 끊기",
      text: "이 책을 읽고 나 자신도 많은 반성을 했다. 28년 직장 생활을 하고 16년째 기업을 경영하면서 예상대로 일이 흘러가지 않을 때 ‘어떻게 되겠지’ 하며 뭉기적 거리거나 오기로 밀어붙였으나 결국 실패로 끝났던 많은 일들이 주마등처럼 떠올랐다. 이 책의 내용처럼 ‘안 되는 건 안 되는’ 거였는데, 그때 멈췄어야 했는데 그러지 못했다. 그래서 몸도 상하고 인간관계도 잃고 금전적 손실도 컸다. 그래서 이 책을 읽으면서 깨달은게 있는데....",
      author: {
        href: "#",
        img: "/images/avatars/26.png",
        name: "독서왕김독서",
      },
      date: "8월 1일",
      comments: "4 댓글",
    },
    {
      href: "/real-estate/blog-single",
      img: "/images/psy.jpeg",
      category: {
        href: "#",
        title: "공연 꿀팁",
      },
      title: " 2023 싸이 흠뻑쇼 가보기 (+준비물&꿀팁,공연시간)",
      text: "꿀팁은 들어가기전에 핸드폰 배터리를 100%로 만들고 방수팩에 핸드폰을 넣고 들어가기 중간에 충전하려고 충전기 들고왔는데 입장하고 갑자기 쏘는 물때문에 엉망이 돼서 배터리 찾을 정신도 없고 폰에도 물들어간다더운데 물맞으니 시원해졌는데 가만히 있으니 잠깐 추웠던 시간도 있었다 옆에 남자분들중에도 춥다고 한사람이 있었어서 추위를 많이타면 긴팔지참 추천 이또한 꿀팁",
      author: {
        href: "#",
        img: "/images/avatars/26.png",
        name: "귀염둥이 정다운",
      },
      date: "8월 1일",
      comments: "3 댓글",
    },

    {
      href: "/real-estate/blog-single",
      img: "/images/elemental2.jpg",
      category: {
        href: "#",
        title: "감상평",
      },
      title: "엘리멘탈 후기",
      text: "드뎌 엘리멘탈을 봤네요 2시간이 금방 흘러갔네요 이제서야 아이들과 말이 통합니다 ㅋ 어떤 포인트가 재밌고 감동작인지등 ~ 애니메이션이지만 한국정서가 아주 많아 들어가 있고 전 보다가 눈물이 나더라구요 어쩜 저렇게 한 인물에게 헌신하고 사랑을 줄 수있는지 가족이 얼마나 소중한지 더 느끼게 됐네요 왜 인기가 많은지 롱런하는 이유가 역시 있네요 꼭 보세요 ~",
      author: {
        href: "#",
        img: "/images/avatars/26.png",
        name: "다운맘",
      },
      date: "8월 1일",
      comments: "1 댓글",
    },

    {
      href: "/real-estate/blog-single",
      img: "/images/notebook.jpg",
      category: {
        href: "#",
        title: "영화 추천",
      },
      title: "달달한 로맨스 영화 추천 <노트북> 줄거리 리뷰",
      text: "오늘은 여러분께 달달한 로맨스 영화를 한 편 소개해 드리려고 합니다! 오늘의 추천 영화는 바로 <노트북>이라는 작품입니다!ㅎㅎㅎㅎ",
      author: {
        href: "#",
        img: "/images/avatars/26.png",
        name: "멜로 덕후",
      },
      date: "8월 1일",
      comments: "2 댓글",
    },
    {
      href: "/real-estate/blog-single",
      img: "/images/haribo.jpeg",
      category: {
        href: "#",
        title: "전시회 후기",
      },
      title: "하리보 100주년 전시회 다녀왔어요!!",
      text: "친구와 사진도 예쁘게 찍으면서 전시도 보고싶어서 다녀온 하리보 전시회 후기 알려드릴께요~! ​네이버예약도 가능해요! 근데 미리 예약하면 할인될 것 같았는데 그건 아니길래 저는 가서 표 끊었어요 ㅎㅎ 가보니깐 저기 매장이용하면 할인되는 되는 건 있네요 ㅋㅋㅋ 전시기간과 예매가격은 ....",
      author: {
        href: "#",
        img: "/images/avatars/26.png",
        name: "금잔디",
      },
      date: "8월 1일",
      comments: "0 댓글",
    },
  ];

  return (
    <Layout pageTitle="Blog" activeNav="Pages">
      <Container className="mt-4 mb-md-4 py-5 GmarketSansMedium">
        <div className="mb-2 pt-md-2 GmarketSansMedium">
          <Breadcrumb className="mb-3">{/* ... */}</Breadcrumb>
        </div>
        <h1 className="d-flex align-items-end justify-content-between mb-3  hanamdaum ">자유 게시판</h1>

        {/* Recent items carousel */}
        <Swiper
          modules={[Navigation, EffectFade]}
          navigation={{
            prevEl: "#post-prev",
            nextEl: "#post-next",
          }}
          effect="fade"
          loop
        >
          {sponsoredPosts.map((post, indx) => (
            <SwiperSlide key={indx} className="d-flex py-4 bg-white mb-3 pt-md-3 GmarketSansMedium">
              <Row as="article" className="gy-3">
                <Col xs={12} md={5} lg={4}>
                  <Link href={post.href} className="d-block position-relative  GmarketSansMedium ">
                    <ImageLoader src={post.image} width={440} height={365} alt="Image" className="rounded-3" /> {/* Adjust width and height as needed */}
                    <Badge bg="success" className="position-absolute top-0 end-0 m-3 fs-sm ">
                      {/* ... */}
                    </Badge>
                  </Link>
                </Col>
                <Col xs={12} md={5} lg={4}>
                  <Link href={post.category[0]} className="fs-sm text-uppercase text-decoration-none mb-3 pt-md-3 GmarketSansMedium">
                    {post.category[1]}
                  </Link>
                  <h2 className="h5 pt-1 mb-3 pt-md-3 GmarketSansMedium ">
                    <a className="nav-link">{post.title}</a>
                  </h2>
                  <p className="mb-3 pt-md-3 GmarketSansMedium">{post.text}</p>
                  <Link href={post.author[0]} className="d-flex align-items-center text-decoration-none mb-3 pt-md-3 GmarketSansMedium">
                    <Avatar
                      img={{
                        src: post.author[1],
                        alt: post.author[2],
                      }}
                      size={[48, 48]}
                    />
                    <div className="ps-2  GmarketSansMedium">
                      <h6 className="fs-base text-nav lh-base mb-1 ">{post.author[2]}</h6>
                      <div className="d-flex text-body fs-sm ">
                        <span className="me-2 pe-1">
                          <i className="fi-calendar-alt opacity-60 mt-n1 me-1 "></i>
                          {post.date}
                        </span>
                        <span>
                          <i className="fi-chat-circle opacity-60 mt-n1 me-1"></i>
                          {post.comments}
                        </span>
                      </div>
                    </div>
                  </Link>
                </Col>
              </Row>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="d-flex mb-lg-3 mx-n2 pb-5">
          <Button id="post-prev" variant="prev" className="position-relative mx-2" />
          <Button id="post-next" variant="next" className="position-relative mx-2" />
          <Row className="justify-content-center">
            <div className="d-flex justify-content-center">
              <div className="d-flex mb-lg-1 mx-n20 pb-3" style={{marginRight: "1100px"}}>
                {/* 버튼을 오른쪽으로 이동시키는 빈 div */}
              </div>
              <Button type="submit" size="rg" variant="primary" className="w-sm-auto mt-2">
                글 작성
              </Button>
            </div>
          </Row>
        </div>

        {/* Search bar + filters */}
        <Row className="gy-3 mb-4 pb-2 mb-3 pt-md-3 GmarketSansMedium">
          <Col xs={{span: 12, order: "last"}} md={{span: 4, order: "first"}}>
            <Form.Group className="position-relative">
              <Form.Control className="pe-5" placeholder="제목으로 검색" />
              <i className="fi-search position-absolute top-50 end-0 translate-middle-y me-3"></i>
            </Form.Group>
          </Col>
          <Col xs={{span: 12, order: "first"}} md={{span: 8, order: "last"}} lg={{span: 6, offset: 2}}>
            <Row xs={2} className="gy-3">
              <Col as={Form.Group} controlId="categories" className="d-flex flex-sm-row flex-column align-items-sm-center ">
                <Form.Label className="d-inline-block me-sm-2 mb-sm-0 mb-2 text-body text-nowrap">
                  <i className="fi-align-left mt-n1 me-2 align-middle opacity-70"></i>
                  카테고리:
                </Form.Label>
                <Form.Select>
                  <option>영화</option>
                  <option>도서</option>
                  <option>전시</option>
                  <option>공연</option>
                </Form.Select>
              </Col>
              <Col as={Form.Group} controlId="sortby" className="d-flex flex-sm-row flex-column align-items-sm-center">
                <Form.Label className="d-inline-block me-sm-2 mb-sm-0 mb-2 text-body text-nowrap">
                  <i className="fi-arrows-sort mt-n1 me-2 align-middle opacity-70"></i>
                  정렬:
                </Form.Label>
                <Form.Select>
                  <option>최신순</option>
                  <option>조회순</option>
                  <option>인기순</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Articles grid */}
        <Row xs={1} md={2} className="gy-md-4 gy-3 mb-lg-4 mb-2 GmarketSansMedium">
          {posts.map((post, indx) => (
            <Col key={indx} className="pb-2">
              <BlogCard
                size="lg"
                href={post.href}
                img={{
                  src: post.img,
                  size: [636, 400],
                  alt: "Image",
                  style: {objectFit: "cover"}, // Remove the minWidth and minHeight properties
                }}
                category={post.category}
                title={post.title}
                text={post.text}
                author={post.author}
                date={post.date}
                comments={post.comments}
                badges={post.badges}
              />
            </Col>
          ))}
        </Row>

        {/* Pagination */}
        <nav className="d-flex pt-4 pb-2 border-top GmarketSansMedium" aria-label="Blog pagination">
          <Pagination className="mb-2">
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item>{8}</Pagination.Item>
            <Pagination.Item>
              <i className="fi-chevron-right"></i>
            </Pagination.Item>
          </Pagination>
        </nav>
      </Container>
    </Layout>
  );
};

export default Board;
