const API_URL = "http://localhost:3000/products";

// Lấy id từ URL
function getProductId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Load chi tiết
async function loadProductDetail() {
  const id = getProductId();
  const container = document.getElementById("product-detail");

  if (!id) {
    container.innerHTML = "<p>❌ Không có ID sản phẩm</p>";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/${id}`);
    const product = await res.json();

    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <!-- Ảnh -->
        <img src="${product.image}" 
          class="w-full h-[400px] object-cover rounded-lg"
          onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">

        <!-- Info -->
        <div>
          <h1 class="text-3xl font-bold mb-4">${product.name}</h1>
          
          <p class="text-gray-500 mb-2">Danh mục: ${product.category}</p>

          <p class="text-2xl text-emerald-600 font-bold mb-4">
            ${product.price.toLocaleString('vi-VN')}đ
          </p>

          <p class="text-gray-700 leading-relaxed mb-6">
            ${product.description || "Chưa có mô tả sản phẩm"}
          </p>

          <button class="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700">
            🛒 Thêm vào giỏ
          </button>
        </div>

      </div>
    `;

  } catch (error) {
    console.error(error);
    container.innerHTML = "<p class='text-red-500'>❌ Lỗi tải dữ liệu</p>";
  }
}

// Quay lại
function goBack() {
  window.history.back();
}

// Run
document.addEventListener("DOMContentLoaded", loadProductDetail);