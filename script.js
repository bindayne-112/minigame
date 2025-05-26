const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz62KgLE0izkLmiBf130QZzCOPDonKbJYznUh3qsmdFmW-TkFqAyVIloLyliQjI3DWISQ/exec";

function startSpin() {
  const phone = document.getElementById("phoneInput").value.trim();
  const resultDiv = document.getElementById("result");
  const wheel = document.getElementById("wheel");

  if (!/^0\d{9}$/.test(phone)) {
    alert("Số điện thoại không hợp lệ. Nhập đúng 10 số.");
    return;
  }

  resultDiv.textContent = "";
  wheel.style.display = "block";
  wheel.style.animation = "spin 1s ease-in-out";

  setTimeout(() => {
    fetch(`${SCRIPT_URL}?sdt=${phone}`)
      .then(res => res.text())
      .then(text => {
        resultDiv.textContent = (text === "Trúng") 
          ? "🎉 Chúc mừng! Bạn đã TRÚNG THƯỞNG!" 
          : (text === "Bạn đã quay hôm nay")
            ? "⏱ Bạn đã quay hôm nay. Hãy thử lại vào ngày mai!"
            : "❌ Rất tiếc! Bạn chưa trúng lần này.";
        wheel.style.display = "none";
      })
      .catch(err => {
        resultDiv.textContent = "⚠️ Có lỗi xảy ra. Vui lòng thử lại sau.";
        wheel.style.display = "none";
      });
  }, 1000);
}
