var result = document.getElementById("result")
const baseURL = window.location.href
var submitButton = document.getElementById("submit")
submitButton.disabled = true
var fullURL = document.getElementById("fullURL");
var shortURL = document.getElementById("shortURL");

function validateInput(){
    if (fullURL.value == "") {
        submitButton.disabled = true
        submitButton.classList.replace("pure-button-primary","pure-button-active")
    } else {
        submitButton.disabled = false
        submitButton.classList.replace("pure-button-active","pure-button-primary")
    }
}

submitButton.onclick = function() {
    result.innerHTML = ''
    submitButton.classList.replace("pure-button-primary","pure-button-active")
    submitButton.disabled = true
    var xhr = new XMLHttpRequest();
    if (shortURL.value == "shortcut") {
        shortURL.value = ""
    }

    if (fullURL.value == "") {
        console.log("URL cannot be blank")
        result.innerHTML = 'URL cannot be blank. Please try again'
        submitButton.classList.replace("pure-button-active","pure-button-primary")
        submitButton.disabled = false
    } else {
        var data = JSON.stringify({ "fullURL": fullURL.value, "shortcut": shortURL.value }); 
        xhr.open('POST', baseURL, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status = 200) {
                    var response = JSON.parse(xhr.responseText)
                    if (response.Success == true) {
                        result.innerHTML = ('Here\'s your link: ' + '<a href="' + baseURL + response.Shortcut + '">' + baseURL + response.Shortcut + '</a>')
                    } else {
                        result.innerHTML = ('Sorry, ' + shortURL.value + ' already exists! Try something else.')
                    }
                    submitButton.classList.replace("pure-button-active","pure-button-primary")
                    submitButton.disabled = false
                    
                } else {
                    console.log("Error response from server")
                }
            }
        };
        console.log("Sending data: " + data)
        xhr.send(data)
    }
}   