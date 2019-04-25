var remove = document.querySelector("#verwijderKnop");

if (remove) {
  remove.addEventListener("click", removeRecipe);
}

function removeRecipe(ev) {
  var node = ev.target;
  var id = node.dataset.id;
  var res = new XMLHttpRequest();

  res.open("DELETE", "/" + id);
  res.onload = onload;
  res.send();

  function onload() {
    if (res.status !== 200) {
      throw new Error("Could not delete!");
    }

    window.location = "/recipe";
  }
}

const pijltjeRechts = document.querySelectorAll(".nextRecipeRight");
const pijltjeLinks = document.querySelectorAll(".nextRecipeLeft");
const list = document.querySelector(".list_recipes");

pijltjeRechts.forEach(pijl => pijl.addEventListener("click", moveSliderRechts));
pijltjeLinks.forEach(pijl => pijl.addEventListener("click", moveSliderLinks));

let translate = 0
function moveSliderRechts() {
  translate = translate - 400
  list.style.transform = `translate(${translate}px)`
}

function moveSliderLinks() {
  translate = translate + 400
  list.style.transform = `translate(${translate}px)`
}
