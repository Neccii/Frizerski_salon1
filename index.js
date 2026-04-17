function showToast(message, color = "green") {
  let toast = document.getElementById("toast");

  toast.innerText = message;
  toast.style.background = color;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {

  let datumInput = document.getElementById("datum");
  let forma = document.getElementById("rezervacijaForma");

  if (!datumInput || !forma) return;

  // minimalni datum = danas
  let danas = new Date().toISOString().split("T")[0];
  datumInput.setAttribute("min", danas);

  forma.addEventListener("submit", function (e) {
    e.preventDefault();

    let ime = document.getElementById("ime").value;
    let datum = datumInput.value;
    let vreme = document.getElementById("vreme").value;

    let izabraniDatum = new Date(datum);
    let dan = izabraniDatum.getDay();
    let sati = parseInt(vreme.split(":")[0]);

    // ❌ nedelja
    if (dan === 0) {
      showToast("❌ Ne radimo nedeljom!", "red");
      return;
    }

    // ❌ van radnog vremena
    if (sati < 8 || sati >= 18) {
      showToast("❌ Radno vreme je 08:00–18:00!", "red");
      return;
    }

    // ✅ uspešno
    showToast("✅ Termin uspešno zakazan za " + datum + " u " + vreme, "green");

    forma.reset();
  });

});