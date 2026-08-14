// ===============================
// ข้อมูลสินค้า
// ===============================

const products = [

    {
        id: 1,
        name: "หมอนทอง",
        category: "หมอนทอง",
        description: "เนื้อหนา หวานมัน กลิ่นหอม",
        oldPrice: 180,
        price: 162,
        discount: 10
    },

    {
        id: 2,
        name: "ก้านยาว",
        category: "ก้านยาว",
        description: "เนื้อละเอียด หวานหอม",
        oldPrice: 250,
        price: 212.5,
        discount: 15
    },

    {
        id: 3,
        name: "ชะนี",
        category: "ชะนี",
        description: "เนื้อนุ่ม รสหวานมัน",
        oldPrice: 160,
        price: 160,
        discount: 0
    },

    {
        id: 4,
        name: "หมอนทองพรีเมียม",
        category: "หมอนทอง",
        description: "คัดพิเศษ เนื้อแน่นเต็มพู",
        oldPrice: 320,
        price: 256,
        discount: 20
    },

    {
        id: 5,
        name: "ชุดทุเรียนรวม",
        category: "รวม",
        description: "รวมหลายสายพันธุ์",
        oldPrice: 500,
        price: 375,
        discount: 25
    }

];


// ===============================
// ตะกร้า
// ===============================

let cart = [];


// ===============================
// แสดงสินค้า
// ===============================

function displayProducts(list = products) {

    const productList =
        document.getElementById("productList");

    if (!productList) {
        return;
    }

    productList.innerHTML = "";


    list.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <img
                src="durian.png"
                alt="${product.name}"
            >

            <h3>
                ${product.name}
            </h3>

            <p>
                ${product.description}
            </p>

            <div class="old-price">
                ${product.oldPrice} บาท
            </div>

            <div class="price">
                ${product.price} บาท
            </div>

            <div class="discount">
                ส่วนลด ${product.discount}%
            </div>

            <button
                class="add-cart"
                onclick="addToCart(${product.id})">

                🛒 เพิ่มลงตะกร้า

            </button>
        `;


        productList.appendChild(card);

    });

}


// ===============================
// กรองสินค้า
// ===============================

function filterProducts(category) {

    if (category === "all") {

        displayProducts(products);

        return;
    }


    const filtered =
        products.filter(
            product =>
            product.category === category
        );


    displayProducts(filtered);
}


// ===============================
// เพิ่มสินค้า
// ===============================

function addToCart(id) {

    const product =
        products.find(
            product => product.id === id
        );


    cart.push(product);

    updateCart();


    alert(
        `เพิ่ม ${product.name} ลงในตะกร้าแล้ว`
    );
}


// ===============================
// แสดงตะกร้า
// ===============================

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const subtotalElement =
        document.getElementById("subtotal");

    const discountElement =
        document.getElementById("discount");

    const totalElement =
        document.getElementById("total");


    if (!cartItems) {
        return;
    }


    if (cart.length === 0) {

        cartItems.innerHTML =
            "ยังไม่มีสินค้า";

        subtotalElement.textContent =
            "0 บาท";

        discountElement.textContent =
            "0 บาท";

        totalElement.textContent =
            "0 บาท";

        return;
    }


    cartItems.innerHTML = "";


    let subtotal = 0;
    let discount = 0;


    cart.forEach((product, index) => {

        subtotal += product.oldPrice;

        discount +=
            product.oldPrice - product.price;


        const item =
            document.createElement("p");


        item.innerHTML = `

            ${index + 1}.
            ${product.name}
            -
            ${product.price} บาท

        `;


        cartItems.appendChild(item);

    });


    const total =
        subtotal - discount;


    subtotalElement.textContent =
        `${subtotal} บาท`;


    discountElement.textContent =
        `${discount} บาท`;


    totalElement.textContent =
        `${total} บาท`;
}


// ===============================
// Checkout
// ===============================

function checkout() {

    if (cart.length === 0) {

        alert(
            "กรุณาเลือกสินค้าก่อนสั่งซื้อ"
        );

        return;
    }


    alert(
        "ขอบคุณสำหรับคำสั่งซื้อจาก มหาเทพเติ้ล789"
    );

}


// ===============================
// SET THEORY
// ===============================

const setA = [
    "หมอนทอง",
    "ก้านยาว",
    "ชะนี",
    "หมอนทองพรีเมียม",
    "ชุดทุเรียนรวม"
];


const setB = [
    "หมอนทอง",
    "ก้านยาว",
    "หมอนทองพรีเมียม",
    "ชุดทุเรียนรวม"
];


// แสดง Set

function displaySets() {

    const A =
        document.getElementById("setA");

    const B =
        document.getElementById("setB");


    if (A) {

        A.textContent =
            "{ " +
            setA.join(", ") +
            " }";

    }


    if (B) {

        B.textContent =
            "{ " +
            setB.join(", ") +
            " }";

    }

}


// ===============================
// SET OPERATION
// ===============================

function setOperation(operation) {

    const result =
        document.getElementById(
            "logicResult"
        );


    if (!result) {
        return;
    }


    let answer = [];


    // AND
    if (operation === "AND") {

        answer =
            setA.filter(
                item => setB.includes(item)
            );

        result.innerHTML =
            `
            A ∩ B = { ${answer.join(", ")} }

            <br><br>

            AND หมายถึง สมาชิกที่อยู่ใน
            Set A และ Set B พร้อมกัน
            `;

    }


    // OR
    else if (operation === "OR") {

        answer =
            [...new Set([...setA, ...setB])];


        result.innerHTML =
            `
            A ∪ B = { ${answer.join(", ")} }

            <br><br>

            OR หมายถึง สมาชิกของ A
            หรือ B หรืออยู่ทั้งสองเซต
            `;

    }


    // NOT / DIFFERENCE
    else if (operation === "NOT") {

        answer =
            setA.filter(
                item => !setB.includes(item)
            );


        result.innerHTML =
            `
            A - B = { ${answer.join(", ")} }

            <br><br>

            NOT / Difference หมายถึง
            สมาชิกที่อยู่ใน A แต่ไม่อยู่ใน B
            `;

    }

}


// ===============================
// BOOLEAN LOGIC
// ===============================

function booleanOperation(operation) {

    const A =
        document.getElementById(
            "booleanA"
        ).checked;


    const B =
        document.getElementById(
            "booleanB"
        ).checked;


    const result =
        document.getElementById(
            "booleanResult"
        );


    if (!result) {
        return;
    }


    let answer;


    if (operation === "AND") {

        answer = A && B;

        result.innerHTML =
            `
            A AND B = ${answer}

            <br>

            ต้องเป็น TRUE ทั้ง A และ B
            `;

    }


    else if (operation === "OR") {

        answer = A || B;

        result.innerHTML =
            `
            A OR B = ${answer}

            <br>

            อย่างน้อยหนึ่งค่าเป็น TRUE
            `;

    }


    else if (operation === "NOT") {

        answer = !A;

        result.innerHTML =
            `
            NOT A = ${answer}

            <br>

            เป็นค่าตรงข้ามของ A
            `;

    }

}


// ===============================
// IF ELSE
// ===============================

function checkDiscount() {

    const input =
        document.getElementById(
            "quantityInput"
        );


    const result =
        document.getElementById(
            "ifElseResult"
        );


    if (!input || !result) {
        return;
    }


    const quantity =
        Number(input.value);


    if (quantity >= 5) {

        result.innerHTML =
            `
            🎉 ซื้อ ${quantity} ลูก

            <br>

            ได้รับส่วนลด 10%

            <br>

            เงื่อนไขเป็น TRUE
            `;

    }


    else {

        result.innerHTML =
            `
            ซื้อ ${quantity} ลูก

            <br>

            ยังไม่ได้รับส่วนลด

            <br>

            เงื่อนไขเป็น FALSE
            `;

    }

}


// ===============================
// เริ่มต้นเว็บไซต์
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayProducts();

        displaySets();

        updateCart();

    }
);
