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
                document.querySelector(".success").innerHTML = "Данные успешно отправлены!<br/> После проверки ваша вакансия будет доступна на сайте.";
                setTimeout(() => document.querySelector(".success").remove(), 10000);
                let vacancy = {
                    title: document.querySelector("#title").value,
                    minSalary: document.querySelector("#minSalary").value,
                    maxSalary: document.querySelector("#maxSalary").value,
                    currency: document.querySelector("#currency").value,
                    duties: document.querySelector("#duties").value,
                    skills: document.querySelector("#skills").value,
                    conditions: document.querySelector("#conditions").value,
                    details: document.querySelector("#details").value,
                    contactFisrtName: document.querySelector("#firstName").value,
                    contactLastName: document.querySelector("#lastName").value,
                    email: document.querySelector("#email").value,
                    phone: document.querySelector("#phone").value,
                    country: document.querySelector("#country").value,
                    city: document.querySelector("#city").value,
                    zipCode: document.querySelector("#zipCode").value,
                };
                sendPost(vacancy);
                let inputs = document.querySelectorAll("input");
                inputs.forEach((e) => {
                    e.value = "";
                });
            }
        });
    }

    validateFields(field) {
        const errorIcon = `<svg aria-hidden="true" class="stUf5b LxE1Id" fill="currentColor" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>`;

        if (field.value.trim() == "") {
            this.setStatus(field, `${errorIcon}<span class="errorText">Это поле должно быть заполнено</span>`, "error");
            return false;
        } else {
            if (field.id == "email") {
                const fieldFormat = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;
                if (!field.value.match(fieldFormat)) {
                    this.setStatus(field, `${errorIcon}<span class="errorText">Email введен неверно`, "error");
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

const form = document.querySelector(".new-vacancy-form");
if (form) {
    const fields = ["title", "minSalary", "maxSalary", "currency", "duties", "skills", "conditions", "firstName", "lastName", "email", "phone", "country", "city", "zipCode"];
    const validator = new Registration(form, fields);
}

function sendPost(vacancy) {
    fetch("https://httpbin.org/post", {
        method: "POST",
        body: JSON.stringify(vacancy),
        headers: {
            "Content-Type": "application / json; charset=utf-8",
        },
    })
        .then((response) => response.json())
        .then((vacancy) => {
            console.log(vacancy);
        })
        .catch((error) => console.log(error));
}

// Mobile
function myFunction(screen) {
    if (screen.matches) {
        document.querySelector(".salary").innerHTML = `
        <input type="number" class="form-control mb-3" name="from" placeholder="От:" id="minSalary">
        <div class="error-message"></div>
        <input type="number" class="form-control mb-3" name="to" placeholder="До:" id="maxSalary">
        <div class="error-message"></div>
        <input type="text" class="form-control mb-3" name="currency" placeholder="Валюта:"
            id="currency">
        <div class="error-message"></div>
        `;
    }
}

let screen = window.matchMedia("(max-width: 595px)");
myFunction(screen);
screen.addEventListener("DOMContentLoaded", myFunction);
