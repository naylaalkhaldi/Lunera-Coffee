const add = document.querySelectorAll('.add');

add.forEach(e => {
    e.addEventListener('click', () => {
        const p= e.previousElementSibling.lastElementChild;
        const itemadd = e.firstElementChild;
        const itemrmv = e.lastElementChild;

        e.classList.toggle('none');
        itemadd.classList.toggle('hide');
            itemrmv.classList.toggle('show');
            p.classList.toggle('show');
    })
     
});


function showMore() {
  var text = document.getElementById("moreText");
  var btn = document.getElementById("btn");

  if (text.style.display === "none") {
    text.style.display = "block";
    btn.innerHTML = "Show Less";
  } else {
    text.style.display = "none";
    btn.innerHTML = "Learn More";
  }
}


let cart = JSON.parse(localStorage.getItem('luneraCart')) || [];

function AddToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: parseFloat(price), quantity: 1 });
    }
    saveAndRefresh();
    alert(name + " Add To Your Cart");
}

function removeItem(index) {
    cart.splice(index, 1);
    saveAndRefresh();
}
function confirmOrder() {
    if (cart.length === 0) {
        alert(" Your Cart Is Empty");
        return;
    }

    alert("✅ Your Order Is Confirmed!"); 

    cart = []; 
    saveAndRefresh();
}

function saveAndRefresh() {
    localStorage.setItem('luneraCart', JSON.stringify(cart));
    if (document.getElementById('cart-items-container')) {
        displayCart();
    }
}

function displayCart() {
    const container = document.getElementById('cart-items-container');
    const totalElement = document.getElementById('cart-total');
    if (!container) return;

    container.innerHTML = ''; 
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center;">Your Cart Emty</p>';
        if (totalElement) totalElement.innerText = '0.000 BD';
        return;
    }

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        container.innerHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #eee;">
                <div><strong>${item.name}</strong> (x${item.quantity})</div>
                <div>
                    <span>${itemTotal.toFixed(3)} BD</span>
                    <button onclick="removeItem(${index})" style="color:red; cursor:pointer; border:none; background:none; font-weight:bold; margin-left:10px;">X</button>
                </div>
            </div>`;
    });

    if (totalElement) totalElement.innerText = total.toFixed(3) + ' BD';
}

if (document.getElementById('cart-items-container')) {
    displayCart();
}

