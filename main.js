const API =
  "https://api.thecatapi.com/v1/images/search?limit=9&api_key=live_xgbyoatLIMNosuJQQvUkYOrnC9hglH3Bvb9VIezv1j9aZdRYKwS7qejrowSOaZiA";
const APIFav =
  "https://api.thecatapi.com/v1/favourites?&api_key=live_xgbyoatLIMNosuJQQvUkYOrnC9hglH3Bvb9VIezv1j9aZdRYKwS7qejrowSOaZiA";
const APIFavD = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_xgbyoatLIMNosuJQQvUkYOrnC9hglH3Bvb9VIezv1j9aZdRYKwS7qejrowSOaZiA`;
const main = document.querySelector("main");
const aside = document.querySelector("aside");
const footer = document.querySelector("footer");
const spanErro = document.querySelector("#error-status");
const addFav = document.querySelector(".add__fav");
async function getDog() {
  const response = await fetch(API);
  const info = await response.json();
  if (response.status == 200) {
    let contenido = "";
    info.forEach((e, i) => {
      contenido += `
      <article>
        <img id="${i + 1}" src="${e.url}"" alt="dog" />    
        <button class="add" id="${e.id}">+</button>
      </article>
      `;
      main.innerHTML = contenido;
      const btnToAdd = document.querySelectorAll(".add");
      btnToAdd.forEach((e) =>
        e.addEventListener("click", () => {
          saveFav(e.id);
        })
      );
    });
  } else {
    spanErro.innerHTML = "Error: " + response.status;
  }
}

async function getFav() {
  const res = await fetch(APIFav);
  const data = await res.json();
  let favCat = "";
  data.forEach((e) => {
    if (e.image.id == undefined) {
      null;
    } else {
      favCat += `
      <article>
          <img id="${e.image.id}" src="${e.image.url}"" alt="dog" />    
          <button class="delete" id="${e.id}">🗑️</button>
        </article>
      `;
    }
  });
  aside.innerHTML = favCat;
  const btnDelet = document.querySelectorAll(".delete");
  btnDelet.forEach((e) =>
    e.addEventListener("click", () => {
      deleteFav(e.id);
    })
  );
}

async function saveFav(id) {
  const res = await fetch(APIFav, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  const dataput = await res.json();
}

async function deleteFav(id) {
  const res = await fetch(APIFavD(id), {
    method: "DELETE",
  });
  const dataput = await res.json();
}

getDog();
getFav();
