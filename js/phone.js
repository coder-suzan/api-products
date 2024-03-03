const loadPhoneData = async (searchText="samsung", isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;

    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {

    const showAllBtnContainer = document.getElementById("show_all_btn_container");

    if (phones.length > 16 && !isShowAll) {
        showAllBtnContainer.classList.remove("hidden")
    }
    else {
        showAllBtnContainer.classList.add("hidden");
    }

    // console.log("Is show all", isShowAll);

    // Display only 12 products when the show all button 
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }


    const phoneContainer = document.getElementById("phone_container");
    // When we will new search then remove the old search from the phoneContainer
    phoneContainer.innerHTML = "";
    // No product found text id
    const noProductText = document.getElementById("no_product_txt");

    if (phones.length > 0) {
        phones.forEach(phone => {
            //   console.log(phone.phone_name);
            const phoneCard = document.createElement('div');

            phoneCard.classList = `card bg-base-100 shadow-xl`;
            phoneCard.innerHTML = `
                    <figure class="p-3"><img src="${phone.image}" alt="${phone.phone_name}" /></figure>
                    <div class="card-body p-5">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>Brand: ${phone.brand}</p>
                        <div class="card-actions justify-center">
                            <button onclick="showProductDetails('${phone.slug}')" class="btn btn-primary mt-3">Buy Now</button>
                        </div>
                    </div>
                `
            phoneContainer.appendChild(phoneCard);

        });
        noProductText.innerHTML = '';
    }

    else {
        noProductText.innerHTML = `
            <h3 class="text-3xl py-10"> No product is available</h3>
        `;
    }


    // show products count number
    const showProductCount = document.getElementById("show_product_count");
    showProductCount.innerText = `${phones.length} Products`

    // Hide the loader when the product are loaded
    productLoader(false);

}


// Phone details information function
const showProductDetails = async (id) => {
    // console.log("Details button is clicked", id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const showDetailsPhone = data.data;

    console.log(showDetailsPhone, id);
    phoneDetailsModalShow(showDetailsPhone);
}

const phoneDetailsModalShow = (showDetailsPhone) => {

    console.log(showDetailsPhone);

    const phoneDetailsContainer = document.getElementById("phone_details_container");
    phoneDetailsContainer.innerHTML = `
                 <div class="flex justify-center">
                    <img src="${showDetailsPhone.image}" alt="showDetailsPhone.name">
                 </div>
                 <h3 class="font-bold text-xl my-3">${showDetailsPhone.name}</h3>
                 <p class="py-1"><b>storage: </b>${showDetailsPhone.mainFeatures.storage}</p>
                 <p class="hidden">if our following data is missing on our api</p> 
                 <p class="py-1"><b>Price: </b>${showDetailsPhone?.mainFeatures?.price || 'No price'}</p>
                 <p class="py-1"><b>Display Size: </b>${showDetailsPhone.mainFeatures.displaySize}</p>
                 <p class="py-1"><b>Chipset: </b>${showDetailsPhone.mainFeatures.chipSet}</p>
                 <p class="py-1"><b>Memory: </b>${showDetailsPhone.mainFeatures.memory}</p>
                 <p class="py-1"><b>Slug: </b>${showDetailsPhone.slug}</p>
                 <p class="py-1"><b>Brand: </b>${showDetailsPhone.brand}</p>
                 <p class="py-1"><b>GPS: </b>${showDetailsPhone.others.GPS}</p>
            `

    // Show the modal
    show_product_details.showModal();
}


const searchPhone = (isShowAll) => {
    // Show loader when the product is loading
    productLoader(true);

    const searchField = document.getElementById("seachField");
    searchText = searchField.value;
    console.log(searchText);
    loadPhoneData(searchText, isShowAll);
}


// Spinner or loader while the products are loading
const productLoader = (isLoading) => {
    const loader = document.getElementById("loader");

    if (isLoading) {
        loader.classList.remove("hidden");
    }
    else {
        loader.classList.add("hidden");
    }
}


// Show more products
const showAllProducts = () => {
    // console.log("Show all products");
    searchPhone(true);
}


// Initial phone show 
loadPhoneData();