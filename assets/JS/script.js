function renderProdotto() {
  document.getElementById("prodotti").innerHTML = "";
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZhMDc2ZDg1M2E0ZDAwMTU0ODYyYjYiLCJpYXQiOjE3MTgyMjQ3NDksImV4cCI6MTcxOTQzNDM0OX0.FG0adODsl9GNxEZddCF8I6dTRNXzQn7KWslh11c0p20",
      "content-type": "application/json",
    },
  }).then((response) => {
    response.json().then((data) => {
      data.forEach((element) => {
        let renderProdotti = document.getElementById("prodotti");
        renderProdotti.innerHTML += `
              <div class="col">
                  <div class="card shadow-sm">
                      <img class="img-fluid" src="${element.imageUrl}">
                      <div class="card-body">
                      <div class="card-text"><h4>${element.name}</h4>
                          <h5>${element.brand}</h5>
                          <p>${element.description}</p>
                      </div>
                      <div class="d-flex justify-content-between align-items-center">
                          <div class="btn-group">
                              <button type="button"><a href="./pagina-prodotto.html?id=${element._id}">Dettagli</a></button>
                              <button type="button" onclick="addCart('${element.name}', '${element.imageUrl}', '${element.price}')" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop">Aggiungi al carrello</button>
                          </div>
                          <span><h5>${element.price} €</h5></span>
                          </div>
                      </div>
                  </div>
              </div>`;
      });
    });
  });
}

function search() {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZhMDc2ZDg1M2E0ZDAwMTU0ODYyYjYiLCJpYXQiOjE3MTgyMjQ3NDksImV4cCI6MTcxOTQzNDM0OX0.FG0adODsl9GNxEZddCF8I6dTRNXzQn7KWslh11c0p20",
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      prodotti = result;
      searchFilter(prodotti);
    });
}

function searchFilter(prodotti) {
  let ricerca = document.getElementById("searchInput").value.toLowerCase();
  let risultatoRicerca = prodotti.filter((prodotto) =>
    prodotto.brand.toLowerCase().includes(ricerca)
  );
  renderRicerca(risultatoRicerca);

  if (risultatoRicerca.length === 0 || ricerca === "") {
    mostraModal(
      "Risultato ricerca",
      "La ricerca non ha prodotto alcun risultato",
      '<button type="button" onclick="chiudiModal()">Ok</button>'
    );
  }
}

function renderRicerca(prodottiFiltrati) {
  ricerca = document.getElementById("searchInput").value = "";
  let renderProdotti = document.getElementById("prodotti");
  renderProdotti.innerHTML = "";
  prodottiFiltrati.forEach((element) => {
    renderProdotti.innerHTML += `
        <div class="col">
            <div class="card shadow-sm">
                <img class="img-fluid" src="${element.imageUrl}">
                <div class="card-body">
                <div class="card-text"><h4>${element.name}</h4>
                    <h5>${element.brand}</h5>
                    <p>${element.description}</p>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button"><a href="./pagina-prodotto.html?id=${element._id}">Dettagli</a></button>
                        <button type="button" onclick="addCart('${element.name}', '${element.imageUrl}', '${element.price}')" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop">Aggiungi al carrello</button>                    </div>
                    <span><h5>${element.price} €</h5></span>
                    </div>
                </div>
            </div>
        </div>`;
  });
}

function cancellaRicerca() {
  renderProdotto();
}

function mostraModal(titolo, messaggio, footer) {
  let modalTitle = document.getElementById("modalTitle");
  modalTitle.innerHTML = `<h5 class="modal-title">${titolo}</h5>`;
  let modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = `<p>${messaggio}</p>`;
  let modalFooter = document.getElementById("modalFooter");
  modalFooter.innerHTML = footer;
  let modal = document.getElementById("modalCanc");
  modal.classList.add("d-block");
  let overflow = document.getElementById("modalOverflow");
  overflow.classList.add("d-block");
}

function chiudiModal() {
  let modal = document.getElementById("modalCanc");
  modal.classList.remove("d-block");
  let overflow = document.getElementById("modalOverflow");
  overflow.classList.remove("d-block");
}

let cart = [];

function addCart(nome, immagine, prezzo) {
  let prodotto = { nome, immagine, prezzo };
  cart.push(prodotto);
  renderCart();
}

function renderCart() {
  let carrelloElement = document.getElementById("cart");
  carrelloElement.innerHTML = ""; 
  let totale = 0;
  cart.forEach((prodotto, indice) => {
    totale += prodotto.prezzo;
    carrelloElement.innerHTML += `
      <div class="row">
                <div class="col-6">
                    <img class="img-fluid" src='${prodotto.immagine}'>
                    <p class='d-inline'>${prodotto.prezzo} €</p>
                    <span onclick='rimuoviCarrello(${indice})'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></span>
                </div>        
            </div>
    `;
  });
}

function rimuoviCarrello(indice) {
  cart.splice(indice, 1); 
  renderCart(); 
}

