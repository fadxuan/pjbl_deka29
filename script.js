const form = document.querySelector("form");
const output = document.getElementById("output");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    // 1. Mengambil data menggunakan FormData (Lebih modern, aman, dan ringkas)
    const formData = new FormData(form);
    
    // Pastikan elemen HTML input memiliki atribut name yang sesuai (misal: name="nama")
    const nama = formData.get("nama") || document.querySelectorAll('input[type="text"]')[0]?.value;
    const alamat = formData.get("alamat") || document.querySelector("textarea")?.value;
    const tempatLahir = formData.get("tempat_lahir") || document.querySelectorAll('input[type="text"]')[1]?.value;
    const tanggalMentah = formData.get("tanggal") || document.querySelector('input[type="date"]')?.value;
    const hp = formData.get("hp") || document.querySelector('input[type="tel"]')?.value;
    const email = formData.get("email") || document.querySelector('input[type="email"]')?.value;
    const agama = formData.get("agama") || document.querySelector("select")?.value;

    // 2. Mengambil nilai Radio Button (Jenis Kelamin) dengan cara yang lebih bersih
    let jk = "";
    const radioTerpilih = document.querySelector('input[name="jk"]:checked');
    if (radioTerpilih) {
        // Mengambil teks dari label pendampingnya
        jk = radioTerpilih.parentElement.textContent.trim();
    }

    // 3. Mengambil nilai Checkbox (Hobi)
    let hobi = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(function(item) {
        hobi.push(item.parentElement.textContent.trim());
    });

    // 4. Format Tanggal ke Gaya Indonesia (Contoh: 19 Mei 2026)
    let tanggalFormat = "-";
    if (tanggalMentah) {
        const opsiTanggal = { year: 'numeric', month: 'long', day: 'numeric' };
        tanggalFormat = new Date(tanggalMentah).toLocaleDateString('id-ID', opsiTanggal);
    }

    // 5. Tampilkan Alert yang lebih elegan (Bisa diganti SweetAlert jika mau)
    alert("🎉 Data Anda berhasil diproses dan disimpan!");

    // 6. Menyusun Output HTML dengan Desain Kelas Premium & Efek Animasi Fade-In
    output.innerHTML = `
        <div class="card-hasil" style="animation: fadeIn 0.6s ease-out;">
            <h3 style="display: flex; align-items: center; gap: 8px; margin-bottom: 20px;">
                <span>✨</span> Data Berhasil Dikirim
            </h3>
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <p><b>Nama Lengkap :</b> ${nama || '-'}</p>
                <p><b>Alamat :</b> ${alamat || '-'}</p>
                <p><b>Tempat Lahir :</b> ${tempatLahir || '-'}</p>
                <p><b>Tanggal Lahir :</b> ${tanggalFormat}</p>
                <p><b>Nomor HP :</b> ${hp || '-'}</p>
                <p><b>Email :</b> ${email || '-'}</p>
                <p><b>Jenis Kelamin :</b> ${jk || '-'}</p>
                <p><b>Agama :</b> ${agama || '-'}</p>
                <p><b>Hobi :</b> ${hobi.length > 0 ? hobi.join(", ") : '-'}</p>
            </div>
        </div>
    `;

    // 7. Otomatis Scroll ke Section Hasil Data
    const hasilDataSection = document.getElementById("hasilData");
    if (hasilDataSection) {
        hasilDataSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    // 8. Reset Form setelah sukses
    form.reset();
});

