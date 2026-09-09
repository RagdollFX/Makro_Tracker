export function speichern(eintraege, ziele) {
  localStorage.setItem("eintraege", JSON.stringify(eintraege));
  localStorage.setItem("ziele", JSON.stringify(ziele));
}

export function speicherFarben(farben){
  localStorage.setItem("farben", JSON.stringify(farben));
}

export function ladeFarben(){
  const standard = {
      akzent: "#e94011",
      bg: "#2c2c2c",
      text: "#f5f6f8"
    };

  const daten = localStorage.getItem("farben");
  if (daten == null)return standard;

  try{
    return {...standard, ...JSON.parse(daten)};
  } catch (err){
    console.warn("Farben unlesbar, starte mit Base", err);
    return standard;
  }
}

export function speicherName(name){
  localStorage.setItem("name", JSON.stringify(name));
}

export function ladeName(){
  const standard = "Gast";
  const daten = localStorage.getItem("name");

  if(daten == null) return standard;

  try{
    return JSON.parse(daten);
  } catch(err){
    console.warn("Name konnte nicht geladen werden, starte mit Base", err);
    return standard;
  }
}

export function ladenEintraege() {
  const daten = localStorage.getItem("eintraege");
  if (daten === null) return [];

  try {
    const geparst = JSON.parse(daten);
    return Array.isArray(geparst) ? geparst : [];
  } catch (err) {
    console.warn("Speicherpunkt unlesbar, starte leer", err);
    return [];
  }
}

export function ladenZiele(){
  const daten = localStorage.getItem("ziele");
  if (daten == null) {
    return {
      kalGoal: 2000,
      protGoal: 170,
      carbGoal: 50,
      fatGoal: 50
    };
  }

  try{
    return JSON.parse(daten);
  } catch (err){
    console.warn("Ziele unlesbar, starte leer", err);
    return {
      kalGoal: 2000,
      protGoal: 170,
      carbGoal: 50,
      fatGoal: 50
    };
  }
}