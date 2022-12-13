let close_buttons = document.querySelectorAll(".close_button");
let cancel_buttons = document.querySelectorAll(".cancel_button");
let create_message_button = document.querySelector("#create_message_button");
let modals = document.querySelectorAll(".modal");
let create_message_form = document.querySelector("#create_message_form");
let messages_container = document.querySelector("#messages_container");
let message_container = document.querySelector(".message_container");
let messages_length = document.querySelector("#messages_length");
let no_messages = document.querySelector("#no_messages");
let comment_container = document.querySelector(".comment_container");

for (let close_button of close_buttons) {
    close_button.addEventListener("click", closeModal);
}

for (let cancel_button of cancel_buttons) {
    cancel_button.addEventListener("click", closeModal);
}

for (let modal of modals) {
    modal.addEventListener("click", closeModalWhenClickedOutside);
}

create_message_button.addEventListener("click", openCreateMessageModal);
create_message_form.addEventListener("keyup", validateFormMessage);
create_message_form.addEventListener("submit", submitMessage);

document.querySelector("#delete_message_form").addEventListener("submit", deleteMessageContainer);
document.querySelector("#delete_comment_form").addEventListener("submit", deleteComment);

function closeModal(event) {
    let modal = event.target.closest(".show_modal");
    modal.classList.remove("show_modal");
    create_message_form.reset();
    let success_button = create_message_form.lastElementChild.lastElementChild;
    success_button.disabled = true;
    success_button.classList.add("disable_button");
}

function closeModalWhenClickedOutside(event) {
    if(event.target === event.currentTarget) {
        closeModal(event);
    }
}

function openCreateMessageModal() {
    let create_message_modal = document.querySelector(".create_message_modal");
    create_message_modal.classList.add("show_modal");
    create_message_modal.querySelector("#create_message_form textarea").focus();
}

function validateFormMessage(event) {
    let success_button = event.currentTarget.lastElementChild.lastElementChild;
    if(event.currentTarget.message.value === "") {
        success_button.disabled = true;
        success_button.classList.add("disable_button");
    } 
    else{
        success_button.disabled = false;
        success_button.classList.remove("disable_button");
    }
}

function submitMessage(event) {
    event.preventDefault();
    let cloned_message_container = message_container.cloneNode(true);

    cloned_message_container.hidden = false;
    cloned_message_container.querySelector(".message_content").innerHTML = event.target.message.value;
    cloned_message_container.id = getRandomId();
    messages_container.prepend(cloned_message_container);
    messages_length.innerHTML = messages_container.childElementCount;
    closeModal(event);

    /* Delete action */
    cloned_message_container.querySelector(".edit_message_form .delete_action").addEventListener("click", showDeleteModal);
    
    /* Edit action */
    let edit_message_form = cloned_message_container.querySelector(".edit_message_form");

    edit_message_form.addEventListener("keyup", validateEditMessageForm);
    cloned_message_container.querySelector(".edit_message_form .edit_action").addEventListener("click", showEditMessageForm);
    cloned_message_container.querySelector(".edit_message_form .cancel_button").addEventListener("click", cancelEditMessageForm);
    edit_message_form.addEventListener("submit", submitEditMessageForm);

    /* Comment action */
    let post_comment_form = cloned_message_container.querySelector(".post_comment_form");

    post_comment_form.addEventListener("keyup", validateCommentForm);
    cloned_message_container.querySelector(".edit_message_form .comment_action").addEventListener("click", toggleCommentForm);
    post_comment_form.addEventListener("submit", submitComment);

    if(messages_container.childElementCount >= 1) {
        no_messages.id = "hide_no_messages";
    }
}

/* Delete message functions */
function showDeleteModal(event) {
    let delete_message_modal = document.querySelector(".delete_message_modal");
    delete_message_modal.querySelector("#delete_message_form").message_id.value = event.currentTarget.closest(".message_container").id;
    delete_message_modal.classList.add("show_modal");
}

function deleteMessageContainer(event) {
    event.preventDefault();
    messages_container.querySelector(`#${event.currentTarget.message_id.value}`).remove();
    messages_length.innerHTML = messages_container.childElementCount;
    event.target.closest(".show_modal").classList.remove("show_modal");

    if(messages_container.childElementCount === 0) {
        no_messages.id = "no_messages";
    }
}

/* Edit message functions */

function validateEditMessageForm(event) {
    let success_button = event.currentTarget.lastElementChild.lastElementChild.lastElementChild;
    if(event.currentTarget.post.value === "") {
        success_button.disabled = true;
        success_button.classList.add("disable_button");
    } 
    else{
        success_button.disabled = false;
        success_button.classList.remove("disable_button");
    }
}

function showEditMessageForm (event) {
    let form = event.currentTarget.closest(".edit_message_form");
    let message_content =form.querySelector(".message_content");
    
    message_content.classList.add("hide_message_content");
    form.post.classList.remove("hide_textarea");
    form.post.value =  message_content.textContent;
    form.post.focus();
    event.currentTarget.parentNode.classList.add("hide_message_actions");
    event.currentTarget.parentNode.nextElementSibling.classList.remove("hide_buttons_container");
}

function cancelEditMessageForm(event) {
    let form = event.currentTarget.closest(".edit_message_form");
    
    form.post.classList.add("hide_textarea");
    form.querySelector(".message_content").classList.remove("hide_message_content");
    event.currentTarget.parentNode.classList.add("hide_buttons_container");
    event.currentTarget.parentNode.previousElementSibling.classList.remove("hide_message_actions");
}

function submitEditMessageForm(event) {
    event.preventDefault();
    let message_content = event.currentTarget.querySelector(".message_content");

    message_content.innerHTML = event.currentTarget.post.value;
    message_content.classList.remove("hide_message_content");
    event.currentTarget.post.classList.add("hide_textarea");
    event.currentTarget.lastElementChild.lastElementChild.classList.add("hide_buttons_container");
    event.currentTarget.lastElementChild.firstElementChild.classList.remove("hide_message_actions");
}

/* Comment message functions */
function validateCommentForm(event) {
    let success_button = event.currentTarget.lastElementChild;
    if(event.currentTarget.comment.value === "") {
        success_button.disabled = true;
        success_button.classList.add("disable_button");
    } 
    else{
        success_button.disabled = false;
        success_button.classList.remove("disable_button");
    }
}

function toggleCommentForm(event) {
    let post_comment_form = event.currentTarget.closest(".edit_message_form").nextElementSibling;
    post_comment_form.classList.toggle("hide_form");
    post_comment_form.reset();
    post_comment_form.lastElementChild.disabled = true;
    post_comment_form.lastElementChild.classList.add("disable_button");
    event.currentTarget.lastElementChild.classList.toggle("blue_text");
    let img = event.currentTarget.firstElementChild;
    if(img.getAttribute("src") === "../assets/images/messages-bubble-square-text.png"){
        img.setAttribute("src", "../assets/images/messages-bubble-square-text-blue.png");
    }
    else{
        img.setAttribute("src", "../assets/images/messages-bubble-square-text.png");
    }
    post_comment_form.comment.focus();
    post_comment_form.nextElementSibling.classList.toggle("hide_comments_container");
}

function submitComment(event) {
    event.preventDefault();
    let cloned_comment_container = comment_container.cloneNode(true);

    cloned_comment_container.hidden = false;
    cloned_comment_container.querySelector(".comment_content").innerHTML = event.target.comment.value;
    cloned_comment_container.id = getRandomId();
    event.currentTarget.nextElementSibling.prepend(cloned_comment_container);
    event.currentTarget.reset();
    event.currentTarget.lastElementChild.disabled = true;
    event.currentTarget.lastElementChild.classList.add("disable_button");
    event.currentTarget.parentNode.querySelector(".comment_length").innerHTML = `${event.currentTarget.nextElementSibling.childElementCount - 1} Comment`; 

    /* Delete comment action */
    cloned_comment_container.querySelector(".edit_comment_form .delete_action").addEventListener("click", showDeleteCommnentModal);

    /* Edit comment action */
    let edit_comment_form =  cloned_comment_container.querySelector(".edit_comment_form");
    
    edit_comment_form.addEventListener("keyup", validateEditCommentForm);
    cloned_comment_container.querySelector(".edit_comment_form .edit_action").addEventListener("click", showEditCommentForm);
    cloned_comment_container.querySelector(".edit_comment_form .cancel_button").addEventListener("click", cancelEditCommentForm);
    edit_comment_form.addEventListener("submit", submitEditCommentForm);
}

/* Delete comment functions */

function showDeleteCommnentModal(event) {
    let delete_comment_container = document.querySelector(".delete_comment_modal");
    delete_comment_container.querySelector("#delete_comment_form").comment_id.value = event.currentTarget.closest(".comment_container").id;
    delete_comment_container.classList.add("show_modal");
}

function deleteComment(event) {
    event.preventDefault();
    let selected_comment_container = document.querySelector(`.comments_container #${event.currentTarget.comment_id.value}`);
    selected_comment_container.parentNode.parentNode.querySelector(".comment_length").innerHTML = `${(selected_comment_container.parentNode.childElementCount-1) - 1} Comment`;
    selected_comment_container.remove(); 
    event.target.closest(".show_modal").classList.remove("show_modal");
}

/* Edit comment functions */
function validateEditCommentForm(event) {
    let success_button = event.currentTarget.lastElementChild.lastElementChild.lastElementChild;
    if(event.currentTarget.post_comment.value === "") {
        success_button.disabled = true;
        success_button.classList.add("disable_button");
    } 
    else{
        success_button.disabled = false;
        success_button.classList.remove("disable_button");
    }
}

function showEditCommentForm (event) {
    let form = event.currentTarget.closest(".edit_comment_form");
    let comment_content = form.querySelector(".comment_content");

    comment_content.classList.add("hide_comment_content");
    form.post_comment.classList.remove("hide_textarea");
    form.post_comment.value =  comment_content.textContent;
    form.post_comment.focus();
    event.currentTarget.parentNode.classList.add("hide_message_actions");
    event.currentTarget.parentNode.nextElementSibling.classList.remove("hide_buttons_container");
}

function cancelEditCommentForm(event) {
    let form = event.currentTarget.closest(".edit_comment_form");

    form.post_comment.classList.add("hide_textarea");
    form.querySelector(".comment_content").classList.remove("hide_comment_content");
    event.currentTarget.parentNode.classList.add("hide_buttons_container");
    event.currentTarget.parentNode.previousElementSibling.classList.remove("hide_message_actions");
}

function submitEditCommentForm(event) {
    event.preventDefault();
    let comment_content = event.currentTarget.querySelector(".comment_content");

    comment_content.innerHTML = event.currentTarget.post_comment.value;
    comment_content.classList.remove("hide_comment_content");
    event.currentTarget.post_comment.classList.add("hide_textarea");
    event.currentTarget.lastElementChild.lastElementChild.classList.add("hide_buttons_container");
    event.currentTarget.lastElementChild.firstElementChild.classList.remove("hide_message_actions");
}