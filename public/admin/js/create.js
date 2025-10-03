//preview image
const image = document.querySelector("[thumbnail]");

const uploadPreviewImage = image
  .closest(".row")
  .querySelector("[uploadPreviewImage]");
const buttonClose = uploadPreviewImage
  .closest("div")
  .querySelector(".removeCloseUpload");
console.log(uploadPreviewImage);
if (image) {
  image.addEventListener("change", (e) => {
    const [file] = e.target.files;
    if (file) {
      uploadPreviewImage.src = URL.createObjectURL(file);
      buttonClose.classList.remove("d-none");
      uploadPreviewImage.classList.remove("d-none");
    }
  });
}
if (buttonClose) {
  buttonClose.addEventListener("click", () => {
    buttonClose.classList.add("d-none");
    uploadPreviewImage.classList.add("d-none");
    image.value = "";
    uploadPreviewImage.value = "";
  });
}
const notice = document.querySelector("[notice]");
const close = notice.querySelector(".close");
if (notice) {
  // hiện từ từ
  setTimeout(() => notice.classList.add("show"), 4000);

  const time = parseInt(notice.getAttribute("time")) || 5000;

  setTimeout(() => {
    notice.classList.remove("show");
    notice.classList.add("hide");
    setTimeout(() => notice.remove(), 1000);
  }, time);
}
if (close) {
  close.addEventListener("click", () => {
    notice.classList.add("hide");
  });
}

//end
