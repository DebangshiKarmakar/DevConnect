const joinBtn = document.getElementById("joinBtn");
const modal = document.getElementById("registerModal");
const closeBtn = document.querySelector(".close");

if (joinBtn && modal && closeBtn) {

    joinBtn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

}
/* ===========================
   REGISTER FORM
=========================== */

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function(event){

    event.preventDefault();

    alert("🎉 Registration Successful!\n\nThank you for joining DevConnect.\n\n(Frontend Demo)");

    registerForm.reset();

    modal.style.display = "none";

});