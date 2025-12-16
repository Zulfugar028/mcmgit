

const servicesItems = document.querySelectorAll(".services_item");

servicesItems.forEach(item => {
    item.addEventListener("click", (e) => {
        e.stopPropagation(); 
        if (item.classList.contains("active")) {
            item.classList.remove("active");
        } else {
            servicesItems.forEach(el => el.classList.remove("active"));
            item.classList.add("active");
        }
    });
});

document.addEventListener("click", () => {
    servicesItems.forEach(el => el.classList.remove("active"));
});