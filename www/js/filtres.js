$("#search").on("click", function() {
    localStorage.setItem("city", $("#city").val());
    localStorage.setItem("gender", $("#gender").val());
    localStorage.setItem("height", $("#height").val());
    localStorage.setItem("eyecolour", $("#eyecolour").val());
    localStorage.setItem("skincolour", $("#skincolour").val());
    localStorage.setItem("weight", $("#weight").val());
    localStorage.setItem("category", $("#category").val());
    window.location.href = "profiles.html";
});
