// script.js – Zertifikate Seite

// Lädt Metadaten und erstellt Zertifikatskarten dynamisch
async function loadCertificates() {
    try {
        const response = await fetch("metadata.json");
        const certificates = await response.json();

        const container = document.getElementById("cert-container");
        container.innerHTML = ""; // reset falls reload

        certificates.forEach(cert => {
            const card = document.createElement("div");
            card.className = "cert-card";

            // Bild
            const img = document.createElement("img");
            img.src = `img/${cert.file}`;
            img.alt = cert.title || "Zertifikat";

            // Titel
            const title = document.createElement("h3");
            title.textContent = cert.title || "Unbenanntes Zertifikat";

            // Beschreibung
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

// Start
document.addEventListener("DOMContentLoaded", loadCertificates);
