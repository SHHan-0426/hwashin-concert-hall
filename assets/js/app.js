/* =====================================================================
   진화신 공연장 — 동작 로직
   ===================================================================== */
(function () {
  "use strict";

  /* ---- 유틸 ---- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (t) => String(t == null ? "" : t).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* 영상 카드 1개 → HTML */
  function cardHTML(v, idx) {
    const thumb = v.yt
      ? `<img src="https://i.ytimg.com/vi/${esc(v.yt)}/hqdefault.jpg" alt="${esc(v.title)}" loading="lazy"
            onerror="this.style.display='none'">`
      : `<span class="ph">▶ 영상 보기</span>`;
    const badge = v.composer ? `<span class="badge">${esc(v.composer)}</span>` : "";
    return `<article class="vcard" data-idx="${idx}">
        <div class="thumb">${thumb}${badge}<span class="play"></span></div>
        <div class="body">
          <span class="group">${esc(v.group)}</span>
          <h4>${esc(v.title)}</h4>
          <p class="sub">${esc(v.sub)}</p>
        </div>
      </article>`;
  }

  /* ---- 홈: 통계 ---- */
  function renderStats() {
    const unique = new Set(VIDEOS.filter((v) => v.yt).map((v) => v.yt)).size;
    const halls = Object.keys(HALLS).length;
    $("#stat-total").textContent = unique;
    $("#stat-halls").textContent = halls;
  }

  /* ---- 홈: 오늘의 대표곡 (2곡 랜덤 + 셔플) ---- */
  function renderFeatured() {
    const pool = VIDEOS.filter((v) => v.yt && v.yt.length > 5);
    let lastSet = new Set();

    function pick2() {
      const fresh = pool.filter((v) => !lastSet.has(v.yt));
      const src = fresh.length >= 2 ? fresh : pool;
      const shuffled = [...src].sort(() => Math.random() - 0.5).slice(0, 2);
      lastSet = new Set(shuffled.map((v) => v.yt));
      return shuffled;
    }

    function draw() {
      const picks = pick2();
      $("#featured-grid").innerHTML = picks
        .map((v) => cardHTML(v, VIDEOS.indexOf(v))).join("");
    }

    draw();

    $("#shuffle-btn").addEventListener("click", function () {
      draw();
      const icon = this.querySelector(".sh-icon");
      if (icon) {
        icon.style.transition = "transform .4s";
        icon.style.transform = "rotate(360deg)";
        setTimeout(() => { icon.style.transform = ""; icon.style.transition = ""; }, 420);
      }
    });
  }

  /* ---- 홀 입장 카드 ---- */
  function renderHallCards() {
    $("#hall-cards").innerHTML = Object.entries(HALLS).map(([key, h]) => {
      const n = VIDEOS.filter((v) => v.hall === key).length;
      return `<a class="hall-card" href="#hall-${key}" style="background:linear-gradient(150deg,${h.accent},${h.accent}cc)">
          <span class="deco">♪</span>
          <span class="no">${esc(h.no)}</span>
          <h3>${esc(h.name)}</h3>
          <span class="quote">"${esc(h.sub)}"</span>
          <span class="d">${esc(h.desc)} · 영상 ${n}편</span>
          <span class="enter">입장하기 →</span>
        </a>`;
    }).join("");
  }

  /* ---- 각 홀(무대) 섹션 ---- */
  function renderHalls() {
    const host = $("#stages");
    let html = "";
    Object.entries(HALLS).forEach(([key, h], i) => {
      const vids = VIDEOS.filter((v) => v.hall === key);
      const groups = [...new Set(vids.map((v) => v.group))];
      const tabs = groups.length > 1
        ? `<div class="group-tabs" data-hall="${key}">
             <button class="on" data-g="all">전체</button>
             ${groups.map((g) => `<button data-g="${esc(g)}">${esc(g)}</button>`).join("")}
           </div>` : "";
      html += `<section class="stage ${i % 2 ? "alt" : ""}" id="hall-${key}">
        <div class="wrap">
          <div class="stage-banner" style="background:linear-gradient(135deg,${h.accent},${h.accent}dd)">
            <div>
              <div class="no">${esc(h.no)}</div>
              <h2>${esc(h.name)}</h2>
              <div class="q">"${esc(h.sub)}"</div>
            </div>
            <div class="cnt">${esc(h.desc)}<br>총 ${vids.length}편</div>
          </div>
          ${tabs}
          <div class="grid" id="grid-${key}">
            ${vids.map((v) => cardHTML(v, VIDEOS.indexOf(v))).join("")}
          </div>
          <div class="expand-row">
            <button class="expand-btn" id="expand-${key}" data-hall="${key}">전체 보기 ▼</button>
          </div>
        </div>
      </section>`;
    });
    host.innerHTML = html;

    /* 각 홀 : 탭 필터 + 전체 보기 */
    Object.keys(HALLS).forEach((key) => {
      const gridEl = $(`#grid-${key}`);
      const expandBtn = $(`#expand-${key}`);
      const tabbar = $(`.group-tabs[data-hall="${key}"]`);
      let currentFilter = "all";
      let expanded = false;

      function updateGrid() {
        const cards = $$(".vcard", gridEl);
        let shown = 0, total = 0;
        cards.forEach((card) => {
          const v = VIDEOS[+card.dataset.idx];
          const matches = (currentFilter === "all" || v.group === currentFilter);
          if (!matches) {
            card.hidden = true;
          } else {
            total++;
            card.hidden = (!expanded && shown >= 2);
            if (!card.hidden) shown++;
          }
        });
        if (expandBtn) {
          expandBtn.style.display = total > 2 ? "" : "none";
          expandBtn.textContent = expanded
            ? "접기 ▲"
            : `전체 보기 (${total}편) ▼`;
        }
      }

      updateGrid();

      if (tabbar) {
        tabbar.addEventListener("click", (e) => {
          const btn = e.target.closest("button");
          if (!btn) return;
          currentFilter = btn.dataset.g;
          expanded = false;
          $$("button", tabbar).forEach((b) => b.classList.toggle("on", b === btn));
          updateGrid();
        });
      }

      if (expandBtn) {
        expandBtn.addEventListener("click", () => {
          expanded = !expanded;
          updateGrid();
        });
      }
    });
  }

  /* ---- 이달의 무대 ---- */
  function renderMonthly() {
    $("#m-month").textContent = MONTHLY.month;
    $("#m-theme").textContent = MONTHLY.theme;
    $("#m-comment").textContent = MONTHLY.comment;
    const picks = MONTHLY.picks
      .map((t) => VIDEOS.find((v) => v.title.includes(t) || t.includes(v.title)))
      .filter(Boolean);
    $("#m-grid").innerHTML = picks.map((v) => cardHTML(v, VIDEOS.indexOf(v))).join("");
  }

  /* ---- 아티스트 룸: 함께한 아티스트 ---- */
  function renderPartners() {
    const map = {};
    VIDEOS.forEach((v) => { if (v.partner) (map[v.partner] = map[v.partner] || []).push(v.title); });
    const roles = { "강주원": "바리톤", "문미란": "메조소프라노" };
    $("#partners").innerHTML = Object.keys(map).map((p) =>
      `<div><b>${esc(p)}</b><small>${esc(roles[p] || "함께한 성악가")} · ${map[p].length}곡</small></div>`
    ).join("") || `<div><small>준비 중입니다</small></div>`;
  }

  /* ---- 모달 플레이어 ---- */
  const modal = $("#modal");
  function openVideo(v) {
    const vidBox = $("#modal-vid");
    if (v.yt) {
      vidBox.innerHTML = `<iframe src="https://www.youtube.com/embed/${esc(v.yt)}?autoplay=1&rel=0"
        title="${esc(v.title)}" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>`;
    } else {
      const q = encodeURIComponent("진화신 " + v.title);
      vidBox.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;flex-direction:column;gap:16px;color:#e2cd8c;text-align:center;padding:24px;font-family:'Noto Serif KR',serif">
          <div style="font-size:1.1rem">아직 사이트 내 재생이 연결되지 않은 무대입니다.</div>
          <a class="btn btn-gold" target="_blank" rel="noopener"
             href="${CHANNEL.searchBase}${q}">유튜브 이든채널에서 보기 →</a>
        </div>`;
    }
    const ytUrl = v.yt ? `https://youtu.be/${v.yt}`
      : `${CHANNEL.searchBase}${encodeURIComponent("진화신 " + v.title)}`;
    $("#modal-title").textContent = v.title;
    $("#modal-sub").textContent = v.sub + (v.composer ? " · " + v.composer : "");
    $("#modal-yt").href = ytUrl;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeVideo() {
    modal.classList.remove("open");
    $("#modal-vid").innerHTML = "";
    document.body.style.overflow = "";
  }
  $("#modal-close").addEventListener("click", closeVideo);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeVideo(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeVideo(); });

  /* 카드 클릭 위임 */
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".vcard");
    if (card) openVideo(VIDEOS[+card.dataset.idx]);
  });

  /* ---- 방명록 (localStorage v1) ---- */
  const GB_KEY = "hwashin_guestbook_v1";
  const loadGB = () => { try { return JSON.parse(localStorage.getItem(GB_KEY)) || []; } catch { return []; } };
  const saveGB = (a) => localStorage.setItem(GB_KEY, JSON.stringify(a));

  function renderGB() {
    const list = loadGB();
    const host = $("#gb-list");
    if (!list.length) {
      host.innerHTML = `<div class="gb-empty">첫 번째 감상을 남겨주세요. 당신의 한 줄이 이 공연장을 채웁니다. ♪</div>`;
      return;
    }
    host.innerHTML = list.map((g, i) => `<div class="gb-item">
        <div class="top"><span class="nick">${esc(g.nick)}</span><span class="date">${esc(g.date)}</span></div>
        <div class="msg">${esc(g.msg)}</div>
        <div class="react" data-i="${i}">
          <button data-r="like">👏 <span>${g.r?.like || 0}</span></button>
          <button data-r="move">🥹 <span>${g.r?.move || 0}</span></button>
          <button data-r="grace">🙏 <span>${g.r?.grace || 0}</span></button>
        </div>
      </div>`).join("");
  }

  $("#gb-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const nick = $("#gb-nick").value.trim() || "익명의 관객";
    const msg = $("#gb-msg").value.trim();
    if (!msg) { toast("감상 한 줄을 적어주세요."); return; }
    const d = new Date();
    const date = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
    const list = loadGB();
    list.unshift({ nick, msg, date, r: { like: 0, move: 0, grace: 0 } });
    saveGB(list); renderGB();
    e.target.reset();
    toast("소중한 감상 감사합니다 ♪");
  });

  $("#gb-list").addEventListener("click", (e) => {
    const btn = e.target.closest("button"); if (!btn) return;
    const i = +btn.closest(".react").dataset.i, r = btn.dataset.r;
    const list = loadGB();
    list[i].r = list[i].r || {}; list[i].r[r] = (list[i].r[r] || 0) + 1;
    saveGB(list); renderGB();
  });

  /* 곡 신청 */
  $("#req-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const song = $("#req-song").value.trim();
    if (!song) return;
    const list = loadGB();
    list.unshift({ nick: "🎵 곡 신청", msg: `"${song}" 무대를 듣고 싶어요!`,
      date: new Date().toLocaleDateString("ko-KR"), r: { like: 0, move: 0, grace: 0 } });
    saveGB(list); renderGB();
    e.target.reset();
    toast("신청이 방명록에 등록되었습니다. 운영자가 확인합니다 ♪");
  });

  /* ---- 공유 ---- */
  $("#share-row").addEventListener("click", (e) => {
    const btn = e.target.closest("button"); if (!btn) return;
    const url = location.href.split("#")[0];
    const text = "소프라노 진화신의 디지털 공연장 — Hwashin Jin Concert Hall";
    const type = btn.dataset.share;
    if (type === "copy") {
      navigator.clipboard?.writeText(url).then(() => toast("링크가 복사되었습니다 ♪"),
        () => toast(url));
    } else if (type === "kakao") {
      window.open("https://sharer.kakao.com/talk/friends/picker/link?url=" + encodeURIComponent(url), "_blank");
    } else if (type === "fb") {
      window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url), "_blank");
    } else if (type === "x") {
      window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(url), "_blank");
    }
  });

  /* ---- 토스트 ---- */
  let toastTimer;
  function toast(msg) {
    let t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
  }

  /* ---- 네비 동작 ---- */
  const topbar = $("#topbar");
  window.addEventListener("scroll", () => topbar.classList.toggle("solid", window.scrollY > 40));

  /* 하단 탭바 — 스크롤 위치에 따라 현재 섹션 강조 */
  const tabs = $$("#tabbar a");
  const secOrder = ["top", "halls", "artist", "monthly", "guest"];
  // data-sec 가 가리키는 섹션 id 와 화면 위치를 비교해 가장 가까운 탭을 활성화
  const secEls = { top: $("#top"), halls: $("#halls"), artist: $("#artist"), monthly: $("#monthly"), guest: $("#guest") };
  function syncTab() {
    const y = window.scrollY + window.innerHeight * 0.35;
    let current = "top";
    secOrder.forEach((k) => { const el = secEls[k]; if (el && el.offsetTop <= y) current = k; });
    tabs.forEach((a) => a.classList.toggle("on", a.dataset.sec === current));
  }
  window.addEventListener("scroll", syncTab, { passive: true });
  window.addEventListener("resize", syncTab);
  syncTab();

  /* ---- 초기화 ---- */
  renderStats();
  renderFeatured();
  renderHallCards();
  renderHalls();
  renderMonthly();
  renderPartners();
  renderGB();
})();
