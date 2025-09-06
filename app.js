// عناوين الكتب
const bookTitles = {
  'b1.pdf': 'البردة ',
  'b2.pdf': 'ديوان الوسائل المتقبلة',
  'b3.pdf': 'الهمزية',
  'b4.pdf': 'مجموع القصائد والأدعية',
  'b5.pdf': 'البرزنجي'
};

// عرض الكتب
const homeView = document.getElementById('home-view');
const pdfView = document.getElementById('pdf-view');
const pdfFrame = document.getElementById('pdf-frame');
const bookTitle = document.getElementById('book-title');
const downloadLink = document.getElementById('download-link');
const backBtn = document.getElementById('back-btn');

// فتح الكتاب مباشرة عند الضغط
document.querySelectorAll('[data-pdf]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const pdf = this.getAttribute('data-pdf');
    const title = bookTitles[pdf];

    bookTitle.textContent = title;
    pdfFrame.src = `pdf/${pdf}`;
    downloadLink.href = `pdf/${pdf}`;

    // حفظ آخر كتاب
    localStorage.setItem('lastBook', pdf);

    // التبديل للعرض
    homeView.style.display = 'none';
    pdfView.style.display = 'block';
  });
});

// الرجوع إلى القائمة
backBtn.addEventListener('click', () => {
  pdfView.style.display = 'none';
  homeView.style.display = 'block';
  pdfFrame.src = ''; // إفراغ الإطار
});

// ✅ لا تظهر نافذة confirm — البدء دائمًا من القائمة

// تسجيل Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/BooksOfMadih/service-worker.js', {
      scope: '/BooksOfMadih/'
    }).then(reg => {
      console.log('✅ SW مسجل:', reg.scope);
    }).catch(err => {
      console.log('❌ خطأ:', err);
    });
  });
}