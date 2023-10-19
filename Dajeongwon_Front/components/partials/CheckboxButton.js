import React from "react";
import {Button} from "react-bootstrap";

const CheckboxButton = ({label, checked, onChange}) => {
  return (
    <Button variant={checked ? "primary" : "outline-primary"} className="pyeongChang-regular me-2 mb-2" onClick={onChange} active={checked}>
      {label}
    </Button>
  );
};

export default CheckboxButton;
