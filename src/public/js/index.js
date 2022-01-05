


const links = document.querySelectorAll(".itenMenu");
const menu_items = document.querySelector('.menu_items');
// CONFIGURACION DEL MENU EN MODO RESPONSIVE
function showMenu() {
    const btn_menu = document.getElementById("burger_menu");
    if (btn_menu){
      const LiLogin = document.getElementById('liLogin')
      
      menu_items.classList.toggle('show')
      LiLogin.classList.toggle('ms-5')
    }
}
// cierro el menu cada vez que se haga click en un link y le agrego la clase Active al clickeado
// links.forEach(function(e){
//   e.addEventListener('click', () =>{
//     links.forEach(element => {
//       element.classList.remove('active')
//     });
//     menu_items.classList.toggle('show')
//     e.classList.add('active')
    
//   })
// })




 

// //NAVEGACION DEL MENU : Esta funcion modifica el offset TOP de la pagina para que cuando clickees en un item del menu vaya al inicio restando el alto del menu.
// const linksx = document.querySelectorAll(".header ul a");
// for (const link of linksx ) {
//   link.addEventListener("click", clickHandler);
// }

// function clickHandler(e) {
//   e.preventDefault();
//   const href = this.getAttribute("href");
//   const offsetTop = document.querySelector(href).offsetTop;
//     console.log("reconocio esto")
//   scroll({
//     top: offsetTop - 115,
//     behavior: "smooth"
//   });
// }

