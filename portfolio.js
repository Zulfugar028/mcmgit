const SERVICE_URL = "http://localhost:1337";

fetch(`${SERVICE_URL}/api/portfolios`)
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("portfolioList");
        container.innerHTML = "";

        data.data.forEach(item => {
            const title = item.title || "Untitled";
            const icon = item.icon || "fa-solid fa-database";

            let description = "";
            if (Array.isArray(item.description)) {
                description = item.description
                    .map(block =>
                        block.children?.map(child => child.text).join(" ")
                    )
                    .join("\n");
            } else {
                description = item.description || "";
            }

            const html = `
        <div class="portfolio">
          <div class="portfolio_item">
            <div class="portfolio_text">
              <div class="portfolio_icon">
                <i class="${icon}"></i>
              </div>
              <h1>${title}</h1>
              <p>${description}</p>
            </div>
          </div>
        </div>
      `;

            container.innerHTML += html;
        });
    })
    .catch(err => console.error("Portfolio data error:", err));
