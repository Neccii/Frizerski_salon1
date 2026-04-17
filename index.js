let zauzetiTermini = [];

function showToast(message, color = "green") {
  let toast = document.getElementById("toast");

  toast.innerText = message;
  toast.style.background = color;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function renderTermini() {
  let lista = document.getElementById("listaTermina");
  if (!lista) return;

  lista.innerHTML = "";

  zauzetiTermini.forEach(t => {
    let item = document.createElement("li");
    item.className = "list-group-item";
    item.innerText = `${t.datum} - ${t.vreme}`;
    lista.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", function () {

  let datumInput = document.getElementById("datum");
  let vremeInput = document.getElementById("vreme");
  let forma = document.getElementById("rezervacijaForma");

  if (!datumInput || !vremeInput || !forma) return;

  // minimalni datum
  let danas = new Date().toISOString().split("T")[0];
  datumInput.setAttribute("min", danas);

  // ⏰ 30 minuta korak
  vremeInput.setAttribute("step", 1800);

  forma.addEventListener("submit", function (e) {
    e.preventDefault();

    let ime = document.getElementById("ime").value;
    let datum = datumInput.value;
    let vreme = vremeInput.value;

    let izabraniDatum = new Date(datum);
    let dan = izabraniDatum.getDay();
    let sati = parseInt(vreme.split(":")[0]);
    let minuti = parseInt(vreme.split(":")[1]);

    // ❌ nedelja
    if (dan === 0) {
      showToast("❌ Ne radimo nedeljom!", "red");
      return;
    }

    // ❌ radno vreme
    if (sati < 8 || sati >= 18) {
      showToast("❌ Radno vreme je 08:00–18:00!", "red");
      return;
    }

    // ❌ dupli termin
    let postoji = zauzetiTermini.some(t => t.datum === datum && t.vreme === vreme);
    if (postoji) {
      showToast("❌ Ovaj termin je zauzet!", "red");
      return;
    }

    // ✔ dodaj termin
    zauzetiTermini.push({ ime, datum, vreme });

    showToast("✅ Termin zakazan za " + datum + " u " + vreme, "green");

    forma.reset();
    renderTermini();
  });

});
