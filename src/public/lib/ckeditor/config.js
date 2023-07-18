/* eslint-disable prefer-template */
/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */
let elfNode; let elfInstance; let dialogName;
let user = JSON.parse($.cookie('user'));
const elfDirHashMap = { // Dialog name / elFinder holder hash Map
  images: 'v1_aW1hZ2Vz0', // uploads/images
  products: 'v1_cHJvZHVjdHM1', // uploads/products
  news: 'v1_bmV3cw2', // uploads/news
  promotions: 'v1_cHJvbW90aW9ucw2', // uploads/products
  files: 'v1_L2xpbmtz0', // uploads/files
  fb: 'v1_dXBsb2Fkcw2', // Fall back target : `/` uploads
};
const imgShowMaxSize = 400; // Max image size(px) to show
const customData = {};
// Set image size to show
const setShowImgSize = function (url, callback) {
  $('<img/>').attr('src', url).on('load', function () {
    let w = this.naturalWidth;
    let h = this.naturalHeight;
    const s = imgShowMaxSize;
    if (w > s || h > s) {
      if (w > h) {
        h = Math.floor(h * (s / w));
        w = s;
      } else {
        w = Math.floor(w * (s / h));
        h = s;
      }
    }
    callback({ width: w, height: h });
  });
};
// Set values to dialog of CKEditor
const setDialogValue = function (file, fm) {
  let { url } = file;
  const dialog = CKEDITOR.dialog.getCurrent();
  const dialogName = dialog._.name;
  let tabName = dialog._.currentTabId;
  let urlObj;
  if (fm === undefined) {
    const { hash } = file;
    url = '/uploads' + Secure.DecodeBase64(hash.substring(3));
  }
  url = (commonUrl.media.cdn ? commonUrl.media.cdn : commonUrl.media.url) + url;
  if (dialogName == 'image') {
    urlObj = 'txtUrl';
  } else if (dialogName == 'flash') {
    urlObj = 'src';
  } else if (dialogName == 'files' || dialogName == 'link') {
    urlObj = 'url';
  } else if (dialogName == 'image2') {
    urlObj = 'src';
  } else {
    return;
  }
  if (tabName == 'Upload' || tabName == 'upload') {
    tabName = 'info';
    dialog.selectPage(tabName);
  }
  dialog.setValueOf(tabName, urlObj, url);
  if (dialogName == 'image' && tabName == 'info') {
    setShowImgSize(url, (size) => {
      dialog.setValueOf('info', 'txtWidth', size.width);
      dialog.setValueOf('info', 'txtHeight', size.height);
      dialog.preview.$.style.width = size.width + 'px';
      dialog.preview.$.style.height = size.height + 'px';
      dialog.setValueOf('Link', 'txtUrl', url);
      dialog.setValueOf('Link', 'cmbTarget', '_blank');
    });
  } else if (dialogName == 'image' && tabName == 'Link') {
    setShowImgSize(url, (size) => {
      dialog.setValueOf('info', 'txtWidth', size.width);
      dialog.setValueOf('info', 'txtUrl', url);
      dialog.setValueOf('info', 'txtHeight', size.height);
      dialog.preview.$.style.width = size.width + 'px';
      dialog.preview.$.style.height = size.height + 'px';
    });
  } else if (dialogName == 'image2' && tabName == 'info') {
    dialog.setValueOf(tabName, 'alt', file.name + ' (' + elfInstance.formatSize(file.size) + ')');
    setShowImgSize(url, (size) => {
      setTimeout(() => {
        dialog.setValueOf('info', 'width', size.width);
        dialog.setValueOf('info', 'height', size.height);
      }, 100);
    });
  } else if (dialogName == 'files' || dialogName == 'link') {
    try {
      if (tabName == 'Link') {
        dialog.setValueOf('info', 'url', url);
      }
      dialog.setValueOf('info', 'linkDisplayText', file.name);
    } catch (e) { }
  }
};

// Setup upload tab in CKEditor dialog
CKEDITOR.on('dialogDefinition', (event) => {
  const { editor } = event;
  const dialogDefinition = event.data.definition;
  const tabCount = dialogDefinition.contents.length;
  let browseButton; let uploadButton; let submitButton; let
    inputId;

  for (let i = 0; i < tabCount; i++) {
    try {
      browseButton = dialogDefinition.contents[i].get('browse');
      uploadButton = dialogDefinition.contents[i].get('upload');
      submitButton = dialogDefinition.contents[i].get('uploadButton');
    } catch (e) {
      browseButton = uploadButton = null;
    }

    if (browseButton !== null) {
      browseButton.hidden = false;
      browseButton.onClick = function (dialog, i) {
        dialogName = CKEDITOR.dialog.getCurrent()._.name;
        if (dialogName === 'image2') {
          dialogName = 'image';
        }
        if (elfNode) {
          if (elfDirHashMap[dialogName] && elfDirHashMap[dialogName] != elfInstance.cwd().hash) {
            elfInstance.request({
              data: { cmd: 'open', target: elfDirHashMap[dialogName] },
              notify: { type: 'open', cnt: 1, hideCnt: true },
              syncOnFail: true,
            });
          }
          elfNode.dialog('open');
        }
      }
    }

    if (uploadButton !== null && submitButton !== null) {
      uploadButton.hidden = false;
      submitButton.hidden = false;
      uploadButton.onChange = function () {
        inputId = this.domId;
      }
      // upload a file to elFinder connector
      submitButton.onClick = function (e) {
        dialogName = CKEDITOR.dialog.getCurrent()._.name;
        if (dialogName === 'image2') {
          dialogName = 'image';
        }
        const target = elfDirHashMap[dialogName] ? elfDirHashMap[dialogName] : elfDirHashMap.fb;
        const name = $('#' + inputId);
        const input = name.find('iframe').contents().find('form').find('input:file');
        const error = function (err) {
          alert(elfInstance.i18n(err).replace('<br>', '\n'));
        };

        if (input.val()) {
          const fd = new FormData();
          fd.append('cmd', 'upload');
          fd.append('target', target);
          fd.append('overwrite', 0); // Instruction to save alias when same name file exists
          $.each(customData, (key, val) => {
            fd.append(key, val);
          });
          fd.append('upload[]', input[0].files[0]);
          $.ajax({
            url: editor.config.filebrowserUploadUrl,
            type: 'POST',
            data: fd,
            processData: false,
            contentType: false,
            dataType: 'json',
            global: false,
          })
            .done((data) => {
              if (data.added && data.added[0]) {
                elfInstance.exec('reload');
                setDialogValue(data.added[0]);
              } else {
                error(data.error || data.warning || 'errUploadFile');
              }
            })
            .fail(() => {
              error('errUploadFile');
            })
            .always(() => {
              input.val('');
            });
        }
        return false;
      }
    }
  }
});

// Create elFinder dialog for CKEditor
CKEDITOR.on('instanceReady', (e) => {
  elfNode = $('<div style="padding:0;">');
  elfNode.dialog({
    autoOpen: false,
    modal: true,
    width: '80%',
    title: 'Quản lý file',
    create(event, ui) {
      const elfUrl = commonUrl.media.url + commonUrl.media.connector + '?token=' + Secure.EncodeBase64(user.Token); // Your connector's URL
      const startPathHash = (elfDirHashMap[dialogName] && elfDirHashMap[dialogName]) ? elfDirHashMap[dialogName] : '';
      // elFinder configure
      elfInstance = $(this).elfinder({
        baseUrl: '/lib/elFinder/',
        startPathHash,
        useBrowserHistory: false,
        resizable: false,
        width: '100%',
        url: elfUrl,
        lang: 'vi',
        dialogContained: true,
        getFileCallback(file, fm) {
          setDialogValue(file, fm);
          elfNode.dialog('close');
        },
      }).elfinder('instance');
    },
    open() {
      elfNode.find('div.elfinder-toolbar input').blur();
      setTimeout(() => {
        elfInstance.enable();
      }, 100);
    },
    resizeStop() {
      elfNode.trigger('resize');
    },
  }).parent().css({ zIndex: '11000' });

  // CKEditor instance
  const cke = e.editor;

  // Setup the procedure when DnD image upload was completed
  cke.widgets.registered.uploadimage.onUploaded = function (upload) {
    const self = this;
    setShowImgSize(upload.url, (size) => {
      self.replaceWith('<img src="' + encodeURI(upload.url) + '" width="' + size.width + '" height="' + size.height + '"></img>');
    });
  }

  // Setup the procedure when send DnD image upload data to elFinder's connector
  cke.on('fileUploadRequest', (e) => {
    const target = elfDirHashMap.image ? elfDirHashMap.image : elfDirHashMap.fb;
    const { fileLoader } = e.data;
    const { xhr } = fileLoader;
    const formData = new FormData();
    e.stop();
    xhr.open('POST', fileLoader.uploadUrl, true);
    formData.append('cmd', 'upload');
    formData.append('target', target);
    formData.append('upload[]', fileLoader.file, fileLoader.fileName);
    xhr.send(formData);
  }, null, null, 4);

  // Setup the procedure when got DnD image upload response
  cke.on('fileUploadResponse', (e) => {
    let file;
    e.stop();
    const { data } = e;
    const res = JSON.parse(data.fileLoader.xhr.responseText);
    if (!res.added || res.added.length < 1) {
      data.message = 'Can not upload.';
      e.cancel();
    } else {
      elfInstance.exec('reload');
      file = res.added[0];
      if (file.url && file.url != '1') {
        data.url = file.url;
        try {
          data.url = decodeURIComponent(data.url);
        } catch (e) { }
      } else {
        data.url = elfInstance.options.url + ((elfInstance.options.url.indexOf('?') === -1) ? '?' : '&') + 'cmd=file&target=' + file.hash;
      }
      data.url = elfInstance.convAbsUrl(data.url);
    }
  });
});
CKEDITOR.editorConfig = function (config) {
  token = Secure.EncodeBase64(user.Token);
  config.language = 'vi';
  config.htmlEncodeOutput = false;
  config.filebrowserBrowseUrl = commonUrl.media.url + commonUrl.media.connector + '?token=' + token;
  config.filebrowserImageBrowseUrl = config.filebrowserBrowseUrl;
  config.filebrowserFlashBrowseUrl = config.filebrowserBrowseUrl;
  config.filebrowserUploadUrl = config.filebrowserBrowseUrl;
  config.filebrowserImageUploadUrl = config.filebrowserBrowseUrl;
  config.filebrowserFlashUploadUrl = config.filebrowserBrowseUrl;
  config.toolbarGroups = [
    { name: 'document', groups: ['mode', 'document', 'doctools'] },
    { name: 'clipboard', groups: ['clipboard', 'undo'] },
    { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
    '/',
    { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
    { name: 'links', groups: ['links'] },
    { name: 'insert', groups: ['insert'] },
    '/',
    { name: 'styles', groups: ['styles'] },
    { name: 'colors', groups: ['colors'] },
    { name: 'tools', groups: ['tools'] },
    { name: 'others', groups: ['others'] },
    { name: 'about', groups: ['about'] },
  ];
  config.removeButtons = 'Source,CreateDiv,Iframe,ShowBlocks';
  // config.extraPlugins += (config.extraPlugins.length === 0 ? '' : ',') + 'ckeditor_wiris';
  config.allowedContent = true;
  config.toolbar_Basic = [
    { name: 'document', items: ['ExportPdf', 'Preview', 'Print'] },
    { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
    { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },
    { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
    { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
    { name: 'links', items: ['Link', 'Unlink'] },
    { name: 'insert', items: ['Smiley', 'SpecialChar'] },
    { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
    { name: 'colors', items: ['TextColor', 'BGColor'] },
    { name: 'tools', items: ['Maximize'] },
    { name: 'about', items: ['About'] },
  ];
};
