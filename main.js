document.addEventListener("DOMContentLoaded", () => {
    const listPreview = document.querySelector(".list-preview");
    const items = document.querySelectorAll(".item-preview");
    const itemWidth = items[0].offsetWidth + 20; // Tambahkan margin
    let scrollSpeed = 1; // Kecepatan scroll
    let isPaused = false;

    // Clone semua item agar bisa looping mulus
    listPreview.innerHTML += listPreview.innerHTML;

    function autoScroll() {
        if (!isPaused) {
            listPreview.scrollLeft += scrollSpeed;

            // Reset scroll agar looping seamless
            if (listPreview.scrollLeft >= listPreview.scrollWidth / 2) {
                listPreview.scrollLeft = 0;
            }
        }
        requestAnimationFrame(autoScroll);
    }

    autoScroll();

    // Pause saat hover (untuk UX lebih baik)
    listPreview.addEventListener("mouseenter", () => (isPaused = true));
    listPreview.addEventListener("mouseleave", () => (isPaused = false));

    // Swipe Gesture (Support Touchscreen)
    let startX = 0;
    listPreview.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        isPaused = true;
    });

    listPreview.addEventListener("touchmove", (e) => {
        const moveX = e.touches[0].clientX;
        const diff = startX - moveX;
        listPreview.scrollLeft += diff;
        startX = moveX;
    });

    listPreview.addEventListener("touchend", () => (isPaused = false));
});
