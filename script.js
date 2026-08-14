let cart = [];


// ================= FILTER PRODUCTS =================

function filterProducts(category) {

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {

        const productCategory =
            product.dataset.category;

        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


// ================= ADD TO CART =================

function addToCart(name, price) {

    const existing =
        cart.find(item => item.name === name);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

}


// ================= UPDATE CART =================

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    const cartDiscount =
        document.getElementById("cartDiscount");

    const finalTotal =
        document.getElementById("finalTotal");


    if (!cartItems) return;


    if (cart.length === 0) {

        cartItems.innerHTML =
            "ยังไม่มีสินค้า";

        cartTotal.innerText = "0";
        cartDiscount.innerText = "0";
        finalTotal.innerText = "0";

        return;

    }


    let total = 0;

    let html = "";


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        html += `

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                gap:15px;
                padding:12px 0;
                border-bottom:1px solid #e5e9df;
            ">

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <br>

                    <small>
                        ${item.price} บาท ×
                        ${item.quantity}
                    </small>

                </div>


                <div>

                    <strong>
                        ${itemTotal.toFixed(2)} บาท
                    </strong>

                    <button
                        onclick="removeFromCart(${index})"
                        style="
                            margin-left:10px;
                            border:0;
                            background:#eee;
                            border-radius:8px;
                            padding:5px 9px;
                            cursor:pointer;
                        "
                    >
                        ลบ
                    </button>

                </div>

            </div>

        `;

    });


    cartItems.innerHTML = html;

    cartTotal.innerText =
        total.toFixed(2);

    cartDiscount.innerText =
        "0";

    finalTotal.innerText =
        total.toFixed(2);

}


// ================= REMOVE =================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// ================= CHECKOUT =================

function checkout() {

    if (cart.length === 0) {

        alert("กรุณาเลือกสินค้าก่อนสั่งซื้อ");

        return;

    }


    let message =
        "รายการสั่งซื้อ%0A%0A";


    cart.forEach(item => {

        message +=
            `${item.name} x ${item.quantity} = ${(item.price * item.quantity).toFixed(2)} บาท%0A`;

    });


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    message +=
        `%0Aยอดรวม ${total.toFixed(2)} บาท`;


    alert(
        "เตรียมส่งรายการสั่งซื้อให้ร้านค้า"
    );

}
