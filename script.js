const form = document.querySelector("form");
const output = document.getElementById("output");

// Variabel untuk menghitung jumlah data yang masuk (opsional, agar rapi)
let dataCounter = 1;

form.addEventListener("submit", function(event) {
    event.preventDefault();

    // 1. Mengambil data menggunakan FormData (Disamakan dengan atribut 'name' di HTML kamu)
    const formData = new FormData(form);
    
    const nama = formData.get("nama");
    const alamat = formData.get("alamat");
    const tempatLahir = formData.get("tempatLahir"); // disesuaikan dari 'tempat_lahir'
    const tanggalMentah = formData.get("tanggalLahir"); // disesuaikan dari 'tanggal'
    const hp = formData.get("nomorHp"); // disesuaikan dari 'hp'
    const email = formData.get("email");
    const agama = formData.get("agama");
    const password = formData.get("password");

    // 2. Mengambil nilai Radio Button (Jenis Kelamin) dengan aman
    let jk = "-";
    const radioTerpilih = document.querySelector('input[name="jk"]:checked');
    if (radioTerpilih) {
        jk = radioTerpilih.value; // Mengambil langsung value dari element HTML
    }

    // 3. Mengambil nilai Checkbox (Hobi)
    let hobi = [];
    const checkboxes = document.querySelectorAll('input[name="hobi"]:checked');
    checkboxes.forEach(function(item) {
        hobi.push(item.value);
    });

    // 4. Format Tanggal ke Gaya Indonesia (Contoh: 19 Mei 2026)
    let tanggalFormat = "-";
    if (tanggalMentah) {
        const opsiTanggal = { year: 'numeric', month: 'long', day: 'numeric' };
        tanggalFormat = new Date(tanggalMentah).toLocaleDateString('id-ID', opsiTanggal);
    }

    // 5. Membuat Password Tersamarkan (Masking)
    // Mengubah password asli menjadi karakter '•' sepanjang password tersebut
    let passwordTersembunyi = "-";
    if (password) {
        passwordTersembunyi = "•".repeat(password.length);
    }

    // 6. Hapus placeholder text ("Belum ada data yang dikirim") jika ini data pertama
    const placeholder = output.querySelector(".placeholder-text");
    if (placeholder) {
        output.innerHTML = ""; // Bersihkan tulisan placeholder saja di awal
    }

    // 7. Menyusun Output HTML Baru
    // Menggunakan template literal yang akan di-APPEND (ditambahkan), bukan di-replace
    const htmlBaru = `
        <div class="card-hasil" style="animation: fadeIn 0.6s ease-out; background: #ffffff; padding: 20px; border-radius: 16px; margin-bottom: 20px; border: 1px solid rgba(0,0,0,0.08); box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
            <h3 style="display: flex; align-items: center; gap: 8px; margin-bottom: 15px; color: #1e293b; font-size: 18px;">
                <span>📋</span> Data Ke-${dataCounter}
            </h3>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 15px;">
                <p><b style="color: #6366f1;">Nama Lengkap :</b> ${nama || '-'}</p>
                <p><b style="color: #6366f1;">Alamat :</b> ${alamat || '-'}</p>
                <p><b style="color: #6366f1;">Tempat Lahir :</b> ${tempatLahir || '-'}</p>
                <p><b style="color: #6366f1;">Tanggal Lahir :</b> ${tanggalFormat}</p>
                <p><b style="color: #6366f1;">Nomor HP :</b> ${hp || '-'}</p>
                <p><b style="color: #6366f1;">Email :</b> ${email || '-'}</p>
                <p><b style="color: #6366f1;">Password :</b> <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">${passwordTersembunyi}</code></p>
                <p><b style="color: #6366f1;">Jenis Kelamin :</b> ${jk || '-'}</p>
                <p><b style="color: #6366f1;">Agama :</b> ${agama || '-'}</p>
                <p><b style="color: #6366f1;">Hobi :</b> ${hobi.length > 0 ? hobi.join(", ") : '-'}</p>
            </div>
        </div>
    `;

    // Masukkan data baru ke dalam element output di bagian paling bawah
    output.insertAdjacentHTML("beforeend", htmlBaru);
    
    // Naikkan counter untuk data berikutnya
    dataCounter++;

    // 8. Tampilkan Alert
    alert("🎉 Data Anda berhasil ditambahkan ke daftar!");

    // 9. Otomatis Scroll ke Section Hasil Data
    const hasilDataSection = document.getElementById("hasilData");
    if (hasilDataSection) {
        hasilDataSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    // 10. Reset Form setelah sukses agar bisa diisi kembali
    form.reset();
});
