/* =====================================================================
   진화신 공연장 — 콘텐츠 데이터 (실제 유튜브 ID 연결 완료)
   이든채널 (Eden Ch) 제공 영상 전체 반영
   =====================================================================
   운영자 사용법
   - yt:"영상ID" 가 채워진 카드는 클릭 시 사이트 안 인라인 재생
   - yt:"" 인 카드는 클릭 시 유튜브 채널 검색으로 연결
   - featured:true 로 두면 홈 '오늘의 추천'에 노출 (ID 있는 것 우선)
   - hall: solo(독창) / ensemble(앙상블) / sacred(성가·찬송) / conduct(지휘)
   ===================================================================== */

const CHANNEL = {
  name: "이든채널 (Eden Ch)",
  handle: "이든채널",
  url: "https://www.youtube.com/@%EC%9D%B4%EB%93%A0%ED%8B%B0%EB%B8%8C%EC%9D%B4",
  playlist: "https://www.youtube.com/playlist?list=PLaO7h8Cdr-HN8XouEC6KCS6LBwv8oh-wS",
  searchBase: "https://www.youtube.com/results?search_query="
};

/* ── 영상 카탈로그 ───────────────────────────────────────────── */
const VIDEOS = [

  /* ================================================================
     무대 1 | 독창 홀 — 오페라 아리아
     ================================================================ */
  { hall:"solo", group:"오페라 아리아", title:"Ernani, involami", sub:"베르디 「에르나니」 나를 데려가 주오", composer:"G. Verdi", yt:"3348UEMImUo", featured:true },
  { hall:"solo", group:"오페라 아리아", title:"Vissi d'arte, vissi d'amore", sub:"푸치니 「토스카」 노래에 살고 사랑에 살고", composer:"G. Puccini", yt:"UGj2bxBnf0E", featured:true },
  { hall:"solo", group:"오페라 아리아", title:"Caro nome", sub:"베르디 「리골레토」 그리운 이름이여", composer:"G. Verdi", yt:"PjdmtlD_FYk" },
  { hall:"solo", group:"오페라 아리아", title:"Regnava nel silenzio", sub:"도니체티 「람메르무어의 루치아」 밤의 장막 조용히", composer:"G. Donizetti", yt:"ZL87o5ClR3A" },
  { hall:"solo", group:"오페라 아리아", title:"Regnava nel silenzio (2)", sub:"도니체티 「람메르무어의 루치아」 다른 버전", composer:"G. Donizetti", yt:"OsF50_ikmRc" },
  { hall:"solo", group:"오페라 아리아", title:"Donde lieta uscì", sub:"푸치니 「라 보엠」 당신의 사랑의 외침소리에", composer:"G. Puccini", yt:"sAebo4FsV1U" },
  { hall:"solo", group:"오페라 아리아", title:"Il Bacio", sub:"아르디티 입맞춤", composer:"L. Arditi", yt:"szsJ7p-Zvb8" },
  { hall:"solo", group:"오페라 아리아", title:"Lascia ch'io pianga", sub:"헨델 「리날도」 울게 하소서", composer:"G. F. Händel", yt:"2URPlRXCsYw", featured:true },
  { hall:"solo", group:"오페라 아리아", title:"Nella fantasia", sub:"넬라 판타지아", composer:"E. Morricone", yt:"Ejx036emG_A" },
  { hall:"solo", group:"오페라 아리아", title:"Eccomi in lieta vesta", sub:"벨리니 「카풀레티가와 몬테키가」 행복에 겨운 나를 봐요", composer:"V. Bellini", yt:"IiHS-dORt2w" },
  { hall:"solo", group:"오페라 아리아", title:"Per pietà, bell'idol mio", sub:"빈첸초 벨리니 아름다운 나의 우상이여", composer:"V. Bellini", yt:"HZzH99QKOjo" },
  { hall:"solo", group:"오페라 아리아", title:"La conocchia", sub:"도니체티 나폴리 가곡 물레질", composer:"G. Donizetti", yt:"7vQjJInK8dc" },
  { hall:"solo", group:"오페라 아리아", title:"ROMANZA — Il corsaro", sub:"베르디 「일 코르사로」 사랑의 노래", composer:"G. Verdi", yt:"-_jk4RJ10L4" },
  { hall:"solo", group:"오페라 아리아", title:"Brindisi", sub:"축배의 노래", composer:"G. Verdi", yt:"gXISCbpjAI4" },
  { hall:"solo", group:"오페라 아리아", title:"Ma rendi pur contento", sub:"내 사랑하는 여인의 마음을", composer:"V. Bellini", yt:"2ePrjWuxTOo" },
  { hall:"solo", group:"오페라 아리아", title:"Norma | Mira, O Norma", sub:"벨리니 「노르마」 들어보시오 노르마", composer:"V. Bellini", yt:"VJt9bRQ24tc" },
  { hall:"solo", group:"오페라 아리아", title:"Coronation Mass — Agnus Dei", sub:"모차르트 대관식 미사 하느님의 어린 양", composer:"W. A. Mozart", yt:"GiPZJNhptH8" },
  { hall:"solo", group:"오페라 아리아", title:"Ah, rammenta, o bella Irene", sub:"아! 기억하시나요 사랑스런 이레네", composer:"S. Mayr", yt:"mWULPhMMN3I" },
  { hall:"solo", group:"오페라 아리아", title:"Ah, fors'è lui — La Traviata", sub:"베르디 「라 트라비아타」 아 그이였던가", composer:"G. Verdi", yt:"tZ4Ji3nWHwo" },

  /* ================================================================
     무대 1 | 독창 홀 — 한국 가곡
     ================================================================ */
  { hall:"solo", group:"한국 가곡", title:"동심초", sub:"꽃잎은 하염없이 — 김성태 곡", composer:"김성태", yt:"rOcPo4RtNJM", featured:true },
  { hall:"solo", group:"한국 가곡", title:"목련화", sub:"오 내 사랑 목련화야 — 김동진 곡", composer:"김동진", yt:"myKw35zdS_4", featured:true },
  { hall:"solo", group:"한국 가곡", title:"목련화 (2)", sub:"소프라노 진화신 · Magnolia", composer:"김동진", yt:"QnlI34RdI-s" },
  { hall:"solo", group:"한국 가곡", title:"님이 오시는지", sub:"물망초 꿈꾸는 — 김규환 곡", composer:"김규환", yt:"t0MWudTk3ZA", featured:true },
  { hall:"solo", group:"한국 가곡", title:"아리아리랑", sub:"ariarirang — 한국 가곡", composer:"", yt:"Dx2O5r-15ZY" },
  { hall:"solo", group:"한국 가곡", title:"아리아리랑 (2)", sub:"소프라노 진화신", composer:"", yt:"kmgPt7ngZqw" },
  { hall:"solo", group:"한국 가곡", title:"내 마음의 강물", sub:"수많은 날은 떠나갔어도 — 이수인 곡", composer:"이수인", yt:"mWjXv-F6Nq4" },
  { hall:"solo", group:"한국 가곡", title:"그리운 금강산", sub:"누구의 주제련가 — 최영섭 곡", composer:"최영섭", yt:"k4vF7_HZCyk" },
  { hall:"solo", group:"한국 가곡", title:"남촌", sub:"산 너머 남촌에는 — 김규환 곡", composer:"김규환", yt:"bnGjGCdtMWc" },

  /* ================================================================
     무대 1 | 독창 홀 — 찬송 & 성가
     ================================================================ */
  { hall:"solo", group:"찬송 & 성가", title:"내 주를 가까이하게 함은", sub:"찬송 독창", composer:"", yt:"oItlqVtkfGY" },
  { hall:"solo", group:"찬송 & 성가", title:"내 평생에 가는 길", sub:"찬송 독창", composer:"", yt:"wkzYge-rWX8" },
  { hall:"solo", group:"찬송 & 성가", title:"Laudate Dominum", sub:"주님을 찬양하여라 — 모차르트", composer:"W. A. Mozart", yt:"AhJGNJH1Yp0" },
  { hall:"solo", group:"찬송 & 성가", title:"Laudate Dominum (2)", sub:"주님을 찬양하여라 — 다른 버전", composer:"W. A. Mozart", yt:"VPckvv7Uvcc" },
  { hall:"solo", group:"찬송 & 성가", title:"날 오라 하신다", sub:"내 주의 보혈은", composer:"", yt:"KcmKKSmh824" },
  { hall:"solo", group:"찬송 & 성가", title:"내 언제나 주님을 찬미하리니", sub:"성가 독창", composer:"", yt:"a9ol6CEesUk" },
  { hall:"solo", group:"찬송 & 성가", title:"사랑하리라", sub:"주 여호와여 들어주소서 — 임긍수 곡", composer:"임긍수", yt:"EHnCUSO8BxY" },

  /* ================================================================
     무대 2 | 앙상블 홀 — 듀엣
     ================================================================ */
  { hall:"ensemble", group:"듀엣", title:"향수", sub:"소프라노 진화신 × 바리톤 강주원", composer:"김희갑", partner:"강주원", yt:"zz2sG6FC3QE", featured:true },
  { hall:"ensemble", group:"듀엣", title:"시편 23편 혼성이중창", sub:"여호와는 나의 목자시니 — 진화신 × 강주원", composer:"", partner:"강주원", yt:"Z4V93PUlExw" },
  { hall:"ensemble", group:"듀엣", title:"아 용서하소서", sub:"여성이중창 — 진화신 × 메조소프라노 문미란", composer:"", partner:"문미란", yt:"80Ol8--J8Ik" },
  { hall:"ensemble", group:"듀엣", title:"One Fine Day — 리허설 콘서트", sub:"플로리다 올랜도 · 진화신 × 문미란", composer:"G. Puccini", partner:"문미란", yt:"sE1lMGqfTFE" },
  { hall:"ensemble", group:"듀엣", title:"Sull'aria — 편지 이중창", sub:"모차르트 「피가로의 결혼」 · 진화신 × 문미란", composer:"W. A. Mozart", partner:"문미란", yt:"kT75R2_bIsM" },
  { hall:"ensemble", group:"듀엣", title:"시월의 어느 멋진 날에", sub:"플로리다 올랜도 리허설 콘서트", composer:"", yt:"5gKg0AHquz0" },

  /* ================================================================
     무대 2 | 앙상블 홀 — 앙상블
     ================================================================ */
  { hall:"ensemble", group:"앙상블", title:"축복하노라", sub:"나의 은총을 입은이여 — 혼성이중창", composer:"", yt:"FiVuXzTq8qQ" },
  { hall:"ensemble", group:"앙상블", title:"내 진정 사모하는", sub:"여성이중창", composer:"", yt:"K2laai-zZBk" },
  { hall:"ensemble", group:"앙상블", title:"살아계신 주", sub:"주 하나님 독생자 예수 — 여성삼중창", composer:"", yt:"Bt544SvRhR8" },
  { hall:"ensemble", group:"앙상블", title:"하나님은 너를 지키시는 자", sub:"혼성이중창", composer:"", yt:"meJNpOEAdIQ" },
  { hall:"ensemble", group:"앙상블", title:"주 하나님 지으신 모든 세계", sub:"나 같은 죄인 살리신 — 앙상블", composer:"", yt:"4vnplIGrNI8" },
  { hall:"ensemble", group:"앙상블", title:"사랑의 왕 내 목자", sub:"여성3중창 — 진화신 · 문미란 · 유명애", composer:"", yt:"rv62ge2xyGE" },
  { hall:"ensemble", group:"앙상블", title:"내 영혼의 구주", sub:"비바람이 칠때와", composer:"", yt:"H5gP01jXzLw" },
  { hall:"ensemble", group:"앙상블", title:"놀라운 은혜", sub:"나 같은 죄인 살리신 — 여성삼중창", composer:"", yt:"6DLaHAEGxHc" },

  /* ================================================================
     무대 3 | 성가 & 찬송 홀 — 영혼의 노래 (주제별 큐레이션)
     ================================================================ */
  { hall:"sacred", group:"찬송 독창", title:"내 주를 가까이하게 함은", sub:"소프라노 진화신 독창", composer:"", yt:"oItlqVtkfGY", featured:true },
  { hall:"sacred", group:"찬송 독창", title:"내 평생에 가는 길", sub:"소프라노 진화신 독창", composer:"", yt:"wkzYge-rWX8" },
  { hall:"sacred", group:"찬송 독창", title:"날 오라 하신다", sub:"내 주의 보혈은", composer:"", yt:"KcmKKSmh824" },
  { hall:"sacred", group:"찬송 독창", title:"내 언제나 주님을 찬미하리니", sub:"성가 독창", composer:"", yt:"a9ol6CEesUk" },
  { hall:"sacred", group:"찬송 독창", title:"사랑하리라", sub:"주 여호와여 들어주소서", composer:"임긍수", yt:"EHnCUSO8BxY" },
  { hall:"sacred", group:"성가", title:"Laudate Dominum (1)", sub:"주님을 찬양하여라 — 모차르트", composer:"W. A. Mozart", yt:"AhJGNJH1Yp0" },
  { hall:"sacred", group:"성가", title:"Laudate Dominum (2)", sub:"다른 버전 — 모차르트", composer:"W. A. Mozart", yt:"VPckvv7Uvcc" },
  { hall:"sacred", group:"성가", title:"Coronation Mass — Agnus Dei", sub:"모차르트 대관식 미사", composer:"W. A. Mozart", yt:"GiPZJNhptH8" },
  { hall:"sacred", group:"앙상블 성가", title:"시편 23편", sub:"여호와는 나의 목자시니 — 혼성이중창", composer:"", yt:"Z4V93PUlExw" },
  { hall:"sacred", group:"앙상블 성가", title:"내 영혼의 구주", sub:"비바람이 칠때와", composer:"", yt:"H5gP01jXzLw" },
  { hall:"sacred", group:"앙상블 성가", title:"놀라운 은혜", sub:"여성삼중창", composer:"", yt:"6DLaHAEGxHc" },
  { hall:"sacred", group:"앙상블 성가", title:"주 하나님 지으신 모든 세계", sub:"나 같은 죄인 살리신", composer:"", yt:"4vnplIGrNI8" },
  { hall:"sacred", group:"합창 성가", title:"주의 옷자락", sub:"연동교회 연합찬양대 · 지휘 진화신", composer:"", yt:"Jb0xtFX_cCw" },
  { hall:"sacred", group:"합창 성가", title:"그 크신 하나님의 사랑", sub:"지휘 진화신 · 신상우 곡", composer:"신상우", yt:"yoxETKJRSxU" },

  /* ================================================================
     무대 4 | 지휘 홀 「마에스트라」 — 연못골찬양대
     ================================================================ */
  { hall:"conduct", group:"연못골찬양대", title:"주의 옷자락", sub:"연동교회 연합찬양대 · 지휘 진화신", composer:"", yt:"Jb0xtFX_cCw", featured:true },
  { hall:"conduct", group:"연못골찬양대", title:"시편 23편", sub:"연못골찬양대 · 2025년 3월", composer:"", yt:"kzDSWXg1nQc" },
  { hall:"conduct", group:"연못골찬양대", title:"주는 반석", sub:"연못골 찬양대 · 지휘 진화신", composer:"", yt:"-u6K-G9A7D0" },
  { hall:"conduct", group:"연못골찬양대", title:"Laudate Dominum — 리허설", sub:"모차르트 · 연못골찬양대 리허설", composer:"W. A. Mozart", yt:"KKh1JgPac3I" },
  { hall:"conduct", group:"연못골찬양대", title:"대관식미사 · 연동교회 연못골찬양대", sub:"곡. 모차르트 · 지휘 진화신", composer:"W. A. Mozart", yt:"onaAEwzsMdE" },
  { hall:"conduct", group:"연못골찬양대", title:"연동교회 성탄절 칸타타 — 더 스토리", sub:"연못골찬양대 · 지휘 진화신", composer:"", yt:"Lc1KLKhBaV4" },
  { hall:"conduct", group:"연못골찬양대", title:"그 크신 하나님의 사랑", sub:"지휘 진화신 · 곡. 신상우", composer:"신상우", yt:"yoxETKJRSxU" },
  { hall:"conduct", group:"연못골찬양대", title:"세노야", sub:"합창 · 지휘 진화신", composer:"", yt:"hn9OO1_Aqpk" },
  { hall:"conduct", group:"연못골찬양대", title:"내가 너를 고쳐주리라", sub:"합창 · 지휘 진화신", composer:"", yt:"LKQMFhKkSno" },
  { hall:"conduct", group:"연못골찬양대", title:"물이 바다 덮음같이", sub:"합창 · 지휘 진화신", composer:"", yt:"z7Rlh0Nz-OI" },
  { hall:"conduct", group:"연못골찬양대", title:"물이 바다 덮음같이 (2)", sub:"합창 · 다른 버전", composer:"", yt:"z3RFsLMsmIc" },
  { hall:"conduct", group:"연못골찬양대", title:"순례자의 노래", sub:"저 멀리 뵈는 나의 시온성", composer:"", yt:"FpMb9pkM5cQ" },
  { hall:"conduct", group:"연못골찬양대", title:"귀하신 주여 날 붙드사", sub:"합창 · 지휘 진화신", composer:"", yt:"3oNDS2NqTIE" },
  { hall:"conduct", group:"연못골찬양대", title:"너희가 다시 살아나리라", sub:"합창 · 지휘 진화신", composer:"", yt:"Z5Lb0HmB9RE" },
  { hall:"conduct", group:"연못골찬양대", title:"Canon — 캐논 합창", sub:"파헬벨 캐논 · 합창 편곡", composer:"J. Pachelbel", yt:"X3k1HWR9ncc" },
  { hall:"conduct", group:"연못골찬양대", title:"축복하노라", sub:"합창 · 지휘 진화신", composer:"", yt:"oV6HL5yrP0c" },
  { hall:"conduct", group:"연못골찬양대", title:"아름다운 세상", sub:"합창 · 지휘 진화신", composer:"", yt:"QXzMeMAeEc0" },
  { hall:"conduct", group:"연못골찬양대", title:"주님 기뻐 웃으시죠", sub:"합창 · 지휘 진화신", composer:"", yt:"DbpyexEC6Yo" },
  { hall:"conduct", group:"연못골찬양대", title:"주보다 더 날 사랑하는 이 없네", sub:"합창 · 지휘 진화신", composer:"", yt:"eVNmgqcrsbE" },

  /* ================================================================
     무대 4 | 지휘 홀 「마에스트라」 — 예찬 어린이합창단
     ================================================================ */
  { hall:"conduct", group:"예찬 어린이합창단", title:"좋으신 하나님", sub:"예찬 어린이합창단 · 지휘 진화신", composer:"", yt:"A55xWFZSuCE" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"나 같은 죄인 살리신", sub:"예찬 어린이합창단 · 솔로 이승연", composer:"", yt:"KNjpP-yEXBY" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"소리는 새콤 글은 달콤", sub:"예찬 어린이합창단 · 지휘 진화신", composer:"", yt:"CWsnHHvnVnc" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"착한 노래", sub:"예찬 어린이합창단 · 지휘 진화신", composer:"", yt:"vZ9x3A9u84A" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"착한 노래 (2)", sub:"예찬 어린이합창단 · 다른 버전", composer:"", yt:"MjuWevT2N0s" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"이 시간 너의 맘속에", sub:"예찬 어린이합창단 · 지휘 진화신", composer:"", yt:"ZSXcZn9G5G8" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"이 시간 너의 맘속에 (2)", sub:"예찬 어린이합창단 · 다른 버전", composer:"", yt:"G5HjN_Fa5Rk" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"내가 어릴때 — 이승연", sub:"예찬 어린이합창단 · 지휘 진화신", composer:"", yt:"pSjx-RHBLhE" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"내 작은 손으로 — 이승연", sub:"예찬 어린이합창단 · 지휘 진화신", composer:"", yt:"SgdCpXkZQyU" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"서로 사랑하자", sub:"예찬 어린이합창단 · 지휘 진화신", composer:"", yt:"87vY014lZZY" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"야베스의 기도", sub:"예찬 어린이합창단 · CTS 대한민국 어린이합창제", composer:"", yt:"LN5ALjlQ4pY" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"주님께 얘기할래요", sub:"여름성경학교 찬양 · 예찬 어린이합창단", composer:"", yt:"FJWJ_JKmFh4" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"우리를 위해 친히", sub:"여름성경학교 찬양 · 예찬 어린이합창단", composer:"", yt:"VC8XiMzHb2c" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"더 많은 어린이 더 많은 나라", sub:"CTS 대한민국 어린이합창제 · 예찬 어린이합창단", composer:"", yt:"F3BqGksjfXQ" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"여름성경학교 교가", sub:"흰구름 뭉게뭉게 피는 하늘에 · 예찬 어린이합창단", composer:"", yt:"cdmN6LjJhNE" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"아름다운 노래", sub:"예찬 어린이합창단 · 지휘 진화신", composer:"", yt:"DjMv7HY198c" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"초대합니다 — 제10회 정기연주회", sub:"예찬 어린이합창단 '아름다운 노래'", composer:"", yt:"YRWjKdsaUjE" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"노래가 만든 세상", sub:"예찬 어린이합창단 · 지휘 진화신", composer:"", yt:"bJJNzU2nFDc" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"노래가 만든 세상 (2)", sub:"알아요 즐겁게 노래하는 이 시간", composer:"", yt:"0ieQafvh1WY" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"스마일", sub:"예찬 어린이합창단 · 지휘 진화신", composer:"", yt:"cBxr5h_QFDI" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"천국 여행가다", sub:"예찬 어린이합창단 · 지휘 진화신", composer:"", yt:"b1mjcHGmHvs" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"영원히 찬양 드리세", sub:"CTS 대한민국 어린이합창제 · 예찬 어린이합창단", composer:"", yt:"Irg6GhPt2B4" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"영원히 찬양 드리세 (2)", sub:"지도 진화신 · 다른 버전", composer:"", yt:"Lku6DFjK6e0" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"화해 탐험대", sub:"여름성경학교 찬양 · 예찬 어린이합창단", composer:"", yt:"3dX1w_b49sE" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"꼭 안아줄래요 — 조하겸", sub:"예찬 어린이합창단 · 지휘 진화신", composer:"", yt:"RjeGNMBWR-g" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"생명의 양식", sub:"예찬 어린이합창단 · 지휘 진화신", composer:"", yt:"B9eBwdrZUYw" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"화가 — 이승연", sub:"예찬 어린이합창단 · 지휘 진화신", composer:"", yt:"rMOBf3sXb3g" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"기도 — 박시연", sub:"예찬 어린이합창단 · 지휘 진화신", composer:"", yt:"QRX1dNomG3U" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"꿈속에서", sub:"예찬 어린이합창단 · 지휘 진화신", composer:"", yt:"DZomYr-rBP0" },
  { hall:"conduct", group:"예찬 어린이합창단", title:"사랑해", sub:"예찬 어린이합창단 · 지휘 진화신", composer:"", yt:"RCLpME1yBKk" }
];

/* ── 홀 메타데이터 ───────────────────────────────────────────── */
const HALLS = {
  solo:     { no:"무대 1", name:"독창 홀", sub:"아리아 & 가곡", desc:"오페라 아리아 · 한국 가곡 · 찬송 독창", accent:"#7a1325" },
  ensemble: { no:"무대 2", name:"앙상블 홀", sub:"함께하는 노래", desc:"듀엣 · 삼중창 · 앙상블 무대", accent:"#1e3a5f" },
  sacred:   { no:"무대 3", name:"성가 & 찬송 홀", sub:"영혼의 노래", desc:"신앙과 음악이 만나는 경건한 무대", accent:"#9a7b2e" },
  conduct:  { no:"무대 4", name:"지휘 홀", sub:"마에스트라", desc:"지휘자 진화신이 이끄는 합창 아카이브", accent:"#1f4d3a" }
};

/* ── 이달의 무대 — 자동 선택 (매월 자동 갱신) ─────────────── */
/* picks 불필요 — 앱이 월간 시드로 자동 2곡 선택            */
const MONTHLY = {
  month: "2026년 6월",
  theme: "초여름, 빛으로 부르는 노래",
  comment: "신록의 계절, 진화신의 목소리로 초여름을 맞이합니다. 이 달의 두 무대는 매월 자동으로 새로 선정됩니다."
};

/* ── Supabase 방명록 설정 ───────────────────────────────────── */
/*
  방문자 간 방명록 공유를 원하면 아래 두 값을 채우세요.
  1. https://supabase.com 무료 가입 → 새 프로젝트 생성
  2. SQL Editor에서 아래 실행:
     create table guestbook (
       id bigint generated always as identity primary key,
       nickname text not null default '익명의 관객',
       message text not null,
       created_at timestamptz default now()
     );
     alter table guestbook enable row level security;
     create policy "read" on guestbook for select using (true);
     create policy "insert" on guestbook for insert with check (true);
  3. Settings → API 에서 URL 과 anon key 복사 후 아래 입력
*/
const SUPABASE_URL = "";        /* 예: https://xyzxyz.supabase.co  */
const SUPABASE_ANON_KEY = "";   /* 예: eyJhbGci...                  */
