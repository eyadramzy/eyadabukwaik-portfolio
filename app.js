(() => {
  'use strict';

  // ==========================================
  // 1. SUPABASE CONFIG & FALLBACK MOCK DATA
  // ==========================================
  const SUPABASE_URL = 'https://akotjgytunnvoyqtubor.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_1-wtg-s6xskGpz-n9wbnFg_aMRuJ-OQ';
  const CACHE_KEY = 'eyad_portfolio_cache_v2';

  const FALLBACK_DATA = {
    projects: [
      {
        title: 'Aura E-Commerce Platform',
        description:
          'A high-performance, microservices-based e-commerce backend handling 10k+ TPS with a sleek mobile app.',
        technologies: ['Flutter', 'Node.js', 'Redis', 'PostgreSQL'],
        image_url:
          'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
        link: null,
      },
      {
        title: 'Nexus Data Analytics',
        description:
          'Real-time data visualization dashboard for enterprise clients using automated data pipelines.',
        technologies: ['React', 'Python', 'Apache Kafka', 'AWS'],
        image_url:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        link: null,
      },
    ],
    experiences: [
      {
        role: 'Senior Platform Engineer',
        company: 'TechCorp Nexus',
        period: '2022 - Present',
        description:
          'Lead the transition to Flutter and microservices, architecting scalable solutions for 5+ cross-platform enterprise applications.',
      },
      {
        role: 'Software Engineer',
        company: 'InnovateX Solutions',
        period: '2019 - 2022',
        description:
          'Developed high-frequency trading algorithms and maintained core backend services serving millions of requests daily.',
      },
    ],
    skills: [
      { name: 'Flutter & Dart', proficiency: 0.95, icon_code: 'flutter' },
      { name: 'Android Development', proficiency: 0.92, icon_code: 'android' },
      { name: 'System Architecture', proficiency: 0.90, icon_code: 'architecture' },
      { name: 'Firebase & Cloud', proficiency: 0.88, icon_code: 'firebase' },
      { name: 'Backend & APIs', proficiency: 0.88, icon_code: 'api' },
      { name: 'Git & CI/CD', proficiency: 0.90, icon_code: 'git' },
    ],
  };

  // ==========================================
  // 2. INLINE SVG ICONS (ZERO NETWORK REQUESTS)
  // ==========================================
  const SKILL_ICONS = {
    android: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M1 18q.225-2.675 1.638-4.925T6.4 9.5L4.55 6.3q-.15-.225-.075-.475T4.8 5.45q.2-.125.45-.05t.4.3L7.5 8.9Q9.65 8 12 8t4.5.9l1.85-3.2q.15-.225.4-.3t.45.05q.25.125.325.375t-.075.475L17.6 9.5q2.35 1.325 3.762 3.575T23 18zm6-2.75q.525 0 .888-.363T8.25 14t-.363-.888T7 12.75t-.888.363T5.75 14t.363.888t.887.362m10 0q.525 0 .888-.363T18.25 14t-.363-.888T17 12.75t-.888.363t-.362.887t.363.888t.887.362"/></svg>`,
    api: `<svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5L7.5 9l1.875 4.5M6 13.5L5.5 15m.5-1.5h3.375m0 0L10 15m2.5-3V9.7c0-.186 0-.28.024-.355a.5.5 0 0 1 .322-.32C12.92 9 13.013 9 13.2 9h1.3a1.5 1.5 0 0 1 0 3zm0 0v3m6-6v6"/></g></svg>`,
    dart: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M4.105 4.105S9.158 1.58 11.684.316a3.1 3.1 0 0 1 1.481-.315c.766.047 1.677.788 1.677.788L24 9.948v9.789h-4.263V24H9.789l-9-9C.303 14.5 0 13.795 0 13.105c0-.319.18-.818.316-1.105zm.679.679v11.787c.002.543.021 1.024.498 1.508L10.204 23h8.533v-4.263zm12.055-.678c-.899-.896-1.809-1.78-2.74-2.643c-.302-.267-.567-.468-1.07-.462c-.37.014-.87.195-.87.195L6.341 4.105z"/></svg>`,
    flutter: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M5.9 15.375L2.5 12l11-11h6.775zM13.5 23l-5.925-5.925L13.5 11.15h6.775l-5.925 5.925L20.275 23z"/></svg>`,
    firebase: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19.455 8.369c-.538-.748-1.778-2.285-3.681-4.569a447 447 0 0 0-1.884-2.245l-.488-.576l-.207-.245l-.113-.133l-.022-.032l-.01-.005L12.57 0l-.609.488a13.34 13.34 0 0 0-3.681 4.64a11.4 11.4 0 0 0-1.043 3.176a12 12 0 0 0-.121.738a11 11 0 0 0-.632-.033l-.059-.003a7.5 7.5 0 0 0-2.28.274l-.317.089l-.163.286a9.6 9.6 0 0 0-1.252 4.416a9.53 9.53 0 0 0 1.583 5.625a9.57 9.57 0 0 0 4.42 3.611l.236.095l.071.025l.003-.001a9.6 9.6 0 0 0 2.941.568q.171.006.342.006a9.5 9.5 0 0 0 3.69-.742l.008.004l.313-.145a9.63 9.63 0 0 0 3.927-3.335a9.6 9.6 0 0 0 1.641-5.042c.075-2.161-.643-4.304-2.133-6.371m-7.083 6.695c.328 1.244.264 2.44-.191 3.558c-1.135-1.12-1.967-2.352-2.475-3.665c-.543-1.404-.87-2.74-.974-3.975c.48.157.922.366 1.315.622c1.132.737 1.914 1.902 2.325 3.461zm.207 6.022c.482.368.99.712 1.513 1.028a7.9 7.9 0 0 1-2.369.273a8 8 0 0 1-.373-.022a9 9 0 0 0 1.228-1.279zm1.347-6.431c-.516-1.957-1.527-3.437-3.002-4.398a7.4 7.4 0 0 0-2.194-.95a9 9 0 0 1 .089-.713a11.6 11.6 0 0 1 .91-2.765l.004-.008c.177-.358.376-.719.61-1.105l.092-.152l-.003-.001a11.7 11.7 0 0 1 1.942-2.311l.288.341c.672.796 1.304 1.548 1.878 2.237c1.291 1.549 2.966 3.583 3.612 4.48c1.277 1.771 1.893 3.579 1.83 5.375a7.97 7.97 0 0 1-3.995 6.641a15.5 15.5 0 0 1-2.539-1.599c.79-1.575.952-3.28.479-5.072zm-2.575 5.397a7.9 7.9 0 0 1-2.09 1.856a6 6 0 0 1-.243-.093l-.065-.026a7.97 7.97 0 0 1-3.635-3.01a7.94 7.94 0 0 1-1.298-4.653a7.9 7.9 0 0 1 .882-3.379q.476-.105.96-.131l.084-.002q.245-.005.478 0q.341.017.677.07c.073 1.513.445 3.145 1.105 4.852c.637 1.644 1.694 3.162 3.144 4.515z"/></svg>`,
    git: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M2.6 10.59L8.38 4.8l1.69 1.7c-.24.85.15 1.78.93 2.23v5.54c-.6.34-1 .99-1 1.73a2 2 0 0 0 2 2a2 2 0 0 0 2-2c0-.74-.4-1.39-1-1.73V9.41l2.07 2.09c-.07.15-.07.32-.07.5a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2c-.18 0-.35 0-.5.07L13.93 7.5a1.98 1.98 0 0 0-1.15-2.34c-.43-.16-.88-.2-1.28-.09L9.8 3.38l.79-.78c.78-.79 2.04-.79 2.82 0l7.99 7.99c.79.78.79 2.04 0 2.82l-7.99 7.99c-.78.79-2.04.79-2.82 0L2.6 13.41c-.79-.78-.79-2.04 0-2.82"/></svg>`,
    payments: `<svg viewBox="0 0 28 28"><path fill="currentColor" d="M18.25 16.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5zM2.004 8.75A3.75 3.75 0 0 1 5.754 5H22.25A3.75 3.75 0 0 1 26 8.75v10.5A3.75 3.75 0 0 1 22.25 23H5.755a3.75 3.75 0 0 1-3.75-3.75zm3.75-2.25a2.25 2.25 0 0 0-2.25 2.25v.75H24.5v-.75a2.25 2.25 0 0 0-2.25-2.25zm-2.25 12.75a2.25 2.25 0 0 0 2.25 2.25H22.25a2.25 2.25 0 0 0 2.25-2.25V11H3.505z"/></svg>`,
    storage: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M5.308 19.577q-.65 0-1.114-.463t-.463-1.115t.463-1.113t1.114-.463h13.384q.65 0 1.114.464T20.269 18t-.463 1.114t-1.114.462zm0-12q-.65 0-1.114-.463t-.463-1.115t.463-1.113t1.114-.463h13.384q.65 0 1.114.464T20.269 6t-.463 1.114t-1.114.462zm0 6q-.65 0-1.114-.463t-.463-1.115t.463-1.113t1.114-.463h13.384q.65 0 1.114.464T20.269 12t-.463 1.114t-1.114.462zm.772-6.77q.345 0 .575-.232t.23-.578t-.233-.575t-.578-.23t-.575.234t-.23.577t.234.575t.577.23m0 6q.345 0 .575-.233t.23-.578t-.233-.575t-.578-.23t-.575.234t-.23.577t.234.575t.577.23m0 6q.345 0 .575-.233t.23-.578t-.233-.575t-.578-.23t-.575.233t-.23.578t.234.575t.577.23"/></svg>`,
    agile: `<svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M17.5 19H22m0 0l-2.5-2.5M22 19l-2.5 2.5M12 2L9.5 4.5L12 7"/><path d="M10.5 4.5a7.5 7.5 0 0 1 0 15H2"/><path d="M6.756 5.5A7.5 7.5 0 0 0 3 12c0 1.688.558 3.246 1.5 4.5"/></g></svg>`,
    code: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M4.825 12.025L8.7 15.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.213-.325T2.426 12t.063-.375t.212-.325l4.6-4.6q.3-.3.713-.3t.712.3t.3.713t-.3.712zm14.35-.05L15.3 8.1q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.6 4.6q-.3.3-.7.288t-.7-.313t-.3-.712t.3-.713z"/></svg>`,
  };

  function getSkillSvg(code) {
    const key = String(code || '').toLowerCase().trim();
    switch (key) {
      case 'android':
        return SKILL_ICONS.android;
      case 'api':
        return SKILL_ICONS.api;
      case 'dart':
        return SKILL_ICONS.dart;
      case 'flutter':
        return SKILL_ICONS.flutter;
      case 'firebase':
        return SKILL_ICONS.firebase;
      case 'git':
      case 'version_control':
        return SKILL_ICONS.git;
      case 'payments':
      case 'payment':
        return SKILL_ICONS.payments;
      case 'storage':
      case 'database':
        return SKILL_ICONS.storage;
      case 'agile':
      case 'scrum':
        return SKILL_ICONS.agile;
      case 'architecture':
      case 'code':
      default:
        return SKILL_ICONS.code;
    }
  }

  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ==========================================
  // 3. INTERSECTION OBSERVER FOR REVEALS
  // ==========================================
  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  function observeReveals(root = document) {
    const elements = root.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => revealObserver.observe(el));
  }

  // ==========================================
  // 4. DOM RENDERERS & DATE SORTING
  // ==========================================
  const MONTH_MAP = {
    jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
    jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
  };

  function parseSingleDate(part) {
    if (!part) return 0;
    const clean = part.trim().toLowerCase();
    if (clean.includes('present') || clean.includes('now') || clean.includes('current')) {
      return 9999 * 12 + 12;
    }
    const yearMatch = clean.match(/\b(19|20)\d{2}\b/);
    const year = yearMatch ? parseInt(yearMatch[0], 10) : 0;
    let month = 1;
    for (const [mName, mVal] of Object.entries(MONTH_MAP)) {
      if (clean.includes(mName)) {
        month = mVal;
        break;
      }
    }
    return year * 12 + month;
  }

  function sortExperiencesByDate(experiences) {
    return [...experiences].sort((a, b) => {
      const partsA = String(a.period || '').split(/[-–—]/);
      const partsB = String(b.period || '').split(/[-–—]/);

      const startA = parseSingleDate(partsA[0]);
      const endA = parseSingleDate(partsA[1] || partsA[0]);

      const startB = parseSingleDate(partsB[0]);
      const endB = parseSingleDate(partsB[1] || partsB[0]);

      // Sort by start date descending first, then end date descending
      if (startB !== startA) return startB - startA;
      if (endB !== endA) return endB - endA;
      return (a.id || 0) - (b.id || 0);
    });
  }

  function renderExperience(experiences) {
    const container = document.getElementById('experience-container');
    if (!container) return;

    const sorted = sortExperiencesByDate(experiences);

    container.innerHTML = sorted
      .map(
        (exp, idx) => `
      <div class="experience-item reveal-on-scroll" style="--stagger: ${idx * 60}ms">
        <div class="timeline-dot" aria-hidden="true"></div>
        <article class="neumorphic-card experience-card">
          <div class="experience-header">
            <h3 class="experience-role">${escapeHtml(exp.role)}</h3>
            <span class="experience-period">${escapeHtml(exp.period)}</span>
          </div>
          <p class="experience-company">${escapeHtml(exp.company)}</p>
          <p class="experience-desc">${escapeHtml(exp.description)}</p>
        </article>
      </div>
    `
      )
      .join('');

    observeReveals(container);
  }

  function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = projects
      .map((project, idx) => {
        const techs = Array.isArray(project.technologies) ? project.technologies : [];
        const hasLink = Boolean(project.link);
        const tag = hasLink ? 'a' : 'article';
        const linkAttrs = hasLink
          ? `href="${escapeHtml(project.link)}" target="_blank" rel="noopener noreferrer"`
          : '';

        return `
        <${tag} ${linkAttrs} class="neumorphic-card project-card ${
          hasLink ? 'clickable' : ''
        } reveal-on-scroll" style="--stagger: ${idx * 60}ms">
          <div class="project-image-wrapper">
            <img
              src="${escapeHtml(project.image_url)}"
              alt="${escapeHtml(project.title)}"
              class="project-image"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="project-body">
            <h3 class="project-title">${escapeHtml(project.title)}</h3>
            <p class="project-description">${escapeHtml(project.description)}</p>
            <div class="tech-badges">
              ${techs.map((t) => `<span class="tech-badge">${escapeHtml(t)}</span>`).join('')}
            </div>
          </div>
        </${tag}>
      `;
      })
      .join('');

    observeReveals(container);
  }

  function renderSkills(skills) {
    const container = document.getElementById('skills-container');
    if (!container) return;

    container.innerHTML = skills
      .map((skill, idx) => {
        const prof = Math.max(0, Math.min(1, Number(skill.proficiency) || 0));
        return `
        <div
          class="neumorphic-card skill-card reveal-on-scroll"
          style="--stagger: ${idx * 50}ms; --proficiency: ${prof}"
        >
          <div class="skill-icon-wrap" aria-hidden="true">
            ${getSkillSvg(skill.icon_code)}
          </div>
          <div class="skill-info">
            <span class="skill-name">${escapeHtml(skill.name)}</span>
            <div class="progress-track" role="progressbar" aria-valuenow="${Math.round(
              prof * 100
            )}" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-fill"></div>
            </div>
          </div>
        </div>
      `;
      })
      .join('');

    observeReveals(container);
  }

  // ==========================================
  // 5. FAST PARALLEL SUPABASE FETCH + CACHE
  // ==========================================
  async function fetchTable(queryPath) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${queryPath}`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  async function loadPortfolioData() {
    // 1. Instant render from sessionStorage if available
    let hasCachedRender = false;
    try {
      const cachedRaw = sessionStorage.getItem(CACHE_KEY);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw);
        if (cached.experiences && cached.projects && cached.skills) {
          renderExperience(cached.experiences);
          renderProjects(cached.projects);
          renderSkills(cached.skills);
          hasCachedRender = true;
        }
      }
    } catch (_) {
      // Ignore storage errors
    }

    // 2. Fetch fresh data in parallel from Supabase REST API
    try {
      const [experiences, projects, skills] = await Promise.all([
        fetchTable('experiences?select=*&order=id.asc'),
        fetchTable('projects?select=*'),
        fetchTable('skills?select=*'),
      ]);

      renderExperience(experiences.length ? experiences : FALLBACK_DATA.experiences);
      renderProjects(projects.length ? projects : FALLBACK_DATA.projects);
      renderSkills(skills.length ? skills : FALLBACK_DATA.skills);

      try {
        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ experiences, projects, skills })
        );
      } catch (_) {}
    } catch (err) {
      if (!hasCachedRender) {
        renderExperience(FALLBACK_DATA.experiences);
        renderProjects(FALLBACK_DATA.projects);
        renderSkills(FALLBACK_DATA.skills);
      }
    }
  }

  // ==========================================
  // 6. SMOOTH NAVIGATION & SCROLL SPY
  // ==========================================
  function initNavigation() {
    const dockButtons = document.querySelectorAll('.dock-item');
    const exploreBtn = document.getElementById('explore-work-btn');

    function setActiveDock(index) {
      dockButtons.forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
      });
    }

    function scrollToSectionId(id, index) {
      const target = document.getElementById(id);
      if (!target) return;
      setActiveDock(index);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    dockButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const index = Number(btn.getAttribute('data-index'));
        scrollToSectionId(targetId, index);
      });
    });

    if (exploreBtn) {
      exploreBtn.addEventListener('click', () => {
        scrollToSectionId('projects', 2);
      });
    }

    // Passive scroll listener matching Flutter's scroll offset logic + section positions
    let ticking = false;
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            const vh = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            const expEl = document.getElementById('experience');
            const projEl = document.getElementById('projects');
            const contactEl = document.getElementById('contact');

            if (scrollY + vh >= docHeight - 100) {
              setActiveDock(3);
            } else if (contactEl && scrollY >= contactEl.offsetTop - vh * 0.45) {
              setActiveDock(3);
            } else if (projEl && scrollY >= projEl.offsetTop - vh * 0.45) {
              setActiveDock(2);
            } else if (expEl && scrollY >= expEl.offsetTop - vh * 0.45) {
              setActiveDock(1);
            } else {
              setActiveDock(0);
            }
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  // ==========================================
  // 7. 120FPS GPU-ACCELERATED CUSTOM CURSOR
  // ==========================================
  function initCustomCursor() {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const outer = document.getElementById('cursor-outer');
    const dot = document.getElementById('cursor-dot');
    if (!outer || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let outerX = 0;
    let outerY = 0;
    let visible = false;
    let rafId = null;

    function renderCursor() {
      const dx = mouseX - outerX;
      const dy = mouseY - outerY;
      outerX += dx * 0.22;
      outerY += dy * 0.22;

      outer.style.transform = `translate3d(${outerX.toFixed(1)}px, ${outerY.toFixed(1)}px, 0)`;

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        rafId = requestAnimationFrame(renderCursor);
      } else {
        rafId = null;
      }
    }

    window.addEventListener(
      'mousemove',
      (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!visible) {
          visible = true;
          outerX = mouseX;
          outerY = mouseY;
          outer.style.opacity = '1';
          dot.style.opacity = '1';
        }

        // Instant core dot
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

        if (!rafId) {
          rafId = requestAnimationFrame(renderCursor);
        }
      },
      { passive: true }
    );

    document.addEventListener('mouseleave', () => {
      visible = false;
      outer.style.opacity = '0';
      dot.style.opacity = '0';
    });
  }

  // ==========================================
  // INITIALIZE APP
  // ==========================================
  // Unregister any old Flutter service workers from previous deployments
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    observeReveals(document);
    initNavigation();
    initCustomCursor();
    loadPortfolioData();
  });
})();
