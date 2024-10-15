/**
 * Id window yang sedang digunakan.
 */
const windowId = (await chrome.windows.getLastFocused({
  windowTypes: ['normal']
})).id;

/**
 * Memanggil semua fungsi-fungsi yang dibutuhkan untuk menampilkan popup.
 */
async function renderPopup() {
  const imgBase64 = await chrome.tabs.captureVisibleTab(windowId);
  renderScreenShot(imgBase64);
  handleSaveButton(imgBase64);
  handleCancelButton();
}
renderPopup();

/**
 * Menampilkan gambar screenshot dalam popup.
 * @param {string} imgBase64 
 */
function renderScreenShot(imgBase64) {
  const imageElement = new Image();
  imageElement.src = imgBase64;

  const container = document.querySelector('.js-result');
  container.appendChild(imageElement);
}

/**
 * Menambahkan anchor element ke dalam tombol simpan.
 * @param {string} imgBase64 
 */
function handleSaveButton(imgBase64) {
  const linkElement = document.createElement('a');
  linkElement.innerText = 'Simpan';
  linkElement.classList.add('main__link');
  linkElement.href = imgBase64;
  linkElement.download = 'screenshot';

  const saveButton = document.querySelector('.js-save-btn');
  saveButton.appendChild(linkElement);
}

/**
 * Menambahkan click event listener ke tombol batal.
 */
function handleCancelButton() {
  const cancelButton = document.querySelector('.js-cancel-btn');
  cancelButton.addEventListener('click', () => {
    window.close();
  });
}