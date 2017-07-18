let recipesContainer = document.getElementsByClassName('.recipesContainer')[0]
let recipes = undefined
let url = new URL("/api/?q=garlic", "http://www.recipepuppy.com")

fetch(url)
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
    })
    .catch(function (error) {
        console.error(error.message);
    });

function fillRecipes() {
    let htmlString = ''

}