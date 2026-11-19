document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("#signupform");
    
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const fullname = document.getElementById("personname").value.trim();
        const ageInput = document.getElementById("age").value;
        const state = document.getElementById("state").value;
        const robotcheck = document.getElementById("robotcheck").checked;
        const genderEl = document.querySelector('input[name="radio"]:checked');
        const gender = genderEl ? genderEl.value : '';
        const aboutperson = document.getElementById("aboutperson").value.trim();
        if (!email || !password || !fullname || !state || !gender || !ageInput) {
            alert("Please fill in all required fields.");
            return;
        }

        const birthDate = new Date(ageInput);
        const today = new Date();
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            calculatedAge--;
        }
        if (calculatedAge < 18) {
            alert("You must be 18 or older to sign up.");
            return;
        }
        const formdata = {
            name: fullname,
            email: email,
            password: password,
            dateOfBirth: ageInput,
            state: state,
            robotcheck: robotcheck,
            gender: gender,
            aboutperson: aboutperson
        };

        console.log("Collected Form Data:", formdata);

        const xhr = new XMLHttpRequest();
        xhr.open("GET", "submit.json", true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const messageEl = document.getElementById('message');
                    try {
                        const response = JSON.parse(xhr.responseText);
                        if (messageEl) {
                            messageEl.textContent = response.message;
                            messageEl.style.color = "green";
                        }
                        form.reset();
                        alert(`Success: ${fullname}`);
                    } catch (e) {
                        console.error("Error parsing JSON response", e);
                    }
                } else {
                    alert("Error submitting form. Could not load submit.json.");
                }
            }
        };
        
        xhr.send();
    });
});