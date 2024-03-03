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
    console.log(device);
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
    <div class="card-actions justify-end">
      <div class="badge badge-outline">Fashion</div>
      <div class="badge badge-outline">Products</div>
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
