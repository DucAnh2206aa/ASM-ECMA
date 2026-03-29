const API_URL = "http://localhost:3000/products";

const form = document.getElementById("product-form");
const title = document.getElementById("title");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {
  title.innerText = "✏️ Sửa sản phẩm";
  loadProduct();
}

async function loadProduct() {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const p = await res.json();

    document.getElementById("name").value = p.name;
    document.getElementById("category").value = p.category;
    document.getElementById("price").value = p.price;
    document.getElementById("image").value = p.image;
    document.getElementById("description").value = p.description || "";
  } catch (err) {
    alert("❌ Lỗi load dữ liệu");
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const product = {
    name: document.getElementById("name").value.trim(),
    category: document.getElementById("category").value.trim(),
    price: Number(document.getElementById("price").value),
    image: document.getElementById("image").value.trim(),
    description: document.getElementById("description").value.trim()
  };

  if (!product.name || !product.price || !product.image) {
    alert("⚠️ Vui lòng nhập đầy đủ thông tin");
    return;
  }

  try {
    if (id) {
      // UPDATE
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
      });

      alert("✅ Cập nhật thành công");

    } else {
      // CREATE (KHÔNG GỬI ID)
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
      });

      alert("✅ Thêm thành công");
    }

    window.location.href = "index.html";

  } catch (err) {
    alert("❌ Lỗi lưu dữ liệu");
  }
});

function goBack() {
  window.location.href = "index.html";
}