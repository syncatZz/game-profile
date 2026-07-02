const playerName = document.getElementById("player-name");
const playerBio = document.getElementById("player-bio");
const avatar = document.getElementById("avatar");
const favoriteTags = document.getElementById("favorite-tags");
const stats = document.getElementById("stats");
const recentGames = document.getElementById("recent-games");
const favoriteGames = document.getElementById("favorite-games");
const platformList = document.getElementById("platform-list");
const gameList = document.getElementById("game-list");
const gameCount = document.getElementById("game-count");
const emptyMessage = document.getElementById("empty-message");

const searchInput = document.getElementById("search-input");
const platformFilter = document.getElementById("platform-filter");
const genreFilter = document.getElementById("genre-filter");
const statusFilter = document.getElementById("status-filter");
const resetButton = document.getElementById("reset-button");
const messageForm = document.getElementById("message-form");
const visitorName = document.getElementById("visitor-name");
const visitorMessage = document.getElementById("visitor-message");
const messageList = document.getElementById("message-list");
const messageEmpty = document.getElementById("message-empty");

const messageStorageKey = "gameProfileMessages";

function renderProfile() {
  playerName.textContent = siteData.player.name;
  playerBio.textContent = siteData.player.bio;
  avatar.src = siteData.player.avatar;

  favoriteTags.innerHTML = siteData.player.favoriteGenres
    .map((genre) => `<span class="tag">${genre}</span>`)
    .join("");

  const totalGames = siteData.games.length;
  const totalHours = siteData.games.reduce((sum, game) => sum + Number(game.hours || 0), 0);
  const finishedGames = siteData.games.filter((game) => game.status === "已通关").length;
  const favoriteCount = siteData.games.filter((game) => game.favorite).length;

  stats.innerHTML = `
    <article class="stat-card">
      <span>${totalHours}</span>
      <p>总游玩时长</p>
    </article>
    <article class="stat-card">
      <span>${totalGames}</span>
      <p>已记录游戏</p>
    </article>
    <article class="stat-card">
      <span>${finishedGames}</span>
      <p>已通关</p>
    </article>
    <article class="stat-card">
      <span>${favoriteCount}</span>
      <p>最爱收藏</p>
    </article>
  `;
}

function gameMiniCard(game) {
  return `
    <article class="mini-game">
      <img src="${game.cover}" alt="${game.title} 封面">
      <div>
        <h3>${game.title}</h3>
        <p>${game.genre} · ${game.hours} 小时</p>
      </div>
    </article>
  `;
}

function renderHighlights() {
  recentGames.innerHTML = siteData.games
    .filter((game) => game.recent)
    .slice(0, 4)
    .map(gameMiniCard)
    .join("");

  favoriteGames.innerHTML = siteData.games
    .filter((game) => game.favorite)
    .slice(0, 4)
    .map(gameMiniCard)
    .join("");
}

function renderPlatforms() {
  platformList.innerHTML = siteData.platforms
    .map((platform) => `
      <article class="platform-card">
        <div class="platform-icon">${platform.name.slice(0, 1)}</div>
        <div>
          <h3>${platform.name}</h3>
          <p>${platform.account}</p>
          <small>${platform.note}</small>
        </div>
        <a href="${platform.link}" target="_blank" rel="noreferrer">访问</a>
      </article>
    `)
    .join("");
}

function addSelectOptions(selectElement, values, defaultText) {
  selectElement.innerHTML = `<option value="">${defaultText}</option>`;
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    selectElement.appendChild(option);
  });
}

function setupFilters() {
  const platforms = new Set();
  const genres = new Set();
  const statuses = new Set();

  siteData.games.forEach((game) => {
    game.platforms.forEach((platform) => platforms.add(platform));
    genres.add(game.genre);
    statuses.add(game.status);
  });

  addSelectOptions(platformFilter, Array.from(platforms), "全部平台");
  addSelectOptions(genreFilter, Array.from(genres), "全部类型");
  addSelectOptions(statusFilter, Array.from(statuses), "全部状态");
}

function getFilteredGames() {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedPlatform = platformFilter.value;
  const selectedGenre = genreFilter.value;
  const selectedStatus = statusFilter.value;

  return siteData.games.filter((game) => {
    const matchesKeyword = game.title.toLowerCase().includes(keyword);
    const matchesPlatform = !selectedPlatform || game.platforms.includes(selectedPlatform);
    const matchesGenre = !selectedGenre || game.genre === selectedGenre;
    const matchesStatus = !selectedStatus || game.status === selectedStatus;

    return matchesKeyword && matchesPlatform && matchesGenre && matchesStatus;
  });
}

function renderGames() {
  const games = getFilteredGames();
  gameCount.textContent = `当前显示 ${games.length} / ${siteData.games.length} 款游戏`;
  emptyMessage.style.display = games.length === 0 ? "block" : "none";

  gameList.innerHTML = games
    .map((game) => `
      <article class="game-card">
        <img src="${game.cover}" alt="${game.title} 封面">
        <div class="game-card-body">
          <div class="game-card-header">
            <h3>${game.title}</h3>
            <span class="score">${game.rating}</span>
          </div>
          <p class="muted">${game.platforms.join(" / ")} · ${game.genre}</p>
          <div class="game-meta">
            <span>${game.hours} 小时</span>
            <span>${game.status}</span>
          </div>
          <p>${game.comment}</p>
        </div>
      </article>
    `)
    .join("");
}

function resetFilters() {
  searchInput.value = "";
  platformFilter.value = "";
  genreFilter.value = "";
  statusFilter.value = "";
  renderGames();
}

function getMessages() {
  const savedMessages = localStorage.getItem(messageStorageKey);
  return savedMessages ? JSON.parse(savedMessages) : [];
}

function saveMessages(messages) {
  localStorage.setItem(messageStorageKey, JSON.stringify(messages));
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderMessages() {
  const messages = getMessages();
  messageEmpty.style.display = messages.length === 0 ? "block" : "none";

  messageList.innerHTML = messages
    .map((message) => `
      <article class="message-card">
        <div class="message-card-header">
          <strong>${escapeHtml(message.name)}</strong>
          <span>${escapeHtml(message.date)}</span>
        </div>
        <p>${escapeHtml(message.text)}</p>
      </article>
    `)
    .join("");
}

function addMessage(event) {
  event.preventDefault();

  const messages = getMessages();
  messages.unshift({
    name: visitorName.value.trim(),
    text: visitorMessage.value.trim(),
    date: new Date().toLocaleDateString("zh-CN")
  });

  saveMessages(messages);
  messageForm.reset();
  renderMessages();
}

searchInput.addEventListener("input", renderGames);
platformFilter.addEventListener("change", renderGames);
genreFilter.addEventListener("change", renderGames);
statusFilter.addEventListener("change", renderGames);
resetButton.addEventListener("click", resetFilters);
messageForm.addEventListener("submit", addMessage);

renderProfile();
renderHighlights();
renderPlatforms();
setupFilters();
renderGames();
renderMessages();
