// const e = require("express");
const ThumbsUp = document.querySelectorAll(".fa-thumbs-up");
const DeleteText = document.querySelectorAll(".fa-trash");
const ThumbsDown = document.querySelectorAll(".fa-thumbs-down");
// looping throught array with forEach to add a event listener with a call back
Array.from(ThumbsUp).forEach((el) => {
  el.addEventListener("click", addLike);
});
Array.from(DeleteText).forEach((e) => {
  e.addEventListener("click", deleteSong);
});
Array.from(ThumbsDown).forEach((element) => {
  element.addEventListener("click", decreaseLike);
});

async function decreaseLike() {
  const stitle = this.parentNode.childNodes[1].innerText;
  const aName = this.parentNode.childNodes[3].innerText;
  const sLikes = Number(this.parentNode.childNodes[5].innerText);
  try {
    ///route is addOneLike
    const response = await fetch("decreaseLike", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Song: stitle,
        Artist: aName,
        likesS: sLikes,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (error) {
    console.log(error);
  }
}

async function addLike() {
  const stitle = this.parentNode.childNodes[1].innerText;
  const aName = this.parentNode.childNodes[3].innerText;
  const sLikes = Number(this.parentNode.childNodes[5].innerText);
  try {
    ///route is addOneLike
    const response = await fetch("addOneLike", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Song: stitle,
        Artist: aName,
        likesS: sLikes,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (error) {
    console.log(error);
  }
}

// async function deleteSong() {
//   const stitle = this.parentNode.childNodes[1].innerText;
//   const aName = this.parentNode.childNodes[3].innerText;
//   try {
//     const response = await fetch("deleteSong", {
//       method: "delete",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         Song: stitle,
//         Artist: aName,
//       }),
//     });
//     const data = await response.json();
//     console.log(data);
//     location.reload();
//   } catch (err) {
//     console.log(err);
//   }
//}
