const buttonstatus = document.querySelectorAll("[button-status]");

if (buttonstatus.length > 0) {
  let url = new URL(window.location.href);

  let currentStatus = url.searchParams.get("status");
  if (!currentStatus) {
    buttonstatus[0].classList.add("active");
  }
  buttonstatus.forEach((button) => {
    if (
      button.getAttribute("button-status") === currentStatus &&
      currentStatus != ""
    ) {
      button.classList.add("active");
      buttonstatus[0].classList.remove("active");
    }
    button.addEventListener("click", () => {
      button.classList.add("active");
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}
const formSearch = document.querySelector(".form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const valueInput = e.target.elements.keyword.value;
    if (valueInput) {
      url.searchParams.set("keyword", valueInput);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
//function tranfer page
const indexPage = document.querySelectorAll("[button-pages]");
if (indexPage) {
  let url = new URL(window.location.href);
  indexPage.forEach((item) => {
    item.addEventListener("click", () => {
      const page = item.getAttribute("button-pages");
      if (page) {
        url.searchParams.set("page", page);
      } else {
        url.searchParams.delete("page");
      }
      window.location.href = url.href;
    });
  });
}
