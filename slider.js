// Strapi server adresi
window.SLIDER_URL = "http://localhost:1337";
const SLIDER_URL = window.SLIDER_URL;

// API endpoint
const API_URL = `${SLIDER_URL}/api/sliders?populate=*`;

let currentSlide = 0;
let slides = [];

// Məlumatı Strapi-dən alırıq
fetch(API_URL)
    .then(res => res.json())
    .then(({ data }) => {
        slides = data.map(item => ({
            video: item.video?.[0]?.url ? SLIDER_URL + item.video[0].url : "",
            title: item.title || "",
            description: item.description || ""
        }));

        if (slides.length > 0) showSlide(0);

        // Avtomatik keçid (5 saniyədən bir)
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    })
    .catch(err => console.error("Slayder məlumatı yüklənmədi:", err));

// Slayd göstərmək funksiyası
function showSlide(index) {
    const videoEl = document.querySelector(".slider_video video source");
    const videoParent = document.querySelector(".slider_video video");
    const titleEl = document.querySelector(".slider_content h1");
    const descEl = document.querySelector(".slider_content p");

    if (slides[index].video) {
        videoEl.src = slides[index].video;
        videoParent.load();
    }

    titleEl.textContent = slides[index].title;
    descEl.textContent = slides[index].description;
}
