let signup_form = document.getElementById("signup_form");

signup_form.addEventListener("submit", registerUser);

function registerUser(event) {
    event.preventDefault();
    let email_input = document.getElementById("email_input");
    let password_input = document.getElementById("password_input");
    let confirm_password_input = document.getElementById("confirm_password_input");
    let form = event.target;

    if(!EMAIL.is_valid.test(form.email.value)) {
        email_input.classList.add("show_error_color");
        email_input.nextElementSibling.classList.add("show_error_message");
    }
    else {
        email_input.classList.remove("show_error_color");
        email_input.nextElementSibling.classList.remove("show_error_message");
    }

    if(!form.password.value || form.password.value.length <= PASSWORD.min ){
        password_input.classList.add("show_error_color");
        password_input.nextElementSibling.classList.add("show_error_message");
    }
    else {
        password_input.classList.remove("show_error_color");
        password_input.nextElementSibling.classList.remove("show_error_message");
    }

    if (form.confirm_password.value !== form.password.value) {
        confirm_password_input.classList.add("show_error_color");
        confirm_password_input.nextElementSibling.classList.add("show_error_message");
    }
    else {
        confirm_password_input.classList.remove("show_error_color");
        confirm_password_input.nextElementSibling.classList.remove("show_error_message");
    }

    if (form.querySelectorAll(".show_error_message").length === 0) {
        window.location.href = "./wall.html"
    }
}