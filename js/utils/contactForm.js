function displayModal() {
    const modal = document.getElementById("contact_modal");
    resetFormData()
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    console.log(getFormData());
    modal.style.display = "none";
}

function resetFormData() {
    document.getElementById("firstName").textContent = ''
    document.getElementById("lastName").textContent = ''
    document.getElementById("email").textContent = ''
    document.getElementById("Message").textContent = ''
}

function getFormData() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const Message = document.getElementById("Message").value;
    return { firstName, lastName, email, Message };
}


// Function to handle form submission
function sendForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Perform any additional logic or processing here

    // Optional: Display a success message
    alert("Form submitted successfully!");

    closeModal(); // Close the contact modal after form submission
}

// Event listener for the contact form submission
document.querySelector("#contact_modal form").addEventListener("submit", sendForm);

