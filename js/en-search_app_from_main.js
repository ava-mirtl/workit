document.querySelector(".btn__search-employermain").addEventListener("click", () => {
    if (document.querySelector("#searchRequest").value == "") {
        return;
    } else {
        localStorage.setItem("searchRequest", document.querySelector("#searchRequest").value);
        document.querySelector("#searchRequest").value = "";
        document.location.href = "../views/en_search_applicants.html";
    }
});

document.querySelector("#searchRequest").addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
        if (document.querySelector("#searchRequest").value == "") {
            return;
        } else {
            localStorage.setItem("searchRequest", document.querySelector("#searchRequest").value);
            document.querySelector("#searchRequest").value = "";
            document.location.href = "../views/en_search_applicants.html";
        }
    }
});

document.querySelectorAll(".popular__titles").forEach((item) => {
    item.addEventListener("click", (e) => {
        if (e.target) {
            localStorage.setItem("searchRequest", item.innerText);
            document.location.href = "../views/en_search_applicants.html";
        }
    });
});
