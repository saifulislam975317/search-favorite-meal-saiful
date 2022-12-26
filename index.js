const searchInput= document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchInput.addEventListener("keypress", function(event){
  if(event.key==='Enter'){
    searchButton.click();
  }
})



function searchMealByName(){
    const searchInput= document.getElementById("search-input");
    const searchInputText = searchInput.value;
    if(searchInputText == ''){
      document.getElementById("emptyString").style.display = "block";
      document.getElementById("error-something").style.display = "none";
      const cardArea = document.getElementById("card-area");
      cardArea.textContent = '';

      const mealsDetailsContainer = document.getElementById("meals-details");
      mealsDetailsContainer.textContent='';
    }
    else{
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputText}`
    searchInput.value = ''
    loadingSpinner();
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeal(data.meals))
    .catch(error => displayError(error))
    document.getElementById("emptyString").style.display = "none";
    document.getElementById("error-something").style.display = "none";
     
    }
    
}

function displayError(error){
  document.getElementById("error-something").style.display = "block";
  const mealsDetailsContainer = document.getElementById("meals-details");
  mealsDetailsContainer.textContent='';
  loadingSpinner();
}

function displayMeal(meals){
    const cardArea = document.getElementById("card-area");
    
    cardArea.textContent='';
     for(const meal of meals){
        const div = document.createElement("div")
        div.classList.add("col")
        div.innerHTML = `
        <div onclick="mealDetailsLoad(${meal.idMeal})"  class="card h-100">
                <img  src="${meal.strMealThumb}" class="card-img-top w-100" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
                </div>
              </div>
        ` 
        cardArea.appendChild(div);
        
        }
        loadingSpinner();
        
    }
    

function mealDetailsLoad(mealId){
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  loadingSpinner()
  fetch(url)
  .then(response => response.json())
  .then(data => displayMealDetails(data.meals[0]))
}

function displayMealDetails(meal){
 const mealsDetailsContainer = document.getElementById("meals-details");
 mealsDetailsContainer.textContent='';
 const div= document.createElement('div');
 div.classList.add("card");
 div.innerHTML=`
 <img  src="${meal.strMealThumb}" class="card-img-top w-100 img-thumbnail img-fluid" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
          <a href="${meal.strYoutube}" target="_blank" class="btn btn-primary">Go Youtube for more detail</a>
        </div>
 `;

 mealsDetailsContainer.appendChild(div);

 loadingSpinner()
 
}

function loadingSpinner(){
  const spinner = document.getElementById("spinner");
  spinner.classList.toggle("d-none");
}