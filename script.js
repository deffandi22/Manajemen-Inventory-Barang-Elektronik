document.addEventListener('DOMContentLoaded', function () {
    // LOGIN LOGIC
    const loginForm = document.querySelector('.login-box form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const username = document.querySelector('input[placeholder="Username"]').value;
            const password = document.querySelector('input[placeholder="Password"]').value;
            if (username === 'admin' && password === 'admin123') {
                alert('Login berhasil! Mengalihkan ke dashboard...');
                window.location.href = 'dashboard.html';
            } else {
                alert('Username atau password salah. Coba lagi!');
            }
        });
    }

    // REGISTER LOGIC
    const registerForm = document.querySelector('.register-box form');
    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const username = document.querySelector('input[placeholder="Username"]').value;
            const email = document.querySelector('input[placeholder="Email"]').value;
            const password = document.querySelector('input[placeholder="Password"]').value;
            const confirmPassword = document.querySelector('input[placeholder="Konfirmasi Password"]').value;

            if (password !== confirmPassword) {
                alert('Password dan Konfirmasi Password tidak sama!');
            } else {
                alert(`Pendaftaran berhasil untuk: ${username}`);
                window.location.href = 'login.html';
            }
        });
    }

    // FORGOT PASSWORD LOGIC
    const forgotPasswordForm = document.querySelector('#forgot-password-form');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const emailInput = document.querySelector('#email-input').value;

            if (!emailInput) {
                alert('Harap masukkan email Anda.');
                return;
            }

            // Simulasikan pengiriman email (hanya redirect ke halaman reset password)
            console.log(`Reset link akan dikirim ke email: ${emailInput}`);
            window.location.href = 'reset password.html';
        });
    }

    // RESET PASSWORD LOGIC
    const resetPasswordForm = document.querySelector('.reset-password-box form');
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const newPassword = document.querySelector('input[placeholder="Password minimal 8 karakter"]').value;
            const confirmNewPassword = document.querySelector('input[placeholder="Ulangi Password"]').value;

            if (newPassword !== confirmNewPassword) {
                alert('Password baru dan konfirmasi tidak cocok!');
            } else {
                alert('Password berhasil diubah! Silakan login kembali.');
                window.location.href = 'login.html';
            }
        });
    }

    // Ambil elemen tombol dan elemen logout
    const menuToggle = document.getElementById('menuToggle');
    const logoutText = document.getElementById('logoutText');

    // Tambahkan event listener pada tombol menu
    menuToggle.addEventListener('click', () => {
        // Toggle untuk menampilkan atau menyembunyikan Logout
        if (logoutText.style.display === "none" || logoutText.style.display === "") {
            logoutText.style.display = "block"; // Tampilkan Logout
        } else {
            logoutText.style.display = "none"; // Sembunyikan Logout
        }
    });

    // Event listener untuk Logout
    logoutText.addEventListener('click', () => {
        // Redirect ke halaman Home
        window.location.href = "index.html"; // Ganti "index.html" dengan URL Home Page Anda
    });


});

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.close');
    const addBtn = document.getElementById('btnAdd');
    const tableBody = document.querySelector('tbody');
    const searchInput = document.getElementById('searchInput'); // Assuming you have an input with id 'searchInput'
    const rowSelect = document.getElementById('rowSelect'); // Assuming you have a select input with id 'rowSelect'

    let editingRow = null; // Track which row is being edited
    let rowsToDisplay = 5; // Default to 5 rows per page

    // Open Modal
    function openModal(content, modalType) {
        modalBody.innerHTML = content;

        // Reset modal classes
        modal.className = 'modal';
        modal.classList.add(modalType);

        modal.style.display = 'flex';

        // Attach event listeners for cancel, delete, and close buttons
        attachModalEventListeners();
    }

    // Attach event listeners to modal buttons
    function attachModalEventListeners() {
        // Close button (X)
        const closeBtn = document.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Cancel button
        const cancelBtns = document.querySelectorAll('.btn-cancel');
        cancelBtns.forEach(btn => {
            btn.addEventListener('click', closeModal);
        });

        // Cancel button delete
        const cancelButton = document.querySelectorAll('.btn-cancel-d');
        cancelButton.forEach(btn => {
            btn.addEventListener('click', closeModal);
        });

        // Delete button (Confirm deletion)
        const deleteConfirmBtn = document.querySelector('.btn-delete-confirm');
        if (deleteConfirmBtn) {
            deleteConfirmBtn.addEventListener('click', () => {
                // Handle deletion
                if (editingRow) {
                    editingRow.remove();
                    alert('Data barang berhasil dihapus!');
                }
                closeModal();
            });
        }

        // Add Data (Insert)
        const addDataForm = document.querySelector('.modal form');
        if (addDataForm) {
            addDataForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(addDataForm);
                const kode = formData.get('kode');
                const nama = formData.get('nama');
                const beli = formData.get('beli');
                const jual = formData.get('jual');
                const stok = formData.get('stok');
                const tanggal = formData.get('tanggal');

                // If we're editing a row, update it
                if (editingRow) {
                    const cells = editingRow.querySelectorAll('td');
                    cells[1].textContent = kode;
                    cells[2].textContent = nama;
                    cells[3].textContent = beli;
                    cells[4].textContent = jual;
                    cells[5].textContent = stok;
                    cells[6].textContent = tanggal;
                    editingRow = null;
                    alert('Data barang berhasil diperbarui!');
                } else {
                    // Add new row
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${tableBody.children.length + 1}</td>
                        <td>${kode}</td>
                        <td>${nama}</td>
                        <td>${beli}</td>
                        <td>${jual}</td>
                        <td>${stok}</td>
                        <td>${tanggal}</td>
                        <td>
                            <img src="assets/images/logo-edit.jpg" alt="Edit" class="btn-edit">
                            <img src="assets/images/logo-hapus.jpg" alt="Delete" class="btn-delete">
                        </td>
                    `;
                    tableBody.appendChild(newRow);
                    alert('Data barang berhasil ditambahkan!');
                }
                closeModal();
                filterRows();
            });
        }
    }

    // Close Modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Add Data (Open Add Modal)
    addBtn.addEventListener('click', () => {
        openModal(`
            <div class="custom-line"></div>
            <h3>Tambah Data Barang</h3>
            <form>
                <label>Kode Barang</label>
                <input type="text" name="kode" required><br>
                <label>Nama Barang</label>
                <input type="text" name="nama" required><br>
                <label>Harga Beli</label>
                <input type="number" name="beli" required><br>
                <label>Harga Jual</label>
                <input type="number" name="jual" required><br>
                <label>Stok Barang</label>
                <input type="number" name="stok" required><br>
                <label>Tanggal</label>
                <input type="date" name="tanggal" required><br><br>
                <button type="submit" class="btn">Insert</button>
                <button type="button" class="btn-cancel">Cancel</button>
            </form>
        `, 'modal-tambah');
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        filterRows(e.target.value);
    });

    // Row filter functionality
    rowSelect.addEventListener('change', (e) => {
        rowsToDisplay = parseInt(e.target.value);
        filterRows(searchInput.value); // Reapply filter with the new row count
    });

    // Filter rows based on search input and rows per page
    function filterRows(searchTerm = '') {
        const rows = Array.from(tableBody.rows);

        // Filter rows by search term
        const filteredRows = rows.filter((row) => {
            const rowData = row.querySelectorAll('td');
            const rowText = Array.from(rowData).map(cell => cell.textContent.toLowerCase()).join(' ');
            return rowText.includes(searchTerm.toLowerCase());
        });

        // Hide all rows initially
        rows.forEach(row => row.style.display = 'none');

        // Show filtered rows with pagination (based on rowsToDisplay)
        filteredRows.slice(0, rowsToDisplay).forEach(row => {
            row.style.display = '';
        });
    }

    // Edit Data (Open Edit Modal)
    tableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-edit')) {
            editingRow = e.target.closest('tr');
            const cells = editingRow.querySelectorAll('td');
            const kode = cells[1].textContent;
            const nama = cells[2].textContent;
            const beli = cells[3].textContent;
            const jual = cells[4].textContent;
            const stok = cells[5].textContent;
            const tanggal = cells[6].textContent;

            openModal(`
                <div class="custom-line-2"></div>
                <h3>Edit Data Barang</h3>
                <form>
                    <label>Kode Barang</label>
                    <input type="text" name="kode" value="${kode}" required><br>
                    <label>Nama Barang</label>
                    <input type="text" name="nama" value="${nama}" required><br>
                    <label>Harga Beli</label>
                    <input type="number" name="beli" value="${beli}" required><br>
                    <label>Harga Jual</label>
                    <input type="number" name="jual" value="${jual}" required><br>
                    <label>Stok Barang</label>
                    <input type="number" name="stok" value="${stok}" required><br>
                    <label>Tanggal</label>
                    <input type="date" name="tanggal" value="${tanggal}" required><br><br>
                    <button type="submit" class="btn">Update</button>
                    <button type="button" class="btn-cancel">Cancel</button>
                </form>
            `, 'modal-edit');
        }

        // Delete Data (Open Delete Modal)
        if (e.target.classList.contains('btn-delete')) {
            editingRow = e.target.closest('tr');
            openModal(`
                <img src="assets/images/logo-peringatan.png" alt="hapus Icon">
                <h4>DELETE</h4>
                <p>Anda yakin ingin menghapus data barang?</p>
                <button class="btn btn-delete-confirm">Delete</button>
                <button class="btn-cancel-d">Cancel</button>
            `, 'modal-delete');
        }
    });

    // Initial filter
    filterRows();
});



// data userrr

document.addEventListener('DOMContentLoaded', () => {
    const user = document.getElementById('user');
    const userBody = document.getElementById('userBody');
    const closeBtn = document.querySelector('.close');
    const addBtn = document.getElementById('btnAdd');
    const userTableBody = document.querySelector('tbody'); // Assuming this is where your user rows are
    const searchInput = document.getElementById('searchInput');
    const rowSelect = document.getElementById('rowSelect');

    let editingRow = null; // Track which row is being edited
    let rowsToDisplay = 5; // Default to 5 rows per page

    // Open User Modal
    function openUser(content, userType) {
        userBody.innerHTML = content;

        // Reset user modal classes
        user.className = 'user';
        user.classList.add(userType);

        user.style.display = 'flex';

        // Attach event listeners for cancel, delete, and close buttons
        attachUserEventListeners();
    }

    // Attach event listeners to user modal buttons
    function attachUserEventListeners() {
        // Close button (X)
        const closeBtn = document.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeUser);
        }

        // Cancel button
        const cancelBtns = document.querySelectorAll('.btn-cancel');
        cancelBtns.forEach(btn => {
            btn.addEventListener('click', closeUser);
        });

        // Cancel button delete
        const cancelButton = document.querySelectorAll('.btn-cancel-d');
        cancelButton.forEach(btn => {
            btn.addEventListener('click', closeUser);
        });

        // Delete button (Confirm deletion)
        const deleteConfirmBtn = document.querySelector('.btn-delete-confirm');
        if (deleteConfirmBtn) {
            deleteConfirmBtn.addEventListener('click', () => {
                // Handle deletion
                if (editingRow) {
                    editingRow.remove();
                    alert('Data user berhasil dihapus!');
                }
                closeUser();
            });
        }

        // Add Data (Insert)
        const addDataForm = document.querySelector('.user form');
        if (addDataForm) {
            addDataForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(addDataForm);
                const iduser = formData.get('iduser');
                const namaus = formData.get('namaus');
                const username = formData.get('username');
                const email = formData.get('email');
                const hpu = formData.get('hpu');
                const pw = formData.get('pw');

                // If we're editing a row, update it
                if (editingRow) {
                    const cells = editingRow.querySelectorAll('td');
                    cells[1].textContent = iduser;
                    cells[2].textContent = namaus;
                    cells[3].textContent = username;
                    cells[4].textContent = email;
                    cells[5].textContent = hpu;
                    cells[6].textContent = pw;
                    editingRow = null;
                    alert('Data user berhasil diperbarui!');
                } else {
                    // Add new row
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${userTableBody.children.length + 1}</td>
                        <td>${iduser}</td>
                        <td>${namaus}</td>
                        <td>${username}</td>
                        <td>${email}</td>
                        <td>${hpu}</td>
                        <td>${pw}</td>
                        <td>
                            <img src="assets/images/logo-edit.jpg" alt="Edit" class="btn-edit">
                            <img src="assets/images/logo-hapus.jpg" alt="Delete" class="btn-delete">
                        </td>
                    `;
                    userTableBody.appendChild(newRow);
                    alert('Data user berhasil ditambahkan!');
                }
                closeUser();
                filterRows();
            });
        }
    }

    // Close User Modal
    function closeUser() {
        user.style.display = 'none';
    }

    // Add Data (Open Add Modal)
    addBtn.addEventListener('click', () => {
        openUser(`
            <div class="custom-line"></div>
            <h3>Tambah Data User</h3>
            <form>
                <label>ID User</label>
                <input type="text" name="iduser" required><br>
                <label>Nama</label>
                <input type="text" name="namaus" required><br>
                <label>Username</label>
                <input type="text" name="username" required><br>
                <label>Email</label>
                <input type="text" name="email" required><br>
                <label>No. Handphone</label>
                <input type="number" name="hpu" required><br>
                <label>Password</label>
                <input type="text" name="pw" required><br>
                <button type="submit" class="btn">Insert</button>
                <button type="button" class="btn-cancel">Cancel</button>
            </form>
        `, 'user-tambah');
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        filterRows(e.target.value);
    });

    // Row filter functionality
    rowSelect.addEventListener('change', (e) => {
        rowsToDisplay = parseInt(e.target.value);
        filterRows(searchInput.value); // Reapply filter with the new row count
    });

    // Filter rows based on search input and rows per page
    function filterRows(searchTerm = '') {
        const rows = Array.from(userTableBody.rows);

        // Filter rows by search term
        const filteredRows = rows.filter((row) => {
            const rowData = row.querySelectorAll('td');
            const rowText = Array.from(rowData).map(cell => cell.textContent.toLowerCase()).join(' ');
            return rowText.includes(searchTerm.toLowerCase());
        });

        // Hide all rows initially
        rows.forEach(row => row.style.display = 'none');

        // Show filtered rows with pagination (based on rowsToDisplay)
        filteredRows.slice(0, rowsToDisplay).forEach(row => {
            row.style.display = '';
        });
    }

    // Edit Data (Open Edit Modal)
    userTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-edit')) {
            editingRow = e.target.closest('tr');
            const cells = editingRow.querySelectorAll('td');
            const iduser = cells[1].textContent;
            const namaus = cells[2].textContent;
            const username = cells[3].textContent;
            const email = cells[4].textContent;
            const hpu = cells[5].textContent;
            const pw = cells[6].textContent;

            openUser(`
                <div class="custom-line-2"></div>
                <h3>Edit Data User</h3>
                <form>
                    <label>ID User</label>
                    <input type="text" name="iduser" value="${iduser}" required><br>
                    <label>Nama</label>
                    <input type="text" name="namaus" value="${namaus}" required><br>
                    <label>Username</label>
                    <input type="text" name="username" value="${username}" required><br>
                    <label>Email</label>
                    <input type="text" name="email" value="${email}" required><br>
                    <label>No. Handphone</label>
                    <input type="number" name="hpu" value="${hpu}" required><br>
                    <label>Password</label>
                    <input type="text" name="pw" value="${pw}" required><br>
                    <button type="submit" class="btn">Update</button>
                    <button type="button" class="btn-cancel">Cancel</button>
                </form>
            `, 'user-edit');
        }

        // Delete Data (Open Delete Modal)
        if (e.target.classList.contains('btn-delete')) {
            editingRow = e.target.closest('tr');
            openUser(`
                <img src="assets/images/logo-peringatan.png" alt="hapus Icon">
                <h4>DELETE</h4>
                <p>Anda yakin ingin menghapus data user?</p>
                <button class="btn btn-delete-confirm">Delete</button>
                <button class="btn-cancel-d">Cancel</button>
            `, 'user-delete');
        }
    });

    // Initial filter
    filterRows();
});



document.addEventListener('DOMContentLoaded', () => {
    const customer = document.getElementById('customer');
    const customerBody = document.getElementById('customerBody');
    const closeBtn = document.querySelector('.close');
    const addBtn = document.getElementById('btnAdd');
    const tableBody = document.querySelector('tbody');
    const searchInput = document.getElementById('searchInput'); // Assuming you have an input with id 'searchInput'
    const rowSelect = document.getElementById('rowSelect'); // Assuming you have a select input with id 'rowSelect'

    let editingRow = null; // Track which row is being edited
    let rowsToDisplay = 5; // Default to 5 rows per page

    // Open Modal for Customer
    function openCustomer(content, customerType) {
        customerBody.innerHTML = content;

        // Reset modal classes
        customer.className = 'customer';
        customer.classList.add(customerType);

        customer.style.display = 'flex';

        // Attach event listeners for cancel, delete, and close buttons
        attachCustomerEventListeners();
    }

    // Attach event listeners to modal buttons
    function attachCustomerEventListeners() {
        // Close button (X)
        const closeBtn = document.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeCustomer);
        }

        // Cancel button
        const cancelBtns = document.querySelectorAll('.btn-cancel');
        cancelBtns.forEach(btn => {
            btn.addEventListener('click', closeCustomer);
        });

        // Cancel button delete
        const cancelButton = document.querySelectorAll('.btn-cancel-d');
        cancelButton.forEach(btn => {
            btn.addEventListener('click', closeCustomer);
        });

        // Delete button (Confirm deletion)
        const deleteConfirmBtn = document.querySelector('.btn-delete-confirm');
        if (deleteConfirmBtn) {
            deleteConfirmBtn.addEventListener('click', () => {
                // Remove customer row
                if (editingRow) {
                    editingRow.remove();
                    alert('Data Customer berhasil dihapus!');
                }
                closeCustomer();
                
            });
        }

        // Add or Update Data
        const addDataForm = document.querySelector('.customer form');
        if (addDataForm) {
            addDataForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(addDataForm);
                const idcustomer = formData.get('idcustomer');
                const namacustomer = formData.get('namacustomer');
                const emailcustomer = formData.get('emailcustomer');
                const alamatcustomer = formData.get('alamatcustomer');
                const hpcustomer = formData.get('hpcustomer');

                // If we're editing a row, update it
                if (editingRow) {
                    const cells = editingRow.querySelectorAll('td');
                    cells[1].textContent = idcustomer;
                    cells[2].textContent = namacustomer;
                    cells[3].textContent = emailcustomer;
                    cells[4].textContent = alamatcustomer;
                    cells[5].textContent = hpcustomer;
                    editingRow = null;
                    alert('Data Customer berhasil diperbarui!');
                } else {
                    // Add new row
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${tableBody.children.length + 1}</td>
                        <td>${idcustomer}</td>
                        <td>${namacustomer}</td>
                        <td>${emailcustomer}</td>
                        <td>${alamatcustomer}</td>
                        <td>${hpcustomer}</td>
                        <td>
                            <img src="assets/images/logo-edit.jpg" alt="Edit" class="btn-edit">
                            <img src="assets/images/logo-hapus.jpg" alt="Delete" class="btn-delete">
                        </td>
                    `;
                    tableBody.appendChild(newRow);
                    alert('Data Customer berhasil ditambahkan!');
                }
                closeCustomer();
                filterRows();
            });
        }
    }

    // Close modal
    function closeCustomer() {
        customer.style.display = 'none';
    }

    // Add Data Customer
    addBtn.addEventListener('click', () => {
        openCustomer(`
            <div class="custom-line"></div>
            <h3>Tambah Data Customer</h3>
            <form>
                <label>ID Customer</label>
                <input type="text" name="idcustomer" required><br>
                <label>Nama</label>
                <input type="text" name="namacustomer" required><br>
                <label>Email</label>
                <input type="text" name="emailcustomer" required><br>
                <label>Alamat</label>
                <input type="text" name="alamatcustomer" required><br>
                <label>No. Handphone</label>
                <input type="number" name="hpcustomer" required><br>
                <button type="submit" class="btn">Insert</button>
                <button type="button" class="btn-cancel">Cancel</button>
            </form>
        `, 'customer-tambah');
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        filterRows(e.target.value);
    });

    // Row filter functionality
    rowSelect.addEventListener('change', (e) => {
        rowsToDisplay = parseInt(e.target.value);
        filterRows(searchInput.value); // Reapply filter with the new row count
    });

    // Filter rows based on search input and rows per page
    function filterRows(searchTerm = '') {
        const rows = Array.from(tableBody.rows);

        // Filter rows by search term
        const filteredRows = rows.filter((row) => {
            const rowData = row.querySelectorAll('td');
            const rowText = Array.from(rowData).map(cell => cell.textContent.toLowerCase()).join(' ');
            return rowText.includes(searchTerm.toLowerCase());
        });

        // Hide all rows initially
        rows.forEach(row => row.style.display = 'none');

        // Show filtered rows with pagination (based on rowsToDisplay)
        filteredRows.slice(0, rowsToDisplay).forEach(row => {
            row.style.display = '';
        });
    }

    // Edit Data Customer
    tableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-edit')) {
            editingRow = e.target.closest('tr');
            const cells = editingRow.querySelectorAll('td');
            const idcustomer = cells[1].textContent;
            const namacustomer = cells[2].textContent;
            const emailcustomer = cells[3].textContent;
            const alamatcustomer = cells[4].textContent;
            const hpcustomer = cells[5].textContent;

            openCustomer(`
                <div class="custom-line-2"></div>
                <h3>Edit Data Customer</h3>
                <form>
                    <label>ID Customer</label>
                    <input type="text" name="idcustomer" value="${idcustomer}" required><br>
                    <label>Nama</label>
                    <input type="text" name="namacustomer" value="${namacustomer}" required><br>
                    <label>Email</label>
                    <input type="text" name="emailcustomer" value="${emailcustomer}" required><br>
                    <label>Alamat</label>
                    <input type="text" name="alamatcustomer" value="${alamatcustomer}" required><br>
                    <label>No. Handphone</label>
                    <input type="number" name="hpcustomer" value="${hpcustomer}" required><br>
                    <button type="submit" class="btn">Update</button>
                    <button type="button" class="btn-cancel">Cancel</button>
                </form>
            `, 'customer-edit');
        }

        // Delete Data Customer
        if (e.target.classList.contains('btn-delete')) {
            editingRow = e.target.closest('tr');
            openCustomer(`
                <img src="assets/images/logo-peringatan.png" alt="hapus Icon">
                <h4>DELETE</h4>
                <p>Anda yakin ingin menghapus data user?</p>
                <button class="btn btn-delete-confirm">Delete</button>
                <button class="btn-cancel-d">Cancel</button>
            `, 'customer-delete');
        }
    });

    // Initial filter
    filterRows();
});


//transaksi penjualan

document.addEventListener('DOMContentLoaded', () => {
    const transaksi = document.getElementById('transaksi');
    const transaksiBody = document.getElementById('transaksiBody');
    const closeBtn = document.querySelector('.close');
    const addBtn = document.getElementById('btnAdd');
    const transaksitableBody = document.querySelector('tbody');
    const searchInput = document.getElementById('searchInput');
    const rowSelect = document.getElementById('rowSelect');

    let editingRow = null;
    let rowsToDisplay = 5;

    // Open Modal for Transaksi
    function openTransaksi(content, transaksiType) {
        transaksiBody.innerHTML = content;

        // Reset modal classes
        transaksi.className = 'transaksi';
        transaksi.classList.add(transaksiType);

        transaksi.style.display = 'flex';

        attachTransaksiEventListeners();
    }

    // Attach event listeners to modal buttons
    function attachTransaksiEventListeners() {
        const closeBtn = document.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeTransaksi);
        }

        const cancelBtns = document.querySelectorAll('.btn-cancel');
        cancelBtns.forEach(btn => {
            btn.addEventListener('click', closeTransaksi);
        });
    }

    // Add or Update Data
    function handleDataSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const idpenjualan = formData.get('idpenjualan');
        const namabarang = formData.get('namabarang');
        const kodebarang = formData.get('kodebarang');
        const idcustomer = formData.get('idcustomer');
        const jumlah = formData.get('jumlah');
        const totalharga = formData.get('totalharga');
        const tanggaljual = formData.get('tanggaljual');

        const dataOutput = {
            idpenjualan,
            namabarang,
            kodebarang,
            idcustomer,
            jumlah,
            totalharga,
            tanggaljual
        };

        if (editingRow) {
            const cells = editingRow.querySelectorAll('td');
            const updatedFields = [];
            if (cells[1].textContent !== idpenjualan) updatedFields.push('ID Penjualan');
            if (cells[2].textContent !== namabarang) updatedFields.push('Nama Barang');
            if (cells[3].textContent !== kodebarang) updatedFields.push('Kode Barang');
            if (cells[4].textContent !== idcustomer) updatedFields.push('ID Customer');
            if (cells[5].textContent !== jumlah) updatedFields.push('Jumlah');
            if (cells[6].textContent !== totalharga) updatedFields.push('Total Harga');
            if (cells[7].textContent !== tanggaljual) updatedFields.push('Tanggal Jual');

            cells[1].textContent = idpenjualan;
            cells[2].textContent = namabarang;
            cells[3].textContent = kodebarang;
            cells[4].textContent = idcustomer;
            cells[5].textContent = jumlah;
            cells[6].textContent = totalharga;
            cells[7].textContent = tanggaljual;

            console.log('Data Transaksi Penjualan diperbarui:', dataOutput);
            if (updatedFields.length > 0) {
                alert(`Data diperbarui pada kolom: ${updatedFields.join(', ')}`);
            } else {
                alert('Tidak ada perubahan pada data.');
            }

            editingRow = null;
        } else {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${transaksitableBody.children.length + 1}</td>
                <td>${idpenjualan}</td>
                <td>${namabarang}</td>
                <td>${kodebarang}</td>
                <td>${idcustomer}</td>
                <td>${jumlah}</td>
                <td>${totalharga}</td>
                <td>${tanggaljual}</td>
                <td>
                    <img src="assets/images/logo-edit.jpg" alt="Edit" class="btn-edit">
                </td>
            `;
            transaksitableBody.appendChild(newRow);

            console.log('Data Transaksi Penjualan ditambahkan:', dataOutput);
            alert('Data Transaksi Penjualan berhasil ditambahkan!');
        }

        closeTransaksi();
        filterRows();
    }

    // Close modal
    function closeTransaksi() {
        transaksi.style.display = 'none';
    }

    // Tambah Transaksi Penjualan
    addBtn.addEventListener('click', () => {
        openTransaksi(`
            <div class="custom-line"></div>
            <h3>Tambah Transaksi Penjualan</h3>
            <form>
                <label>ID Penjualan</label>
                <input type="text" name="idpenjualan" required><br>
                <label>Nama Barang</label>
                <input type="text" name="namabarang" required><br>
                <label>Kode Barang</label>
                <input type="text" name="kodebarang" required><br>
                <label>ID Customer</label>
                <input type="text" name="idcustomer" required><br>
                <label>Jumlah</label>
                <input type="number" name="jumlah" required><br>
                <label>Total Harga</label>
                <input type="number" name="totalharga" required><br>
                <label>Tanggal Jual</label>
                <input type="date" name="tanggaljual" required><br>
                <button type="submit" class="btn">Insert</button>
                <button type="button" class="btn-cancel">Cancel</button>
            </form>
        `, 'transaksi-penjualan-tambah');

        const form = document.querySelector('.transaksi form');
        form.addEventListener('submit', handleDataSubmit);
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        filterRows(e.target.value);
    });

    // Row filter functionality
    rowSelect.addEventListener('change', (e) => {
        rowsToDisplay = parseInt(e.target.value);
        filterRows(searchInput.value); 
    });

    // Filter rows based on search input and rows per page
    function filterRows(searchTerm = '') {
        const rows = Array.from(transaksitableBody.rows);

        const filteredRows = rows.filter((row) => {
            const rowData = row.querySelectorAll('td');
            const rowText = Array.from(rowData).map(cell => cell.textContent.toLowerCase()).join(' ');
            return rowText.includes(searchTerm.toLowerCase());
        });

        rows.forEach(row => row.style.display = 'none');
        filteredRows.slice(0, rowsToDisplay).forEach(row => {
            row.style.display = '';
        });
    }

    // Edit Data penjualan
    transaksitableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-edit')) {
            editingRow = e.target.closest('tr');
            const cells = editingRow.querySelectorAll('td');
            const idpenjualan = cells[1].textContent;
            const namabarang = cells[2].textContent;
            const kodebarang = cells[3].textContent;
            const idcustomer = cells[4].textContent;
            const jumlah = cells[5].textContent;
            const totalharga = cells[6].textContent;
            const tanggaljual = cells[7].textContent;

            openTransaksi(`
                <div class="custom-line-2"></div>
                <h3>Edit Transaksi Penjualan</h3>
                <form>
                    <label>ID Penjualan</label>
                    <input type="text" name="idpenjualan" value="${idpenjualan}" required><br>
                    <label>Nama Barang</label>
                    <input type="text" name="namabarang" value="${namabarang}" required><br>
                    <label>Kode Barang</label>
                    <input type="text" name="kodebarang" value="${kodebarang}" required><br>
                    <label>ID Customer</label>
                    <input type="text" name="idcustomer" value="${idcustomer}" required><br>
                    <label>Jumlah</label>
                    <input type="number" name="jumlah" value="${jumlah}" required><br>
                    <label>Total Harga</label>
                    <input type="number" name="totalharga" value="${totalharga}" required><br>
                    <label>Tanggal Jual</label>
                    <input type="date" name="tanggaljual" value="${tanggaljual}" required><br>
                    <button type="submit" class="btn">Update</button>
                    <button type="button" class="btn-cancel">Cancel</button>
                </form>
            `, 'transaksi-penjualan-edit');

            const form = document.querySelector('.transaksi form');
            form.addEventListener('submit', handleDataSubmit);
        }
    });

    // Initial filter
    filterRows();
});


//transaksi pembelian

document.addEventListener('DOMContentLoaded', () => {
    const transaksi = document.getElementById('transaksi');
    const transaksiBody = document.getElementById('transaksiBody');
    const closeBtn = document.querySelector('.close');
    const addBtnPembelian = document.getElementById('addBtn');
    const pembeliantableBody = document.getElementById('pembeliantableBody');
    const searchInput = document.getElementById('searchInput');
    const rowSelect = document.getElementById('rowSelect');

    let editingRow = null;
    let rowsToDisplay = 5;

    // Open Modal for Transaksi
    function openTransaksi(content, transaksiType) {
        transaksiBody.innerHTML = content;

        // Reset modal classes
        transaksi.className = 'transaksi';
        transaksi.classList.add(transaksiType);

        transaksi.style.display = 'flex';

        attachTransaksiEventListeners();

        // Attach submit event listener after form is available
        const addDataForm = document.querySelector('.transaksi form');
        if (addDataForm) {
            addDataForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(addDataForm);
                handleFormSubmit(formData);
            });
        }
    }

    // Attach event listeners to modal buttons
    function attachTransaksiEventListeners() {
        const closeBtn = document.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeTransaksi);
        }

        const cancelBtns = document.querySelectorAll('.btn-cancel');
        cancelBtns.forEach(btn => {
            btn.addEventListener('click', closeTransaksi);
        });
    }

    // Add or Update Data
    function handleFormSubmit(formData) {
        const idpembelian = formData.get('idpembelian');
        const namabarangb = formData.get('namabarangb');
        const kodebarangb = formData.get('kodebarangb');
        const jumlahb = formData.get('jumlahb');
        const hargasatuan = formData.get('hargasatuan');
        const totalhargab = formData.get('totalhargab');
        const tanggalbeli = formData.get('tanggalbeli');

        if (editingRow) {
            const cells = editingRow.querySelectorAll('.table-cell');
            cells[1].textContent = idpembelian;
            cells[2].textContent = namabarangb;
            cells[3].textContent = kodebarangb;
            cells[4].textContent = jumlahb;
            cells[5].textContent = hargasatuan;
            cells[6].textContent = totalhargab;
            cells[7].textContent = tanggalbeli;
            console.log('Data yang diperbarui:', {
                idpembelian, namabarangb, kodebarangb, jumlahb, hargasatuan, totalhargab, tanggalbeli
            });
            editingRow = null;
            alert('Data Transaksi Pembelian berhasil diperbarui!');
        } else {
            const newRow = document.createElement('div');
            newRow.classList.add('table-row');
            newRow.innerHTML = `
                <div class="table-cell">${pembeliantableBody.children.length + 1}</div>
                <div class="table-cell">${idpembelian}</div>
                <div class="table-cell">${namabarangb}</div>
                <div class="table-cell">${kodebarangb}</div>
                <div class="table-cell">${jumlahb}</div>
                <div class="table-cell">${hargasatuan}</div>
                <div class="table-cell">${totalhargab}</div>
                <div class="table-cell">${tanggalbeli}</div>
                <div class="table-cell">
                    <img src="assets/images/logo-edit.jpg" alt="Edit" class="btn-edit">
                </div>
            `;
            pembeliantableBody.appendChild(newRow);
            console.log('Data yang ditambahkan:', {
                idpembelian, namabarangb, kodebarangb, jumlahb, hargasatuan, totalhargab, tanggalbeli
            });
            alert('Data Transaksi Pembelian berhasil ditambahkan!');
        }
        closeTransaksi();
        filterRows();
    }

    // Close modal
    function closeTransaksi() {
        transaksi.style.display = 'none';
    }

    // Tambah Transaksi Pembelian
    addBtnPembelian.addEventListener('click', () => {
        openTransaksi(`
            <div class="custom-line"></div>
            <h3>Tambah Transaksi Pembelian</h3>
            <form>
                <label>ID Pembelian</label>
                <input type="text" name="idpembelian" required><br>
                <label>Nama Barang</label>
                <input type="text" name="namabarangb" required><br>
                <label>Kode Barang</label>
                <input type="text" name="kodebarangb" required><br>
                <label>Jumlah</label>
                <input type="number" name="jumlahb" required><br>
                <label>Harga Satuan</label>
                <input type="number" name="hargasatuan" required><br>
                <label>Total Harga</label>
                <input type="number" name="totalhargab" required><br>
                <label>Tanggal Beli</label>
                <input type="date" name="tanggalbeli" required><br>
                <button type="submit" class="btn">Insert</button>
                <button type="button" class="btn-cancel">Cancel</button>
            </form>
        `, 'transaksi-pembelian-tambah');
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        filterRows(e.target.value);
    });

    // Row filter functionality
    rowSelect.addEventListener('change', (e) => {
        rowsToDisplay = parseInt(e.target.value);
        filterRows(searchInput.value); 
    });

    // Filter rows based on search input and rows per page
    function filterRows(searchTerm = '') {
        const rows = Array.from(pembeliantableBody.querySelectorAll('.table-row'));

        const filteredRows = rows.filter((row) => {
            const rowText = Array.from(row.querySelectorAll('.table-cell')).map(cell => cell.textContent.toLowerCase()).join(' ');
            return rowText.includes(searchTerm.toLowerCase());
        });

        rows.forEach(row => row.style.display = 'none');
        filteredRows.slice(0, rowsToDisplay).forEach(row => {
            row.style.display = '';
        });
    }

    // Edit Data pembelian
    pembeliantableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            editingRow = e.target.closest('.table-row');
            const cells = editingRow.querySelectorAll('.table-cell');
            const idpembelian = cells[1].textContent;
            const namabarangb = cells[2].textContent;
            const kodebarangb = cells[3].textContent;
            const jumlahb = cells[4].textContent;
            const hargasatuan = cells[5].textContent;
            const totalhargab = cells[6].textContent;
            const tanggalbeli = cells[7].textContent;

            openTransaksi(`
                <div class="custom-line-2"></div>
                <h3>Edit Transaksi Pembelian</h3>
                <form>
                    <label>ID Pembelian</label>
                    <input type="text" name="idpembelian" value="${idpembelian}" required><br>
                    <label>Nama Barang</label>
                    <input type="text" name="namabarangb" value="${namabarangb}" required><br>
                    <label>Kode Barang</label>
                    <input type="text" name="kodebarangb" value="${kodebarangb}" required><br>
                    <label>Jumlah</label>
                    <input type="number" name="jumlahb" value="${jumlahb}" required><br>
                    <label>Harga Satuan</label>
                    <input type="number" name="hargasatuan" value="${hargasatuan}" required><br>
                    <label>Total Harga</label>
                    <input type="number" name="totalhargab" value="${totalhargab}" required><br>
                    <label>Tanggal Beli</label>
                    <input type="date" name="tanggalbeli" value="${tanggalbeli}" required><br>
                    <button type="submit" class="btn">Update</button>
                    <button type="button" class="btn-cancel">Cancel</button>
                </form>
            `, 'transaksi-pembelian-edit');
        }
    });

    // Initial filter
    filterRows();
});

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('tbody');
    const searchInput = document.getElementById('searchInput'); // Assuming you have an input with id 'searchInput'
    const rowSelect = document.getElementById('rowSelect'); // Assuming you have a select input with id 'rowSelect'

    let rowsToDisplay = 5; // Default to 5 rows per page

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        filterRows(e.target.value);
    });

    // Row filter functionality
    rowSelect.addEventListener('change', (e) => {
        rowsToDisplay = parseInt(e.target.value);
        filterRows(searchInput.value); // Reapply filter with the new row count
    });

    // Filter rows based on search input and rows per page
    function filterRows(searchTerm = '') {
        const rows = Array.from(tableBody.rows);

        // Filter rows by search term
        const filteredRows = rows.filter((row) => {
            const rowData = row.querySelectorAll('td');
            const rowText = Array.from(rowData).map(cell => cell.textContent.toLowerCase()).join(' ');
            return rowText.includes(searchTerm.toLowerCase());
        });

        // Hide all rows initially
        rows.forEach(row => row.style.display = 'none');

        // Show filtered rows with pagination (based on rowsToDisplay)
        filteredRows.slice(0, rowsToDisplay).forEach(row => {
            row.style.display = '';
        });
    }
});
