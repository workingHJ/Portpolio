// components/Boxoffice.js
import {useEffect, useState} from "react";
import axios from "axios";
import {Spinner} from "react-bootstrap";
import {useRouter} from "next/router";

const Boxoffice = () => {
  const getYesterdayDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 7); // 어제 날짜로 변경
    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const router = useRouter();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const key1 = "a8294003fbf60422d0407ce51f5b4396";
  const key2 = "6A70MP32WWHHKP81D69O";
  const targetDT = getYesterdayDate(); // Replace with your target date

  const [selectedMovie, setSelectedMovie] = useState(null);

  const handlePostRequest = async (movie) => {
    try {
      const requestBody = {
        mvno: movie.movieSeq,
        movieId: movie.movieId,
        title: movie.title,
        titleeng: movie.titleEng,
        releaseDate: movie.openDt,
        directorNm: movie.directorNm,
        actorNm: movie.ACTORNM,
        company: movie.company,
        plotText: movie.plotText,
        posters: movie.posters,
        genre: movie.genre,
        nation: movie.nation,
        awards1: movie.awards1,
        awards2: movie.awards2,
        rating: movie.rank,
        prodYear: movie.prodYear,
      };

      const response = await axios.post("http://localhost:80/movies/checkAndInsertMovie", requestBody);

      console.log("POST 응답:", response.data);

      if (response.status === 200) {
        const mvno = response.data.mvno;
        router.push(`movieDetail/?id=${mvno}`);
      } else {
        throw new Error("오류가 발생하였습니다.");
      }
    } catch (error) {
      console.error("POST 요청 중 오류 발생:", error);
    }
  };

  const getMovies = async (movie) => {
    try {
      const response = await axios.get("http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp", {
        params: {
          collection: "kmdb_new2",
          detail: "Y",
          title: movie.movieNm,
          releaseDts: movie.openDt.replaceAll("-", ""),
          ServiceKey: key2,
        },
      });

      // Check if the necessary data exists before accessing it
      const kmdbJson = response.data;
      const firstPoster = kmdbJson.Data[0].Result[0].posters.split("|")[0];
      const plotText = kmdbJson.Data[0].Result[0].plots.plot[0].plotText;
      const actorNames = kmdbJson.Data[0].Result[0].actors.actor.map((actor) => actor.actorNm);
      const directorNm = kmdbJson.Data[0].Result[0].directors.director[0].directorNm;
      const limitedActorNm = actorNames.join(", ").slice(0, 90);

      return {
        title: movie.movieNm,
        rank: movie.rank,
        openDt: movie.openDt,
        posters: firstPoster,
        movieId: kmdbJson.Data[0].Result[0].movieId,
        movieSeq: kmdbJson.Data[0].Result[0].movieSeq,
        genre: kmdbJson.Data[0].Result[0].genre,
        nation: kmdbJson.Data[0].Result[0].nation,
        awards1: kmdbJson.Data[0].Result[0].awards1,
        awards2: kmdbJson.Data[0].Result[0].awards2,
        company: kmdbJson.Data[0].Result[0].company,
        titleeng: kmdbJson.Data[0].Result[0].titleEng,
        plotText: plotText,
        ACTORNM: limitedActorNm, // actorNm 값들을 쉼표로 구분된 문자열로 표시
        directorNm: directorNm,
        prodYear: kmdbJson.Data[0].Result[0].prodYear,
      };
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return null;
    }
  };

  const getBoxOffice = async () => {
    try {
      const response = await axios.get("https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json", {
        params: {
          key: key1,
          weekGb: 0,
          targetDt: targetDT,
        },
      });

      const boxOffice = response.data.boxOfficeResult.weeklyBoxOfficeList;
      const moviePromises = boxOffice.map((movie) => getMovies(movie));
      const moviesData = await Promise.all(moviePromises);

      const filteredMovies = moviesData.filter((movie) => movie !== null);
      console.log(response);

      setMovies(filteredMovies);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching box office data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBoxOffice();
  }, [targetDT]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="muted" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div
      className="d-flex flex-wrap justify-content-between 
    "
    >
      {movies.slice(0, 4).map((movie, index) => (
        <li
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            width: "25%",
            marginBottom: "1rem",
          }}
          onClick={() => handlePostRequest(movie)}
        >
          <div className="rounded-3 d-flex overflow-hidden" style={{position: "relative", marginBottom: "0.5rem", height: "300px", width: "fit-content"}}>
            {() => handlePostRequest(movie)}
            <p className="GmarketSansMedium" style={{position: "absolute", top: 0, left: 0, margin: "0.5rem", zIndex: 1, color: "white", fontSize: "24px"}}>
              <span style={{textShadow: "2px 2px 4px rgba(0, 0, 0, 1)", padding: "0.2rem 0.5rem"}}>{movie.rank}</span>
            </p>
            {movie.posters ? (
              <img
                src={movie.posters}
                alt={`${movie.title} 포스터`}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  height: "auto",
                  width: "auto",
                }}
              />
            ) : (
              <p>포스터 없음</p>
            )}
          </div>
          <div className="hanamdaum fs-5 mt-2 nav-link">{movie.title}</div>
        </li>
      ))}
    </div>
  );
};

export default Boxoffice;
