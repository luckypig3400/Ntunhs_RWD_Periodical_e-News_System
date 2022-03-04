/**
* Template Name: Moderna - v4.8.0
* Template URL: https://bootstrapmade.com/free-bootstrap-template-corporate-moderna/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

let articleDiv = document.getElementById('articleInfoDiv');
let articleTitle = document.getElementById('articleInfoTitle');

if (articleDiv != null) {
  articleTitle.innerHTML = articleDiv.innerHTML;
  articleTitle.removeAttribute('hidden');
}

let currentFontLevel = 0;
function increaseAllfontSize() {
  if (currentFontLevel < 6) {
    let allelements = document.getElementsByTagName('*');

    for (var i = 0; i < allelements.length; i++) {
      // https://stackoverflow.com/questions/15195209/how-to-get-font-size-in-html
      var style = window.getComputedStyle(allelements[i], null).getPropertyValue('font-size');
      var fontSize = parseFloat(style);
      allelements[i].style.fontSize = (fontSize + 1) + 'px';
    }
    currentFontLevel++;
  }
}

function decreaseAllfontSize() {
  if (currentFontLevel > -6) {
    let allelements = document.getElementsByTagName('*');

    for (var i = 0; i < allelements.length; i++) {
      // https://stackoverflow.com/questions/15195209/how-to-get-font-size-in-html
      var style = window.getComputedStyle(allelements[i], null).getPropertyValue('font-size');
      var fontSize = parseFloat(style);
      allelements[i].style.fontSize = (fontSize - 1) + 'px';
    }
  }
  currentFontLevel--;
}

function resetAllfontSize() {
  let allelements = document.getElementsByTagName('*');
  for (var i = 0; i < allelements.length; i++) {
    allelements[i].style.fontSize = '';
  }
  currentFontLevel = 0;
}


function changeHeaderLinksActive() {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var peroid = url.searchParams.get("period");
  var category = url.searchParams.get("category");
  // https://stackoverflow.com/questions/979975/get-the-values-from-the-get-parameters-javascript

  if (url_string.search("index.php") != -1) {
    // https://www.w3schools.com/jsref/jsref_search.asp
    console.log("We are in the index page");
  } else {
    indexLink = document.getElementById('indexLink');
    indexLink.classList.remove('active');

    currentLink = document.getElementById(category + 'Link');
    if (currentLink != null) {
      currentLink.classList.add('active');

      if (category != 'C01' && category != 'C02') {
        otherCategories = document.getElementById('otherCategories');
        otherCategories.classList.add('active');
      }
    }
  }

}

changeHeaderLinksActive();

function changeIndexBGimage() {
  // 可運作，但暫時不使用，先直接由php echo的方式改變背景圖

  var heroAfterStyle = document.createElement("style");
  heroAfterStyle.innerHTML = "#hero::after {content: \"\";position: absolute;left: 50%;top: -3%;width: 130%;height: 95%;" +
    "background: linear-gradient(to right, rgba(0, 0, 0, 0.36), rgba(0, 0, 0, 0.69)), " +
    "url(\"../public/assets/img/ntunhs-frontDoor2.png\") center center no-repeat;background-size: cover;" +
    "filter: blur(1px);z-index: 0;border-radius: 0 0 50% 50%;transform: translateX(-50%) rotate(0deg);}";
  document.head.appendChild(heroAfterStyle);
  // https://stackoverflow.com/questions/5041494/selecting-and-manipulating-css-pseudo-elements-such-as-before-and-after-usin
  // https://stackoverflow.com/questions/29260296/modify-pseudo-select-after-in-javascript
}

(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-carousel', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-wrap',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})()

// https://stackoverflow.com/questions/8492344/javascript-attach-an-onclick-event-to-all-links
function callback(e) {
  var e = window.e || e;

  if (e.target.tagName !== 'A' && e.target.href !== '#dontReload')
    return;

  // Do something
  // location.reload();
}

if (document.addEventListener)
  document.addEventListener('click', callback, false);
else
  document.attachEvent('onclick', callback);