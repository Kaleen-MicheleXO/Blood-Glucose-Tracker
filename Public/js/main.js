
// const ThumbsUp = document.querySelectorAll(".fa-thumbs-up");
const DeleteText = document.querySelectorAll(".fa-trash");
 document.querySelector('.submit').addEventListener("click",BGcheck)
// looping throught array with forEach to add a event listener with a call back

Array.from(DeleteText).forEach((e) => {
  e.addEventListener("click", deleteBG);
});


function BGcheck (){
  const BG = Number(this.parentNode.childNodes[7].innerText);
  console.log(this.parentNode.childNodes)
  if (BG<=140){
    document.querySelector('.fa-thumbs-up').classList.remove('hidden')
  }else{document.querySelector('.fa-thumbs-up').classList.add('hidden')}

}

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
