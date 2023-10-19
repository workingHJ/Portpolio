/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  images: {
    domains: ["image.aladin.co.kr", "localhost", "www.culture.go.kr", "phinf.pstatic.net", "file.koreafilm.or.kr", "t1.daumcdn.net", "ssl.pstatic.net", "k.kakaocdn.net", "www.kopis.or.kr"],
    imageSizes: [48, 64, 88, 96, 128, 256, 384, 416],
  },
};
