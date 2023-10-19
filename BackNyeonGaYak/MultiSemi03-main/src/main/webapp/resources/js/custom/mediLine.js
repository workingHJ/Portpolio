$(() => {
  resetCheckBox();
});

function handleCheckboxChange($checkboxes) {
  $checkboxes.each(function () {
    var checked = $(this).prop("checked");
    var $label = $(this).next();
    if (checked) {
      $label.css("color", "var(--ar-primary)");
      $label.addClass("fw-semibold");
      $label.parent().css("border", "dotted 2px var(--ar-primary)");
      $label.parent().addClass("rounded-2");
    } else {
      $label.css("color", "var(--ar-black");
      $label.removeClass("fw-semibold");
      $label.parent().css("border", "none");
    }
  });
}

function resetCheckBox() {
  handleCheckboxChange($('input[name="drugShape"]'));
  handleCheckboxChange($('input[name="drugColor"]'));
  handleCheckboxChange($('input[name="drugType"]'));
  handleCheckboxChange($('input[name="itemLine"]'));
}

$('input[name="drugShape"]').change(function () {
  handleCheckboxChange($('input[name="drugShape"]'));
});

$('input[name="drugColor"]').change(function () {
  handleCheckboxChange($('input[name="drugColor"]'));
});

$('input[name="drugType"]').change(function () {
  handleCheckboxChange($('input[name="drugType"]'));
});

$('input[name="itemLine"]').change(function () {
  handleCheckboxChange($('input[name="itemLine"]'));
});

$("#reset").click(function () {
  $("#drugShapeAll").prop("checked", true);
  $("#drugColorAll").prop("checked", true);
  $("#drugTypeAll").prop("checked", true);
  $("#itemLine").prop("checked", true);

  resetCheckBox();
});
