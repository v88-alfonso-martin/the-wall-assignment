const close_buttons = document.querySelectorAll(".close_button");
const cancel_buttons = document.querySelectorAll(".cancel_button");
const create_message_button = document.querySelector("#create_message_button");
const modals = document.querySelectorAll(".modal");
const create_message_form = document.querySelector("#create_message_form");

for (const close_button of close_buttons) {
    close_button.addEventListener("click", closeModal);
}

for (const cancel_button of cancel_buttons) {
    cancel_button.addEventListener("click", closeModal);
}

for (const modal of modals) {
    modal.addEventListener("click", closeModalWhenClickedOutside);
}

create_message_button.addEventListener("click", openCreateMessageModal);
create_message_form.addEventListener("keyup", validateFormMessage)
create_message_form.addEventListener("submit", submitMessage);

function closeModal(event) {
    let modal = event.target.closest(".show_modal");
    modal.classList.remove("show_modal");
    create_message_form.reset();
    let success_button = create_message_form.lastElementChild.lastElementChild
    success_button.disabled = true;
    success_button.classList.add("disable_button");
}

function closeModalWhenClickedOutside(event) {
    if(event.target === event.currentTarget) {
        closeModal(event)
    }
}

function openCreateMessageModal() {
    document.querySelector(".create_message_modal").classList.add("show_modal");
}

function validateFormMessage(event) {
    const success_button = event.currentTarget.lastElementChild.lastElementChild;
    if(event.currentTarget.message.value === "") {
        success_button.disabled = true;
        success_button.classList.add("disable_button");
    } 
    else {
        success_button.disabled = false;
        success_button.classList.remove("disable_button");
    }
}

const messages_container = document.querySelector("#messages_container");
const message_container = document.querySelector(".message_container");
const messages_length = document.querySelector("#messages_length");
const no_messages = document.querySelector("#no_messages");
let selected_message_container;

function submitMessage(event) {
    event.preventDefault();
    const cloned_message_container = message_container.cloneNode(true);
    cloned_message_container.hidden = false;
    cloned_message_container.firstElementChild.post.value = event.target.message.value;
    messages_container.prepend(cloned_message_container);
    messages_length.innerHTML = messages_container.childElementCount;
    closeModal(event);


    /* Delete action */
    cloned_message_container.querySelector(".edit_message_form .delete_action").addEventListener("click", showDeleteModal);
    
    /* Edit action */
    cloned_message_container.querySelector(".edit_message_form .edit_action").addEventListener("click", enableEditMessage);

    const edit_message_form = cloned_message_container.querySelector(".edit_message_form")
    edit_message_form.addEventListener("keyup", validateEditMessage);
    cloned_message_container.querySelector(".edit_message_form .cancel_button").addEventListener("click", cancelEditMessage)
    edit_message_form.addEventListener("submit", submitEditMessage);

    /* Comment action */
    cloned_message_container.querySelector(".edit_message_form .comment_action").addEventListener("click", toggleCommentForm);
    const post_comment_form = cloned_message_container.querySelector(".post_comment_form");
    post_comment_form.addEventListener("keyup", validateFormComment);
    post_comment_form.addEventListener("submit", submitComment);

    if(messages_container.childElementCount >= 1) {
        no_messages.classList.add("hide_no_messages")
    }
}

function showDeleteModal(event) {
    document.querySelector(".delete_message_modal").classList.add("show_modal");
    selected_message_container = event.currentTarget.closest(".message_container");
}

document.querySelector("#delete_message_form").addEventListener("submit", deleteMessage);

function deleteMessage(event) {
    event.preventDefault();
    selected_message_container.remove();
    selected_message_container = null;
    messages_length.innerHTML = messages_container.childElementCount;
    let modal = event.target.closest(".show_modal");
    modal.classList.remove("show_modal");

    if(messages_container.childElementCount === 0) {
        no_messages.classList.remove("hide_no_messages")
    }
}

function enableEditMessage (event) {
    let form = event.currentTarget.closest(".edit_message_form");
    form.post.classList.add("enable_textarea");
    form.post.disabled = false;
    form.post.dataset.oldMessage = form.post.value;
    event.currentTarget.parentNode.classList.add("hide_message_actions");
    event.currentTarget.parentNode.nextElementSibling.classList.remove("hide_buttons_container");
}

function validateEditMessage(event) {
    const success_button = event.currentTarget.lastElementChild.lastElementChild.lastElementChild;
    if(event.currentTarget.post.value === "") {
        success_button.disabled = true;
        success_button.classList.add("disable_button");
    } 
    else {
        success_button.disabled = false;
        success_button.classList.remove("disable_button");
    }
}

function cancelEditMessage(event) {
    let form = event.currentTarget.closest(".edit_message_form");
    form.post.classList.remove("enable_textarea");
    form.post.disabled = true;
    form.post.value = form.post.dataset.oldMessage;
    event.currentTarget.parentNode.classList.add("hide_buttons_container");
    event.currentTarget.parentNode.previousElementSibling.classList.remove("hide_message_actions");
}

function submitEditMessage(event) {
    event.preventDefault();
    event.currentTarget.post.classList.remove("enable_textarea");
    event.currentTarget.post.disabled = true;
    event.currentTarget.lastElementChild.lastElementChild.classList.add("hide_buttons_container");
    event.currentTarget.lastElementChild.firstElementChild.classList.remove("hide_message_actions");
}

function toggleCommentForm(event) {
    const post_comment_form = event.currentTarget.closest(".edit_message_form").nextElementSibling;
    post_comment_form.classList.toggle("hide_form");
    post_comment_form.reset();
    post_comment_form.lastElementChild.disabled = true;
    post_comment_form.lastElementChild.classList.add("disable_button");
    event.currentTarget.lastElementChild.classList.toggle("blue_text");
    const img = event.currentTarget.firstElementChild;
    if(img.getAttribute("src") === "../assets/images/messages-bubble-square-text.png"){
        img.setAttribute("src", "../assets/images/messages-bubble-square-text-blue.png")
    }
    else {
        img.setAttribute("src", "../assets/images/messages-bubble-square-text.png")
    }
}

function validateFormComment(event) {
    const success_button = event.currentTarget.lastElementChild;
    if(event.currentTarget.comment.value === "") {
        success_button.disabled = true;
        success_button.classList.add("disable_button");
    } 
    else {
        success_button.disabled = false;
        success_button.classList.remove("disable_button");
    }
}

const comment_container = document.querySelector(".comment_container");

function submitComment(event) {
    event.preventDefault();
    const cloned_comment_container = comment_container.cloneNode(true);
    cloned_comment_container.hidden = false;
    cloned_comment_container.firstElementChild.post_comment.value = event.currentTarget.comment.value;
    event.currentTarget.nextElementSibling.prepend(cloned_comment_container);
    event.currentTarget.reset();
    event.currentTarget.lastElementChild.disabled = true;
    event.currentTarget.lastElementChild.classList.add("disable_button");
    event.currentTarget.parentNode.querySelector(".comment_length").innerHTML = `${event.currentTarget.nextElementSibling.childElementCount} Comment`; 

    /* Delete comment action */
    cloned_comment_container.querySelector(".edit_comment_form .delete_action").addEventListener("click", showDeleteCommnentModal);

    /* Edit comment action */
    cloned_comment_container.querySelector(".edit_comment_form .edit_action").addEventListener("click", enableEditComment);
    const edit_comment_form =  cloned_comment_container.querySelector(".edit_comment_form");
    edit_comment_form.addEventListener("keyup", validateEditComment);
    cloned_comment_container.querySelector(".edit_comment_form .cancel_button").addEventListener("click", cancelEditComment);
    edit_comment_form.addEventListener("submit", submitEditComment);
}

let selected_comment_container;

function showDeleteCommnentModal(event) {
    document.querySelector(".delete_comment_modal").classList.add("show_modal");
    selected_comment_container = event.currentTarget.closest(".comment_container");
}

document.querySelector("#delete_comment_form").addEventListener("submit", deleteComment);

function deleteComment(event) {
    event.preventDefault();

    let modal = event.target.closest(".show_modal");
    modal.classList.remove("show_modal");
    selected_comment_container.parentNode.parentNode.querySelector(".comment_length").innerHTML = `${selected_comment_container.parentNode.childElementCount - 1} Comment`; 
    selected_comment_container.remove();
    selected_comment_container = null;
}

function enableEditComment (event) {
    let form = event.currentTarget.closest(".edit_comment_form");
    form.post_comment.classList.add("enable_textarea");
    form.post_comment.disabled = false;
    form.post_comment.dataset.oldMessage = form.post_comment.value;
    event.currentTarget.parentNode.classList.add("hide_message_actions");
    event.currentTarget.parentNode.nextElementSibling.classList.remove("hide_buttons_container");
}

function validateEditComment(event) {
    const success_button = event.currentTarget.lastElementChild.lastElementChild.lastElementChild;
    if(event.currentTarget.post_comment.value === "") {
        success_button.disabled = true;
        success_button.classList.add("disable_button");
    } 
    else {
        success_button.disabled = false;
        success_button.classList.remove("disable_button");
    }
}

function cancelEditComment(event) {
    let form = event.currentTarget.closest(".edit_comment_form");
    form.post_comment.classList.remove("enable_textarea");
    form.post_comment.disabled = true;
    form.post_comment.value = form.post_comment.dataset.oldMessage;
    event.currentTarget.parentNode.classList.add("hide_buttons_container");
    event.currentTarget.parentNode.previousElementSibling.classList.remove("hide_message_actions");
}

function submitEditComment(event) {
    event.preventDefault();
    event.currentTarget.post_comment.classList.remove("enable_textarea");
    event.currentTarget.post_comment.disabled = true;
    event.currentTarget.lastElementChild.lastElementChild.classList.add("hide_buttons_container");
    event.currentTarget.lastElementChild.firstElementChild.classList.remove("hide_message_actions");
}