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

  /* ---- 시드 난수 (날짜 기반, 결정론적) ---- */
  function makeRng(seed) {
    let s = (seed >>> 0) || 1;
    return function () {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }
  function dateSeed() {
    const d = new Date();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  }
  function monthSeed() {
    const d = new Date();
    return d.getFullYear() * 100 + (d.getMonth() + 1);
  }
  function seededSample(arr, n, seed) {
    const rng = makeRng(seed >>> 0);
    const idx = [...arr.keys()].sort(() => rng() - 0.5).slice(0, n);
    return idx.map((i) => arr[i]);
  }

  /* 영상 카드 1개 HTML */
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
    $("#stat-total").textContent = unique;
    $("#stat-halls").textContent = Object.keys(HALLS).length;
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
      $("#featured-grid").innerHTML = pick2().map((v) => cardHTML(v, VIDEOS.indexOf(v))).join("");
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

  /* ---- 각 홀 섹션 ---- */
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

    const hallKeys = Object.keys(HALLS);
    Object.keys(HALLS).forEach((key) => {
      const gridEl = $(`#grid-${key}`);
      const expandBtn = $(`#expand-${key}`);
      const tabbar = $(`.group-tabs[data-hall="${key}"]`);
      let currentFilter = "all";
      let expanded = false;

      function updateGrid() {
        const cards = $$(".vcard", gridEl);
        const visible = cards.filter((card) => {
          const v = VIDEOS[+card.dataset.idx];
          return (currentFilter === "all" || v.group === currentFilter);
        });
        const total = visible.length;
        const hallIdx = hallKeys.indexOf(key);
        const seed = dateSeed() * 10000 + hallIdx * 1000 + currentFilter.length;
        const todaySet = new Set(
          seededSample(visible, Math.min(2, total), seed).map((c) => c.dataset.idx)
        );
        cards.forEach((card) => {
          const v = VIDEOS[+card.dataset.idx];
          const matches = (currentFilter === "all" || v.group === currentFilter);
          card.hidden = !matches || (!expanded && !todaySet.has(card.dataset.idx));
        });
        if (expandBtn) {
          expandBtn.style.display = total > 2 ? "" : "none";
          expandBtn.textContent = expanded ? "접기 ▲" : `전체 보기 (${total}편) ▼`;
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
        expandBtn.addEventListener("click", () => { expanded = !expanded; updateGrid(); });
      }
    });
  }

  /* ---- 이달의 무대 (월간 시드 자동 2곡) ---- */
  function renderMonthly() {
    const pool = VIDEOS.filter((v) => v.yt && v.yt.length > 5);
    const picks = seededSample(pool, 2, monthSeed() * 997 + 137);
    $("#m-month").textContent = MONTHLY.month;
    $("#m-theme").textContent = MONTHLY.theme;
    $("#m-comment").textContent = MONTHLY.comment;
    $("#m-grid").innerHTML = picks.map((v) => cardHTML(v, VIDEOS.indexOf(v))).join("");
  }

  /* ---- 아티스트 룸 ---- */
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
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".vcard");
    if (card) openVideo(VIDEOS[+card.dataset.idx]);
  });

  /* ====================================================================
     방명록 — Firebase Realtime Database (설정 시) / localStorage (폴백)
     ==================================================================== */
  const FB = (typeof FIREBASE_DB_URL !== "undefined" && FIREBASE_DB_URL)
    ? FIREBASE_DB_URL.replace(/\/$/, "")
    : null;

  const GB_KEY = "hwashin_guestbook_v1";
  const REACT_KEY = "hwashin_gb_reacts";

  /* localStorage 헬퍼 */
  const loadLocal = () => { try { return JSON.parse(localStorage.getItem(GB_KEY)) || []; } catch { return []; } };
  const saveLocal = (a) => localStorage.setItem(GB_KEY, JSON.stringify(a));

  /* 날짜 포맷 */
  function fmtDate(iso) {
    const d = iso ? new Date(iso) : new Date();
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  }

  /* 반응 가져오기 */
  function getReact(id) {
    const r = JSON.parse(localStorage.getItem(REACT_KEY) || "{}");
    return r[id] || { like: 0, move: 0, grace: 0 };
  }
  function setReact(id, type) {
    const r = JSON.parse(localStorage.getItem(REACT_KEY) || "{}");
    r[id] = r[id] || { like: 0, move: 0, grace: 0 };
    r[id][type] = (r[id][type] || 0) + 1;
    localStorage.setItem(REACT_KEY, JSON.stringify(r));
    return r[id];
  }

  /* 항목 HTML */
  function gbHTML(item, i) {
    const id = esc(String(item._key || item.id || i));
    const nick = esc(item.nickname || item.nick || "익명의 관객");
    const msg = esc(item.message || item.msg || "");
    const date = esc(item.created_at ? fmtDate(item.created_at) : (item.date || ""));
    const rk = item._key || String(i);
    const react = getReact(rk);
    return `<div class="gb-item" data-id="${id}" data-key="${esc(rk)}">
        <div class="top"><span class="nick">${nick}</span><span class="date">${date}</span></div>
        <div class="msg">${msg}</div>
        <div class="react">
          <button data-r="like">👏 <span>${react.like}</span></button>
          <button data-r="move">🥹 <span>${react.move}</span></button>
          <button data-r="grace">🙏 <span>${react.grace}</span></button>
        </div>
      </div>`;
  }

  /* 렌더링 */
  function renderGB(list) {
    const host = $("#gb-list");
    if (!list || !list.length) {
      host.innerHTML = `<div class="gb-empty">첫 번째 감상을 남겨주세요. 당신의 한 줄이 이 공연장을 채웁니다. ♪</div>`;
      return;
    }
    host.innerHTML = list.map((g, i) => gbHTML(g, i)).join("");
  }

  /* 방명록 로드 */
  async function loadGB() {
    if (FB) {
      try {
        const r = await fetch(FB + "/guestbook.json");
        if (r.ok) {
          const data = await r.json();
          if (data && typeof data === "object") {
            /* Firebase는 {key: item} 객체로 반환 → 배열로 변환 후 최신순 정렬 */
            const items = Object.entries(data)
              .map(([k, v]) => Object.assign({}, v, { _key: k }))
              .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
              .slice(0, 50);
            renderGB(items);
          } else {
            renderGB([]);
          }
          return;
        }
      } catch (e) { /* 네트워크 오류 시 로컬로 폴백 */ }
    }
    renderGB(loadLocal());
  }

  /* 방명록 저장 */
  async function postGB(nick, msg) {
    if (FB) {
      try {
        const r = await fetch(FB + "/guestbook.json", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nickname: nick,
            message: msg,
            created_at: new Date().toISOString()
          })
        });
        if (r.ok) {
          await loadGB(); /* 저장 후 목록 새로고침 */
          return true;
        }
      } catch (e) { /* 폴백 */ }
    }
    /* localStorage 폴백 */
    const list = loadLocal();
    list.unshift({ nick, msg, date: fmtDate(), r: { like: 0, move: 0, grace: 0 } });
    saveLocal(list);
    renderGB(list);
    return true;
  }

  /* 폼 제출 */
  $("#gb-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nick = $("#gb-nick").value.trim() || "익명의 관객";
    const msg = $("#gb-msg").value.trim();
    if (!msg) { toast("감상 한 줄을 적어주세요."); return; }
    const btn = e.target.querySelector("button[type=submit]");
    if (btn) { btn.disabled = true; btn.textContent = "저장 중…"; }
    await postGB(nick, msg);
    e.target.reset();
    if (btn) { btn.disabled = false; btn.textContent = "방명록에 남기기 ♪"; }
    toast("소중한 감상 감사합니다 ♪");
  });

  /* 반응 버튼 — 로컬 저장 + 화면 즉시 반영 */
  $("#gb-list").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-r]");
    if (!btn) return;
    const item = btn.closest(".gb-item");
    if (!item) return;
    const key = item.dataset.key;
    const type = btn.dataset.r;
    const updated = setReact(key, type);
    btn.querySelector("span").textContent = updated[type];
  });

  /* 곡 신청 */
  $("#req-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const song = $("#req-song").value.trim();
    if (!song) return;
    await postGB("🎵 곡 신청", `"${song}" 무대를 듣고 싶어요!`);
    e.target.reset();
    toast("신청이 방명록에 등록되었습니다. 운영자가 확인합니다 ♪");
  });

  /* ---- SNS 공유 ---- */
  $("#share-row").addEventListener("click", (e) => {
    const btn = e.target.closest("button"); if (!btn) return;
    const url = location.href.split("#")[0];
    const text = "소프라노 진화신의 디지털 공연장 — Hwashin Jin Concert Hall";
    const type = btn.dataset.share;
    if (type === "copy") {
      navigator.clipboard?.writeText(url).then(() => toast("링크가 복사되었습니다 ♪"), () => toast(url));
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

  /* ---- 네비 ---- */
  const topbar = $("#topbar");
  window.addEventListener("scroll", () => topbar.classList.toggle("solid", window.scrollY > 40));
  const tabs = $$("#tabbar a");
  const secOrder = ["top", "halls", "artist", "monthly", "guest"];
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
  loadGB();
})();
