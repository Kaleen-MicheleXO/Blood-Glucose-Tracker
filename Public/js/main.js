// const e = require("express");
// const ThumbsUp = document.querySelectorAll(".fa-thumbs-up");
const DeleteText = document.querySelectorAll(".fa-trash");
// const ThumbsDown = document.querySelectorAll(".fa-thumbs-down");
// looping throught array with forEach to add a event listener with a call back
// Array.from(ThumbsUp).forEach((el) => {
//   el.addEventListener("click", addLike);
// });
Array.from(DeleteText).forEach((e) => {
  e.addEventListener("click", deleteBG);
});
// Array.from(ThumbsDown).forEach((element) => {
//   element.addEventListener("click", decreaseLike);
// });

// async function decreaseLike() {
//   const stitle = this.parentNode.childNodes[1].innerText;
//   const aName = this.parentNode.childNodes[3].innerText;
//   const sLikes = Number(this.parentNode.childNodes[5].innerText);
//   try {
//     ///route is addOneLike
//     const response = await fetch("decreaseLike", {
//       method: "put",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         Song: stitle,
//         Artist: aName,
//         likesS: sLikes,
//       }),
//     });
//     const data = await response.json();
//     console.log(data);
//     location.reload();
//   } catch (error) {
//     console.log(error);
//   }
// }

async function addLike() {
  const BGD = this.parentNode.childNodes[1].innerText;
  const BGT = this.parentNode.childNodes[3].innerText;
  const sLikes = Number(this.parentNode.childNodes[5].innerText);
  let D = new Date("BGD");
  try {
    ///route is addOneLike
    const response = await fetch("addBG", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        BGDate: D,
        BGTime: BGT,
        BGSugar: sLikes,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (error) {
    console.log(error);
  }
}

async function deleteBG() {
  const BGD = this.parentNode.childNodes[1].innerText;
  const BGT = this.parentNode.childNodes[3].innerText;
  const sLikes = Number(this.parentNode.childNodes[5].innerText);
  // console.log(sLikes)
  try {
    const response = await fetch("deleteBG", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        BGDate: BGD,
        BGTime: BGT,
        BGSugar: sLikes
      }),
    });
    const data = await response.json();
    // console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
