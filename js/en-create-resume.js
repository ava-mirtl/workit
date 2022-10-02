class Registration {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
        this.validateOnSubmit();
    }

    validateOnSubmit() {
        let self = this;

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            let error = 0;
            self.fields.forEach((field) => {
                const input = document.querySelector(`#${field}`);
                if (self.validateFields(input) == false) {
                    error++;
                }
            });
            if (error == 0) {
                document.querySelector(".success").innerHTML = "Your data has been successfully sent!<br/> Resume will be published right after review.";
                setTimeout(() => document.querySelector(".success").remove(), 10000);
                let educationAll = `${document.querySelector("#education1").value}`;
                document.querySelectorAll(".extra-row-edu").forEach((element) => {
                    educationAll += `, ${element.value}`;
                });
                let experienceAll = `${document.querySelector("#experience1").value}`;
                document.querySelectorAll(".extra-row-exp").forEach((element) => {
                    experienceAll += `, ${element.value}`;
                });
                let user_resume = {
                    firstName: document.querySelector("#firstName").value,
                    lastName: document.querySelector("#lastName").value,
                    email: document.querySelector("#email").value,
                    phone: document.querySelector("#phone").value,
                    country: document.querySelector("#country").value,
                    city: document.querySelector("#city").value,
                    zipCode: document.querySelector("#zipCode").value,
                    education: educationAll,
                    experience: experienceAll,
                };
                sendPost(user_resume);
                let inputs = document.querySelectorAll("input");
                inputs.forEach((e) => {
                    e.value = "";
                });
                document.querySelector(".edu-extra_rows").innerHTML = "";
                document.querySelector(".exp-extra_rows").innerHTML = "";
                document.querySelector(".btn_delete-row-edu").classList.add("btn_delete-row-hide");
                document.querySelector(".btn_delete-row-exp").classList.add("btn_delete-row-hide");
            }
        });
    }

    validateFields(field) {
        const errorIcon = `<svg aria-hidden="true" class="stUf5b LxE1Id" fill="currentColor" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>`;

        if (field.value.trim() == "") {
            this.setStatus(field, `${errorIcon}<span class="errorText">${field.previousElementSibling.innerText} cannot be empty</span>`, "error");
            return false;
        } else {
            if (field.id == "email") {
                const fieldFormat = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;
                if (!field.value.match(fieldFormat)) {
                    this.setStatus(field, `${errorIcon}<span class="errorText">Email is incorrect`, "error");
                    return false;
                } else {
                    this.setStatus(field, null, "success");
                    return true;
                }
            } else {
                this.setStatus(field, null, "success");
                return true;
            }
        }
    }

    setStatus(field, message, status) {
        const errorMessage = field.parentElement.querySelector(".error-message");

        if (status == "success") {
            errorMessage.innerHTML = "";
            field.classList.remove("input-border");
        }

        if (status == "error") {
            errorMessage.innerHTML = message;
            field.classList.add("input-border");
            errorMessage.classList.add("errorMessage");
        }
    }
}

const form = document.querySelector(".new-resume-form");
if (form) {
    const fields = ["firstName", "lastName", "email", "phone", "country", "city", "zipCode", "education1", "experience1"];
    const validator = new Registration(form, fields);
}

function sendPost(user_resume) {
    fetch("https://httpbin.org/post", {
        method: "POST",
        body: JSON.stringify(user_resume),
        headers: {
            "Content-Type": "application / json; charset=utf-8",
        },
    })
        .then((response) => response.json())
        .then((user_resume) => {
            console.log(user_resume);
        })
        .catch((error) => console.log(error));
}

function addNewRow(name) {
    name == "edu" ? iEdu++ : iExp++;
    let newRow = document.createElement("input");
    newRow.className = `form-control form-control-sm resume-item extra-row-${name}`;
    newRow.id = name == "edu" ? `education${iEdu}` : `experience${iExp}`;
    document.querySelector(`.${name}-extra_rows`).append(newRow);
    document.querySelector(`.btn_delete-row-${name}`).classList.remove(`btn_delete-row-hide`);
}

function deleteRow(name) {
    let extraRows = document.querySelectorAll(`.extra-row-${name}`);
    if (extraRows.length) {
        document.querySelector(`.${name}-extra_rows`).removeChild(extraRows[extraRows.length - 1]);
    }
    if (extraRows.length == 1) {
        document.querySelector(`.btn_delete-row-${name}`).classList.add("btn_delete-row-hide");
    }
}

let iEdu = 1;
let iExp = 1;
document.querySelector(".btn_add-row-edu").addEventListener("click", () => {
    let edu = "edu";
    addNewRow(edu);
});

document.querySelector(".btn_delete-row-edu").addEventListener("click", () => {
    let edu = "edu";
    deleteRow(edu);
});

document.querySelector(".btn_add-row-exp").addEventListener("click", () => {
    let exp = "exp";
    addNewRow(exp);
});

document.querySelector(".btn_delete-row-exp").addEventListener("click", () => {
    let exp = "exp";
    deleteRow(exp);
});
