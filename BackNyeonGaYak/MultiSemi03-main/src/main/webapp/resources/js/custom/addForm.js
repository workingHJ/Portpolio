function addParamAndSubmit(efcyQesitm) {
  var paramMap = {};
  paramMap["efcyQesitm"] = efcyQesitm;

  var form = document.createElement("form");
  form.setAttribute("method", "GET");
  form.setAttribute("name", "searchForm");
  form.setAttribute("action", "${path }/drug/symp");

  for (var key in paramMap) {
    if (paramMap.hasOwnProperty(key)) {
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", paramMap[key]);
      form.appendChild(input);
    }
  }

  document.body.appendChild(form);
  form.submit();
}
