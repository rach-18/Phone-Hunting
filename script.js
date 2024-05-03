const subPhonesDiv = document.querySelector(".sub-phones");
const searchInput = document.querySelector(".phone-search");
const searchBtn = document.querySelector(".search-btn");
const showAllBtn = document.querySelector(".show-all-btn");
const modalImage = document.querySelector(".modal-image");
const modalPhoneName = document.querySelector(".modal-phone-name");
const modalBrandName = document.querySelector(".modal-brand-name");
const modalStorage = document.querySelector(".modal-storage");
const modalDisplay = document.querySelector(".modal-display");
const modalChipset = document.querySelector(".modal-chipset");
const modalMemory = document.querySelector(".modal-memory");
const modalSensors = document.querySelector(".modal-sensors");
const modalReleaseDate = document.querySelector(".modal-release-date");
const modalDiv = document.querySelector(".modal");
const body = document.querySelector("body");
const closeBtn = document.querySelector(".close-btn");

const url = "https://openapi.programming-hero.com/api/phones?search=";
const detailsUrl = "https://openapi.programming-hero.com/api/phone/"
let searchPhone = "iphone";

function callApi(url)
{
    const myPromise = new Promise( (resolve,reject) => {
        fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            resolve(data);
        })
        .catch(err => {
            reject(err)
        })
    })

    return myPromise;
   
}

function createPhoneCard(imageUrl, name, slug) {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("phone");

    const phoneImage = document.createElement("img");
    phoneImage.src = imageUrl;
    phoneDiv.appendChild(phoneImage);

    const phoneName = document.createElement("p");
    phoneName.classList.add("phone-name");
    phoneName.innerHTML = name;
    phoneDiv.appendChild(phoneName);

    const phoneDetail = document.createElement("p");
    phoneDetail.classList.add("phone-detail");
    phoneDetail.innerHTML = "There are many variations of passages of available, but the majority have suffered";
    phoneDiv.appendChild(phoneDetail);

    const showDetailsBtn = document.createElement("button");
    showDetailsBtn.classList.add("blue-btn", "show-details-btn");
    showDetailsBtn.innerHTML = "SHOW DETAILS";
    phoneDiv.appendChild(showDetailsBtn);

    subPhonesDiv.appendChild(phoneDiv);

    showDetailsBtn.addEventListener("click", () => {
        showDetails(slug);
    })
}

function showDetails(phoneSlug) {
    const detailRes = callApi(detailsUrl + phoneSlug);

    detailRes.then((data) => {
        // console.log(data.data);
        modalImage.src = data.data.image;
        modalPhoneName.innerHTML = data.data.name;
        modalBrandName.innerHTML = data.data.brand;
        modalStorage.innerHTML = data.data.mainFeatures.storage;
        modalDisplay.innerHTML = data.data.mainFeatures.displaySize;
        modalChipset.innerHTML = data.data.mainFeatures.chipSet;
        modalSensors.innerHTML = data.data.mainFeatures.sensors;
        modalReleaseDate.innerHTML = data.data.releaseDate;

        modalDiv.style.display = "block";
        body.style.overflowY = "hidden";
        // console.log(data.data.mainFeatures.storage);
    })
}

function searchPhones() {
    searchPhone = searchInput.value;
    subPhonesDiv.innerHTML = "";
    const response = callApi(url + searchPhone);
    response.then((data) => {
        const finalres = data;
        const phonesToShow = finalres.data.slice(0, 12); // Get the first 12 phones
        phonesToShow.forEach((phone) => {
            createPhoneCard(phone.image, phone.phone_name, phone.slug);
        });
        if (finalres.data.length > 12) {
            showAllBtn.style.display = "block"; // Show the "Show All" button if there are more than 12 phones
        } else {
            showAllBtn.style.display = "none"; // Hide the "Show All" button if there are 12 or fewer phones
        }
    });
}

function closeModal() {
    modalDiv.style.display = "none";
    body.style.overflowY = "auto";
}

showAllBtn.addEventListener("click", () => {
    const response = callApi(url + searchPhone);
    response.then((data) => {
        const finalres = data;
        subPhonesDiv.innerHTML = ""; // Clear existing phones
        finalres.data.forEach((phone) => {
            createPhoneCard(phone.image, phone.phone_name, phone.slug);
        });
        showAllBtn.style.display = "none"; // Hide the "Show All" button after displaying all phones
    });
});

searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    searchPhones();
});

closeBtn.addEventListener("click", () => {
    closeModal();
});

window.addEventListener("load", () => {
    const response = callApi(url + searchPhone);
    response.then((data) => {
        const finalres = data;
        for(let i=0;i<5;i++) {
            createPhoneCard(finalres.data[i].image, finalres.data[i].phone_name, finalres.data[i].slug);
        }
    })
});

// const promise = callApi(url + searchPhone);
// promise.then((data) => {
//     console.log(data.data);
// })