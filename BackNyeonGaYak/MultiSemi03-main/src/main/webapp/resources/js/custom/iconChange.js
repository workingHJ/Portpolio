$(document).ready(function () {
  var clicked = false;

  // 아이콘 변경하는 영역
  $(".ai-heart")
    .on("mouseover", function () {
      if (!clicked) {
        $(this).attr("class", "ai-heart-filled fs-xl");
        $(this).css("color", "var(--ar-warning)");
      }
    })
    .on("mouseleave", function () {
      if (!clicked) {
        $(this).attr("class", "ai-heart fs-xl");
        $(this).css("color", "var(--ar-gray-500)");
      }
    })
    .on("click", function () {
      if (!clicked) {
        clicked = true;
        $(this).attr("class", "ai-heart-filled fs-xl");
        $(this).css("color", "var(--ar-warning)");
      } else {
        clicked = false;
      }
    });
});
