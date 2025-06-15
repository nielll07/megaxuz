
document.addEventListener('DOMContentLoaded', () => {
    // Data produk dummy
    const products = [
        {
            id: 1,
            name: 'Kemeja Pria UNIQLO',
            price: 'Rp 425.000',
            rating: '4.9',
            sold: '2rb+',
            location: 'Pontianak',
            image: 'images/uniqlo.jpg',
            category: 'baju'
        },
        {
            id: 2,
            name: 'Jeans Pria Slim Fit Premium',
            price: 'Rp 210.000',
            rating: '4.7',
            sold: '1.5rb+',
            location: 'Jakarta',
            image: 'images/jeans.jpg',
            category: 'celana'
        },
        {
            id: 3,
            name: 'Sneakers Olahraga Wanita Ringan',
            price: 'Rp 350.000',
            rating: '4.8',
            sold: '800+',
            location: 'Surabaya',
            image: 'images/sepatu1.jpg',
            category: 'sepatu'
        },
        {
            id: 4,
            name: 'Jam Tangan Pria Alexander Christie',
            price: 'Rp 1.999.000',
            rating: '4.9',
            sold: '500+',
            location: 'Jakarta',
            image: 'images/jamac.jpg',
            category: 'jam'
        },
        {
            id: 5,
            name: 'Dress Wanita ',
            price: 'Rp 180.000',
            rating: '4.6',
            sold: '1.2rb+',
            location: 'Bandung',
            image: 'images/dr1.jpg',
            category: 'baju'
        },
        {
            id: 6,
            name: 'Celana Chinos Pria Basic',
            price: 'Rp 150.000',
            rating: '4.5',
            sold: '900+',
            location: 'Depok',
            image: 'images/c1.jpg',
            category: 'celana'
        },
        {
            id: 7,
            name: 'Sepatu Boots Kulit Pria',
            price: 'Rp 420.000',
            rating: '4.7',
            sold: '300+',
            location: 'Yogyakarta',
            image: 'images/s1.jpg',
            category: 'sepatu'
        },
        {
            id: 8,
            name: 'Smartwatch Unisex Multifungsi',
            price: 'Rp 750.000',
            rating: '4.8',
            sold: '600+',
            location: 'Bekasi',
            image: 'images/sm1.jpg',
            category: 'jam'
        },
        {
            id: 9,
            name: 'Blus Wanita Lengan Balon',
            price: 'Rp 95.000',
            rating: '4.7',
            sold: '1.1rb+',
            location: 'Semarang',
            image: 'images/ba1.jpg',
            category: 'baju'
        },
        {
            id: 10,
            name: 'Celana Pendek Wanita Santai',
            price: 'Rp 70.000',
            rating: '4.6',
            sold: '1.8rb+',
            location: 'Denpasar',
            image: 'images/d1.jpg',
            category: 'celana'
        },
        // Tambahkan lebih banyak produk di sini sesuai kebutuhan
    ];

    const productsContainer = document.getElementById('productsContainer');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categoryItems = document.querySelectorAll('.category-item');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    // NEW: Newsletter elements
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmailInput = document.getElementById('newsletterEmail');
    const newsletterMessage = document.getElementById('newsletterMessage');

    // Fungsi untuk menampilkan produk
    function displayProducts(filteredProducts) {
        productsContainer.innerHTML = ''; // Kosongkan container sebelum menambahkan produk baru

        if (filteredProducts.length === 0) {
            productsContainer.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; color: #777;">Tidak ada produk ditemukan.</p>';
            return;
        }

        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price}</p>
                    <div class="rating">
                        <i class="fas fa-star"></i> ${product.rating} | Terjual ${product.sold}
                    </div>
                    <span class="location">${product.location}</span>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });
    }

    // Fungsi untuk memfilter produk berdasarkan kategori
    function filterProductsByCategory(category) {
        let filtered;
        if (category === 'all') {
            filtered = products;
        } else {
            filtered = products.filter(product => product.category === category);
        }
        displayProducts(filtered);
    }

    // Fungsi untuk memfilter produk berdasarkan pencarian
    function searchProducts(query) {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(lowerCaseQuery) ||
            product.location.toLowerCase().includes(lowerCaseQuery) ||
            product.category.toLowerCase().includes(lowerCaseQuery)
        );
        displayProducts(filtered);
    }

    // Event Listeners untuk filter navigasi
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah refresh halaman
            const category = e.target.dataset.category;

            // Hapus kelas 'active' dari semua tombol filter
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Tambahkan kelas 'active' ke tombol yang diklik
            e.target.classList.add('active');

            filterProductsByCategory(category);
        });
    });

    // Event Listeners untuk filter kategori di grid (klik gambar kategori)
    categoryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const category = e.currentTarget.dataset.category; // currentTarget karena klik bisa di img/p
            
            // Setel tombol navigasi yang sesuai menjadi active juga
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.category === category) {
                    btn.classList.add('active');
                }
            });

            filterProductsByCategory(category);
        });
    });


    // Event Listener untuk pencarian
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        searchProducts(query);
        // Hapus active dari filter kategori saat pencarian
        filterButtons.forEach(btn => btn.classList.remove('active'));
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            searchProducts(query);
            // Hapus active dari filter kategori saat pencarian
            filterButtons.forEach(btn => btn.classList.remove('active'));
        }
    });

    // NEW: Event Listener untuk formulir berlangganan
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Mencegah pengiriman formulir dan refresh halaman

        const email = newsletterEmailInput.value.trim();

        if (email) {
            // Validasi email sederhana
            if (/\S+@\S+\.\S+/.test(email)) {
                // Dalam proyek nyata, Anda akan mengirim email ini ke server
                // menggunakan Fetch API atau XMLHttpRequest.
                // Contoh: fetch('/subscribe', { method: 'POST', body: JSON.stringify({ email: email }) })
                // .then(response => response.json())
                // .then(data => { ... })
                // .catch(error => { ... });

                newsletterMessage.textContent = `Terima kasih! Email "${email}" telah terdaftar untuk newsletter.`;
                newsletterMessage.style.color = 'white'; // Atau warna lain yang cocok
                newsletterEmailInput.value = ''; // Kosongkan input
            } else {
                newsletterMessage.textContent = 'Harap masukkan alamat email yang valid.';
                newsletterMessage.style.color = 'yellow'; // Peringatan
            }
        } else {
            newsletterMessage.textContent = 'Email tidak boleh kosong.';
            newsletterMessage.style.color = 'yellow'; // Peringatan
        }
    });

    // Tampilkan semua produk saat halaman pertama kali dimuat
    displayProducts(products);
    // Atur tombol 'Semua Produk' menjadi aktif secara default
    document.querySelector('.filter-btn[data-category="all"]').classList.add('active');
});
