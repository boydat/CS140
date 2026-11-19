document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("#signupform");
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const fullname = document.getElementById("personname").value;
        const age = document.getElementById("age").value;
        const state = document.getElementById("state").value;
        const robotcheck = document.getElementById("robotcheck").checked;
        const gender = document.querySelector('input[name="radio"]:checked') ? document.querySelector('input[name="radio"]:checked').value : '';
        const aboutperson = document.getElementById("aboutperson").value;

        if (!email || !password || !fullname || !age || !state || !gender) {
            alert("Please fill in all required fields.");
            return;
        }

        if (age < 18) {
            alert("You must be 18 or older to sign up.");
            return;
        }

        const formdata = {
            name: fullname,
            email: email,
            password: password,
            age: age,
            state: state,
            robotcheck: robotcheck,
            gender: gender,
            aboutperson: aboutperson
        };

        console.log(formdata);

        const xhr = new XMLHttpRequest();
        xhr.open("GET", "submit.json", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const messageEl = document.getElementById('message');
                const response = JSON.parse(xhr.responseText);
                if (messageEl) {
                    messageEl.textContent = response.message;
                }
                form.reset();
            } else if (xhr.readyState === 4) {
                alert("Error submitting form.");
            }
        };

        xhr.send(JSON.stringify(formdata));
        alert(`Success: ${fullname}`);
    });
});