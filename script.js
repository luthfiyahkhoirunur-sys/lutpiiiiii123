/* =====================================================
   GLOBAL INITIALIZATION
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initScrollAnimation();
  initNavbarActive();
  initCardInteraction();
  initThemeToggle();
  initChatbotAI();
});

/* =====================================================
   SMOOTH SCROLL NAVIGATION
===================================================== */
function initSmoothScroll() {
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

/* =====================================================
   NAVBAR ACTIVE STATE
===================================================== */
function initNavbarActive() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

/* =====================================================
   SCROLL FADE-IN ANIMATION
===================================================== */
function initScrollAnimation() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".place-card, .about, .section-title").forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
  });
}

/* =====================================================
   PLACE CARD INTERACTION
===================================================== */
function initCardInteraction() {
  document.querySelectorAll(".place-card").forEach(card => {
    card.addEventListener("click", () => {
      showLocationPopup(card);
    });
  });
}

/* =====================================================
   LOCATION DETAIL POPUP
===================================================== */
function showLocationPopup(card) {
  const title = card.querySelector("h3").innerText;
  const location = card.querySelector(".location").innerText;

  const popup = document.createElement("div");
  popup.className = "popup-overlay";

  popup.innerHTML = `
    <div class="popup-box">
      <h2>🐱 ${title}</h2>
      <p>${location}</p>
      <p>
        Lokasi ini dipilih karena memiliki kebutuhan tinggi terhadap
        edukasi sosial dan lingkungan berbasis teknologi AI.
      </p>
      <button id="closePopup">Tutup</button>
    </div>
  `;

  document.body.appendChild(popup);

  document.getElementById("closePopup").addEventListener("click", () => {
    popup.remove();
  });
}

/* =====================================================
   THEME TOGGLE (PINK DARK MODE)
===================================================== */
function initThemeToggle() {
  const btn = document.createElement("button");
  btn.innerText = "🌙 Pink Mode";
  btn.className = "theme-toggle";
  document.body.appendChild(btn);

  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-pink");
  });
}

/* =====================================================
   SIMPLE AI CHATBOT (SIMULATION)
===================================================== */
function initChatbotAI() {
  const chatbot = document.createElement("div");
  chatbot.className = "chatbot";

  chatbot.innerHTML = `
    <div class="chat-header">🤖 Kucing AI</div>
    <div class="chat-body" id="chatBody">
      <div class="bot-msg">Halo! Aku Kucing AI 🐾<br>Tanya aku soal lingkungan 🌱</div>
    </div>
    <div class="chat-input">
      <input type="text" id="chatInput" placeholder="Tulis pertanyaan...">
      <button id="sendChat">Kirim</button>
    </div>
  `;

  document.body.appendChild(chatbot);

  document.getElementById("sendChat").addEventListener("click", sendChat);
}

/* =====================================================
   CHATBOT RESPONSE LOGIC
===================================================== */
function sendChat() {
  const input = document.getElementById("chatInput");
  const body = document.getElementById("chatBody");

  if (input.value.trim() === "") return;

  body.innerHTML += `<div class="user-msg">${input.value}</div>`;

  setTimeout(() => {
    body.innerHTML += `
      <div class="bot-msg">
        Edukasi lingkungan penting untuk menjaga keseimbangan alam 🌍
        AI membantu menganalisis data dan memberikan solusi berbasis fakta.
      </div>
    `;
    body.scrollTop = body.scrollHeight;
  }, 800);

  input.value = "";
}

/* =====================================================
   OPTIONAL FILTER FEATURE
===================================================== */
function filterLocations(keyword) {
  document.querySelectorAll(".place-card").forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(keyword.toLowerCase())
      ? "block"
      : "none";
  });
}
