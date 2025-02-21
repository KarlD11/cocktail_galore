import express from 'express'
import axios from 'axios'


const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static("public")); 

app.get("/", async (req, res) => {
    try {
        const result = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const data = result.data.drinks[0];

        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
            const ingredient = data[`strIngredient${i}`];
            if (ingredient && typeof ingredient === 'string' && ingredient.trim() !== "") { // Check for empty strings after trimming whitespace
                ingredients.push(ingredient);
            }
        }

        res.render("index.ejs", { 
                nameOfDrink: data.strDrink, 
                instructions: data.strInstructions,
                imgOfDrink: data.strDrinkThumb,
                ingredients: ingredients 
            });

    } catch (error) {
        console.error("Error fetching cocktail:", error); 
        res.status(500).send('Error fetching cocktail. Please try again later.');
    }

})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});