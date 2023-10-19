import {useState} from "react";
import useSWR from "swr";
import axios from "axios";

const SearchResults = ({searchTerm}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const apiUrl = "";

  // SWR 로 데이터 캐싱
  const {data, error} = useSWR(apiUrl, (url) => axios.get(url).then((res) => res.data));

  if (error) return <div> 에러가 발생했습니다 </div>;
  if (!data) return <div> 로딩 중 </div>;

  // 파지네이션을 위한 결과 데이터의 일부만 잘라서 표시
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedResults = data.slice(startIndex, endIndex);

  return (
    <div>
      {/* paginatedResults를 사용하여 페이지 내용 표시 */}
      {paginatedResults.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}

      {/* 파지네이션 컨트롤 버튼 */}
      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          이전
        </button>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={endIndex >= data.length}>
          다음
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
