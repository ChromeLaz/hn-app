async function fetchStories(type = "newstories") {
const container = document.getElementById("news-container");
container.innerHTML = "Loading…";


try {
const idsRes = await fetch(`https://hacker-news.firebaseio.com/v0/${type}.json`);
const ids = await idsRes.json();


const top20 = ids.slice(0, 20);


const stories = await Promise.all(
top20.map(async (id) => {
const itemRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
return itemRes.json();
})
);


container.innerHTML = stories
.map(
(s) => `
<div class="card">
<a href="${s.url}" target="_blank">${s.title}</a>
<div class="meta">▲ ${s.score} — by ${s.by}</div>
</div>`
)
.join("");
} catch (err) {
container.innerHTML = "Error loading stories";
}
}


// Tabs
document.getElementById("tab-news").addEventListener("click", () => {
setActive("news");
fetchStories("newstories");
});


document.getElementById("tab-best").addEventListener("click", () => {
setActive("best");
fetchStories("beststories");
});


function setActive(tab) {
document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
document.getElementById(`tab-${tab}`).classList.add("active");
}


// Initial load
fetchStories("newstories");


// Register SW
if ("serviceWorker" in navigator) {
navigator.serviceWorker.register("sw.js");
}