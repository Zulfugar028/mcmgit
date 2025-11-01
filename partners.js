const PARTNERS_URL = "http://localhost:1337"; // Öz Strapi hostunu yaz
const API_URL = `${PARTNERS_URL}/api/partners?populate=logo`;

async function loadPartners() {
    try {
        const res = await fetch(API_URL);
        const json = await res.json();

        const partners = json.data;
        const container = document.getElementById("partners-container");

        container.innerHTML = "";

        partners.forEach((item) => {
            const partner = item;
            const attrs = partner; // v5-də atributlar düz səviyyədə olur (attributes yoxdur)
            const name = attrs.name;
            const url = attrs.url;
            const logo = attrs.logo;

            const imageUrl = logo?.url
                ? `${PARTNERS_URL}${logo.url}`
                : "img/placeholder.png";

            const div = document.createElement("div");
            div.classList.add("our_partners_img");

            div.innerHTML = `
          <a href="${url}" target="_blank" rel="noopener">
            <img src="${imageUrl}" alt="${name} partner MCM">
          </a>
        `;

            container.appendChild(div);
        });
    } catch (err) {
        console.error("Partnerləri yükləməkdə xəta:", err);
    }
}

loadPartners();