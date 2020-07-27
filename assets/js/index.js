(function () {
  const URL_TO_FETCH =
    "https://api.instabuy.com.br/apiv3/layout?subdomain=organicos";
  const IMG_TO_FETCH = "https://assets.instabuy.com.br/ib.item.image.large/l-";

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
    const mainView = document.querySelector("#mainViewItems");
    const backMainView = document.querySelector("#backMainView");
    const imgCarousel = document.querySelector("#imgCarousel");
    const sectionCards = document.querySelector("#expandedShowItems");
    const navItems = document.querySelector("#navItems");

    collection_items.forEach((data) => {
      const setTitleSlugs = createSlug(data);
      const mainViewItems = createMainView(data);

      backMainView.addEventListener("click", () => {
        imgCarousel.classList.remove("d-none");
        backMainView.setAttribute("style", "display: none !important");
        sectionCards.setAttribute("style", "display: none !important");
        navItems.setAttribute("style", "display: none !important");
        mainView.removeAttribute("style", "display: none !important");

        mainView.appendChild(mainViewItems);
      });

      title.appendChild(setTitleSlugs);
      mainView.appendChild(mainViewItems);
      console.log(title);
    });
  };

  const createSlug = (data) => {
    const { slug, id, title, items } = data;
    const liNav = document.createElement("a");
    const labelIcon = document.createElement("label");

    const backMainView = document.querySelector("#backMainView");
    const mainView = document.querySelector("#mainViewItems");
    const iconBackward = document.querySelector("#iconExp");
    const navItems = document.querySelector("#navItems");
    const liCards = document.querySelector("#liShowItems");
    const sectionName = document.querySelector("#sectorName");
    const imgCarousel = document.querySelector("#imgCarousel");

    const iconItems = document.querySelector("#iconShowItems");
    const sectionCards = document.querySelector("#expandedShowItems");

    liNav.classList.add("nav-item", "dropdown-item", "p-0");
    liNav.setAttribute(
      "style",
      "min-width: 100px !important; text-align: center"
    );
    liNav.innerHTML = `<input type="button" class="text-muted text-center btn" id="${slug}-${id}"  href="#${slug}" value="${title}" />`;

    liNav.addEventListener("click", () => {
      imgCarousel.classList.add("d-none");
      mainView.setAttribute("style", "display: none !important");
      backMainView.removeAttribute("style", "display: none !important");
      navItems.removeAttribute("style", "display: none !important");
      iconBackward.setAttribute("style", "display: none !important");
      sectionCards.setAttribute("style", "display: none !important");
      liNav.classList.add("bg-light");

      navItems.classList.remove("d-none");

      sectionName.innerText = "";
      //     sectionName.innerHTML = `<h3 class="h4 pt-1">${title}</h3>`;

      liCards.innerText = "";
      items.forEach((data) => {
        const cards = cardBody(data);
        liCards.append(cards);

        // console.log(`*** createItems.card-${slug}=>`, card);
      });

      iconItems.addEventListener("click", () => {
        navItems.classList.add("d-none");
        iconBackward.removeAttribute("style", "display: none !important");
        sectionCards.removeAttribute("style", "display: none !important");

        labelIcon.classList.add("sticky-icon");
        labelIcon.setAttribute("for", `${slug}-${id}`, "title", "Voltar");

        labelIcon.innerHTML =
          '<i id="iconClose" class="fas fa-arrow-circle-left"></i>';
        iconBackward.append(labelIcon);

        sectionCards.innerHTML = "";
        items.forEach((data) => {
          const cards = cardBodyExpanded(data);
          sectionCards.append(cards);

          // console.log(`*** createItems.card-${slug}=>`, card);
        });
      });
    });

    return liNav;
  };

  const createMainView = (data) => {
    const { title, items } = data;
    const nav = document.createElement("nav");

    nav.classList.add("sidenav", "scroll", "shadow", "rounded", "mt-4");
    nav.innerHTML = `<h3 class="text-capitalize sticky-title">${title}</h3><hr class="sticky-title">`;

    const ul = document.createElement("ul");
    ul.classList.add("m-0", "p-0");

    const labelIcon = document.createElement("label");
    labelIcon.classList.add("sticky-icon");

    items.forEach((data) => {
      const cards = cardBodyMain(data);
      ul.append(cards);
    });

    nav.appendChild(ul);
    return nav;
  };

  const cardBodyMain = (data) => {
    const { name, images, prices, available_stock, unit_type } = data;
    const imageFetch = IMG_TO_FETCH + images[0];
    const price = prices[0].price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    if (available_stock) {
      const liCard = document.createElement("li");

      liCard.innerText = "";
      liCard.innerHTML = `
    <div class="card card-min fade-in shadow-sm border-0 ">
      <i class="fas fa-plus grow text-danger buyIcon buyIcon-min shadow" title="Adicionar ao carrinho"></i>

      <a data-fancybox="gallery" href="${imageFetch}">
        <img src="${imageFetch}" class="card-img align-self-center p-1" alt="${name}">
      </a>

      <div class="card-body h-100 p-2">
        <h6 class="card-title d-inline-block mt-1">${price} - <font class="text-lowercase">${unit_type}</h6>
    
        <p class="card-text"><small class="text-muted text-center">${name}</small></p>
      </div>
    </div>
    `;

      return liCard;
    }
  };

  const cardBody = (data) => {
    const { name, images, prices, available_stock, unit_type } = data;
    const imageFetch = IMG_TO_FETCH + images[0];
    const price = prices[0].price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    if (available_stock) {
      const liCard = document.createElement("li");

      liCard.innerText = "";
      liCard.innerHTML = `
    <div class="card card-li-large fade-in shadow-sm border-0 grow">
      <i class="fas fa-plus grow h3 text-danger buyIcon buyIcon-large shadow" title="Adicionar ao carrinho"></i>
      <a data-fancybox="gallery" href="${imageFetch}">
        <img src="${imageFetch}" class="card-img align-self-center p-4" alt="${name}">
      </a>

      <div class="card-body h-100 p-2">
        <h6 class="card-title d-inline-block mt-1">${price} - <font class="text-lowercase">${unit_type}</font></h6>
    
        <p class="card-text"><small class="text-muted text-center">${name}</small></p>
      </div>
    </div>
    `;

      return liCard;
    }
  };

  const cardBodyExpanded = (data) => {
    const { name, images, prices, available_stock, unit_type } = data;
    const imageFetch = IMG_TO_FETCH + images[0];
    const price = prices[0].price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    if (available_stock) {
      const card = document.createElement("div");

      card.classList.add("card", "card-max", "fade-in", "shadow-sm");
      card.setAttribute("style", "margin: 0 auto 20px !important");

      card.innerText = "";
      card.innerHTML = `
      <i class="fas fa-plus grow h3 text-danger buyIcon buyIcon-max shadow" title="Adicionar ao carrinho"></i>
    <a data-fancybox="gallery" href="${imageFetch}">
      <img src="${imageFetch}" class="card-img align-self-center px-4 pt-4 pb-0" alt="${name}">
    </a>

    <div class="card-body h-100 p-2">
      <h6 class="card-title d-inline-block mt-1">${price} - <font class="text-lowercase">${unit_type}</font></h6>
  
      <p class="card-text"><small class="text-muted text-center">${name}</small></p>
    </div>
    `;

      return card;
    }
  };

  instaBuyAPI();
})();
