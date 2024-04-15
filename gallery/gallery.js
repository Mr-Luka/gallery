
function Gallery (gallery) {
    if(!gallery) {
        throw new Error("No Gallery Found!");
    }
    // Select the elements we need
    const images = Array.from(gallery.querySelectorAll("img"));
    const modal = document.querySelector(".modal");
    const prevButton = modal.querySelector(".prev");
    const nextButton = modal.querySelector(".next");
    let currentImage;

    function openModal() {
        console.info("opening Modal...");
        if(modal.matches(".open")){
            console.info("Modal already open");
            return;
        } else {
            modal.classList.add("open")
             window.addEventListener("keyup", handleKeyUp);
             nextButton.addEventListener("click", showNextImage);
             prevButton.addEventListener("click", showPreviousImage);
        }
    }

    function closeModal(){
        modal.classList.remove("open");
        window.removeEventListener("keyup", handleKeyUp);
        nextButton.removeEventListener("click", showNextImage);
        prevButton.removeEventListener("click", showPreviousImage);

    }
    function handleClickOutside(e){
        if(e.target === e.currentTarget) {
            closeModal();
        }
    }
    function handleKeyUp(e) {
        if(e.key === "Escape") return closeModal();
        if(e.key === "ArrowRight") return showNextImage();
        if(e.key === "ArrowLeft") return showPreviousImage();

    }

    function showNextImage() {
        showImage(currentImage.nextElementSibling || gallery.firstElementChild);
    }
     function showPreviousImage() {
        showImage(currentImage.previousElementSibling || gallery.lastElementChild);
    }

    function showImage(el) {
        if(!el) {
            console.info("No image to show");
            return;
        } 
        console.log(el);
        modal.querySelector("img").src = el.src;
        modal.querySelector("h2").textContent = el.title;
        modal.querySelector("figure p").textContent = el.dataset.description;
        currentImage = el;
        openModal();

    }
// THESE ARE OUR EVENT LISTENERS!
    images.forEach(image=> image.addEventListener("click", (e)=> showImage(e.currentTarget)));
    //Loop over each image
    images.forEach(image=> image.addEventListener("keyup", e => {
        if(e.key === "Enter") {
            showImage(e.currentTarget);
        }
    }))

    modal.addEventListener("click", handleClickOutside);

}

const gallery1 = Gallery(document.querySelector(".gallery1"));
const gallery2 = Gallery(document.querySelector(".gallery2"));