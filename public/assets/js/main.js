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

/* https://www.w3schools.com/js/js_cookies.asp */
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
/* https://www.w3schools.com/js/js_cookies.asp */

if (getCookie("fontLevel") == "") {
  console.log("尚未設定字體大小，將為您設定使用預設值");
  setCookie("fontLevel", "0", 69);
}

// https://stackoverflow.com/questions/11790375/how-to-highlight-all-the-occurrence-of-a-particular-string-in-a-div-with-java-sc
// https://stackoverflow.com/questions/5886858/full-text-search-in-html-ignoring-tags/5887719#5887719
function doSearch(text) {
  if (window.find && window.getSelection) {
    document.designMode = "on";
    var sel = window.getSelection();
    sel.collapse(document.body, 0);

    while (window.find(text)) {
      document.execCommand("HiliteColor", false, "yellow");
      sel.collapseToEnd();
    }
    document.designMode = "off";
  } else if (document.body.createTextRange) {
    var textRange = document.body.createTextRange();
    while (textRange.findText(text)) {
      textRange.execCommand("BackColor", false, "yellow");
      textRange.collapse(false);
    }
  }
}
// https://stackoverflow.com/questions/5886858/full-text-search-in-html-ignoring-tags/5887719#5887719

// https://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript
function findGetParameter(parameterName) {
  var result = null, tmp = [];
  location.search
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}
// https://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript

var searchGETparam = findGetParameter("searchText");

if (searchGETparam !== "" || searchGETparam !== null) {
  doSearch(searchGETparam);
  console.log("Search Text params:" + searchGETparam);
}

function increaseAllfontSize() {
  let currentFontLevel = parseInt(getCookie("fontLevel"));

  if (currentFontLevel < 6) {
    let allelements = document.getElementsByTagName('*');

    for (var i = 0; i < allelements.length; i++) {
      // https://stackoverflow.com/questions/15195209/how-to-get-font-size-in-html
      var style = window.getComputedStyle(allelements[i], null).getPropertyValue('font-size');
      var fontSize = parseInt(style);
      fontSize++;

      allelements[i].style.fontSize = fontSize + 'px';
    }
    currentFontLevel++;

    console.log("currentFontLevel: " + currentFontLevel);

    setCookie("fontLevel", currentFontLevel, 69);
  }
}

function decreaseAllfontSize() {
  let currentFontLevel = parseInt(getCookie("fontLevel"));

  if (currentFontLevel > -9) {
    let allelements = document.getElementsByTagName('*');

    for (var i = 0; i < allelements.length; i++) {
      // https://stackoverflow.com/questions/15195209/how-to-get-font-size-in-html
      var style = window.getComputedStyle(allelements[i], null).getPropertyValue('font-size');
      var fontSize = parseInt(style);
      fontSize--;

      allelements[i].style.fontSize = fontSize + 'px';
    }
    currentFontLevel--;

    console.log("currentFontLevel: " + currentFontLevel);

    setCookie("fontLevel", currentFontLevel, 69);
  }
}

function resetAllfontSize() {

  let allelements = document.getElementsByTagName('*');
  for (var i = 0; i < allelements.length; i++) {
    allelements[i].style.fontSize = '';
  }

  setCookie("fontLevel", "0", 69);

  location.reload();// https://www.w3schools.com/jsref/met_loc_reload.asp
}

function loadCurrentfontSize() {
  let currentFontLevel = parseInt(getCookie("fontLevel"));

  let allelements = document.getElementsByTagName('*');

  if (currentFontLevel == 0) {
    resetAllfontSize();
    // 記憶該頁面的每個字體大小，不同頁面之間的標籤元素不同
    // 所以當有設定字體大小時，切換到其他頁面會有問題
  } else if (currentFontLevel > 0) {
    for (var i = 0; i < currentFontLevel; i++) {
      increaseAllfontSize();
    }
  } else {
    for (var i = 0; i < -currentFontLevel; i++) {
      decreaseAllfontSize();
    }
  }
}

// https://www.w3schools.com/jsref/prop_style_fontsize.asp
function fontSizeControll(selectTag) {
  var listValue = selectTag.options[selectTag.selectedIndex].value;
  document.getElementById("fontSizeControllableArea").style.fontSize = listValue;
}
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_style_fontsize2

if (window.location.href.search("fullArticlePage.php") != -1) {
  // 於完整文章頁面時，載入字體正常大小設定
  var selection = document.getElementById("contentFontSizeSelection");

  selection.value = "medium";
  // https://thewebdev.info/2022/04/22/how-to-change-the-selected-option-of-an-html-select-element-with-javascript/

  fontSizeControll(selection);
}

function fullArticleRowLengthControl(selectTag) {
  var listValue = selectTag.options[selectTag.selectedIndex].value;

  var fullArticleDiv = document.getElementById("fullArticleDiv");
  if (fullArticleDiv != null) {
    fullArticleDiv.classList.remove("col-8", "col-6", "col-4");
    // https://stackoverflow.com/questions/11115998/is-there-a-way-to-add-remove-several-classes-in-one-single-instruction-with-clas
    fullArticleDiv.classList.add(listValue);
  }
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
  } else if (url_string.search("search.php") != -1) {
    indexLink = document.getElementById('indexLink');
    indexLink.classList.remove('active');

    searchLink = document.getElementById('searchLink');
    searchLink.classList.add('active');
  } else {
    indexLink = document.getElementById('indexLink');
    indexLink.classList.remove('active');

    currentLink = document.getElementById(category + 'Link');
    if (currentLink != null) {
      currentLink.classList.add('active');

      if (category != 'C01' && category != 'C02' && category != 'C04') {
        otherCategories = document.getElementById('otherCategories');
        otherCategories.classList.add('active');
      }
    }
  }

}

changeHeaderLinksActive();

function changeIndexBGimage(currentSlideRealIndex = 0) {
  // Asign default value for function parameter:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters

  var heroAfterStyle = document.getElementById("heroAfterStyle");

  if (heroAfterStyle != null) {
    currentImage = document.getElementById('carouselStyle' + currentSlideRealIndex).innerHTML;
    if (currentImage != null) {
      // console.log(currentImage);
      heroAfterStyle.innerHTML = currentImage;
    } else {
      heroAfterStyle.innerHTML = "#hero::after {content: \"\";position: absolute;left: 50%;top: -3%;width: 130%;height: 95%;" +
        "background: linear-gradient(to right, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.18)), " +
        "url(\"../public/assets/img/ntunhs-frontDoor2.png\") center center no-repeat;background-size: cover;" +
        "filter: blur(0px);z-index: 0;border-radius: 0 0 50% 50%;transform: translateX(-50%) rotate(0deg);}";
    }
  } else {
    // do nothing, prevent not index page Error
  }
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
  let header = window.document.querySelector('#header')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }

      if (window.pageYOffset > (window.innerHeight) * .8 && header.classList.contains('header-transparent')) {
        header.classList.remove('header-transparent')
        header.classList.add('header-normal')
      } else if (window.pageYOffset < (window.innerHeight) * .8 && header.classList.contains('header-normal')) {
        header.classList.remove('header-normal')
        header.classList.add('header-transparent')
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

    var otherCategoriesDL = document.getElementById('otherCategoriesDropdownList');
    if (otherCategoriesDL != null) {
      otherCategoriesDL.classList.toggle('dropdown-active');
    }
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
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
  * Index Hero slider
  */
  const indexCarousel = new Swiper('.index-carousel', {
    speed: 1500,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    // https://swiperjs.com/get-started#initialize-swiper
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }, changeIndexBGimage());

  indexCarousel.on('slideChange', function () {
    // https://stackoverflow.com/questions/50244532/how-can-i-get-the-index-of-the-current-slide-when-the-slide-is-changed
    console.log('indexSwiper real index:' + indexCarousel.realIndex);

    changeIndexBGimage(indexCarousel.realIndex);
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

// https://stackoverflow.com/questions/807878/how-to-make-javascript-execute-after-page-load
// window.onload = loadCurrentfontSize();