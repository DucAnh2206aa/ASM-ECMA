const API_URL = "http://localhost:3000/products";

const table = document.getElementById("product-table");
const loading = document.getElementById("loading");

async function loadProducts() {
  loading.classList.remove("hidden");

  try {
    const res = await fetch(API_URL);
    const products = await res.json();

    table.innerHTML = products.map(p => `
      <tr class="border-t">
        <td class="p-3">${p.id}</td>

        <td class="p-3">
          <img src="${p.image}" 
            class="w-16 h-16 object-cover rounded"
            onerror="this.src='https://via.placeholder.com/100'">
        </td>

        <td class="p-3 font-medium">${p.name}</td>

        <td class="p-3 text-emerald-600 font-bold">
          ${Number(p.price).toLocaleString('vi-VN')}đ
        </td>

        <td class="p-3 space-x-2">
          <button onclick="editProduct('${p.id}')"
            class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
            Sửa
          </button>

          <button onclick="deleteProduct('${p.id}')"
            class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
            Xóa
          </button>
        </td>
      </tr>
    `).join("");

  } catch (err) {
    table.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-red-500 py-6">
          ❌ Lỗi tải dữ liệu
        </td>
      </tr>
    `;
  }

  loading.classList.add("hidden");
}

async function deleteProduct(id) {
  const confirmDelete = confirm("Bạn có chắc muốn xóa?");
  if (!confirmDelete) return;

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    alert("✅ Xóa thành công");
    loadProducts();

  } catch (err) {
    alert("❌ Lỗi xóa");
  }
}

function editProduct(id) {
  window.location.href = `form.html?id=${id}`;
}

document.addEventListener("DOMContentLoaded", loadProducts);