document.querySelector(".btn__search-appmain").addEventListener("click", () => {
    if (document.querySelector("#searchRequest").value == "") {
        return;
    } else {
        localStorage.setItem("searchRequest", document.querySelector("#searchRequest").value);
        document.querySelector("#searchRequest").value = "";
        document.location.href = "./views/search_vacancies.html";
    }
});

document.querySelector("#searchRequest").addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
        if (document.querySelector("#searchRequest").value == "") {
            return;
        } else {
            localStorage.setItem("searchRequest", document.querySelector("#searchRequest").value);
            document.querySelector("#searchRequest").value = "";
            document.location.href = "./views/search_vacancies.html";
        }
    }
});

document.querySelectorAll(".popular__titles").forEach((item) => {
    item.addEventListener("click", (e) => {
        if (e.target) {
            localStorage.setItem("searchRequest", item.innerText);
            document.location.href = "./views/search_vacancies.html";
        }
    });
});
