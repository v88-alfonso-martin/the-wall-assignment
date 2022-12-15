let create_message_form = document.querySelector("#create_message_form");
let messages_container = document.querySelector("#messages_container");
let message_container = document.querySelector(".message_container");
let messages_length = document.querySelector("#messages_length");
let no_messages = document.querySelector("#no_messages");
let comment_container = document.querySelector(".comment_container");

/* Add click event listeners to close button of modals */
for (let close_button of document.querySelectorAll(".close_button")) {
    close_button.addEventListener("click", closeModal);
}

/* Add click event listeners to all cancel button of modals */
for (let cancel_button of document.querySelectorAll(".cancel_button")) {
    cancel_button.addEventListener("click", closeModal);
}

/* Add click event listeners to the outside of modals */
for (let modal of document.querySelectorAll(".modal")) {
    modal.addEventListener("click", closeModalWhenClickedOutside);
}

/* Add click event listener to create message button */
document.querySelector("#create_message_button").addEventListener("click", openCreateMessageModal);

/* Add listeners to the form for creation of message  */
create_message_form.addEventListener("keyup", validateFormMessage);
create_message_form.addEventListener("submit", submitMessage);

/* Add submit event listener to the form for deleting comment and message */
document.querySelector("#delete_comment_form").addEventListener("submit", deleteComment);
document.querySelector("#delete_message_form").addEventListener("submit", deleteMessageContainer);

/* 
*   DOCU: Hide the modal when clicking close and cancel buttons.
*   @author Alfonso Martin Angeles
*/
function closeModal(event) {
    let modal = event.target.closest(".show_modal");
    let success_button = create_message_form.querySelector(".success_button");

    modal.classList.remove("show_modal");
    create_message_form.reset();
    success_button.disabled = true;
    success_button.classList.add("disable_button");
}

/* 
*   DOCU: Hide the modal when clicking outside.
*   @author Alfonso Martin Angeles
*/
function closeModalWhenClickedOutside(event) {
    /* Check if the click event is outside the modal */
    if(event.target === event.currentTarget) {
        closeModal(event);
    }
}

/* 
*   DOCU: Display the modal for creating message.
*   @author Alfonso Martin Angeles
*/
function openCreateMessageModal() {
    let create_message_modal = document.querySelector(".create_message_modal");
    create_message_modal.classList.add("show_modal");
    create_message_modal.querySelector("#create_message_form textarea").focus();
}

/* 
*   DOCU: Validate the form for creating message.
*   @author Alfonso Martin Angeles
*/
function validateFormMessage(event) {
    let success_button = create_message_form.querySelector(".success_button");

    /* Check if the form is empty, if true then disable the button. If not, don't disable */
    if(event.currentTarget.message.value === "") {
        success_button.disabled = true;
        success_button.classList.add("disable_button");
    } 
    else{
        success_button.disabled = false;
        success_button.classList.remove("disable_button");
    }
}

/* 
*   DOCU: Submit the message created in the form
*   @author Alfonso Martin Angeles
*/
function submitMessage(event) {
    event.preventDefault();
    let cloned_message_container = message_container.cloneNode(true);
    let edit_message_form = cloned_message_container.querySelector(".edit_message_form");
    let post_comment_form = cloned_message_container.querySelector(".post_comment_form");

    /* Prepend newly created message and close the modal */
    cloned_message_container.hidden = false;
    cloned_message_container.querySelector(".message_content").innerHTML = event.target.message.value;
    cloned_message_container.setAttribute("data-message-id", getRandomId());
    messages_container.prepend(cloned_message_container);
    messages_length.innerHTML = messages_container.childElementCount;
    closeModal(event);

    /* Add click event listener for the delete message modal */
    cloned_message_container.querySelector(".edit_message_form .delete_action").addEventListener("click", showDeleteModal);
    
    /* Add event listeners for the edit functionalities of message */
    edit_message_form.addEventListener("keyup", validateEditMessageForm);
    cloned_message_container.querySelector(".edit_message_form .edit_action").addEventListener("click", showEditMessageForm);
    cloned_message_container.querySelector(".edit_message_form .cancel_button").addEventListener("click", cancelEditMessageForm);
    edit_message_form.addEventListener("submit", submitEditMessageForm);

    /* Add event listeners for the creation of comment */
    post_comment_form.addEventListener("keyup", validateCommentForm);
    cloned_message_container.querySelector(".edit_message_form .comment_action").addEventListener("click", toggleCommentForm);
    post_comment_form.addEventListener("submit", submitComment);

    /* Check if there are messages. If true then hide the no messages container*/
    if(messages_container.childElementCount >= 1) {
        no_messages.id = "hide_no_messages";
    }
}

/* 
*   DOCU: Display the delete message modal.
*   @author Alfonso Martin Angeles
*/
function showDeleteModal(event) {
    let delete_message_modal = document.querySelector(".delete_message_modal");

    delete_message_modal.classList.add("show_modal");

    /* Pass the message id to the delete message modal */
    delete_message_modal.querySelector("#delete_message_form").message_id.value = event.currentTarget.closest(".message_container").getAttribute("data-message-id");
}

/* 
*   DOCU: Delete the selected message.
*   @author Alfonso Martin Angeles
*/
function deleteMessageContainer(event) {
    event.preventDefault();
    messages_container.querySelector(`li[data-message-id="${event.currentTarget.message_id.value}"]`).remove();
    messages_length.innerHTML = messages_container.childElementCount;
    event.target.closest(".show_modal").classList.remove("show_modal");

    /* Check if no messages. If none then don't hide the no messages container*/
    if(messages_container.childElementCount === 0) {
        no_messages.id = "no_messages";
    }
}

/*
*   DOCU: Validate the form for editing message.
*   @author Alfonso Martin Angeles
*/
function validateEditMessageForm(event) {
    let success_button = event.currentTarget.querySelector(".success_button");

    /* Check if the form is empty, if true then disable the button. If not, don't disable */
    if(event.currentTarget.post.value === "") {
        success_button.disabled = true;
        success_button.classList.add("disable_button");
    } 
    else{
        success_button.disabled = false;
        success_button.classList.remove("disable_button");
    }
}

/*
*   DOCU: Enable editing of message.
*   @author Alfonso Martin Angeles
*/
function showEditMessageForm (event) {
    let edit_message_form = event.currentTarget.closest(".edit_message_form");
    let message_content = edit_message_form.querySelector(".message_content");
    let message_actions = edit_message_form.querySelector(".message_actions");

    message_content.classList.add("hide_message_content");
    edit_message_form.post.classList.remove("hide_textarea");
    edit_message_form.post.value = message_content.textContent;
    edit_message_form.post.focus();
    message_actions.classList.remove("message_actions");
    message_actions.classList.add("hide_message_actions");
    message_actions.closest(".actions_container").querySelector(".buttons_container").classList.remove("hide_buttons_container");
}

/*
*   DOCU: Disable editing of message and return to read only.
*   @author Alfonso Martin Angeles
*/
function cancelEditMessageForm(event) {
    let edit_message_form = event.currentTarget.closest(".edit_message_form");
    
    edit_message_form.post.classList.add("hide_textarea");
    edit_message_form.querySelector(".message_content").classList.remove("hide_message_content");
    edit_message_form.querySelector(".buttons_container").classList.add("hide_buttons_container");
    edit_message_form.querySelector(".hide_message_actions").classList.add("message_actions");
    edit_message_form.querySelector(".hide_message_actions").classList.remove("hide_message_actions");
}

/*
*   DOCU: Submit the edited message and change the value of the message container.
*   @author Alfonso Martin Angeles
*/
function submitEditMessageForm(event) {
    event.preventDefault();
    let edit_message_form = event.currentTarget;
    let message_content = edit_message_form.querySelector(".message_content");

    message_content.innerHTML = edit_message_form.post.value;
    message_content.classList.remove("hide_message_content");
    edit_message_form.post.classList.add("hide_textarea");
    edit_message_form.querySelector(".buttons_container").classList.add("hide_buttons_container");
    edit_message_form.querySelector(".hide_message_actions").classList.add("message_actions");
    edit_message_form.querySelector(".hide_message_actions").classList.remove("hide_message_actions");
}

/*
*   DOCU: Validate the form for creating comment.
*   @author Alfonso Martin Angeles
*/
function validateCommentForm(event) {
    let success_button = event.currentTarget.querySelector(".success_button");

    /* Check if the form is empty, if true then disable the button. If not, don't disable */
    if(event.currentTarget.comment.value === "") {
        success_button.disabled = true;
        success_button.classList.add("disable_button");
    } 
    else{
        success_button.disabled = false;
        success_button.classList.remove("disable_button");
    }
}

/*
*   DOCU: Display the form for creating comment.
*   @author Alfonso Martin Angeles
*/
function toggleCommentForm(event) {
    let post_comment_form = event.currentTarget.closest(".message_container").querySelector(".post_comment_form");
    let img = event.currentTarget.querySelector("img");

    post_comment_form.classList.toggle("hide_form");
    post_comment_form.reset();
    post_comment_form.querySelector(".success_button").disabled = true;
    post_comment_form.querySelector(".success_button").classList.add("disable_button");
    post_comment_form.comment.focus();
    event.currentTarget.querySelector(".comment_length").classList.toggle("blue_text");
    event.currentTarget.closest(".message_container").querySelector(".comments_container").classList.toggle("hide_comments_container");

    /* Make the icon color blue when comment form is active */
    if(img.getAttribute("src") === "../assets/images/messages-bubble-square-text.png"){
        img.setAttribute("src", "../assets/images/messages-bubble-square-text-blue.png");
    }
    else{
        img.setAttribute("src", "../assets/images/messages-bubble-square-text.png");
    }

}

/*
*   DOCU: Submit the created comment in the form.
*   @author Alfonso Martin Angeles
*/
function submitComment(event) {
    event.preventDefault();
    let cloned_comment_container = comment_container.cloneNode(true);
    let post_comment_form = event.currentTarget;
    let message_container = post_comment_form.closest(".message_container");
    let edit_comment_form =  cloned_comment_container.querySelector(".edit_comment_form");

    /* Prepend the comment and reset the form */
    cloned_comment_container.hidden = false;
    cloned_comment_container.querySelector(".comment_content").innerHTML = event.target.comment.value;
    cloned_comment_container.setAttribute("data-comment-id", getRandomId());
    message_container.querySelector(".comments_container").prepend(cloned_comment_container);
    post_comment_form.reset();
    post_comment_form.querySelector(".success_button").classList.add("disable_button");
    post_comment_form.querySelector(".success_button").disabled = true;
    message_container.querySelector(".comment_length").innerHTML = `${message_container.querySelector(".comments_container").childElementCount} Comment`; 

    /* Add click event listener to the delete comment modal */
    cloned_comment_container.querySelector(".edit_comment_form .delete_action").addEventListener("click", showDeleteCommnentModal);

    /* Add event listeners to the edit functionalities of comment */
    edit_comment_form.addEventListener("keyup", validateEditCommentForm);
    cloned_comment_container.querySelector(".edit_comment_form .edit_action").addEventListener("click", showEditCommentForm);
    cloned_comment_container.querySelector(".edit_comment_form .cancel_button").addEventListener("click", cancelEditCommentForm);
    edit_comment_form.addEventListener("submit", submitEditCommentForm);
}

/*
*   DOCU: Display the delete comment modal.
*   @author Alfonso Martin Angeles
*/
function showDeleteCommnentModal(event) {
    let delete_comment_container = document.querySelector(".delete_comment_modal");

    /* Pass the comment id to the delete comment modal */
    delete_comment_container.querySelector("#delete_comment_form").comment_id.value = event.currentTarget.closest(".comment_container").getAttribute("data-comment-id");
    delete_comment_container.classList.add("show_modal");
}

/*
*   DOCU: Delete the selected comment.
*   @author Alfonso Martin Angeles
*/
function deleteComment(event) {
    event.preventDefault();
    let selected_comment_container = document.querySelector(`.comments_container li[data-comment-id="${event.currentTarget.comment_id.value}"`);
    selected_comment_container.parentNode.parentNode.querySelector(".comment_length").innerHTML = `${selected_comment_container.parentNode.childElementCount - 1} Comment`;
    selected_comment_container.remove(); 
    event.target.closest(".show_modal").classList.remove("show_modal");
}

/*
*   DOCU: Validate the form for editing comment.
*   @author Alfonso Martin Angeles
*/
function validateEditCommentForm(event) {
    let success_button = event.currentTarget.querySelector(".success_button");

    /* Check if the form is empty, if true then disable the button. If not, don't disable */
    if(event.currentTarget.post_comment.value === "") {
        success_button.disabled = true;
        success_button.classList.add("disable_button");
    } 
    else{
        success_button.disabled = false;
        success_button.classList.remove("disable_button");
    }
}

/*
*   DOCU: Enable editing of comment.
*   @author Alfonso Martin Angeles
*/
function showEditCommentForm (event) {
    let edit_comment_form = event.currentTarget.closest(".edit_comment_form");
    let comment_content = edit_comment_form.querySelector(".comment_content");
    let message_actions = edit_comment_form.querySelector(".message_actions");

    comment_content.classList.add("hide_comment_content");
    edit_comment_form.post_comment.classList.remove("hide_textarea");
    edit_comment_form.post_comment.value =  comment_content.textContent;
    edit_comment_form.post_comment.focus();
    message_actions.classList.add("hide_message_actions");
    message_actions.classList.remove("message_actions");
    message_actions.closest(".actions_container").querySelector(".buttons_container").classList.remove("hide_buttons_container");
}

/*
*   DOCU: Disable editing of comment and return to read only.
*   @author Alfonso Martin Angeles
*/
function cancelEditCommentForm(event) {
    let edit_comment_form = event.currentTarget.closest(".edit_comment_form");

    edit_comment_form.post_comment.classList.add("hide_textarea");
    edit_comment_form.querySelector(".comment_content").classList.remove("hide_comment_content");
    edit_comment_form.querySelector(".buttons_container").classList.add("hide_buttons_container");
    edit_comment_form.querySelector(".hide_message_actions").classList.add("message_actions");
    edit_comment_form.querySelector(".hide_message_actions").classList.remove("hide_message_actions");
}

/*
*   DOCU: Submit the edited comment and change the value of the comment container.
*   @author Alfonso Martin Angeles
*/
function submitEditCommentForm(event) {
    event.preventDefault();
    let edit_message_form = event.currentTarget;
    let comment_content = edit_message_form.querySelector(".comment_content");

    comment_content.innerHTML = edit_message_form.post_comment.value;
    comment_content.classList.remove("hide_comment_content");
    edit_message_form.post_comment.classList.add("hide_textarea");
    edit_message_form.querySelector(".buttons_container").classList.add("hide_buttons_container");
    edit_message_form.querySelector(".hide_message_actions").classList.add("message_actions");
    edit_message_form.querySelector(".hide_message_actions").classList.remove("hide_message_actions");
}