signup_send.addEventListener("click", function(e) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/sign_up", true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onreadystatechange = function() {
        if (this.readyState != 4) {
            return false;
        }
        console.log("->", this.responseText);
        signup_answer.innerHTML = this.responseText;
        
    }
    var user = {
        username: signup_name.value,
        password: signup_password.value
    };
    xhr.send(JSON.stringify(user));
});


login_send.addEventListener("click", function(e) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/login", true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onreadystatechange = function() {
        if (this.readyState != 4) {
            return false;
        }
        console.log("->", this.responseText);
        login_answer.innerHTML = this.responseText;
        
    }
    var user = {
        username: login_name.value,
        password: login_password.value
    };
    xhr.send(JSON.stringify(user));
});

logout_send.addEventListener("click", function(e) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/logout", true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onreadystatechange = function() {
        if (this.readyState != 4) {
            return false;
        }
        console.log("->", this.responseText);
        logout_answer.innerHTML = this.responseText;
        
    }

    xhr.send();
});

