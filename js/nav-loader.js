// nav-loader.js
// Fetches /includes/nav.html into #nav-placeholder,
// sets .active on the matching menu link, and runs the
// rotating "Me:/You: Why?/Because..." subtitle animation.

(function () {
  var page = window.location.pathname.split('/').pop() || 'index.html';

  fetch('/includes/nav.html')
    .then(function (r) { return r.text(); })
    .then(function (html) {
      var placeholder = document.getElementById('nav-placeholder');
      if (!placeholder) return;
      placeholder.innerHTML = html;

      // Highlight current page
      var links = placeholder.querySelectorAll('.nav-menu a');
      links.forEach(function (a) {
        var href = a.getAttribute('href') || '';
        if (!href || href.indexOf('#') === 0 || href.indexOf('tel:') === 0 || href.indexOf('mailto:') === 0) return;
        // Match by filename: /squirrel.html matches when page === 'squirrel.html'
        if (href === '/' + page) {
          a.classList.add('active');
        }
        // Special-case the homepage so logo isn't styled as a menu link
        if ((page === '' || page === 'index.html') && href === '/index.html') {
          a.classList.add('active');
        }
      });

      setupMobileToggle(placeholder);
      startSubtitleAnimation();
      injectSubfooter();
      applyTerritoryContext();
    })
    .catch(function () { /* nav fetch failed — fail silent */ });

  function setupMobileToggle(placeholder) {
    var nav = placeholder.querySelector('#nav');
    var menu = placeholder.querySelector('.nav-menu');
    if (!nav || !menu) return;

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'nav');
    toggle.innerHTML = '&#9776;'; // ☰
    nav.appendChild(toggle);

    function setOpen(open) {
      if (open) {
        nav.classList.add('menu-open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close menu');
        toggle.innerHTML = '&times;'; // ✕
      } else {
        nav.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        toggle.innerHTML = '&#9776;';
      }
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!nav.classList.contains('menu-open'));
    });

    // Tap outside the nav closes the menu
    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('menu-open')) return;
      if (nav.contains(e.target)) return;
      setOpen(false);
    });

    // Tapping a link in the menu closes it (in case of in-page anchors or tel: links)
    menu.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (a) setOpen(false);
    });

    // If viewport grows back to desktop, force-close so state is sane
    var mq = window.matchMedia('(min-width: 769px)');
    if (mq.addEventListener) {
      mq.addEventListener('change', function (ev) { if (ev.matches) setOpen(false); });
    } else if (mq.addListener) {
      mq.addListener(function (ev) { if (ev.matches) setOpen(false); });
    }
  }

  function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function startSubtitleAnimation() {
    var navSubtitle = document.getElementById('nav-subtitle');
    if (!navSubtitle) return;

    var meLines = shuffle([
      "Because fire does not care about nostalgia.",
      "Because in Los Angeles, entire lifetimes of photos were gone overnight.",
      "Because basements flood. Photos do not float.",
      "Because one pipe burst can erase 40 years.",
      "Because disasters are not scheduled.",
      "Because digital copies do not burn.",
      "Because your shoebox is one basement flood away from becoming soup.",
      "Because moisture turns memories into pulp.",
      "Because attics are ovens.",
      "Because time is not gentle with paper.",
      "Because moving the box from shelf to shelf is not progress.",
      "Because I will do it someday usually means never.",
      "Because you will not scan them but you will feel guilty about not scanning them.",
      "Because this is on the same list as organize the garage and learn guitar.",
      "Because you could do it yourself but you will not. And now someone will.",
      "Because paying someone to do it is cheaper and faster than buying a scanner.",
      "Because you already know you should.",
      "Because the shoebox is not a system.",
      "Because someday no one will remember who Uncle Mikes friend Dave is.",
      "Because you will not always be there to explain who is in them.",
      "Because your parents handwriting will not exist forever.",
      "Because the handwriting on the back matters as much as the photo.",
      "Because your grandkids deserve to see what you looked like.",
      "Because these photos are the only proof your family was ever all in one place.",
      "Because your story did not start with your iPhone.",
      "Because preserving your story is an act of respect.",
      "Because your kids will fight over these someday. Make it easy for them.",
      "Because faded photos fade more every single year.",
      "Because your moms 1978 smile deserves better than a bent corner.",
      "Because seeing your parents younger than you are now hits different.",
      "Because seeing your parents young and happy is the best feeling.",
      "Because your grandmas face deserves to be seen every day, not once a decade.",
      "Because the photo of your dad holding you at the hospital is everything.",
      "Because your wedding photos should not live in a box you have not opened since 2004.",
      "Because your daughter does not believe you were ever cool and you have evidence.",
      "Because showing your son that awkward dance photo might convince him to go to his.",
      "Because your kids have never seen you awkward and 17.",
      "Because your kid thinks you were born at 40.",
      "Because you were a cuter baby than your daughter and you can prove it.",
      "Because your phone has 18000 photos and zero from 1992.",
      "Because Google Photos will make you a birthday video that makes you cry.",
      "Because the picture of you playing soccer at age 8 is objectively hilarious.",
      "Because you once slow-danced under a disco ball and there is proof.",
      "Because you took epic trips before smartphones existed.",
      "Because nostalgia hits harder in high resolution.",
      "Because garages are not archives.",
      "Because something with teeth will find that box before your kids do.",
      "Because Google cannot auto-generate memories from a box in your closet.",
      "Because the big companies charge a fortune and I live ten minutes away.",
      "Because AI can sharpen a blurry face from 1974.",
      "Because that Rolling Stone interview you wrote is not going to reprint itself.",
      "Because your kids will never believe you were published unless they see it.",
      "Because magazine paper was never meant to last this long.",
      "Because your birth certificate is one coffee spill away from gone.",
      "Because the diploma on the wall is fading and the one in the drawer is worse."
    ]);

    var meIndex = 0;

    function updateSubtitle() {
      navSubtitle.classList.remove('visible');
      setTimeout(function () {
        navSubtitle.innerHTML = '<span class="text">' + meLines[meIndex] + '</span>';
        meIndex = (meIndex + 1) % meLines.length;
        navSubtitle.classList.add('visible');
      }, 400);
    }

    setTimeout(function () { navSubtitle.classList.add('visible'); }, 500);
    setTimeout(updateSubtitle, 3500);
    setTimeout(function () { setInterval(updateSubtitle, 3500); }, 7000);
  }

  function injectSubfooter() {
    var footer = document.querySelector('footer');
    if (!footer) return;
    var sf = document.createElement('div');
    sf.className = 'subfooter';
    sf.innerHTML =
      '<a href="/scan/photographs/"><img src="/img/items/photo_s.png" alt="Photos"><span>Photos</span></a>' +
      '<a href="/scan/slides/"><img src="/img/items/slide_s.png" alt="35mm slides"><span>35mm</span></a>' +
      '<a href="/scan/negatives/"><img src="/img/items/negative_strip_s.png" alt="Negatives"><span>Negatives</span></a>' +
      '<a href="/scan/documents/"><img src="/img/items/document_records_s.png" alt="Documents"><span>Docs</span></a>' +
      '<a href="/scan/articles/"><img src="/img/items/article_pdf_s.png" alt="Magazines"><span>Magazines</span></a>';
    footer.parentNode.insertBefore(sf, footer);
  }
  // ── Territory awareness ──
  // Reads ?from= param or detects /squirrels/*/ path.
  // Rewrites internal links so visitors stay "inside" their territory.
  // No cookies, no storage — just a URL parameter passed along.
  function applyTerritoryContext() {
    var params = new URLSearchParams(window.location.search);
    var from = params.get('from');

    // Auto-detect territory from path (e.g. /squirrels/eastside-la/)
    var match = window.location.pathname.match(/^\/squirrels\/([^\/]+)\//);
    if (match) from = match[1];

    if (!from) return;

    var territoryHome = '/squirrels/' + from + '/';

    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href) return;

      // Skip external, tel, mailto, anchor, javascript links
      if (/^(https?:|tel:|mailto:|#|javascript:)/.test(href)) return;

      // Skip links already carrying ?from= or already inside a territory
      if (href.indexOf('from=') !== -1) return;
      if (href.indexOf('/squirrels/') === 0) return;

      // Home / logo links → territory home
      if (href === '/' || href === '/index.html' || href === '/index2.html' || href === '/index3.html') {
        a.setAttribute('href', territoryHome);
        return;
      }

      // Append ?from= to all other internal links
      var sep = href.indexOf('?') !== -1 ? '&' : '?';
      a.setAttribute('href', href + sep + 'from=' + from);
    });
  }

})();
