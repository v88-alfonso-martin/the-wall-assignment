const login_form = document.getElementById("login_form");

login_form.addEventListener("submit", loginUser);

function loginUser(event) {
	event.preventDefault();

	if (event.target.email.value === "test@test.com" && event.target.password.value === "password") {
		window.location.href = "./wall.html";
	} 
    else {
        const email_input = document.getElementById("email_input");
        const password_input = document.getElementById("password_input");

		email_input.classList.add("show_error_color");
        email_input.nextElementSibling.classList.add("show_error_message");
        password_input.classList.add("show_error_color");
        password_input.nextElementSibling.classList.add("show_error_message");
    }
}
