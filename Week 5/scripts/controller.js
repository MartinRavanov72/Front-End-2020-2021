function loginDatabase(email, password) {
    window.auth.login(email.value, password.value, (isSuccessful, errorCode, errorMessage) => {
        if (isSuccessful) {
            location.replace("./posts.html");
        } else {
            alert(errorMessage);
        }
    })
}

function registerDatabase(username, email, password) {
    window.auth.register(username.value, email.value, password.value, (isSuccessful, errorCode, errorMessage) => {
        if (isSuccessful) {
            location.replace("./posts.html");
        } else {
            alert(errorMessage);
        }
    })
}

function validate() {
    var errors = document.getElementById("errors");
    var email = document.getElementsByName("text")[0];
    var username = document.getElementsByName("username")[0];
    var password = document.getElementsByName("password")[0];

    if (!email.value) {
        errors.textContent = "Email is mandatory";
        return;
    }

    if (!email.value.includes("@")) {
        errors.textContent = "Email should include @";
        return;
    }

    var lastIndexAt = email.value.lastIndexOf("@");
    var lastIndexDot = email.value.lastIndexOf(".");

    if (lastIndexDot === -1 || lastIndexDot <= lastIndexAt) {
        errors.textContent = "Email should include . in the domain";
        return;
    }

    if (email.value.length < 5) {
        errors.textContent = "Email should be at least 5 chars long";
        return;
    }

    if (password.value.length < 6) {
        errors.textContent = "Password should be at least 6 chars long";
        return;
    }

    if (!password.value.match(/[A-Z]/)) {
        errors.textContent = "Password should contain at least one capital letter";
        return;
    }

    if (!password.value.match(/\d/)) {
        errors.textContent = "Password should contain at least one digit";
        return;
    }

    if (!password.value.match(/[!@#$%^&]/)) {
        errors.textContent = "Password should contain at least one of !@#$%^&";
        return;
    }   

    if (username === null || username === undefined) {
        alert("Влизането е успешно");
        loginDatabase(email, password);
    } else {
        alert("Регистрацията е успешна");
        registerDatabase(username, email, password);
    }
}

var submitBtn = document.getElementById("btn");
submitBtn.addEventListener("click", validate);