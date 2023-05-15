const btnDeleteMovie = document.getElementById("btn-delete");

btnDeleteMovie.onclick = () => {
  let checkBoxs = document.getElementsByName("deleteMovieCheckBox");
  let deleteIds = [];
  for (let checkBox of checkBoxs) {
    if (checkBox.checked) {
      deleteIds.push(checkBox.value);
    }
  }

  //   create http req send deletedIds
  if (deleteIds.length !== 0) {
    const xhr = new XMLHttpRequest();
    const url = "http://localhost:3000/management/movies/delete";
    const data = { deleteIds: deleteIds };
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", function () {
      if (xhr.status === 200) {
        alert("Success");
        location.reload();
      }
    });
    xhr.addEventListener("error", function () {
      alert("Fail!");
      location.reload();
    });
    xhr.send(JSON.stringify(data));
  } else {
    alert("Please Select");
  }
};

function popUpMoreModal(event) {
  //set btn modal
  event.target.setAttribute("data-bs-toggle", "modal");
  event.target.setAttribute("data-bs-target", "#moreInforModal");
  //get value movie
  const row = event.target.parentNode.parentNode;
  const id = row.cells[0].textContent;
  const title = row.cells[1].textContent;
  const rating = row.cells[2].textContent;
  const duartion = row.cells[3].textContent;
  const country = row.cells[4].textContent;
  const gerne = row.cells[5].textContent;
  const director = row.cells[6].textContent;
  const producer = row.cells[7].textContent;
  const release = document.querySelector(".release-hide").textContent;
  const actor = document.querySelector(".actor-hide").textContent;
  const description = document.querySelector(".descrip-hide").textContent;
  const image = document.querySelector(".img-hide").textContent;
  const video = document.querySelector(".video-hide").textContent;

  document.getElementById("idUpdateMovie").value = id;
  document.getElementById("titleUpdateMovie").value = title;
  document.getElementById("ratingUpdateMovie").value = rating;
  document.getElementById("durationUpdateMovie").value = duartion;
  document.getElementById("countryUpdateMovie").value = country;
  document.getElementById("gerneUpdateMovie").value = gerne;
  document.getElementById("directorUpdateMovie").value = director;
  document.getElementById("producerUpdateMovie").value = producer;
  document.getElementById("releaseUpdateMovie").value = release;
  document.getElementById("actorUpdateMovie").value = actor;
  document.getElementById("descriptionUpdateMovie").value = description;
  document.getElementById("imageUpdateMovie").value = image;
  document.getElementById("videoUpdateMovie").value = video;
}
