// Seletores
const catalogForm = document.getElementById("catalogForm");
const titleInput = document.getElementById("titleInput");
const genreInput = document.getElementById("genreInput");
const ratingInput = document.getElementById("ratingInput");
const filterGenre = document.getElementById("filterGenre");
const catalogList = document.getElementById("catalogList");

// Funções de LocalStorage
function saveToLocalStorage(items) {
    localStorage.setItem("catalog", JSON.stringify(items));
}

function loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem("catalog")) || [];
}

// Renderizar catálogo 
function renderCatalog(filter = "all") {
    const items = loadFromLocalStorage();
    catalogList.innerHTML = "";

    items
        .filter(item => filter === "all" || item.genre === filter)
        .forEach((item, index) => {
            const card = document.createElement("div");
            card.className = "col-md-4";
            card.innerHTML = `
                <div class="card p-3">
                    <h5>${item.title}</h5>
                    <p><strong>Gênero:</strong> ${item.genre}</p>
                    <p><strong>Avaliação:</strong> ${item.rating}/10</p>
                    <button class="btn btn-warning btn-sm" onclick="editItem(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteItem(${index})">Excluir</button>
                </div>
            `;
            catalogList.appendChild(card);
        });
}

// Adicionar filme/série
catalogForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const genre = genreInput.value;
    const rating = parseFloat(ratingInput.value);

    if (title && genre && !isNaN(rating)) {
        const newItem = { title, genre, rating };
        const items = loadFromLocalStorage();
        items.push(newItem);

        saveToLocalStorage(items);
        renderCatalog(filterGenre.value);

        catalogForm.reset();
    }
});

// Editar item
function editItem(index) {
    const items = loadFromLocalStorage();
    const item = items[index];

    const newTitle = prompt("Editar nome:", item.title) || item.title;
    const newGenre = prompt("Editar gênero:", item.genre) || item.genre;
    const newRating = parseFloat(prompt("Editar avaliação:", item.rating)) || item.rating;

    items[index] = { title: newTitle, genre: newGenre, rating: newRating };

    saveToLocalStorage(items);
    renderCatalog(filterGenre.value);
}

// Excluir item
function deleteItem(index) {
    const items = loadFromLocalStorage();
    items.splice(index, 1);

    saveToLocalStorage(items);
    renderCatalog(filterGenre.value);
}

// Filtrar por gênero
filterGenre.addEventListener("change", (event) => {
    renderCatalog(event.target.value);
});

// Inicialização
// obs ahcei um tuturia no youtube muito bom https://www.youtube.com/@BroCodez

renderCatalog();
