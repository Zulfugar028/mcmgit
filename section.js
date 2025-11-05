const SERVICE_URL = "http://localhost:1337";

// Rich Text JSON array-i HTML-ə çevirir
function richTextToHTML(richTextArray) {
    if (!richTextArray) return '';
    return richTextArray.map(block => {
        if (block.type === 'paragraph') {
            return `<p>${block.children.map(child => child.text).join('')}</p>`;
        }
        return '';
    }).join('');
}

// Scroll ilə fade-in effekti
function revealOnScroll() {
    const items = document.querySelectorAll('.main_item');
    const windowHeight = window.innerHeight;

    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < windowHeight - 50) {
            item.classList.add('visible');
        }
    });
}

// Fetch Strapi data
fetch(`${SERVICE_URL}/api/sections?populate=image`)
    .then(res => res.json())
    .then(data => {
        const container = document.querySelector("#sectionsContainer");
        container.innerHTML = "";

        data.data.forEach((section, index) => {
            const attrs = section.attributes;

            const title = attrs.title || '';
            const descriptionHTML = richTextToHTML(attrs.description);

            // index əsasında reverse təyin edirik (hər ikinci section tərs)
            const reverseClass = index % 2 === 1 ? 'reverse' : '';

            // Tam image URL
            let imageUrl = 'img/placeholder.jpg';
            if (attrs.image?.data?.attributes?.url) {
                imageUrl = `${SERVICE_URL}${attrs.image.data.attributes.url}`;
            }

            const html = `
        <section class="main_item ${reverseClass}">
          <div class="main_text">
            <h1>${title}</h1>
            ${descriptionHTML}
          </div>
          <div class="main_img">
            <img src="${imageUrl}" alt="${title}" loading="lazy">
          </div>
        </section>
      `;
            container.insertAdjacentHTML('beforeend', html);
        });

        // İlk renderdən sonra fade-in yoxlaması
        revealOnScroll();
        window.addEventListener('scroll', revealOnScroll);
    })
    .catch(err => console.error("Strapi fetch error:", err));