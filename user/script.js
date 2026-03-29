const API_URL = "http://localhost:3000/products";

// Debounce search
let timeout;
const searchInput = document.getElementById("search-input");

// Tạo card sản phẩm
function createProductCard(product) {
  return `
    <div onclick="viewDetail(${product.id})" 
         class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer group">
      <div class="relative">
        <img src="${product.image}" 
             onerror="this.src='https://via.placeholder.com/400x300?text=Không+có+ảnh'" 
             class="w-full h-52 object-cover group-hover:scale-105 transition duration-300">
        <span class="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          ${product.category}
        </span>
      </div>
      <div class="p-4">
        <h3 class="font-semibold text-lg leading-tight line-clamp-2 min-h-[52px]">${product.name}</h3>
        <p class="text-2xl font-bold text-emerald-600 mt-3">
          ${product.price.toLocaleString('vi-VN')}đ
        </p>
      </div>
    </div>
  `;
}

// Load dữ liệu
async function loadProducts(searchTerm = "") {
  const topSelling = document.getElementById("top-selling");
  const productGrid = document.getElementById("product-grid");

  try {
    const res = await fetch(API_URL);
    let products = await res.json();

    // Tìm kiếm
    if (searchTerm) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Top 8 bán chạy (sắp xếp theo giá cao nhất)
    const top8 = [...products]
      .sort((a, b) => b.price - a.price)
      .slice(0, 8);

    topSelling.innerHTML = top8.map(p => createProductCard(p)).join('');
    productGrid.innerHTML = products.map(p => createProductCard(p)).join('');

  } catch (error) {
    console.error("Lỗi:", error);
    topSelling.innerHTML = productGrid.innerHTML = `
      <p class="col-span-full text-center py-12 text-red-500 text-lg">
        ❌ Không thể kết nối API.<br>
        Vui lòng chạy json-server trước!
      </p>`;
  }
}

// Chuyển sang trang chi tiết
function viewDetail(id) {
  window.location.href = `detail.html?id=${id}`;
}

// Search debounce
searchInput.addEventListener("input", () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    loadProducts(searchInput.value.trim());
  }, 400);
});

// Khởi chạy
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});