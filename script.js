/* =========================================
   ข้อมูลสินค้า
========================================= */

const products = [

    {
        id: 1,
        name: "หมอนทอง",
        category: "หมอนทอง",
        price: 180,
        discount: 10,
        description: "เนื้อหนา หวานมัน กลิ่นหอม"
    },

    {
        id: 2,
        name: "ก้านยาว",
        category: "ก้านยาว",
        price: 250,
        discount: 15,
        description: "เนื้อละเอียด หวานหอม"
    },

    {
        id: 3,
        name: "ชะนี",
        category: "ชะนี",
        price: 160,
        discount: 0,
        description: "เนื้อนุ่ม รสหวานมัน"
    },

    {
        id: 4,
        name: "หมอนทองพรีเมียม",
        category: "หมอนทอง",
        price: 320,
        discount: 20,
        description: "คัดพิเศษ เนื้อแน่นเต็มพู"
    },

    {
        id: 5,
        name: "ชุดทุเรียนรวม",
        category: "ชุดรวม",
        price: 500,
        discount: 25,
        description: "รวมหลายสายพันธุ์"
    }

];


/* =========================================
   ตะกร้า
========================================= */

let cart =
    JSON.parse(
        localStorage.getItem("durianCart")
    ) || [];


/* =========================================
   ฟังก์ชันเงิน
========================================= */

function formatMoney(number) {

    return number.toLocaleString("th-TH");

}


/* =========================================
   ราคาหลังส่วนลด
========================================= */

function salePrice(product) {

    return product.price -
        (product.price *
        product.discount / 100);

}


/* =========================================
   แสดงจำนวนสินค้าในตะกร้า
========================================= */

function updateCartCount() {

    const count =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    document
        .querySelectorAll("#cartCount")
        .forEach(element => {

            element.textContent = count;

        });

}


/* =========================================
   บันทึกตะกร้า
========================================= */

function saveCart() {

    localStorage.setItem(
        "durianCart",
        JSON.stringify(cart)
    );

    updateCartCount();

}


/* =========================================
   แสดงสินค้า
========================================= */

function displayProducts(
    category = "ทั้งหมด"
) {

    const productList =
        document.getElementById(
            "productList"
        );


    if (!productList) {
        return;
    }


    productList.innerHTML = "";


    const filteredProducts =
        products.filter(product => {

            if (category === "ทั้งหมด") {

                return true;

            }

            return product.category === category;

        });


    filteredProducts.forEach(product => {

        const card =
            document.createElement("div");


        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="images/durian.png"
                    alt="${product.name}"
                >

            </div>


            <span class="category">

                ${product.category}

            </span>


            <h3>
                ${product.name}
            </h3>


            <p>
                ${product.description}
            </p>


            <div class="price">

                ${
                    product.discount > 0

                    ?

                    `
                    <span class="old-price">
                        ${formatMoney(product.price)}
                        บาท
                    </span>
                    <br>
                    `

                    :

                    ""
                }


                ${formatMoney(
                    salePrice(product)
                )}

                บาท

            </div>


            <p>

                ส่วนลด
                ${product.discount}%

            </p>


            <button
                class="add-cart"
                onclick="addToCart(${product.id})">

                🛒 เพิ่มลงตะกร้า

            </button>

        `;


        productList.appendChild(card);

    });

}


/* =========================================
   เพิ่มสินค้า
========================================= */

function addToCart(id) {

    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        existing.quantity++;

    }

    else {

        cart.push({

            id: id,

            quantity: 1

        });

    }


    saveCart();

    displayCart();


    alert(
        "เพิ่มสินค้าลงตะกร้าแล้ว"
    );

}


/* =========================================
   เปลี่ยนจำนวน
========================================= */

function changeQuantity(
    id,
    amount
) {

    const item =
        cart.find(
            item => item.id === id
        );


    if (!item) {
        return;
    }


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== id
            );

    }


    saveCart();

    displayCart();

}


/* =========================================
   ลบสินค้า
========================================= */

function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    saveCart();

    displayCart();

}


/* =========================================
   แสดงตะกร้า
========================================= */

function displayCart() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );


    if (!cartItems) {
        return;
    }


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p>
                🛒 ยังไม่มีสินค้าในตะกร้า
            </p>
        `;

        document.getElementById(
            "subtotal"
        ).textContent = "0 บาท";

        document.getElementById(
            "discount"
        ).textContent = "0 บาท";

        document.getElementById(
            "total"
        ).textContent = "0 บาท";

        return;

    }


    cartItems.innerHTML = "";


    let subtotal = 0;

    let discount = 0;


    cart.forEach(item => {

        const product =
            products.find(
                p => p.id === item.id
            );


        const normalPrice =
            product.price *
            item.quantity;


        const finalPrice =
            salePrice(product) *
            item.quantity;


        subtotal += normalPrice;

        discount +=
            normalPrice - finalPrice;


        const div =
            document.createElement(
                "div"
            );


        div.className =
            "cart-item";


        div.innerHTML = `

            <img
                src="images/durian.png"
                alt="${product.name}"
            >


            <div class="cart-info">

                <strong>
                    ${product.name}
                </strong>

                <br>

                ${formatMoney(
                    salePrice(product)
                )}

                บาท

            </div>


            <div class="qty">

                <button
                    onclick="changeQuantity(
                        ${product.id},
                        -1
                    )">

                    −

                </button>


                ${item.quantity}


                <button
                    onclick="changeQuantity(
                        ${product.id},
                        1
                    )">

                    +

                </button>

            </div>


            <button
                class="delete"
                onclick="removeFromCart(
                    ${product.id}
                )">

                ลบ

            </button>

        `;


        cartItems.appendChild(div);

    });


    const total =
        subtotal - discount;


    document.getElementById(
        "subtotal"
    ).textContent =
        formatMoney(subtotal)
        + " บาท";


    document.getElementById(
        "discount"
    ).textContent =
        "-" +
        formatMoney(discount)
        + " บาท";


    document.getElementById(
        "total"
    ).textContent =
        formatMoney(total)
        + " บาท";

}


/* =========================================
   สั่งซื้อ
========================================= */

function checkout() {

    if (cart.length === 0) {

        alert(
            "กรุณาเลือกสินค้าก่อนสั่งซื้อ"
        );

        return;

    }


    alert(
        "สั่งซื้อสำเร็จ!"
    );


    cart = [];


    saveCart();

    displayCart();

}


/* =========================================
   SET THEORY
========================================= */

function displaySets() {

    const setA =
        document.getElementById(
            "setA"
        );


    const setB =
        document.getElementById(
            "setB"
        );


    if (!setA || !setB) {
        return;
    }


    /*
        Set A =
        สินค้าทั้งหมด
    */

    const A =
        products.map(
            product => product.id
        );


    /*
        Set B =
        สินค้าที่มีส่วนลด
    */

    const B =
        products
            .filter(
                product =>
                    product.discount > 0
            )
            .map(
                product =>
                    product.id
            );


    setA.innerHTML =
        createSetText(A);


    setB.innerHTML =
        createSetText(B);

}


/* =========================================
   แปลง Set เป็นข้อความ
========================================= */

function createSetText(ids) {

    return `{

        ${
            ids.map(id => {

                const product =
                    products.find(
                        p => p.id === id
                    );

                return product.name;

            }).join(", ")

        }

    }`;

}


/* =========================================
   SET AND / OR / NOT
========================================= */

function setOperation(operation) {

    const A =
        products.map(
            product => product.id
        );


    const B =
        products
            .filter(
                product =>
                    product.discount > 0
            )
            .map(
                product =>
                    product.id
            );


    let result = [];


    /* AND = Intersection */

    if (operation === "AND") {

        result =
            A.filter(
                id => B.includes(id)
            );

    }


    /* OR = Union */

    if (operation === "OR") {

        result =
            [
                ...new Set(
                    [...A, ...B]
                )
            ];

    }


    /* NOT / Difference */

    if (operation === "NOT") {

        result =
            A.filter(
                id => !B.includes(id)
            );

    }


    const resultBox =
        document.getElementById(
            "setResult"
        );


    resultBox.innerHTML = `

        Operation:

        <strong>
            ${operation}
        </strong>

        <br><br>

        ${createSetText(result)}

    `;

}


/* =========================================
   BOOLEAN LOGIC
========================================= */

function booleanOperation(
    operation
) {

    const A =
        document.getElementById(
            "booleanA"
        ).checked;


    const B =
        document.getElementById(
            "booleanB"
        ).checked;


    let result;


    /*
        AND
    */

    if (operation === "AND") {

        result =
            A && B;

    }


    /*
        OR
    */

    if (operation === "OR") {

        result =
            A || B;

    }


    /*
        NOT
    */

    if (operation === "NOT") {

        result =
            !A;

    }


    const resultBox =
        document.getElementById(
            "booleanResult"
        );


    resultBox.innerHTML = `

        ${operation}

        =

        <strong>
            ${result ? "TRUE" : "FALSE"}
        </strong>

    `;

}


/* =========================================
   IF / ELSE ส่วนลด
========================================= */

function checkDiscount() {

    const quantity =
        Number(
            document.getElementById(
                "quantityInput"
            ).value
        );


    let discountText;


    /*
        IF / ELSE
    */

    if (quantity >= 10) {

        discountText =
            "ได้รับส่วนลด 20%";

    }

    else if (quantity >= 5) {

        discountText =
            "ได้รับส่วนลด 10%";

    }

    else if (quantity >= 3) {

        discountText =
            "ได้รับส่วนลด 5%";

    }

    else {

        discountText =
            "ยังไม่มีส่วนลด";

    }


    document.getElementById(
        "ifElseResult"
    ).innerHTML = `

        จำนวนที่สั่ง:

        <strong>
            ${quantity} ลูก
        </strong>

        <br>

        ${discountText}

    `;

}


/* =========================================
   เริ่มต้นเว็บไซต์
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayProducts();

        displayCart();

        displaySets();

        updateCartCount();


        /*
            ปุ่มหมวดหมู่
        */

        document
            .querySelectorAll(
                ".filter"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function() {

                        document
                            .querySelectorAll(
                                ".filter"
                            )
                            .forEach(
                                btn =>
                                    btn.classList
                                    .remove(
                                        "active"
                                    )
                            );


                        this.classList.add(
                            "active"
                        );


                        displayProducts(
                            this.dataset.category
                        );

                    }
                );

            });

    }
);
