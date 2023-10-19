import {useState} from "react";
import Dropdown from "react-bootstrap/Dropdown";

const DropdownSelect = ({defaultValue, options, icon, variant, darkMenu, onSelect, ...props}) => {
  const [selected, setSelected] = useState(defaultValue);

  const iconEl = icon ? <i className={`${icon} me-2 pt-1`}></i> : "";

  const handleSelect = (eventKey, e) => {
    setSelected(eventKey);
    onSelect(eventKey);
  };

  let displayCategory;
  if (selected === "book") {
    displayCategory = "도서";
  } else if (selected === "exhibition") {
    displayCategory = "전시";
  } else if (selected === "movie") {
    displayCategory = "영화";
  } else if (selected === "perform") {
    displayCategory = "공연";
  }

  return (
    <Dropdown {...props} onSelect={handleSelect}>
      <Dropdown.Toggle variant={variant ? variant : "link"}>
        <span className="me-2">{iconEl}</span>
        {displayCategory}
      </Dropdown.Toggle>
      <Dropdown.Menu variant={darkMenu ? "dark" : ""}>
        <Dropdown.Item eventKey="movie">영화</Dropdown.Item>
        <Dropdown.Item eventKey="exhibition">전시</Dropdown.Item>
        <Dropdown.Item eventKey="perform">공연</Dropdown.Item>
        <Dropdown.Item eventKey="book">도서</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownSelect;
