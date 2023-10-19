$(() => {
  const $btnCheckAll = $("#btn-check-All");
  const $btnCheckCAll = $("#btn-check-C-All");
  const $hmcType1Inputs = $("input[name=hmcType1]");
  const $hmcType2Inputs = $("input[name=hmcType2]");

  $btnCheckAll.prop("checked", $btnCheckAll.is(":checked"));
  $btnCheckCAll.prop("checked", $btnCheckCAll.is(":checked"));
  $hmcType2Inputs.prop("checked", $hmcType2Inputs.is(":checked"));

  $btnCheckAll.click(function () {
    const isChecked = $(this).is(":checked");
    $hmcType1Inputs.prop("checked", isChecked);
    $hmcType2Inputs.prop("checked", isChecked);
    handleCheckBoxes($hmcType1Inputs.add($hmcType2Inputs));
  });

  $btnCheckCAll.click(function () {
    const isChecked = $(this).is(":checked");
    $hmcType2Inputs.prop("checked", isChecked);
    handleCheckBoxes($hmcType2Inputs);
  });

  $hmcType1Inputs.add($hmcType2Inputs).click(function () {
    const total = $hmcType1Inputs.add($hmcType2Inputs).length;
    const checked = $hmcType1Inputs
      .add($hmcType2Inputs)
      .filter(":checked").length;
    $btnCheckAll.prop("checked", total === checked);
    handleCheckBoxes($hmcType1Inputs.add($hmcType2Inputs));
  });

  handleCheckBoxes($hmcType1Inputs.add($hmcType2Inputs));
});

function handleCheckBoxes($checkboxes) {
  $checkboxes.each(function () {
    const $label = $(this).next();
    $label.css("background", this.checked ? "var(--ar-primary)" : "");
  });
}
