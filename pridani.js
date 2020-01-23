// Třída seriál, reprezentuje seriál
class Serial {
  constructor(title, serie, dil, koment) {
    this.title = title;
    this.serie = serie;
    this.dil = dil;
    this.koment = koment;
  }
}

// Třída UI, stará se o UI úkoly
class UI {
  static displaySerials() {

    const serials = Store.getSerials();

    serials.forEach((serial) => UI.addSerialToList(serial));
  }
 //Přidání serilu do listu
  static addSerialToList(serial) {
    const list = document.querySelector('#serial-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${serial.title}</td>
      <td>${serial.serie}</td>
      <td>${serial.dil}</td>
      <td>${serial.koment}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }
//Odebrání seriálu
  static deleteSerial(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }
 //Hlášky
  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#serial-form');
    container.insertBefore(div, form);

    // Zmizení hlášky po 3 sekundách
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#serie').value = '';
    document.querySelector('#dil').value = '';
    document.querySelector('#koment').value = '';

  }
}

// Třída Store, stará se o úložiště
class Store {
  static getSerials() {
    let serials;
    if(localStorage.getItem('serials') === null) {
      serials = [];
    } else {
      serials = JSON.parse(localStorage.getItem('serials'));
    }

    return serials;
  }
 //Přidání seriálu a seřezení podle abecedy
static addSerial(serial) {
    const serials = Store.getSerials();
    serials.push(serial);

    serials.sort((a, b) =>
      a.title > b.title ? 1 : b.title > a.title ? -1 : 0
    );

    localStorage.setItem("serials", JSON.stringify(serials));
  }
 //Odebrání seriálu
  static removeSerial(dil) {
    const serials = Store.getSerials();

    serials.forEach((serial, index) => {
      if(serial.dil === dil) {
        serials.splice(index, 1);
      }
    });

    localStorage.setItem('serials', JSON.stringify(serials));
  }
}

// Event: zobrazení seriálů
document.addEventListener('DOMContentLoaded', UI.displaySerials);

// Event: Přidání seriálu
document.querySelector('#serial-form').addEventListener('submit', (e) => {

  // Zabraňuje skutečnému odeslání 
  e.preventDefault();

  // Co získává z hodnot
  const title = document.querySelector('#title').value;
  const serie = document.querySelector('#serie').value;
  const dil = document.querySelector('#dil').value;
  const koment = document.querySelector('#koment').value;

  // Ověření + hláška
  if(title === '' || serie === '' || dil === '' || koment === '') {
    UI.showAlert('Prosím vyplňte všechny pole', 'danger');
  } else {
    // Nový objekt seriál
    const serial = new Serial(title, serie, dil, koment);

    // Předání seriálu do UI
    UI.addSerialToList(serial);

    // Přidání seriálu do paměti
    Store.addSerial(serial);

    // Hláška
    UI.showAlert('Seriál přidán', 'success');

    // Vyčištění polí
    UI.clearFields();
  }
});

// Event: Odstranění seriálu
document.querySelector('#serial-list').addEventListener('click', (e) => {
  // Odstranění seriálu z UI
  UI.deleteSerial(e.target);

  // Odstranění seriálu z paměti
  Store.removeSerial(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

  // Hláška
  UI.showAlert('Seriál odebrán', 'success');
});