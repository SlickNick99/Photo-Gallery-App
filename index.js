const inputEl = document.querySelector(".input");
const btnEl = document.getElementById("container__btn");
const smallErrorMsg = document.getElementById("error-message");
const galleryEl = document.getElementById("gallery");

async function fetchImage() {
  const inputValue = document.getElementById("container__input").value;
  if (inputValue > 10 || inputValue < 1) {
    smallErrorMsg.style.display = "block";
    return;
  }

  imgs = "";

  try {
    btnEl.style.display = "none";
    const loading = `<img src="spinner.svg" />`;
    galleryEl.innerHTML = loading;
    await fetch(
      `https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(
        Math.random() * 1000
      )}&client_id=yn6rmZ8FiBrReFxw_-cWLmiAPAkwEnSV9dPpocCwqLo`
    ).then((res) =>
      res.json().then((data) => {
        if (data) {
          data.forEach((pic) => {
            imgs += `<img src=${pic.urls.small} alt="image"/>`;
            galleryEl.style.display = "block";
            galleryEl.innerHTML = imgs;
            btnEl.style.display = "block";
            smallErrorMsg.style.display = "none";
          });
        }
      })
    );
  } catch (error) {
    console.log(error);
    smallErrorMsg.style.display = "block";
    smallErrorMsg.innerHTML = "An error happened, try again later";
    btnEl.style.display = "block";
  }
}
btnEl.addEventListener("click", fetchImage);
