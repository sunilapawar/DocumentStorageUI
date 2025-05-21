const apiBaseUrl = "https://localhost:7102/api";

$("#registerForm").on("submit", function (e) {
    e.preventDefault();
    $.post(`${apiBaseUrl}/Auth/register`, {
        username: $("#regUsername").val(),
        password: $("#regPassword").val()
    }).done(() => alert("Registered successfully"))
      .fail(() => alert("Registration failed"));
});

$("#loginForm").on("submit", function (e) {
    e.preventDefault();

    const data = {
        username: $("#username").val(),
        password: $("#password").val()
    };

    $.ajax({
        url: `${apiBaseUrl}/Auth/login`,
        type: "POST",
        contentType: "application/json", 
        data: JSON.stringify(data),      
        success: function (response) {
            localStorage.setItem("token", response.token);
            window.location.href = "upload.html";
        },
        error: function (jqXHR) {
            alert("Login failed: " + jqXHR.statusText);
        }
    });
});


function uploadFile() {
    const file = $("#fileInput")[0].files[0];
    const formData = new FormData();
    formData.append("file", file);

    $.ajax({
        url: `${apiBaseUrl}/Files/upload`,
        type: "POST",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        data: formData,
        contentType: false,
        processData: false,
        success: () => alert("File uploaded successfully"),
        error: () => alert("Upload failed")
    });
}
