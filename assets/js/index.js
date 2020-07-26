const URL_TO_FETCH =
  "https://api.instabuy.com.br/apiv3/layout?subdomain=organicos";
const IMG_TO_FETCH = "https://assets.instabuy.com.br/ib.item.image.large/l-";
const BANNERS = "banners";
const COLLECTION_ITEMS = "collection_items";

const dataInstaBuy = async (URL_TO_FETCH) => {
  try {
    const dataResponse = await fetch(URL_TO_FETCH);
    const dataJSON = await dataResponse.json();
    console.log(dataJSON);

    return dataJSON.data;
  } catch (error) {
    console.log(error);
  }
};

const instaBuyAPI = async () => {
  const { collection_items } = await dataInstaBuy(URL_TO_FETCH);

  const title = document.querySelector("#slug");

  collection_items.forEach((data) => {
    const setTitleSlugs = createSlug(data);

    title.appendChild(setTitleSlugs);
    console.log(title);
  });
};

const createSlug = (data) => {
  const { slug, id, title, items } = data;
  const liNav = document.createElement("li");
  const sectionName = document.querySelector("#sectorName");
  const sectionCards = document.querySelector("#expandedShowItems");
  const clearUl = document.querySelector("#slug").childNodes;

  liNav.classList.add("list-group-item", "p-2");
  liNav.setAttribute(
    "style",
    "min-width: 100px !important; text-align: center"
  );
  liNav.innerHTML = `<a class="text-decoration-none text-muted text-center" id="${slug}-${id}"  href="#${slug}">${title}</a>`;

  liNav.addEventListener("click", () => {
    clearUl.forEach((data) => data.classList.remove("bg-light"));
    liNav.classList.add("bg-light");

    sectionName.innerText = "";
    sectionName.innerHTML = `<h3 class="h4 pt-1">${title}</h3>`;

    sectionCards.innerText = "";
    items.forEach((data) => {
      const card = cardBody(data);
      sectionCards.append(card);

      // console.log(`*** createItems.card-${slug}=>`, card);
    });
  });

  return liNav;
};

const cardBody = (data) => {
  const { name, images, prices, available_stock } = data;
  const imageFetch = IMG_TO_FETCH + images[0];
  const price = prices[0].price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  if (available_stock) {
    const liCard = document.createElement("li");

    liCard.innerText = "";
    liCard.innerHTML = `
    <div class="card, fade-in, shadow-sm">
      <a data-fancybox="gallery" href="${imageFetch}">
        <img src="${imageFetch}" class="card-img align-self-center p-4" alt="${name}">
      </a>

      <div class="card-body h-100 p-2">
        <h6 class="card-title d-inline-block mt-1">${price}</h6>
    
        <p class="card-text"><small class="text-muted text-center">${name}</small></p>
      </div>
    </div>
    `;

    return liCard;
  }
};

const cardBodyExpanded = (data) => {
  const { name, images, prices, available_stock } = data;
  const imageFetch = IMG_TO_FETCH + images[0];
  const price = prices[0].price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  if (available_stock) {
    const card = document.createElement("div");

    card.classList.add("card", "fade-in", "shadow-sm");
    card.setAttribute("style", "margin: 0 auto 20px !important");

    card.innerText = "";
    card.innerHTML = `
    <a data-fancybox="gallery" href="${imageFetch}">
      <img src="${imageFetch}" class="card-img align-self-center p-4" alt="${name}">
    </a>

    <div class="card-body h-100 p-2">
      <h6 class="card-title d-inline-block mt-1">${price}</h6>
  
      <p class="card-text"><small class="text-muted text-center">${name}</small></p>
    </div>
    `;

    return card;
  }
};

instaBuyAPI();
