function forPage(page) {
  let efcyQesitm = getParameterByName("efcyQesitm");
  var paramMap = {};
  paramMap["efcyQesitm"] = efcyQesitm;

  var form = document.createElement("form");
  form.setAttribute("method", "GET");
  form.setAttribute("name", "searchForm");
  form.setAttribute("action", "semi03/drug/symp");

  for (var key in paramMap) {
    if (paramMap.hasOwnProperty(key)) {
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", paramMap[key]);
      form.appendChild(input);
    }
  }

  var pageInput = document.createElement("input");
  pageInput.setAttribute("type", "hidden");
  pageInput.setAttribute("name", "page");
  form.appendChild(pageInput);

  document.body.appendChild(form);
  searchForm.page.value = page;
  form.submit();
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results == null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}
