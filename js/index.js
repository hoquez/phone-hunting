// fetch("https://jsonplaceholder.typicode.com/todos/1")
//   .then((response) => response.json())
//   .then((json) => console.log(json));
// function getUsers() {
//   fetch("https://jsonplaceholder.typicode.com/users")
//     .then((res) => res.json())
//     .then((dataJson) => console.log(dataJson));
// }

const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (devices) => {
  const phoneContainer = document.getElementById("container");
  phoneContainer.innerHTML = "";
  //display show all button
  const showAllContainer = document.getElementById("show-all");
  if (devices.length > 12) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  //display only first 12
  devices = devices.slice(0, 12);
  //
  devices.forEach((device) => {
    // console.log(device);
    //step 2: create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 p-4`;
    //step 3: set inner Html
    phoneCard.innerHTML = `    
    <figure><img src="${device.image}"
      alt="Shoes"
    />
  </figure>
  <div class="card-body">
    <h2 class="card-title">
      ${device.phone_name}
      <div class="badge badge-secondary">NEW</div>
    </h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-center">
  
      <button onclick="handleShowDetail('${device.slug}')"  class="btn btn-active bg-gray-300">Show Details</button>
    </div>
  </div>`;
    //step 4: append child
    phoneContainer.appendChild(phoneCard);
    //removing spinner
    toggleLoadingSpinner(false);
  });
};

//Handle search button
const handleSearch = () => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  loadPhone(searchText);
};

//loadPhone();
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

//handle show all
const handleShowAll = () => {};

//handle show de ta ils
const handleShowDetail = async (id) => {
  //load data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  console.log(phone);
  showPhoneDetail(phone);
};

//
const showPhoneDetail = (phone) => {
  const phoneName = document.getElementById("showDetail-phone-name");
  phoneName.innerText = phone.name;
  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
  <img class="my-4" src="${phone.image}" alt="">
  <p><span class="font-bold" >Storage:</span> ${phone?.mainFeatures?.storage}</p>
  <p class="my-4" ><span class="font-bold " >Display Size:</span> ${phone?.mainFeatures?.displaySize}</p>
  <p class="my-4" ><span class="font-bold " >Chip Set:</span> ${phone?.mainFeatures?.chipSet}</p>
  <p class="my-4" ><span class="font-bold " >Memory:</span> ${phone?.mainFeatures?.memory}</p>
  <p class="my-4" ><span class="font-bold " >Slug:</span> ${phone?.slug}</p>
  <p class="my-4" ><span class="font-bold " >Release Date:</span> ${phone?.releaseDate}</p>
  <p class="my-4" ><span class="font-bold " >Brand:</span> ${phone?.brand}</p>
  <p class="my-4" ><span class="font-bold " >GPS:</span> ${phone?.others?.GPS}</p>
  `;

  show_details_modal.showModal();
};
