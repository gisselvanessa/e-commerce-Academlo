window.addEventListener("load", function () {
    const load = document.querySelector(".load");

    setTimeout(function () {
        load.style.display = "none";
    }, 3000);
});
window.addEventListener("scroll", function(){
      const header= document.querySelector("#header");
      header.classList.toggle("down", window.scrollY>0);
      console.log("scrolling ");
})





