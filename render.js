const ergebnisse = document.getElementById("ergebnisse");
const tagesliste = document.getElementById("tagesliste");

export function zeigeErgebnisse(produkte) {
  ergebnisse.replaceChildren();

  for (const e of produkte) {
    const li = document.createElement("li");
    li.textContent = `${e.product_name} - ${e.nutriments["energy-kcal_100g"]} kcal/100g`;
    li.dataset.name = e.product_name;
    li.dataset.kcal = e.nutriments["energy-kcal_100g"];
    li.dataset.protein = e.nutriments.proteins_100g ?? 0;
    li.dataset.fat = e.nutriments.fat_100g ?? 0;
    li.dataset.carbs = e.nutriments.carbohydrates_100g ?? 0;
    ergebnisse.append(li);
  }
};

export function setColors(farben){
  document.documentElement.style.setProperty("--accentCol", farben.akzent);
  document.documentElement.style.setProperty("--text", farben.bg);
  document.getElementById("akzent-farbe").value = farben.akzent;
  document.getElementById("bg-farbe").value = farben.bg;
}

export function render(eintraege, ziele, tag){
    tagesliste.replaceChildren();
    const filteredEintraege = eintraege.filter(e => e.datum === tag);
    for(const e of filteredEintraege){
        const kcal = Math.round((e.kcal100 / 100) * e.gramm);
        const protein = Math.round((e.protein / 100) * e.gramm);
        const carbs = Math.round((e.carbs / 100) * e.gramm);
        const fat = Math.round((e.fat / 100) * e.gramm);
        const li = document.createElement("li");
        li.innerHTML = `<div class="eintrag"><div class="titel">${e.name} | ${e.gramm}g</div><div class="makro-text">${kcal}kcal | Proteine: ${protein}g | Carbs: ${carbs}g | Fette: ${fat}g</div></div>`;
        li.dataset.id = e.id;
        const del = document.createElement("button");
        del.innerText = "X";
        del.className = "del";
        li.append(del);
        tagesliste.append(li);
    }
    const gesamtKcal = filteredEintraege.reduce((s, e) => s + (e.kcal100 * e.gramm / 100), 0);
    const anteilKcal = Math.min(gesamtKcal / ziele.kalGoal, 1);
    const gesamtProt = filteredEintraege.reduce((s, e) => s + (e.protein * e.gramm / 100), 0);
    const anteilProt = Math.min(gesamtProt / ziele.protGoal, 1);
    const gesamtCarbs = filteredEintraege.reduce((s, e) => s + (e.carbs * e.gramm / 100), 0);
    const anteilCarbs = Math.min(gesamtCarbs / ziele.carbGoal, 1);
    const gesamtFat = filteredEintraege.reduce((s, e) => s + (e.fat * e.gramm / 100), 0);
    const anteilFett = Math.min(gesamtFat / ziele.fatGoal, 1);
    document.getElementById("protein-fill").style.width = (anteilProt * 100) + '%';
    document.getElementById("protein-wert").innerText = `${gesamtProt} / ${ziele.protGoal} g`;
    document.getElementById("kcal-wert").innerText = `${gesamtKcal} / ${ziele.kalGoal}`;
    document.getElementById("kcal-fill").style.width = (anteilKcal * 100) + '%';
    document.getElementById("fett-wert").innerText = `${gesamtFat} / ${ziele.fatGoal} g`;
    document.getElementById("fat-fill").style.width = (anteilFett * 100) + '%';
    document.getElementById("carbs-wert").innerText = `${gesamtCarbs} / ${ziele.carbGoal} g`;
    document.getElementById("carbs-fill").style.width = (anteilCarbs * 100) + '%';
};