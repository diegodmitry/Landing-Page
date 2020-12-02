// Returns a nodelist, which is similar to an array
// const $sections = document.querySelectorAll('[data-js="section"]');
// const $links = document.querySelectorAll('[data-js="link-menu"]');

const $sections = document.querySelectorAll('[data-js="section"]');
const navBar = document.querySelector("#navbar__list");
const topBtn = document.getElementById("topBtn");
const $lastLink = document.querySelector('.linkMenu');


/**
 * End Global Variables
 * Start Helper Functions
 *
*/

//Helper function to check if an element is in viewport
//if in viewport returns true
function isInViewport(element) {
    const distance = element.getBoundingClientRect();
    return (
        distance.top <= 100 &&
        distance.left >= 0 &&
        distance.bottom >= 90 &&
        distance.right <= (window.innerWidth || document.documentElement.clientWidth));
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// // build the nav menu
function buildNavBar () {
  const fragment = document.createDocumentFragment();
  for (let section of $sections) {
      let newNavItem = document.createElement('li');
      const id = section.id;
      console.log(id)
      const dataNav = section.dataset.nav;
      newNavItem.innerHTML = `<a class="menu__link ${id}" href="#${id}">${dataNav}</a>`;
      fragment.appendChild(newNavItem);
  }
  navBar.appendChild(fragment);
}

buildNavBar();

//Event listener for scroll into section - uses the isInViewpot function
// Set sections and links as active
document.addEventListener('scroll', function activeSection(){
    for (const section of $sections) {
        const navItem = document.querySelector(`.${section.id}`);
        if (isInViewport(section)) {
            section.classList.add("section-active");
            navItem.classList.add("link-active");
            console.log(`Section ${section.id} is active`);
        } else {
            section.classList.remove("section-active");
            navItem.classList.remove("link-active");
        }
    }
})

// Scroll to section on link click
const links = document.querySelectorAll(".menu__link");
for (const link of links) {
    link.addEventListener("click", function clickHandler(a){
        a.preventDefault();
        const href = document.querySelector(link.getAttribute("href"));
        console.log(href);
        href.scrollIntoView({ behavior: "smooth" });
    });
}

//Reveal "scroll to top" button after scrolling down the viewport
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        $lastLink.style.display = "block";
      } else {
        $lastLink.style.display = "none";
      }
}

//Event Listener for button click - uses the topFunction to scroll to top
$lastLink.addEventListener('click', () => window.scrollTo({
    top: 0,
    behavior: 'smooth',
  }));
