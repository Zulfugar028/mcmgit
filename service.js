const STRAPI_URL = "http://localhost:1337";

fetch(`${STRAPI_URL}/api/services?populate=*`)
  .then(res => res.json())
  .then(data => {
    const servicesContainer = document.querySelector(".services");
    if (!servicesContainer) return;

    servicesContainer.innerHTML = "";

    data.data.forEach(item => {
      const title = item.title || "Başlıq yoxdur";


      let descriptionText = "Təsvir yoxdur";
      if (Array.isArray(item.description)) {

        descriptionText = item.description
          .map(block =>
            block.children
              ?.map(child => child.text)
              .join(" ")
          )
          .join("\n");
      }


      const imgUrl = item.image?.url
        ? `${STRAPI_URL}${item.image.url}`
        : "./img/default.jpg";

      const serviceItem = document.createElement("div");
      serviceItem.classList.add("services_item");
      serviceItem.innerHTML = `
        <div class="services_img">
          <img src="${imgUrl}" alt="${title}" loading="lazy">
        </div>
        <div class="services_text">
          <p>${title}</p>
        </div>
        <div class="services_details">
          <p>${descriptionText}</p>
        </div>
      `;

      servicesContainer.appendChild(serviceItem);
    });


    const servicesItems = document.querySelectorAll(".services_item");
    servicesItems.forEach(item => {
      item.addEventListener("click", e => {
        e.stopPropagation();
        item.classList.toggle("active");
      });
    });

    document.addEventListener("click", () => {
      servicesItems.forEach(el => el.classList.remove("active"));
    });


  })
  .catch(err => console.error("Service məlumatları yüklənmədi:", err));
