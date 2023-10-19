function getCheckedValue(name) {
  var radioButtons = document.getElementsByName(name);

  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      return radioButtons[i].value;
    }
  }

  return null; // 선택된 값이 없을 경우 null 반환 또는 다른 처리 방식 적용
}

function restoreSelection() {
  var selectedDrugType = drugTypeValue; // JSP에서 전달된 drugType 값
  var selectedDrugShape = drugShapeValue; // JSP에서 전달된 drugShape 값
  var selectedDrugColor = drugColorValue;
  var selectedItemLine = itemLineValue;

  var drugTypeButtons = document.getElementsByName("drugType");
  var drugShapeButtons = document.getElementsByName("drugShape");
  var drugColorButtons = document.getElementsByName("drugColor");
  var itemLineButtons = document.getElementsByName("itemLine");

  setSelectedValue(drugTypeButtons, selectedDrugType);
  setSelectedValue(drugShapeButtons, selectedDrugShape);
  setSelectedValue(drugColorButtons, selectedDrugColor);
  setSelectedValue(itemLineButtons, selectedItemLine);
}

function setSelectedValue(radioButtons, selectedValue) {
  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].value === selectedValue) {
      radioButtons[i].checked = true;
      break;
    }
  }
}
