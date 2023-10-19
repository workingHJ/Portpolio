## 프로젝트 세팅:

1.  `npm install` 입력
2.  `npm install react-bootstrap bootstrap` 입력
3.  `npm install axios` 입력
4.  `npm install react-filepond filepond --save` 입력
5.  
6.  next js 확장 프로그램 설치 https://marketplace.visualstudio.com/items?itemName=foxundermoon.next-js
7. 스니펫은 설치하고 싶으면 하고 아니면 말고 

## 가동하고 싶으면 

After you have installed Node.js and Npm, run the development server:
```bash
npm run dev
# or
yarn dev
```

-> 둘중에 뭐해야할지 모르겠다 싶으면 npm run dev 

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.
The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## 오류가 뜬다면
node_modules\bootstrap\scss\_maps.scss 55:16 
이 줄이 문제임
 `@if $enable-dark-mode` 로 시작하는 블럭 주석처리 

## ⚠️ 프론트 구현 시 주의사항

1. 컬러 값은 **설정된 변수**에서 가져와주세요. user-variables파일에 있고, 아니면 variables 파일 살펴보기. 컬러를 추가해야 한다면 user-variables에 추가 후 공유
2. 새로운 CSS적용을 해야 하면(커스텀) 가급적 user-scss 에서 클래스나 아이디 만들어서 적용해주세요.
3. 기본 페이지가 있는 경우 그 페이지에서 시작, 없는 경우 새로운 파일 만들어서 요소 하나씩 넣고 배치합시다
4. 재사용 가능한 거 없는지 확인하고 만들어주세용
5. **이게 어떤 역할을 하는 부품인지 생각하면서** 만드셔야 합니다!!!
6. 커스텀해야 하는 게 있다면 finder 문서의 component 들어가서 비슷한 거 없는지 찾아보고 해주세요. 적어놨지만 빼놓은 부분이 있음. 대부분 이 component 쓸 수 있는 걸로 구성해놨는데, 없으면 user-scss에서 만들기
7. 구현이 너무 까다로우면 팀장에게 물어보기 

## 참고자료

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!


## finder 홈페이지:

https://finder-react.createx.studio/docs

## 피그마 다운로드 방법:

https://drive.google.com/drive/folders/1ePZasWCSpat2oeSlqAIuUvZqUBa9cZW1?usp=sharing
