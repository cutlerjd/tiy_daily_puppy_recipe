let recipesContainer = document.getElementsByClassName('recipesContainer')[0]
let recipes = undefined
let url = new URL("/api/?q=", "http://www.recipepuppy.com")
let inputBar = document.getElementById('inputBar')
 inputBar.addEventListener("keyup", function (evt) {
    getRecipes(evt.path[0].value)
})

getRecipes("garlic")

function getRecipes(searchTerm) {
    fetch(url + searchTerm)
        .then(function (response) {
            console.log(response)
            return response.json()
            if (
                response.headers.get("content-type").indexOf("text/javascript") !== -1
            ) {
                //Converts it to JSON
                return response.json;
            } else {
                throw new TypeError(
                    'Response from "' + url + '" has unexpected "content-type"'
                );
            }
        })
        .then(function (data) {
            console.log('JSON from "' + url + '" parsed successfully!');
            console.log(data);
            recipes = data
            fillRecipes()
        })
        .catch(function (error) {
            console.error(error.message);
        });
}
function fillRecipes() {
    let htmlString = ''
    recipes.results.forEach(function (item) {
        item.ingredients = item.ingredients.split(", ")
        htmlString += `
        <div class="recipe">
                <img src="${item.thumbnail}" alt="${item.title}">
                <h2><a href="${item.href}">${item.title}</a></h2>
                <p>`
        item.ingredients.forEach(function (ingredient) {
            htmlString += `
            <span>${ingredient}</span>`
        })
        htmlString += `
                </p>
            </div>`

    });
    recipesContainer.innerHTML = htmlString;
}