/*  Zertifikate-Galerie
    -------------------
    ✔ Bilder automatisch finden: /img/zertifikat{N}.{jpg|jpeg|png|webp|gif}
    ✔ Optional: Details aus metadata.json einblenden
    ✔ Suche + Sortierung + Modal
    ➕ Neues Zertifikat hinzufügen:
       1) Bild nach /zertifikate/img/ legen (zertifikatN.jpg / .png / .webp)
       2) (Optional) In metadata.json den Eintrag für N ergänzen (Titel, Anbieter, Datum, Beschreibung, Link)
*/

const IMG_DIR   = "img/";
const TRY_EXTS  = ["jpg","jpeg","png","webp","gif"];
const MAX_SCAN  = 60; // bis zu 60 Zertifikate automatisch prüfen
const gallery   = document.getElementById("gallery");
const empty     = document.getElementById("empty");
const searchEl  = document.getElementById("search");
const sortEl    = document.getElementById("sort");

const modal     = document.getElementById("modal");
const modalImg  = document.getElementById("modalImg");
const modalTitle= document.getElementById("modalTitle");
const modalFacts= document.getElementById("modalFacts");
const modalDesc = document.getElementById("modalDesc");
const modalOpen = document.getElementById("modalOpen");
const modalDownload = document.getElementById("modalDownload");
const modalClose= document.getElementById("modalClose");

let certificates = [];
let filtered = [];

// Hilfsfunktionen
function parseDate(d){
  if(!d) return null;
  const t = Date.parse(d);
  return isNaN(t) ? null : new Date(t);
}
function fmtDate(d){
  try {
    return new Intl.DateTimeFormat("de-DE",{dateStyle:"medium"}).format(d);
  } catch(_){ return ""; }
}
function lastModified(){
  const el = document.getElementById("last-modified");
  if(!el) return;
  const d = new Date(document.lastModified);
  el.textContent = isNaN(d) ? "" : d.toLocaleDateString("de-DE", { dateStyle: "medium" });
}

function checkImage(url){
  return new Promise(resolve=>{
    const img = new Image();
    img.onload = ()=> resolve(url);
    img.onerror = ()=> resolve(null);
    img.decoding = "async";
    img.loading  = "lazy";
    img.src = url;
  });
}

async function findImageForId(id){
  for(const ext of TRY_EXTS){
    const url = `${IMG_DIR}zertifikat${id}.${ext}`;
    const ok = await checkImage(url);
    if(ok) return ok;
  }
  return null;
}

async function loadMetadata(){
  try{
    const res = await fetch("metadata.json", {cache:"no-store"});
    if(!res.ok) return {};
    const data = await res.json();
    // erwartet: { "certs": [ { "id":1, "title":"...", "issuer":"...", "date":"2025-07-01", "desc":"...", "link":"https://..." }, ... ] }
    const map = {};
    (data.certs||[]).forEach(c=>{
      if (typeof c.id === "number") map[c.id] = c;
    });
    return map;
  }catch{ return {}; }
}

function renderList(list){
  gallery.innerHTML = "";
  if(!list.length){ empty.hidden = false; return; }
  empty.hidden = true;

  for(const c of list){
    const card = document.createElement("article");
    card.className = "card";

    const frame = document.createElement("div");
    frame.className = "frame";
    const glow = document.createElement("div");
    glow.className = "glow";

    const img = document.createElement("img");
    img.src = c.src;
    img.alt = c.title || `Zertifikat ${c.id}`;
    img.loading = "lazy";
    img.decoding = "async";

    frame.appendChild(img);
    frame.appendChild(glow);

    const meta = document.createElement("div");
    meta.className = "meta";

    const h3 = document.createElement("h3");
    h3.textContent = c.title || `Zertifikat ${c.id}`;

    const small = document.createElement("div");
    small.className = "small";
    const dateTxt = c.dateObj ? ` • ${fmtDate(c.dateObj)}` : "";
    small.textContent = [c.issuer||"", dateTxt].join("").trim();

    const desc = document.createElement("p");
    desc.className = "desc";
    desc.textContent = c.desc || "";

    const actions = document.createElement("div");
    actions.className = "actions";

    const viewBtn = document.createElement("button");
    viewBtn.className = "btn";
    viewBtn.type = "button";
    viewBtn.textContent = "Anzeigen";
    viewBtn.addEventListener("click", ()=>openModal(c));

    const openBtn = document.createElement("a");
    openBtn.className = "btn secondary";
    openBtn.href = c.src;
    openBtn.target = "_blank";
    openBtn.rel = "noopener";
    openBtn.textContent = "Öffnen";

    actions.appendChild(viewBtn);
    actions.appendChild(openBtn);

    meta.appendChild(h3);
    if (small.textContent.trim().length) meta.appendChild(small);
    if (c.desc) meta.appendChild(desc);
    meta.appendChild(actions);

    card.appendChild(frame);
    card.appendChild(meta);
    gallery.appendChild(card);
  }
}

function applyFilters(){
  const q = (searchEl.value||"").toLowerCase().trim();
  filtered = certificates.filter(c=>{
    const blob = `${c.title||""} ${c.issuer||""} ${c.desc||""}`.toLowerCase();
    return !q || blob.includes(q);
  });

  const sort = sortEl.value;
  filtered.sort((a,b)=>{
    if(sort==="dateAsc"){
      return (a.dateObj?.getTime()||0) - (b.dateObj?.getTime()||0) || a.id - b.id;
    }
    if(sort==="idAsc") return a.id - b.id;
    if(sort==="idDesc") return b.id - a.id;
    // default dateDesc
    return (b.dateObj?.getTime()||0) - (a.dateObj?.getTime()||0) || b.id - a.id;
  });

  renderList(filtered);
}

function openModal(c){
  modalImg.src = c.src;
  modalImg.alt = c.title || `Zertifikat ${c.id}`;
  modalTitle.textContent = c.title || `Zertifikat ${c.id}`;
  modalFacts.innerHTML = "";
  if(c.issuer){ const li=document.createElement("li"); li.textContent = `Anbieter: ${c.issuer}`; modalFacts.appendChild(li); }
  if(c.dateObj){ const li=document.createElement("li"); li.textContent = `Datum: ${fmtDate(c.dateObj)}`; modalFacts.appendChild(li); }
  modalDesc.textContent = c.desc || "";
  modalOpen.href = c.src;
  modalDownload.href = c.src;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
}

function closeModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  modalImg.src = "";
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e)=>{ if(e.target === modal) closeModal(); });
document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closeModal(); });

searchEl.addEventListener("input", applyFilters);
sortEl.addEventListener("change", applyFilters);

async function init(){
  lastModified();
  const metaMap = await loadMetadata();

  // Bilddateien ermitteln
  const found = [];
  for(let id=1; id<=MAX_SCAN; id++){
    const src = await findImageForId(id);
    if(!src) continue;

    const meta = metaMap[id] || {};
    const dateObj = parseDate(meta.date);
    found.push({
      id,
      src,
      title: meta.title,
      issuer: meta.issuer,
      desc: meta.desc,
      date: meta.date,
      dateObj
    });
  }

  certificates = found;
  applyFilters();
}

init();
