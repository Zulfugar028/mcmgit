const STRAPI_BASE_URL = "http://localhost:1337"; // Strapi server
const NEWS_API_URL = `${STRAPI_BASE_URL}/api/news?populate=*`;

let loadedNews = {}; // Strapi-dən gələn xəbərləri saxlayacağıq

async function loadNews() {
    try {
        const res = await fetch(NEWS_API_URL);
        const data = await res.json();
        console.log("📦 Strapi-dən gələn məlumat:", data);

        const container = document.getElementById("newsContainer");
        if (!container) return;

        container.innerHTML = "";

        data.data.forEach((item) => {
            const a = item; // attributes yoxdur, birbaşa item

            const title = a.title || "No Title";

            let description = "";
            if (Array.isArray(a.description)) {
                description = a.description
                    .map((block) =>
                        block.children
                            ? block.children.map((child) => child.text || "").join(" ")
                            : ""
                    )
                    .join(" ");
            } else if (typeof a.description === "string") {
                description = a.description;
            } else {
                description = "No description available.";
            }

            const imgData = a.image?.formats?.medium || a.image;
            const imgUrl = imgData?.url || "/img/placeholder.png";
            const fullImageUrl = STRAPI_BASE_URL + imgUrl;

            // Strapi-dən gələn xəbərləri global obyektə əlavə edirik
            loadedNews[item.id] = {
                title,
                description,
                img: fullImageUrl,
            };

            const html = `
        <div class="news_items" onclick="openNewsModal(${item.id})">
          <div class="news_images">
            <img src="${fullImageUrl}" alt="${title}">
          </div>
          <div class="news_texts">
            <h1>${title}</h1>
            <p>${description}</p>
          </div>
        </div>
      `;
            container.insertAdjacentHTML("beforeend", html);
        });
    } catch (err) {
        console.error("❌ Xəbərləri yükləməkdə səhv:", err);
    }
}

loadNews();




function openNewsModal(id) {
    const news = loadedNews[id];
    if (!news) return;

    document.getElementById("newsImage").src = news.img;
    document.getElementById("newsTitle").innerText = news.title;
    document.getElementById("newsDesc").innerText = news.description;
    document.getElementById("newsModal").style.display = "flex";
}

function closeNews() {
    document.getElementById("newsModal").style.display = "none";
}

// Kənara klikləyəndə modal bağlansın
window.onclick = function (event) {
    const modal = document.getElementById("newsModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}