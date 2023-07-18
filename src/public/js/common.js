const addEventForItem = function (e) {
  const $item = $(e.target);
  const $div = $item.find(".ck-editor");
  const $textarea = $item.find(".ck-editor textarea");
  if ($textarea && $textarea.length > 0) {
    $textarea.addClass("isCKEditor");
    const key = $textarea.attr("name");
    $textarea.attr("id", key);
    const $editor = CKEDITOR.replace(key, {
      height: $div.attr("height") ? parseInt($div.attr("height")) : 200,
      toolbar: "Full",
      customConfig: `/lib/ckeditor/config.js?v=${new Date().getTime()}`,
    });
    $editor.on("change", () => {
      const data = CKEDITOR.instances[key].getData();
      $textarea.val(data);
      const event = new CustomEvent("updateCKEditor", {
        detail: {
          key,
          val: data,
        },
      });
      window.dispatchEvent(event);
    });
  }
};

document.addEventListener("DOMNodeInserted", addEventForItem);
