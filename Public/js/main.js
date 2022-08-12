
// const ThumbsUp = document.querySelectorAll(".fa-thumbs-up");
const DeleteText = document.querySelectorAll(".fa-trash");
//document.querySelector('.submit').addEventListener("click",BGcheck)


Array.from(DeleteText).forEach((e) => {
  e.addEventListener("click", deleteBG);
});



document.querySelectorAll('.Blood-Sugar-Data').forEach(li => {
  const BG = Number(li.childNodes[5].innerText);

  if (BG<=100 && BG>=70){
    li.querySelector('.fa-face-smile').classList.remove('hidden')
  }
  else if (BG>=101 && BG<=140){
    li.querySelector('.fa-face-meh').classList.remove('hidden')
  }
  else{li.querySelector('.fa-face-frown').classList.remove('hidden')
}
  
});



async function deleteBG() {
  const BGD = this.parentNode.childNodes[1].innerText;
  const BGT = this.parentNode.childNodes[3].innerText;
  const BG = Number(this.parentNode.childNodes[5].innerText);
  // console.log(sLikes)
  try {
    const response = await fetch("deleteBG", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        BGDate: BGD,
        BGTime: BGT,
        BGSugar: BG 
      }),
    });
    const data = await response.json();
    // console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
