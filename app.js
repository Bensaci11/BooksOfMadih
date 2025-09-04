const homeView = document.getElementById('home-view');
const pdfView = document.getElementById('pdf-view');
const pdfFrame = document.getElementById('pdf-frame');
const bookTitle = document.getElementById('book-title');
const downloadLink = document.getElementById('download-link');
const backBtn = document.getElementById('back-btn');

// عناوين الكتب
const bookTitles = {
  'b1.pdf': 'البردة',
  'b2.pdf': 'ديوان الوسائل المتقبلة',
  'b3.pdf': 'الهمزية',
  'b4.pdf': 'مجموع القصائد والأدعية',
  'b5.pdf': 'البرزنجي'
};

// فتح الكتاب
document.querySelectorAll('[data-pdf]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const pdf = this.getAttribute('data-pdf');
    const title = bookTitles[pdf];

    bookTitle.textContent = title;
    pdfFrame.src = `pdf/${pdf}`;
    downloadLink.href = `pdf/${pdf}`;

    homeView.style.display = 'none';
    pdfView.style.display = 'block';

    // حفظ آخر قراءة
    localStorage.setItem('lastBook', pdf);
  });
});

// الرجوع
backBtn.addEventListener('click', () => {
  pdfView.style.display = 'none';
  homeView.style.display = 'block';
  pdfFrame.src = '';
});

// تحميل آخر كتاب تم قراءته عند الدخول
window.addEventListener('load', () => {
  const lastBook = localStorage.getItem('lastBook');
  if (lastBook && bookTitles[lastBook]) {
    const link = document.querySelector(`[data-pdf="${lastBook}"]`);
    if (link) {
      link.click();
    }
  }
});

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