const params= new URLSearchParams(location.search)
let id = params.get("id")
document.addEventListener("DOMContentLoaded", async () => {
    caricaProdotto()
    
})

function caricaProdotto(){
    fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZhMDc2ZDg1M2E0ZDAwMTU0ODYyYjYiLCJpYXQiOjE3MTgyMjQ3NDksImV4cCI6MTcxOTQzNDM0OX0.FG0adODsl9GNxEZddCF8I6dTRNXzQn7KWslh11c0p20",
        }
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector('.breadcrumb-item.active').innerHTML = data.name
        document.getElementById('imgProdotto').innerHTML= `<img class='img-fluid' src='${data.imageUrl}'>`
        document.getElementById('brandProdotto').innerHTML= data.brand
        document.getElementById('nomeProdotto').innerHTML = data.name
        document.getElementById('prezzoPrdotto').innerHTML = data.price + " €"
        document.getElementById('descrizoneProdotto').innerHTML = 'Specifiche tecniche: ' + data.description
        document.querySelector('#btnAdd').innerHTML = `<button id="btnAdd" onclick="addCart('${data.name}', '${data.imageUrl}', '${data.price}')" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop"class="w-100">Aggiungi al carrello</button>`
        })
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

