const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  const showAll = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card rounded-md shadow-xl`;
    phoneCard.innerHTML = ` 
        <figure class="bg-gray-300 p-3">
            <img
                src= ${phone.image}
            />
        </figure>
        <div class="card-body bg-gray-800 p-6 text-white rounded-lg">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button onclick = "handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>  
        `;
    phoneContainer.appendChild(phoneCard);
  });
  toggleLosdingSpiner(false);
};

const handleShowDetail = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
//   console.log(data);
  displayPhoneDetails(phone);
};

const displayPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById("phone-name");
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById(
      "show-detail-container"
    );
    showDetailContainer.innerHTML = ` 
    <img src="${phone.image}" class="mx-auto my-4" alt="" />
        <p> <span class="font-bold">Brand : </span>${phone?.brand}</p>
    <p> <span class="font-bold">Storage : </span>${phone?.mainFeatures?.storage}</p>
    <p> <span class="font-bold">Display Size : </span>${phone?.mainFeatures?.displaySize}</p>
    <p> <span class="font-bold">GPS : </span>${phone?.others?.GPS}</p>
    <p> <span class="font-bold">Release Date : </span>${phone?.releaseDate}</p>
    `;

  show_details_modal.showModal();
};

const handleSearch = (isShowAll) => {
  toggleLosdingSpiner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  //  searchField.value = '';
  loadPhone(searchText, isShowAll);
};

const toggleLosdingSpiner = (isLoading) => {
  const loadingSpiner = document.getElementById("loading-spiner");
  if (isLoading) {
    loadingSpiner.classList.remove("hidden");
  } else {
    loadingSpiner.classList.add("hidden");
  }
};

const handleShowAll = () => {
  handleSearch(true);
};
