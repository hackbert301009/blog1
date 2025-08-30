// script.js – Lädt Zertifikate aus metadata.json

async function loadCertificates() {
    try {
        const response = await fetch("metadata.json");
        const certificates = await response.json();

        const container = document.getElementById("cert-container");
        container.innerHTML = "";

        certificates.forEach(cert => {
            const card = document.createElement("div");
            card.className = "cert-card";

            const img = document.createElement("img");
            img.src = `img/${cert.file}`;
            img.alt = cert.title || "Zertifikat";

            const title = document.createElement("h3");
            title.textContent = cert.title || "Unbenanntes Zertifikat";

            const desc = document.createElement("p");
            desc.textContent = cert.description || "";

            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(desc);

            container.appendChild(card);
        });
    } catch (err) {
        console.error("Fehler beim Laden der Zertifikate:", err);
    }
}

document.addEventListener("DOMContentLoaded", loadCertificates);
