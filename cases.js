const SERVICE_URL = "http://localhost:1337";

fetch(`${SERVICE_URL}/api/industries?populate[articles][populate]=*`)
  .then(res => res.json())
  .then(data => {
    const industriesNav = document.getElementById("industriesNav");
    const industriesContainer = document.getElementById("industriesContainer");

    industriesNav.innerHTML = "";
    industriesContainer.innerHTML = "";

    data.data.forEach(industry => {
      const industryId = industry.title.toLowerCase().replace(/\s+/g, '');
      const industryTitle = industry.title;

      // Naviqasiya menyusu
      const navItem = document.createElement("span");
      navItem.textContent = industryTitle;
      navItem.onclick = () => document.getElementById(industryId).scrollIntoView({ behavior: "smooth" });
      industriesNav.appendChild(navItem);

      // Bölmə
      const industrySection = document.createElement("section");
      industrySection.classList.add("industry");
      industrySection.id = industryId;

      const h2 = document.createElement("h2");
      h2.textContent = industryTitle;
      industrySection.appendChild(h2);

      const casesDiv = document.createElement("div");
      casesDiv.classList.add("cases");

      // Articles
      industry.articles.forEach(article => {
        const caseDiv = document.createElement("div");
        caseDiv.classList.add("case");

        // Əgər şəkil varsa
        if (article.cover) {
          const img = document.createElement("img");
          img.src = SERVICE_URL + article.cover.url;
          img.alt = article.title;
          caseDiv.appendChild(img);
        }

        const h3 = document.createElement("h3");
        h3.textContent = article.title;
        caseDiv.appendChild(h3);

        const desc = document.createElement("p");
        desc.textContent = article.description || "";
        caseDiv.appendChild(desc);

        casesDiv.appendChild(caseDiv);
      });

      industrySection.appendChild(casesDiv);
      industriesContainer.appendChild(industrySection);
    });
  })
  .catch(err => console.error("Strapi məlumat xətası:", err));