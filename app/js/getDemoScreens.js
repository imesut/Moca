function demo() {
    console.log("hello");
    var url = new URL(window.location.href);
    var demo_id = url.searchParams.get("demo");

    if (demo_id == 1) {
        $("#mockupField").load("https://imesut.github.io/Moca/mockups/settings/settings_holder.html");
        $("h1")[0].innerText = "Moca - iOS Settings Screen"
    }
}