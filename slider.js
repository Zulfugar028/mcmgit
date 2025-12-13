
window.SLIDER_URL = "http://localhost:1337";
const SLIDER_URL = window.SLIDER_URL;


const API_URL = `${SLIDER_URL}/api/sliders?populate=*`;

let currentSlide = 0;
let slides = [];


fetch(API_URL)
    .then(res => res.json())
    .then(({ data }) => {
        slides = data.map(item => ({
            video: item.video?.url ? SLIDER_URL + item.video.url : "",
            title: item.title || "",
            description: Array.isArray(item.description)
                ? item.description.map(d => d.children.map(c => c.text).join(" ")).join("\n")
                : item.description || ""
        }));

        if (slides.length > 0) showSlide(0);


        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    })
    .catch(err => console.error("Slayder məlumatı yüklənmədi:", err));


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