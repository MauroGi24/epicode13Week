window.addEventListener("DOMContentLoaded", () => {
  listaProdotti();
});

function aggiungiProdotto() {
  let nomeProdotto = document.getElementById("nomeProdotto").value;
  let descrizioneProdotto = document.getElementById("descrizione").value;
  let brandProdotto = document.getElementById("brand").value;
  let fotoProdotto = document.getElementById("urlImmagine").value;
  let prezzoProdotto = document.getElementById("prezzo").value;

  if (
    nomeProdotto !== "" &&
    descrizioneProdotto !== "" &&
    brandProdotto !== "" &&
    fotoProdotto !== "" &&
    prezzoProdotto !== ""
  ) {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZhMDc2ZDg1M2E0ZDAwMTU0ODYyYjYiLCJpYXQiOjE3MTgyMjQ3NDksImV4cCI6MTcxOTQzNDM0OX0.FG0adODsl9GNxEZddCF8I6dTRNXzQn7KWslh11c0p20",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: nomeProdotto,
        description: descrizioneProdotto,
        brand: brandProdotto,
        imageUrl: fotoProdotto,
        price: prezzoProdotto,
      }),
    }).then((response) => {
      if (response.status === 200) {
        mostraModal('Prodotto inserito', 'Il prodotto è stato inserito correttamente!', '<button type="button" onclick="chiudiModal()">Ok</button>');
        listaProdotti();
      } else {
        erroreProdotto();
      }
    });
  } else {
    validazioneForm();
  }
  nomeProdotto = document.getElementById("nomeProdotto").value = "";
  descrizioneProdotto = document.getElementById("descrizione").value = "";
  brandProdotto = document.getElementById("brand").value = "";
  fotoProdotto = document.getElementById("urlImmagine").value = "";
  prezzoProdotto = document.getElementById("prezzo").value = "";
}

function listaProdotti() {
  let rigaContenuto = document.getElementById("prodottiBack");
  rigaContenuto.innerHTML = "";
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZhMDc2ZDg1M2E0ZDAwMTU0ODYyYjYiLCJpYXQiOjE3MTgyMjQ3NDksImV4cCI6MTcxOTQzNDM0OX0.FG0adODsl9GNxEZddCF8I6dTRNXzQn7KWslh11c0p20",
      "content-type": "application/json",
    },
  }).then((response) => {
    response.json().then((data) => {
      data.forEach((element) => {
        rigaContenuto.innerHTML += `
                    <tr>
                    <td><img src='${element.imageUrl}'></td>
                    <td>${element.name}</td>
                    <td>${element.description}</td>
                    <td>${element.brand}</td>
                    <td>${element.price}</td>  
                    <td><button id="modificaProdotto" onclick="modalModifica('${element._id}', '${element.name}', '${element.description}', '${element.brand}', '${element.imageUrl}', '${element.price}')">Modifica</button></td>  
                    <td><button id="cancellaProdotto" onclick="modalCancella('${element._id}', '${element.name}')">Cancella</button></td>  
                </tr>`;
      });
    });
  });
}

function erroreProdotto() {
    mostraModal('Errore', 'Il prodotto è gia presente', `<button type="button" onclick="chiudiModal()">Ok</button>`)
  }

function validazioneForm() {
    mostraModal('Errore', 'Riempi tutti i campi', `<button type="button" onclick="chiudiModal()">Ok</button>` )
  }

function modalCancella(id, nome) {
  mostraModal(
    "Elimina prodotto",
    `Sicuro di voler cancellare: ${nome}`,
    `<button type="button" onclick="elimina('${id}', '${nome}')">Elimina</button> 
    <button id="close" type="button" onclick="chiudiModal()">Chiudi</button>`
  );
}

function elimina(id, nome) {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
    method: "DELETE",
    headers: {
      Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZhMDc2ZDg1M2E0ZDAwMTU0ODYyYjYiLCJpYXQiOjE3MTgyMjQ3NDksImV4cCI6MTcxOTQzNDM0OX0.FG0adODsl9GNxEZddCF8I6dTRNXzQn7KWslh11c0p20",
      "content-type": "application/json",
    },
  }).then((response) => {
    if (response.status === 200) {
      confermaEliminazione(nome);
      listaProdotti();
    } else {
      mostraModal('Errore', 'Impossibile eliminare il prodotto! Riprova', `<button type="button" onclick="chiudiModal()">Ok</button>`);
    }
  });
}

function confermaEliminazione(nome) {
  mostraModal(
    `Eliminato ${nome}`,
    "Prodotto eliminato correttamente!",
    `<button type="button" onclick="chiudiModal()">Ok</button>`
  );
}

function modalModifica(id, nome, descrizione, brand, immagine, prezzo) {
  mostraModal(
    `Modifica ${nome}`,
    `<div class='input-group input-group-sm mb-3'><span class='input-group-text'>Nome Prodotto</span><input type='text' value='${nome}' id='modificaNome' class='form-control' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-sm'></div><div class='input-group input-group-sm mb-3'><span class='input-group-text'>Descrizione Prodotto</span><input type='text'value='${descrizione}' id='modificaDescrizione' class='form-control' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-sm'></div><div class='input-group input-group-sm mb-3'><span class='input-group-text'>Brand</span><input type='text' value='${brand}' id='modificaBrand' class='form-control' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-sm'></div><div class='input-group input-group-sm mb-3'><span class='input-group-text'>Foto Prodotto</span><input type='text' value='${immagine}' id='modificaFoto' class='form-control' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-sm'></div><div class='input-group input-group-sm mb-3'><span class='input-group-text'>Prezzo</span><input type='text' value='${prezzo}' id='modificaPrezzo' class='form-control' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-sm'></div><div class='d-flex justify-content-end mb-5'></div>`,
    `<button type="button" onclick="modifica('${id}', '${nome}')">Modifica</button><button id="close" type="button" onclick="chiudiModal()">Chiudi</button>`
  );
}

function modifica(id, nome) {
  let nomeProdotto = document.getElementById("modificaNome").value;
  let descrizioneProdotto = document.getElementById("modificaDescrizione").value;
  let brandProdotto = document.getElementById("modificaBrand").value;
  let fotoProdotto = document.getElementById("modificaFoto").value;
  let prezzoProdotto = document.getElementById("modificaPrezzo").value;

  fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
    method: "PUT",
    headers: {
      Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZhMDc2ZDg1M2E0ZDAwMTU0ODYyYjYiLCJpYXQiOjE3MTgyMjQ3NDksImV4cCI6MTcxOTQzNDM0OX0.FG0adODsl9GNxEZddCF8I6dTRNXzQn7KWslh11c0p20",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: nomeProdotto,
      description: descrizioneProdotto,
      brand: brandProdotto,
      imageUrl: fotoProdotto,
      price: prezzoProdotto,
    }),
  }).then((response) => {
    if (response.status === 200) {
      prodottoModificato(nome);
      listaProdotti();
    } else {
      erroreModifica(nome);
    }
  });
}

function prodottoModificato(nome) {
  mostraModal(
    "Prodotto modificato",
    `${nome} è stato modificato correttamente`,
    `<button type="button" onclick="chiudiModal()">Ok</button>`
  );
}

function erroreModifica(nome) {
  mostraModal(
    `Impossiibile modificare ${nome}`,
    "Ricontrolla tutti i campi!",
    `<button type="button" onclick="chiudiModal()">Ok</button>`
  );
}

