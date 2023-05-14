const apiKey = 'b02da1fe54764d10b9cb8afc0e7353e4';
const searchInput = document.querySelector('#search');
const recipeContainer = document.querySelector('#recipes');


document.body.addEventListener('keyup', function(event){
  event.preventDefault();
  if(event.code === 'Enter'){
    const query = searchInput.value;
    let sub = document.getElementById('sub')
    sub.addEventListener('click', searchRecipes(query))
    sub.click()
    searchRecipes(query);
    }
});

let btn = document.getElementById('add')
btn.addEventListener('click', function(event){
  event.preventDefault();
  const query = searchInput.value;
  searchRecipes(query)
  }
);

const searchRecipes = async (query) => {
  try {
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=10`);
    const data = await response.json();
    recipeContainer.innerHTML = '';
    data.results.forEach(renderRecipe);
  } catch (error) {
    console.error(error);
  }
}

const renderRecipe = (recipe) => {
  const recipeCard = document.createElement('div');
  recipeCard.classList.add('recipe-card');

  const title = document.createElement('h2');
  title.textContent = recipe.title;

  const image = document.createElement('img');
  image.src = recipe.image;
  image.alt = recipe.title;

  const ingredientsTitle = document.createElement('h3');
  ingredientsTitle.textContent = 'Ingredients:';

  const ingredientsList = document.createElement('ul');
  (recipe.extendedIngredients || []).forEach((ingredient) => {
    const ingredientItem = document.createElement('li');
    ingredientItem.textContent = ingredient.original;
    ingredientsList.appendChild(ingredientItem);
  });

  const viewMoreLink = document.createElement('a');
  viewMoreLink.href = `https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`;
  viewMoreLink.target = '_blank'
  viewMoreLink.textContent = 'View More';


  recipeCard.appendChild(title);
  recipeCard.appendChild(image);
  recipeCard.appendChild(viewMoreLink)
  recipeContainer.appendChild(recipeCard);
}
let currentPage = 1;
let limit = 10;

window.addEventListener('scroll', async function() {
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
    currentPage+=limit;
    const query = searchInput.value;
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&offset=${currentPage}&number=${limit}`);
    try{const data = await response.json();
    data.results.forEach(renderRecipe);
  } catch (error) {
    console.error(error);
  }
  }
});

const burgerMenu = document.getElementById('burger-menu');
const navLinks = document.querySelector('nav ul');
const menuHide = document.querySelector('.menu-hide')
burgerMenu.addEventListener('click', () => {
  menuHide.classList.toggle('open')
  navLinks.classList.toggle('open');
  burgerMenu.classList.toggle('open');
});
const off = () => {
  menuHide.classList.remove('open')
  burgerMenu.classList.remove('open')
}
// Get the button:
let btn_top = document.getElementById("btn-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

const scrollFunction = () => {    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    btn_top.style.display = "block";
  } else {
    btn_top.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
const back_to_top = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
