
$(document).ready(function(){
  $(".symtoms .btn").click(function(){
    $(".symtoms .btn").removeClass("text-bg-dark").addClass("text-bg-secondary");
    $(this).removeClass("text-bg-secondary").addClass("text-bg-dark");
  });
});

