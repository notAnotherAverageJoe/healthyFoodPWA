const API_URL = "";
async function fetchData() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const container = document.getElementById("data-container");
    container.innerHTML = data
      .map(
        (item) => `
          <div class="card">
            <h2>${item.name}</h2>
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>Health Benefits:</strong> ${item.health_benefits}</p>
            <p><strong>Best For:</strong> ${item.best_for}</p>
            <p><strong>Spiritual Message:</strong> ${item.spiritual_message}</p>
            <p><strong>Nutrition Facts:</strong> ${item.nutrition_facts}</p>
            <p><strong>Season:</strong> ${item.season}</p>
            ${
              item.image_url
                ? `<img src="${item.image_url}" alt="${item.name}" style="max-width: 200px; border-radius: 8px;" />`
                : ""
            }
          </div>
        `
      )
      .join("");
  } catch (err) {
    console.error("Failed to fetch:", err);
    document.getElementById("data-container").textContent =
      "Failed to load data.";
  }
}
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) => console.log("Service Worker registered:", reg.scope))
      .catch((err) =>
        console.error("Service Worker registration failed:", err)
      );
  });
}

fetchData();
