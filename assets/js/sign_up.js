const signup_form = document.getElementById("signup_form");

signup_form.addEventListener("submit", registerUser);

function registerUser(event) {
    event.preventDefault();
    const email_input = document.getElementById("email_input");
    const password_input = document.getElementById("password_input");
    const confirm_password_input = document.getElementById("confirm_password_input");
    const form = event.target;

    if(!EMAIL.isValid.test(form.email.value)) {
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

    let error = 0;
    for (const element of form) {
        console.log(2);
        if(element.classList.contains("show_error_color")) {
            error+=1;
            break;
        }
    }
    if (error === 0) {
        window.location.href = "./wall.html";
    }
}