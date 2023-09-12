document.addEventListener('DOMContentLoaded', function () {
    const galleryPage: HTMLElement | null = document.querySelector('.gallery-page');
    const gallery: HTMLElement | null = document.querySelector('.gallery');
    const modal: HTMLElement | null = document.querySelector('.modal');
    const modalImage: HTMLImageElement | null = document.getElementById('modal-image') as HTMLImageElement;
    const closeModal: HTMLElement | null = document.querySelector('.close-modal');
    const prevButton: HTMLElement | null = document.querySelector('.prev');
    const nextButton: HTMLElement | null = document.querySelector('.next');
    const scrollToGalleryButton: HTMLElement | null = document.querySelector('.gallery-button');

    if (scrollToGalleryButton) {
        scrollToGalleryButton.addEventListener('click', function () {
            if (galleryPage) {
                galleryPage.style.display = 'block'; // Show the gallery content
            }
            if (scrollToGalleryButton) {
                scrollToGalleryButton.style.display = 'none'; // Hide the button after clicking
            }

            // Scroll to the gallery section smoothly
            window.scrollTo({
                top: galleryPage?.offsetTop || 0,
                behavior: 'smooth'
            });
        });
    }

    let currentImageIndex: number = 0; // Keep track of the currently displayed image index
    let imagesData: any[] = []; // Store fetched image data

    // Fetch image data from the API
    fetch('https://picsum.photos/v2/list?limit=100')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            imagesData = data;
            // Call a function to populate the gallery with images
            populateGallery(imagesData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Function to populate the gallery with images
    function populateGallery(images: any[]) {
        if (gallery) {
            gallery.innerHTML = ''; // Clear existing content
            images.forEach((image, index) => {
                const img = document.createElement('img');
                img.src = image.download_url;
                img.alt = `Image ${index + 1}`;
                img.loading = 'lazy';
                img.tabIndex = 0; // Make images focusable for keyboard navigation
                // Add event listener to open the modal on image click
                img.addEventListener('click', () => {
                    openModal(index);
                });
                if (gallery) {
                    gallery.appendChild(img);
                }
            });
        }
    }

    // Function to open the modal with a specific image
    function openModal(index: number) {
        if (index >= 0 && index < imagesData.length) {
            if (modal) {
                modal.style.display = 'block';
            }
            if (modalImage) {
                modalImage.src = imagesData[index].download_url;
            }
            currentImageIndex = index;
        }
    }

    // Function to show the previous image
    function showPreviousImage() {
        if (currentImageIndex > 0) {
            openModal(currentImageIndex - 1);
        }
    }

    // Function to show the next image
    function showNextImage() {
        if (currentImageIndex < imagesData.length - 1) {
            openModal(currentImageIndex + 1);
        }
    }

    // Event listener for previous and next buttons
    if (prevButton) {
        prevButton.addEventListener('click', showPreviousImage);
    }
    if (nextButton) {
        nextButton.addEventListener('click', showNextImage);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (modal && modal.style.display === 'block') {
            if (event.key === 'ArrowLeft') {
                showPreviousImage();
            } else if (event.key === 'ArrowRight') {
                showNextImage();
            } else if (event.key === 'Escape') {
                if (closeModal) {
                    closeModal.click(); // Close the modal
                }
            }
        }
    });

    // Close modal event listener
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (modal) {
                modal.style.display = 'none';
            }
        });
    }
});

// document.addEventListener('DOMContentLoaded', function () {
//     const galleryPage = document.querySelector('.gallery-page');
//     const gallery = document.querySelector('.gallery');
//     const modal = document.querySelector('.modal');
//     const modalImage = document.getElementById('modal-image');
//     const closeModal = document.querySelector('.close-modal');
//     const prevButton = document.querySelector('.prev');
//     const nextButton = document.querySelector('.next');
//     const scrollToGalleryButton = document.querySelector('.gallery-button');

//     scrollToGalleryButton.addEventListener('click', function () {
//         galleryPage.style.display = 'block'; // Show the gallery content
//         scrollToGalleryButton.style.display = 'none'; // Hide the button after clicking

//         // Scroll to the gallery section smoothly
//         window.scrollTo({
//             top: galleryPage.offsetTop,
//             behavior: 'smooth'
//         });
//     });

//     let currentImageIndex = 0; // Keep track of the currently displayed image index
//     let imagesData = []; // Store fetched image data

//     // Fetch image data from the API
//     fetch('https://picsum.photos/v2/list?limit=100')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             imagesData = data;
//             // Call a function to populate the gallery with images
//             populateGallery(imagesData);
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });

//     // Function to populate the gallery with images
//     function populateGallery(images) {
//         gallery.innerHTML = ''; // Clear existing content
//         images.forEach((image, index) => {
//             const img = document.createElement('img');
//             img.src = image.download_url;
//             img.alt = `Image ${index + 1}`;
//             img.loading = 'lazy';
//             img.tabIndex = 0; // Make images focusable for keyboard navigation
//             // Add event listener to open the modal on image click
//             img.addEventListener('click', () => {
//                 openModal(index);
//             });
//             gallery.appendChild(img);
//         });
//     }

//     // Function to open the modal with a specific image
//     function openModal(index) {
//         if (index >= 0 && index < imagesData.length) {
//             modal.style.display = 'block';
//             modalImage.src = imagesData[index].download_url;
//             currentImageIndex = index;
//         }
//     }

//     // Function to show the previous image
//     function showPreviousImage() {
//         if (currentImageIndex > 0) {
//             openModal(currentImageIndex - 1);
            
//         }
//     }

//     // Function to show the next image
//     function showNextImage() {
//         if (currentImageIndex < imagesData.length - 1) {
//             openModal(currentImageIndex + 1);
//         }
//     }

//     // Event listener for previous and next buttons
//     prevButton.addEventListener('click', showPreviousImage);
//     nextButton.addEventListener('click', showNextImage);

//     // Keyboard navigation
//     document.addEventListener('keydown', (event) => {
//         if (modal.style.display === 'block') {
//             if (event.key === 'ArrowLeft') {
//                 showPreviousImage();
//             } else if (event.key === 'ArrowRight') {
//                 showNextImage();
//             } else if (event.key === 'Escape') {
//                 closeModal.click(); // Close the modal
//             }
//         }
//     });

//     // Close modal event listener
//     closeModal.addEventListener('click', function()  {
//         modal.style.display = 'none';
//     });
// });
