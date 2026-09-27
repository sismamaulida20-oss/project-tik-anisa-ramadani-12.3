// ==============================
// NAVIGASI HALAMAN
// ==============================

function bukaHalaman(namaHalaman) {

    // Sembunyikan semua halaman
    const halaman = document.querySelectorAll(".page");

    halaman.forEach(function(page) {
        page.classList.remove("active");
    });

    // Tampilkan halaman yang dipilih
    document.getElementById(namaHalaman).classList.add("active");

    // Ubah tombol navigasi yang aktif
    const tombol = document.querySelectorAll(".nav-btn");

    tombol.forEach(function(btn) {
        btn.classList.remove("active");
    });

    // Tombol sesuai halaman
    const tombolAktif = document.querySelector(
        `.nav-btn[onclick="bukaHalaman('${namaHalaman}')"]`
    );

    if (tombolAktif) {
        tombolAktif.classList.add("active");
    }

    // Kembali ke atas
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==============================
// DATA LAPORAN
// ==============================

let laporan = JSON.parse(localStorage.getItem("laporanSekolah")) || [];


// ==============================
// FORM LAPORAN
// ==============================

document.getElementById("formLaporan").addEventListener("submit", function(event) {

    event.preventDefault();

    const namaFasilitas =
        document.getElementById("namaFasilitas").value;

    const lokasi =
        document.getElementById("lokasi").value;

    const jenisKerusakan =
        document.getElementById("jenisKerusakan").value;

    const keterangan =
        document.getElementById("keterangan").value;

    const tanggal = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const dataBaru = {
        fasilitas: namaFasilitas,
        lokasi: lokasi,
        jenis: jenisKerusakan,
        keterangan: keterangan,
        tanggal: tanggal
    };

    laporan.push(dataBaru);

    // Simpan ke browser
    localStorage.setItem(
        "laporanSekolah",
        JSON.stringify(laporan)
    );

    // Kosongkan form
    document.getElementById("formLaporan").reset();

    // Perbarui tampilan
    tampilkanRiwayat();

    // Beri notifikasi
    alert("✅ Laporan berhasil dikirim!");

    // Pindah ke riwayat
    bukaHalaman("riwayat");
});


// ==============================
// MENAMPILKAN RIWAYAT
// ==============================

function tampilkanRiwayat() {

    const container =
        document.getElementById("daftarRiwayat");

    const jumlah =
        document.getElementById("jumlahLaporan");

    jumlah.textContent = laporan.length + " laporan";

    if (laporan.length === 0) {

        container.innerHTML = `
            <div class="empty">
                <span>📭</span>
                <p>Belum ada laporan.</p>
            </div>
        `;

        return;
    }

    container.innerHTML = "";

    // Laporan terbaru ditampilkan lebih dulu
    const dataTerbaru = [...laporan].reverse();

    dataTerbaru.forEach(function(item) {

        const div = document.createElement("div");

        div.className = "report";

        div.innerHTML = `
            <h3>🛠️ ${item.fasilitas}</h3>

            <p>
                <strong>📍 Lokasi:</strong>
                ${item.lokasi}
            </p>

            <p>
                <strong>⚠️ Kerusakan:</strong>
                ${item.jenis}
            </p>

            <p>
                <strong>📝 Keterangan:</strong>
                ${item.keterangan}
            </p>

            <p>
                <strong>📅 Tanggal:</strong>
                ${item.tanggal}
            </p>

            <span class="status">
                Menunggu perawatan
            </span>
        `;

        container.appendChild(div);
    });
}


// ==============================
// SAAT APLIKASI DIBUKA
// ==============================

tampilkanRiwayat();