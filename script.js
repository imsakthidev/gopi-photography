/**
 * GOPI PHOTOGRAPHY — Master Client Engine
 * Implements:
 * 1. Hero Ambient Cross-Fade Slideshow (Enhancement 1)
 * 2. Interactive "Natural vs Filtered" Skin Tone Slider (Enhancement 2)
 * 3. Tactile Heirloom Album Showcase (Enhancement 3)
 * 4. Smooth Editorial Scroll Reveals via IntersectionObserver (Enhancement 4)
 * 5. Couple Portrait Insets on Testimonials (Enhancement 5)
 * 6. Subtle Custom Magnetic Cursor (Enhancement 6)
 * 7. Live Wedding Availability Indicator (Enhancement 7)
 * 8. Editorial Journal Guide Reader Modal (Enhancement 8)
 * 9. Story Chapter Modal, Portfolio Filter, Lightbox & WhatsApp Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Conversion Analytics Tracking (Phase 25 & 26)
  // =========================================================================
  const trackEvent = (eventName, params = {}) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    } else if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...params });
    }
  };

  document.querySelectorAll('[data-track]').forEach(el => {
    el.addEventListener('click', () => {
      const eventName = el.getAttribute('data-track');
      if (eventName) trackEvent(eventName);
    });
  });

  // =========================================================================
  // 2. Dynamic Year in Footer
  // =========================================================================
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // =========================================================================
  // 3. Topbar Scroll Glassmorphism & Top Scroll Progress Bar (from sakthiispeaks)
  // =========================================================================
  const header = document.getElementById('header');
  const scrollProgressBar = document.getElementById('scroll-progress-bar');

  const onScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (scrollProgressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;
      scrollProgressBar.style.transform = `scaleX(${progress})`;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // =========================================================================
  // 3b. Interactive Radial Mouse Follower Glow (from sakthiispeaks)
  // =========================================================================
  const mouseGlow = document.getElementById('mouse-radial-glow');
  if (mouseGlow && window.matchMedia('(pointer: fine)').matches) {
    let ticking = false;
    window.addEventListener('pointermove', (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          mouseGlow.style.setProperty('--mouse-x', `${e.clientX}px`);
          mouseGlow.style.setProperty('--mouse-y', `${e.clientY}px`);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // =========================================================================
  // 4. Smooth Editorial Scroll Reveals (Enhancement 4)
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.04,
      rootMargin: '60px 0px 60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // Safety trigger for elements already in or near viewport
  const revealVisibleNow = () => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 80 && rect.bottom > -80) {
        el.classList.add('is-revealed');
      }
    });
  };
  revealVisibleNow();
  window.addEventListener('scroll', revealVisibleNow, { passive: true });
  window.addEventListener('hashchange', () => setTimeout(revealVisibleNow, 60));

  // =========================================================================
  // 5. Hero Ambient Cross-Fade Slideshow (Enhancement 1)
  // =========================================================================
  const heroSlides = document.querySelectorAll('.hero-slide');
  const indicatorBars = document.querySelectorAll('.indicator-bar');
  if (heroSlides.length > 1) {
    let currentHeroSlide = 0;
    let heroTimer = null;

    const goToHeroSlide = (index) => {
      if (index < 0) index = heroSlides.length - 1;
      if (index >= heroSlides.length) index = 0;
      currentHeroSlide = index;

      heroSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentHeroSlide);
      });

      indicatorBars.forEach((bar, i) => {
        bar.classList.toggle('active', i === currentHeroSlide);
      });
    };

    const startHeroSlideshow = () => {
      heroTimer = setInterval(() => {
        goToHeroSlide(currentHeroSlide + 1);
      }, 5500);
    };

    indicatorBars.forEach((bar, index) => {
      bar.addEventListener('click', () => {
        clearInterval(heroTimer);
        goToHeroSlide(index);
        startHeroSlideshow();
      });
    });

    startHeroSlideshow();
  }

  // =========================================================================
  // 6. Dynamic Color Grading Studio Switcher (No Drag · Full Photo Visibility)
  // =========================================================================
  const gradingTabs = document.querySelectorAll('.grading-tab-btn');
  const naturalView = document.getElementById('grade-natural-view');
  const artificialView = document.getElementById('grade-artificial-view');
  const dualView = document.getElementById('grade-dual-view');

  if (gradingTabs.length > 0) {
    const setGradingView = (grade) => {
      gradingTabs.forEach(tab => {
        const isActive = tab.getAttribute('data-grade') === grade;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
      });

      if (naturalView) naturalView.hidden = (grade !== 'natural');
      if (artificialView) artificialView.hidden = (grade !== 'artificial');
      if (dualView) dualView.hidden = (grade !== 'dual');

      trackEvent('color_grade_switch', { view: grade });
    };

    gradingTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const grade = tab.getAttribute('data-grade') || 'natural';
        setGradingView(grade);
      });
    });
  }

  // =========================================================================
  // Dynamic ScrollSpy Navigation Highlighter
  // =========================================================================
  const navTrackSections = document.querySelectorAll('section[id]');
  const navLinksList = document.querySelectorAll('.nav-links a[href^="#"]');

  const onScrollSpy = () => {
    let currentId = 'home';
    const offset = 180;

    if (window.scrollY >= 200) {
      navTrackSections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom > offset) {
          currentId = sec.getAttribute('id') || currentId;
        }
      });
    }

    // Map secondary sections to their closest parent nav anchor
    if (currentId === 'hero' || currentId === 'intro') {
      currentId = 'home';
    } else if (currentId === 'testimonials' || currentId === 'process') {
      currentId = 'about';
    } else if (currentId === 'instagram') {
      currentId = 'journal';
    }

    navLinksList.forEach(link => {
      const href = link.getAttribute('href');
      const match = href === `#${currentId}`;
      link.classList.toggle('active', match);
    });
  };

  window.addEventListener('scroll', onScrollSpy, { passive: true });
  onScrollSpy();

  // =========================================================================
  // 7. Interactive Magnetic Custom Cursor (Enhancement 6)
  // =========================================================================
  const cursor = document.getElementById('custom-cursor');
  const cursorText = document.getElementById('cursor-text');

  if (cursor && cursorText && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
    });

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      requestAnimationFrame(animateCursor);
    };
    requestAnimationFrame(animateCursor);

    // Dynamic hover targets
    const bindCursorHover = (selector, label) => {
      document.querySelectorAll(selector).forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursorText.textContent = label;
          cursor.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('active');
        });
      });
    };

    bindCursorHover('.gallery-item', 'VIEW');
    bindCursorHover('.film-card', 'PLAY');
    bindCursorHover('.story-card', 'READ');
    bindCursorHover('.article-card', 'READ');
    bindCursorHover('.album-main-card', 'ALBUM');
  }

  // Set minimum date for event booking to today
  const dateInput = document.getElementById('f-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  // =========================================================================
  // 8. Mobile Navigation Drawer
  // =========================================================================
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu when tapping outside drawer
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // =========================================================================
  // 9. Portfolio Category Filter (Phase 5 - Step 10 & 11)
  // =========================================================================
  const filterTabs = document.querySelectorAll('.filter-tab');
  const portfolioItems = document.querySelectorAll('#portfolio-grid .gallery-item');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-filter') || 'all';

      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      trackEvent('view_portfolio_category', { category });

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
          item.style.display = '';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.97)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // =========================================================================
  // 10. Featured Stories Chapter Engine (Phase 4 - Step 8 & 9)
  // Statically imported asset URLs for 100% production & Vercel reliability
  // =========================================================================
  const storyAssets = {
    weddingCouple: new URL('./assets/wedding-couple.webp', import.meta.url).href,
    couple1: new URL('./assets/couple-1.webp', import.meta.url).href,
    weddingBride: new URL('./assets/wedding-bride.webp', import.meta.url).href,
    portrait: new URL('./assets/portrait.webp', import.meta.url).href,
    candid: new URL('./assets/candid.webp', import.meta.url).href,
    weddingFamily: new URL('./assets/wedding-family.webp', import.meta.url).href,
    couple2: new URL('./assets/couple-2.webp', import.meta.url).href,
  };

  const storyData = {
    'arun-priya': {
      title: 'Arun × Priya',
      subtitle: 'A wedding filled with family, sacred rituals, laughter and tradition.',
      location: 'Theni, Tamil Nadu',
      date: 'December 2026',
      category: 'Traditional & Candid Wedding',
      hero: storyAssets.weddingCouple,
      dual: [storyAssets.couple1, storyAssets.weddingBride],
      portrait: storyAssets.portrait,
      triple: [storyAssets.weddingBride, storyAssets.candid, storyAssets.weddingCouple],
      family: storyAssets.weddingFamily,
      finalHero: storyAssets.weddingCouple,
      nextSlug: 'vijay-harini',
      nextTitle: 'Vijay × Harini'
    },
    'vijay-harini': {
      title: 'Vijay × Harini',
      subtitle: 'An evening of cinematic elegance, stage grandeur and timeless portraits.',
      location: 'Madurai, Tamil Nadu',
      date: 'November 2026',
      category: 'Grand Reception Story',
      hero: storyAssets.weddingBride,
      dual: [storyAssets.weddingCouple, storyAssets.weddingFamily],
      portrait: storyAssets.portrait,
      triple: [storyAssets.candid, storyAssets.couple1, storyAssets.weddingBride],
      family: storyAssets.weddingFamily,
      finalHero: storyAssets.weddingCouple,
      nextSlug: 'karthik-divya',
      nextTitle: 'Karthik × Divya'
    },
    'karthik-divya': {
      title: 'Karthik × Divya',
      subtitle: 'Golden-hour laughs, scenic greenery and authentic pre-wedding connection.',
      location: 'Coimbatore, Tamil Nadu',
      date: 'October 2026',
      category: 'Engagement & Pre-Wedding Session',
      hero: storyAssets.couple2,
      dual: [storyAssets.couple2, storyAssets.portrait],
      portrait: storyAssets.couple2,
      triple: [storyAssets.candid, storyAssets.portrait, storyAssets.couple2],
      family: storyAssets.couple2,
      finalHero: storyAssets.couple2,
      nextSlug: 'arun-priya',
      nextTitle: 'Arun × Priya'
    }
  };

  const storyModal = document.getElementById('story-modal');
  const storyContent = document.getElementById('story-modal-content');
  const storyCloseBtn = document.getElementById('story-modal-close');
  const storyBackdrop = document.getElementById('story-modal-backdrop');

  const openStoryChapter = (slug) => {
    const data = storyData[slug];
    if (!data || !storyContent) return;

    trackEvent('view_story', { story: slug, couple: data.title });

    storyContent.innerHTML = `
      <div class="chapter-header">
        <span class="section-kicker">${data.category}</span>
        <h2>${data.title}</h2>
        <p>${data.subtitle}</p>
        <div style="margin-top: 10px; font-size: 0.85rem; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase;">
          ${data.location} · ${data.date}
        </div>
      </div>

      <div class="chapter-gallery">
        <div class="chapter-photo-full">
          <img src="${data.hero}" alt="${data.title} Hero Photograph" loading="eager" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='assets/wedding-couple.webp';}">
        </div>
        <div class="chapter-photo-dual">
          <img src="${data.dual[0]}" alt="${data.title} Moment 1" loading="lazy" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='assets/couple-1.webp';}">
          <img src="${data.dual[1]}" alt="${data.title} Moment 2" loading="lazy" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='assets/wedding-bride.webp';}">
        </div>
        <div class="chapter-photo-full" style="max-width: 680px; margin: 10px auto;">
          <img src="${data.portrait}" alt="${data.title} Portrait" loading="lazy" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='assets/portrait.webp';}">
        </div>
        <div class="chapter-photo-triple">
          <img src="${data.triple[0]}" alt="${data.title} Detail 1" loading="lazy" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='assets/candid.webp';}">
          <img src="${data.triple[1]}" alt="${data.title} Detail 2" loading="lazy" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='assets/couple-1.webp';}">
          <img src="${data.triple[2]}" alt="${data.title} Detail 3" loading="lazy" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='assets/wedding-couple.webp';}">
        </div>
        <div class="chapter-photo-full">
          <img src="${data.family}" alt="${data.title} Family Portrait" loading="lazy" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='assets/wedding-family.webp';}">
        </div>
        <div class="chapter-photo-full">
          <img src="${data.finalHero}" alt="${data.title} Final Image" loading="lazy" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='assets/wedding-couple.webp';}">
        </div>
      </div>

      <div class="chapter-next-wrap">
        <div>
          <small style="text-transform: uppercase; letter-spacing: 0.16em; color: var(--secondary);">Next Chapter</small>
          <div style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--primary);">${data.nextTitle}</div>
        </div>
        <button class="btn-primary next-story-btn" data-next="${data.nextSlug}" type="button">
          Next Story →
        </button>
      </div>
    `;

    storyModal?.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    storyContent.querySelector('.next-story-btn')?.addEventListener('click', (e) => {
      const nextSlug = (e.currentTarget).getAttribute('data-next');
      if (nextSlug) {
        storyContent.parentElement?.scrollTo({ top: 0, behavior: 'smooth' });
        openStoryChapter(nextSlug);
      }
    });
  };

  const closeStoryChapter = () => {
    storyModal?.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-story]').forEach(card => {
    card.addEventListener('click', () => {
      const slug = card.getAttribute('data-story');
      if (slug) openStoryChapter(slug);
    });
  });

  storyCloseBtn?.addEventListener('click', closeStoryChapter);
  storyBackdrop?.addEventListener('click', closeStoryChapter);

  // =========================================================================
  // 11. Editorial Journal Reader Modal (Enhancement 8)
  // =========================================================================
  const articleModal = document.getElementById('article-modal');
  const articleModalBody = document.getElementById('article-modal-body');
  const articleModalClose = document.getElementById('article-modal-close');
  const articleModalBackdrop = document.getElementById('article-modal-backdrop');

  const articleArticles = {
    'candid-vs-traditional': {
      tag: 'Wedding Planning',
      title: 'Candid vs Traditional: Why You Need Both on Your Big Day',
      body: `
        <span class="section-kicker">WEDDING PLANNING GUIDE</span>
        <h2>Candid vs Traditional: Why You Need Both on Your Big Day</h2>
        <p>In modern wedding photography discussions, candid photography is often praised as the only artistic choice, while traditional photography is dismissed as outdated. At GOPI PHOTOGRAPHY, we believe this is a profound mistake.</p>
        <p>A South Indian wedding is fundamentally a convergence of two worlds: the personal, raw emotional journey of two young people, and the sacred ancestral rituals that bind two families together.</p>
        <p><strong>The Role of Candid Photography:</strong> Candid artists are silent observers. They capture the involuntary tear escaping a father's eye, the shared secret smile between the couple during the mantra chanting, and friends celebrating with uncurated ecstasy. These are the moments you will re-experience in your heart.</p>
        <p><strong>The Sacred Duty of Traditional Photography:</strong> When your 85-year-old grandmother stands before the couple to offer her blessings, that moment requires perfect, clear lighting, patient framing, and respectful composition. Twenty years from now, traditional group portraits are the most precious historical records of who was there to bless your beginning.</p>
        <p>Our philosophy is seamless balance: dedicated candid artists capturing the feelings, alongside seasoned traditional photographers ensuring every elder, ritual, and family member is preserved with dignity.</p>
      `
    },
    'what-to-wear': {
      tag: 'Style & Wardrobe',
      title: 'What to Wear for an Outdoor Shoot in Theni & Kodaikanal',
      body: `
        <span class="section-kicker">STYLE & WARDROBE GUIDE</span>
        <h2>What to Wear for an Outdoor Shoot in Theni &amp; Kodaikanal</h2>
        <p>Planning an outdoor pre-wedding or engagement session around the scenic mountain passes of Theni, Meghamalai, or Kodaikanal requires thinking about movement, wind, and color harmony.</p>
        <p><strong>1. Embrace Earthy &amp; Jewel Tones:</strong> Avoid neon brights or harsh artificial pinks that fight against natural foliage. Emerald greens, mustard golds, deep maroons, rust terracotta, and rich navy blend gorgeously with South Indian tea estates and rocky riversides.</p>
        <p><strong>2. Fabrics That Love the Breeze:</strong> Heavy synthetic silks with stiff pleating tend to restrict natural candid movement. Instead, opt for handloom cottons, breathable georgettes, raw silks, and lightweight linens that billow naturally when mountain winds pick up.</p>
        <p><strong>3. Coordinate, Don’t Match Exactly:</strong> Avoid identical matching shirts and sarees. Instead, choose a unified color family (for example, ivory and gold paired with olive green and beige) to create visual depth and sophistication.</p>
        <p><strong>4. Comfortable Footwear for Secret Spots:</strong> The most breathtaking viewpoints often require walking along grassy pathways or cobblestone steps. Bring a pair of slip-on flats or sneakers for transitions between portrait locations!</p>
      `
    },
    'muhurtham-timeline': {
      tag: 'Rituals & Flow',
      title: 'How to Plan Your Muhurtham Photography Without Stress',
      body: `
        <span class="section-kicker">RITUALS & FLOW GUIDE</span>
        <h2>How to Plan Your Muhurtham Photography Without Stress</h2>
        <p>South Indian Muhurthams frequently take place during early dawn hours (between 4:30 AM and 7:00 AM). Managing temple rituals, wedding hall arrivals, and portrait sessions can easily become overwhelming without a structured timeline.</p>
        <p><strong>Step 1: Finish Bridal Dressing 45 Minutes Before the Pooja:</strong> Always schedule hair, makeup, and saree draping to conclude at least 45 minutes prior to the groom's arrival. This window gives us dedicated, quiet time to craft calm, regal bridal portraits before the hall fills with guests.</p>
        <p><strong>Step 2: Reserve 15 Minutes Immediately Post-Thali:</strong> Right after the sacred Mangalya Dharanam is completed, families inevitably rush the stage to shower akshata. Brief your wedding coordinator to grant the couple just 10 to 15 minutes of uninterrupted stage time for intimate couple portraits while your outfits, flowers, and garlands are fresh.</p>
        <p><strong>Step 3: Organize Family Group Lists in Advance:</strong> Write down your essential family photo clusters (e.g. maternal uncles, college friends, immediate cousins) and assign one trusted cousin to call names. This cuts formal stage wait times in half, preventing fatigue for both the couple and elders.</p>
      `
    }
  };

  const openArticleModal = (slug) => {
    const article = articleArticles[slug];
    if (!article || !articleModalBody) return;

    articleModalBody.innerHTML = article.body;
    articleModal?.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    trackEvent('view_article_guide', { slug, title: article.title });
  };

  const closeArticleModal = () => {
    articleModal?.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-article]').forEach(card => {
    card.addEventListener('click', () => {
      const slug = card.getAttribute('data-article');
      if (slug) openArticleModal(slug);
    });
  });

  articleModalClose?.addEventListener('click', closeArticleModal);
  articleModalBackdrop?.addEventListener('click', closeArticleModal);

  // =========================================================================
  // 12. Lightbox Modal Gallery
  // =========================================================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxSub = document.getElementById('lightbox-sub');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  const galleryItems = Array.from(document.querySelectorAll('.gallery-item[data-src]'));
  let activeLightboxIndex = 0;

  const showLightboxPhoto = (index) => {
    if (index < 0) index = galleryItems.length - 1;
    if (index >= galleryItems.length) index = 0;
    activeLightboxIndex = index;

    const item = galleryItems[activeLightboxIndex];
    const itemImg = item.querySelector('img');
    const src = itemImg?.currentSrc || itemImg?.src || item.getAttribute('data-src');
    const title = item.getAttribute('data-title') || '';
    const sub = item.getAttribute('data-sub') || '';

    if (lightboxImg && src) {
      lightboxImg.src = src;
      lightboxImg.alt = title;
    }
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxSub) lightboxSub.textContent = sub;
  };

  const openLightbox = (index) => {
    showLightboxPhoto(index);
    lightbox?.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    trackEvent('view_lightbox_image', { index });
  };

  const closeLightbox = () => {
    lightbox?.setAttribute('hidden', '');
    document.body.style.overflow = '';
    if (lightboxImg) lightboxImg.src = '';
  };

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxPrev?.addEventListener('click', (e) => {
    e.stopPropagation();
    showLightboxPhoto(activeLightboxIndex - 1);
  });
  lightboxNext?.addEventListener('click', (e) => {
    e.stopPropagation();
    showLightboxPhoto(activeLightboxIndex + 1);
  });

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // =========================================================================
  // 13. Cinematic Video Player Modal (Phase 16 - Step 27)
  // =========================================================================
  const videoModal = document.getElementById('video-modal');
  const videoClose = document.getElementById('video-modal-close');
  const videoBackdrop = document.getElementById('video-modal-backdrop');
  const videoModalTitle = document.getElementById('video-modal-title');
  const videoModalMeta = document.getElementById('video-modal-meta');

  const openVideoModal = (title, duration) => {
    if (videoModalTitle) videoModalTitle.textContent = title;
    if (videoModalMeta) videoModalMeta.textContent = `Cinematic Master 4K · Duration: ${duration}`;
    videoModal?.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    trackEvent('video_play', { title });
  };

  const closeVideoModal = () => {
    videoModal?.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.film-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-video-title') || 'Cinematic Film';
      const duration = card.getAttribute('data-video-duration') || 'Full Film';
      openVideoModal(title, duration);
    });
  });

  document.querySelector('.item-video-callout')?.addEventListener('click', () => {
    openVideoModal('Arun & Priya — Cinematic Wedding Highlight', '2:14');
  });

  videoClose?.addEventListener('click', closeVideoModal);
  videoBackdrop?.addEventListener('click', closeVideoModal);

  // =========================================================================
  // 14. Dynamic Package Synchronization to Form
  // =========================================================================
  const packageSelect = document.getElementById('f-package');
  const budgetSelect = document.getElementById('f-budget');

  document.querySelectorAll('[data-package]').forEach(btn => {
    btn.addEventListener('click', () => {
      const pkgValue = btn.getAttribute('data-package');
      if (packageSelect && pkgValue) {
        packageSelect.value = pkgValue;
        packageSelect.classList.remove('field-invalid');

        // Automatically match budget range
        if (budgetSelect) {
          if (pkgValue.includes('Essential')) {
            budgetSelect.value = 'Under ₹20,000';
          } else if (pkgValue.includes('Signature')) {
            budgetSelect.value = '₹20,000 – ₹40,000';
          } else if (pkgValue.includes('Cinematic')) {
            budgetSelect.value = '₹20,000 – ₹40,000';
          }
          budgetSelect.classList.remove('field-invalid');
        }

        // Visual feedback pulse
        packageSelect.classList.remove('field-highlight-pulse');
        void packageSelect.offsetWidth; // re-flow
        packageSelect.classList.add('field-highlight-pulse');

        trackEvent('view_packages', { selected: pkgValue });
      }
    });
  });

  // =========================================================================
  // 15. All 9 Columns Mandatory Validation & WhatsApp Submission
  // =========================================================================
  const bookingForm = document.getElementById('booking-form');

  // Real-time clearance of invalid field styles on input/change
  const formFieldIds = ['f-name', 'f-phone', 'f-event', 'f-date', 'f-location', 'f-coverage', 'f-package', 'f-budget', 'f-notes'];
  formFieldIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => el.classList.remove('field-invalid'));
      el.addEventListener('change', () => el.classList.remove('field-invalid'));
    }
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(bookingForm);
      const name = (formData.get('name') || '').toString().trim();
      const phone = (formData.get('phone') || '').toString().trim();
      const eventType = (formData.get('event') || '').toString().trim();
      const date = (formData.get('date') || '').toString().trim();
      const location = (formData.get('location') || '').toString().trim();
      const coverage = (formData.get('coverage') || '').toString().trim();
      const selectedPkg = (formData.get('package') || '').toString().trim();
      const budget = (formData.get('budget') || '').toString().trim();
      const notes = (formData.get('notes') || '').toString().trim();

      // Check all 9 mandatory fields
      const mandatoryFields = [
        { id: 'f-name', val: name, label: 'Your Name' },
        { id: 'f-phone', val: phone, label: 'WhatsApp Number' },
        { id: 'f-event', val: eventType, label: 'Event Type' },
        { id: 'f-date', val: date, label: 'Event Date' },
        { id: 'f-location', val: location, label: 'Location / Venue' },
        { id: 'f-coverage', val: coverage, label: 'Desired Coverage' },
        { id: 'f-package', val: selectedPkg, label: 'Selected Package' },
        { id: 'f-budget', val: budget, label: 'Approximate Budget' },
        { id: 'f-notes', val: notes, label: 'Event Details & Notes' }
      ];

      let firstInvalidEl = null;
      let missingList = [];

      mandatoryFields.forEach(f => {
        const el = document.getElementById(f.id);
        if (!f.val || f.val === '') {
          el?.classList.add('field-invalid');
          missingList.push(f.label);
          if (!firstInvalidEl) firstInvalidEl = el;
        } else {
          el?.classList.remove('field-invalid');
        }
      });

      if (firstInvalidEl) {
        firstInvalidEl.focus();
        firstInvalidEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        alert(`All 9 fields are mandatory to check date availability.\nPlease complete:\n• ${missingList.join('\n• ')}`);
        return;
      }

      trackEvent('form_submit', {
        event_type: eventType,
        location,
        coverage,
        package: selectedPkg
      });

      const messageLines = [
        'Hi Gopi Photography,',
        "I would like to check date availability for our upcoming celebration.",
        '',
        `👤 Name: ${name}`,
        `📱 WhatsApp: ${phone}`,
        `🎉 Event: ${eventType}`,
        `📅 Date: ${date}`,
        `📍 Location: ${location}`,
        `📸 Coverage: ${coverage}`,
        `📦 Package: ${selectedPkg}`,
        `💰 Budget: ${budget}`,
        `📝 Event Details & Notes: ${notes}`,
        '',
        'Please confirm availability and share your customized proposal.'
      ];

      const fullMessage = messageLines.join('\n');
      const whatsappUrl = `https://wa.me/919500515932?text=${encodeURIComponent(fullMessage)}`;

      trackEvent('whatsapp_click', { channel: 'booking_form' });
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // =========================================================================
  // 16. Legal Terms & Policy Modal (Phase 28 - Step 46)
  // =========================================================================
  const legalModal = document.getElementById('legal-modal');
  const legalModalBody = document.getElementById('legal-modal-body');
  const legalModalClose = document.getElementById('legal-modal-close');
  const legalModalBackdrop = document.getElementById('legal-modal-backdrop');

  const legalContentMap = {
    privacy: `
      <h2>Privacy Policy</h2>
      <p>At GOPI PHOTOGRAPHY, we value and respect your family's personal privacy. We collect your contact details strictly for the purpose of communicating availability, discussing your coverage, and delivering photographic services.</p>
      <p>We never sell, rent, or distribute your personal information or contact details to third-party marketing companies.</p>
      <p>Photographs and films captured during your event are archived securely. Client galleries are hosted on private, password-protected cloud drives. If you prefer any specific private images to be excluded from our public portfolio or social media showcase, please inform us in writing prior to or following your event.</p>
    `,
    terms: `
      <h2>Terms &amp; Conditions</h2>
      <p>1. <strong>Booking Confirmation:</strong> Dates are formally secured and blocked upon receipt of an advance booking deposit and confirmation of event hours.</p>
      <p>2. <strong>Payment Schedule:</strong> 40% advance deposit to reserve the date, 50% on the main event day, and the remaining 10% upon digital gallery approval prior to album printing.</p>
      <p>3. <strong>Artistic Style:</strong> The client acknowledges and chooses GOPI PHOTOGRAPHY based on our natural skin-tone aesthetic, candid documentary perspective, and editorial post-processing style.</p>
      <p>4. <strong>Delivery Timelines:</strong> Initial highlight previews are shared within 7 to 10 days. The complete color-corrected photograph archive is delivered within 3 to 4 weeks. Printed flush-mount albums are delivered within 4 to 6 weeks following client selection approval.</p>
    `,
    cancellation: `
      <h2>Cancellation &amp; Rescheduling Policy</h2>
      <p>1. <strong>Date Rescheduling:</strong> If your event date changes due to unforeseen circumstances, we will gladly shift your booking to your new date without penalty, subject to our calendar availability.</p>
      <p>2. <strong>Cancellations:</strong> Because we reserve wedding dates exclusively for one couple per date and turn away conflicting inquiries, advance deposits are non-refundable in the event of client cancellation.</p>
      <p>3. <strong>Force Majeure:</strong> In the rare event of severe weather, state restrictions, or unforeseen acts of God preventing travel, both parties will cooperate in good faith to reschedule or apply credits to future family sessions.</p>
    `
  };

  document.querySelectorAll('.open-legal-modal').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const modalKey = link.getAttribute('data-modal') || 'terms';
      if (legalModalBody) {
        legalModalBody.innerHTML = legalContentMap[modalKey] || legalContentMap.terms;
      }
      legalModal?.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      trackEvent('view_legal_modal', { doc: modalKey });
    });
  });

  const closeLegalModal = () => {
    legalModal?.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  legalModalClose?.addEventListener('click', closeLegalModal);
  legalModalBackdrop?.addEventListener('click', closeLegalModal);

  // =========================================================================
  // 17. Floating WhatsApp Live Chat Widget
  // =========================================================================
  const waToggleBtn = document.getElementById('wa-toggle-btn');
  const waChatPopup = document.getElementById('wa-chat-popup');
  const waCloseBtn = document.getElementById('wa-close-btn');
  const waUnreadBadge = document.getElementById('wa-unread-badge');
  const waChatFooter = document.getElementById('wa-chat-footer');
  const waCustomInput = document.getElementById('wa-custom-input');
  const waPromptChips = document.querySelectorAll('.wa-prompt-chip');

  const openWaChat = () => {
    waChatPopup?.removeAttribute('hidden');
    if (waUnreadBadge) waUnreadBadge.style.display = 'none';
    waCustomInput?.focus();
    trackEvent('whatsapp_widget_open');
  };

  const closeWaChat = () => {
    waChatPopup?.setAttribute('hidden', '');
  };

  waToggleBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (waChatPopup?.hasAttribute('hidden')) {
      openWaChat();
    } else {
      closeWaChat();
    }
  });

  waCloseBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeWaChat();
  });

  // Close WhatsApp popup when clicking outside
  document.addEventListener('click', (e) => {
    if (!waChatPopup?.hasAttribute('hidden') && !waChatPopup?.contains(e.target) && !waToggleBtn?.contains(e.target)) {
      closeWaChat();
    }
  });

  // Quick Prompt Chips
  waPromptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const msg = chip.getAttribute('data-msg') || 'Hello Gopi Photography, I would like to enquire about your services.';
      const waUrl = `https://wa.me/919500515932?text=${encodeURIComponent(msg)}`;
      trackEvent('whatsapp_quick_prompt', { prompt: msg });
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      closeWaChat();
    });
  });

  // Custom Message Form
  waChatFooter?.addEventListener('submit', (e) => {
    e.preventDefault();
    const customMsg = waCustomInput?.value.trim() || 'Hello Gopi Photography, I would like to check availability for my celebration.';
    const waUrl = `https://wa.me/919500515932?text=${encodeURIComponent(customMsg)}`;
    trackEvent('whatsapp_custom_send', { message: customMsg });
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    if (waCustomInput) waCustomInput.value = '';
    closeWaChat();
  });

  // =========================================================================
  // 18. Global Keyboard Handlers
  // =========================================================================
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!lightbox?.hasAttribute('hidden')) closeLightbox();
      if (!storyModal?.hasAttribute('hidden')) closeStoryChapter();
      if (!articleModal?.hasAttribute('hidden')) closeArticleModal();
      if (!videoModal?.hasAttribute('hidden')) closeVideoModal();
      if (!legalModal?.hasAttribute('hidden')) closeLegalModal();
    } else if (e.key === 'ArrowLeft') {
      if (!lightbox?.hasAttribute('hidden')) showLightboxPhoto(activeLightboxIndex - 1);
    } else if (e.key === 'ArrowRight') {
      if (!lightbox?.hasAttribute('hidden')) showLightboxPhoto(activeLightboxIndex + 1);
    }
  });

});
