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
