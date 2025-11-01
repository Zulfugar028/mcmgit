const STRAPI_URL = "http://localhost:1337";

async function loadIndustries() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/cases`);
    const data = await res.json();

    if (!data.data || !Array.isArray(data.data)) {
      console.error("Boş cavab alındı:", data);
      return;
    }

    const industriesList = document.getElementById("industriesList");
    const industriesContainer = document.getElementById("industriesContainer");

    if (!industriesList || !industriesContainer) {
      console.error("HTML element tapılmadı: industriesList və ya industriesContainer yoxdur!");
      return;
    }

    industriesList.innerHTML = "";
    industriesContainer.innerHTML = "";

    data.data.forEach((item) => {
      const title = item.title || "Untitled Industry";
      const descBlocks = item.description || [];
      const imageUrl = item.image?.url
        ? STRAPI_URL + item.image.url
        : "https://via.placeholder.com/300x200";

      // Rich Text → Sadə mətn
      const desc = Array.isArray(descBlocks)
        ? descBlocks
            .map((block) =>
              block.children?.map((child) => child.text).join(" ")
            )
            .join(" ")
        : descBlocks;

      // Naviqasiya başlığı
      const navItem = document.createElement("span");
      navItem.textContent = title;
      navItem.onclick = () =>
        document.getElementById(`industry-${item.id}`)?.scrollIntoView({
          behavior: "smooth",
        });
      industriesList.appendChild(navItem);

      // Kart görünüşü
      const section = document.createElement("section");
      section.classList.add("industry");
      section.id = `industry-${item.id}`;
      section.innerHTML = `
        <div class="industry-card">
          <img src="${imageUrl}" alt="${title}">
          <h2>${title}</h2>
          <p>${desc}</p>
        </div>
      `;

      industriesContainer.appendChild(section);
    });

    console.log("Məlumat yükləndi:", data.data);
  } catch (err) {
    console.error("Xəta:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadIndustries);
