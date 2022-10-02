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
                document.querySelector("#success").innerHTML = "Thank you for creating an account!<br/> Check your Email and confirm registration.";
                setTimeout(() => document.querySelector("#success").remove(), 10000);
                let user = {
                    username: document.querySelector("#username").value,
                    password: document.querySelector("#password").value,
                    email: document.querySelector("#email").value,
                };
                sendPost(user);
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
            if (field.id == "passwordRepeat") {
                this.setStatus(field, `${errorIcon}<span class="errorText">Confirm password</span>`, "error");
                return false;
            }
            this.setStatus(field, `${errorIcon}<span class="errorText">${field.previousElementSibling.innerText} cannot be empty</span>`, "error");
            return false;
        } else {
            if (field.id == "username") {
                const fieldFormat = /^[a-zA-Z0-9_.-]*$/;
                if (!field.value.match(fieldFormat)) {
                    this.setStatus(field, `${errorIcon}<span class="errorText">Username may include letters (a-z), numbers, underscore (_), hyphen (-) and dot (.).</span></span>`, "error");
                    return false;
                }
                if (field.validity.tooShort || field.validity.tooLong) {
                    this.setStatus(field, `${errorIcon}<span class="errorText">Username must include 5 to 20 characters.`, "error");
                    return false;
                }
            }
            if (field.id == "email") {
                const fieldFormat = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;
                if (!field.value.match(fieldFormat)) {
                    this.setStatus(field, `${errorIcon}<span class="errorText">Email is incorrect`, "error");
                    return false;
                }
            }
            if (field.id == "password") {
                const fieldFormat = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
                if (field.value.length < 6) {
                    this.setStatus(field, `${errorIcon}<span class="errorText">Passord cannot be shorter than 6 characters</span>`, "error");
                    return false;
                } else if (!field.value.match(fieldFormat)) {
                    this.setStatus(field, `${errorIcon}<span class="errorText">Password must include uppercase and lowercase letters, numbers and special characters (!@#$%^&*).</span>`, "error");
                    return false;
                }
            }
            if (field.id == "passwordRepeat") {
                if (field.value != document.querySelector("#password").value) {
                    this.setStatus(field, `${errorIcon}<span class="errorText">Passwords don't match. Try again.</span>`, "error");
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

const form = document.querySelector(".registration__form");
if (form) {
    const fields = ["username", "password", "passwordRepeat", "email"];
    const validator = new Registration(form, fields);
}

function sendPost(user) {
    fetch("https://httpbin.org/post", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application / json; charset=utf-8",
        },
    })
        .then((response) => response.json())
        .then((user) => {
            console.log(user);
        })
        .catch((error) => console.log(error));
}
