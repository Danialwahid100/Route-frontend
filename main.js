var pNameInput = document.getElementById('pName');
var pPriceInput = document.getElementById('pPrice');
var pCategoryInput = document.getElementById('pCategory');
var pDescInput = document.getElementById('pDesc');
var row = document.getElementById('row');
var addBtn = document.getElementById('addBtn')
var UpdateBtn = document.getElementById('UpdateBtn')
var pList = [];
var currentIndex = -1; // To track the index of the product being updated
var NameAlert = document.getElementById('NameAlert')

if(localStorage.getItem('products') !== null){
    pList = JSON.parse(localStorage.getItem('products'));
    displayPlist();
} else {
    pList = [];
}

function AddProduct() {
    if (pNameInput.value == '' || pPriceInput.value == '' || pDescInput.value == '' || pCategoryInput.value == '') {
        return;
    }

    var product = {
        code: pNameInput.value,
        price: pPriceInput.value,
        category: pCategoryInput.value,
        Desc: pDescInput.value,
    };

    if (currentIndex === -1) { // Add new product
        pList.push(product);
    } else { // Update existing product
        pList[currentIndex] = product;
        currentIndex = -1;
    }

    localStorage.setItem('products', JSON.stringify(pList));
    displayPlist();
    reset();
}

function reset() {
    pNameInput.value = '';
    pPriceInput.value = '';
    pCategoryInput.value = '';
    pDescInput.value = '';
}

function displayPlist() {
    var cartona = '';
    for (var i = 0; i < pList.length; i++) {
        cartona += `<div class="col-md-4">
            <div class="inner">
                <img src="pexels-8moments-1266810.jpg" class="my-3 w-100" alt="">
                <span class="badge bg-primary">${pList[i].category}</span>
                <h2>${pList[i].code}</h2>
                <p>${pList[i].Desc}</p>
                <span class="text-danger-emphasis">${pList[i].price}</span>
                <br><br>
                <button  onclick="setFormToUpdate(${i})" class="btn btn-outline-primary my-3">Update product</button>
                <button onclick="deleteProduct(${i})" class="btn btn-outline-danger my-3">Delete product</button>
            </div>
        </div>`;
    }
    row.innerHTML = cartona;
}

function deleteProduct(index) {
    pList.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(pList));
    displayPlist();
}

function setFormToUpdate(index) {
    currentIndex = index;
    pNameInput.value = pList[index].code;
    pPriceInput.value = pList[index].price;
    pCategoryInput.value = pList[index].category;
    pDescInput.value = pList[index].Desc;

    addBtn.classList.add('d-none')
    UpdateBtn.classList.remove('d-none')
}

// Initial display
displayPlist();


function UpdateProduct(){
    // var index = currentIndex
    pList[currentIndex].code = pNameInput.value
    pList[currentIndex].price = pPriceInput.value
    pList[currentIndex].category = pCategoryInput.value
    pList[currentIndex].Desc = pDescInput.value
    displayPlist()
    localStorage.setItem('products',JSON.stringify(pList))
    UpdateBtn.classList.add('d-none')
    addBtn.classList.remove('d-none')
    console.log(pList);
}

function validateInput(InputId,regexKey,alertId){
    var input = document.getElementById(InputId)
   var regex = {
    code : /^[A-Z][a-z]{3,15}/,
    price : /^[1-9][0-9]$/,
    category : /^(Mobile|TV)$/,
    Desc : /.{3,}/,
   }
   var isValid =regex[regexKey].test(input.value)
   input.classList.remove('is-valid','is-invalid')
   if(isValid){
    // console.log('Matched');
    input.classList.add('is-valid')
    document.getElementById('alertId').classList.replace('d-block','d-none')

   }else{
    // console.log('Not Matched');
    input.classList.add('is-invalid')
    document.getElementById('alertId').classList.replace('d-none','d-block')
   }
}
