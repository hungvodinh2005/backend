const tableProducts = document.querySelector("[tableProducts]");
//start changeStatus
const changeStatus = document.querySelectorAll("[buttonChangeStatus]");
const buttonFormStatus = document.querySelector("[buttonFormStatus]");
if (changeStatus) {
  changeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("buttonID");
      const status = button.getAttribute("buttonStatus");
      const path = buttonFormStatus.getAttribute("path");
      const action = path + `/${id}` + `/${status}` + "?_method=PATCH";
      buttonFormStatus.action = action;
      buttonFormStatus.submit();
    });
  });
}
//end changStatus
//start checkbox
const checkboxAll = document.querySelector("[checkboxAll]");
const checkboxChild = document.querySelectorAll("[checkboxChild]");
const forminputMulti = document.querySelector("[formChangeMulti]");
const selectMulti = forminputMulti.querySelector("select[name=type]");
const inputMulti = forminputMulti.querySelector("input[name=id]");
const buttonSubmit = forminputMulti.querySelector("button[type=submit]");
const inputPosition = forminputMulti.querySelector("input[inputPosition]");
if (checkboxAll) {
  checkboxAll.addEventListener("click", () => {
    if (checkboxChild) {
      checkboxChild.forEach((checkChild) => {
        if (checkboxAll.checked == true) {
          checkChild.checked = true;
        } else {
          checkChild.checked = false;
        }
      });
      const checkboxChildLengthChecked = document.querySelectorAll(
        "[checkboxChild]:checked"
      );
      const inputValue = [...checkboxChildLengthChecked]
        .map((e) => e.value)
        .join(",");
      inputMulti.value = inputValue;
    }
  });
}
if (checkboxChild) {
  checkboxChild.forEach((checkChild) => {
    checkChild.addEventListener("click", () => {
      const checkboxChildLengthChecked = document.querySelectorAll(
        "[checkboxChild]:checked"
      );
      if (checkboxChildLengthChecked.length == checkboxChild.length) {
        checkboxAll.checked = true;
      } else {
        checkboxAll.checked = false;
      }
      const inputValue = [...checkboxChildLengthChecked]
        .map((e) => e.value)
        .join(",");
      inputMulti.value = inputValue;
    });
  });
}
console.log(selectMulti.value);
if (forminputMulti) {
  forminputMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputValue;
    const checkboxChildLengthChecked = document.querySelectorAll(
      "[checkboxChild]:checked"
    );
    const StatusSelect = e.target.elements.type.value;

    console.log(StatusSelect);

    inputValue = [...checkboxChildLengthChecked].map((e) => e.value).join(",");
    if (StatusSelect == "position") {
      inputValue = [...checkboxChildLengthChecked]
        .map((item) => {
          return (
            item.value +
            "-" +
            item.closest("tr").querySelector("[inputPosition]").value
          );
        })
        .join(",");
    }

    inputMulti.value = inputValue;
    if (inputValue) {
      if (StatusSelect == "delete") {
        const checkDelete = confirm("You want to delete this item,right?");
        if (checkDelete == true) {
          forminputMulti.submit();
        }
      } else {
        forminputMulti.submit();
      }
    } else {
      alert("Please choose any box that you want to update!");
    }
  });
}

//end checkbox
//delete item//
const buttonDelete = tableProducts.querySelectorAll("[buttonDelete]");
console.log(buttonDelete);
const formDelete = document.querySelector("[buttonFormDelete]");
console.log(formDelete);
if (buttonDelete) {
  buttonDelete.forEach((buttonDeleteitem) => {
    buttonDeleteitem.addEventListener("click", () => {
      const checkDelete = confirm("You want to delete this item,right?");
      if (checkDelete == true) {
        const id = buttonDeleteitem.getAttribute("buttonDelete");
        const path = formDelete.getAttribute("path");
        formDelete.action = path + `/${id}?_method=DELETE`;
        formDelete.submit();
      }
    });
  });
}
//end delete//
//notice
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

//end notice
