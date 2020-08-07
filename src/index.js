const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = 'https://rickandmortyapi.com/api/character/'; 

window.addEventListener("beforeunload", () => {
  localStorage.clear();
});

const  getData = async (api) => {
  await fetch(api)
    .then(response => response.json())
    .then(response => {      
      const characters = response.results
      let output = characters
        .map(character => {
          return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.gender}</span></h2>
      </article>
      `;
    })
    .join("")

  let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML = output;
      $app.appendChild(newItem);
      //Enviar a localStorage el siguiente fetch
      localStorage.setItem("next_fetch", response.info.next);
    })
    .catch(error => console.log(error));
}

const loadData = api => {
  getData(api);
};

const intersectionObserver = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      let next_fetch_api = localStorage.getItem("next_fetch");
      if (next_fetch_api == "") {
        
        return;
      }

      let api = next_fetch_api || API;
      loadData(api);
    }
  },
);

intersectionObserver.observe($observe);