

const DeleteText = document.querySelectorAll(".fa-trash");
//document.querySelector('.submit').addEventListener("click",BG)


Array.from(DeleteText).forEach((e) => {
  e.addEventListener("click", deleteBG);
});

// document.querySelectorAll('.Blood-Sugar-Data').forEach(li => {
//   const BG = Number(li.childNodes[5].innerText);
//   let span = document.createElement('span')

//   if (BG<=100 && BG>=70){
//     span.className = 'fa-solid fa-face-smile';
//     li.appendChild(span)
    // li.querySelector('.fa-face-smile').classList.remove('hidden')
//   }
//   else if (BG>=101 && BG<=140){
  
//     // li.querySelector('.fa-face-meh').classList.remove('hidden')
//   }
//   else{
//     // li.querySelector('.fa-face-frown').classList.remove('hidden')
// }
  
// });



async function deleteBG() {
  console.log("HELLLLLP")
  //console.log(this.parentNode.childNodes)
  const id = this.parentNode.id
  console.log(id);
  const BGD = this.parentNode.childNodes[1].innerText;
  //const BGT = this.parentNode.childNodes[3].innerText;
  const BG = document.getElementsByClassName('Blood-Sugarr').innerText;
  try {
    const response = await fetch("deleteBG", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "_id": id,
        "BGDate": BGD,
        // "BGTime": BGT,
        "BGSugar": BG 
      }),
    });
    const data = await response.json();
     console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}


