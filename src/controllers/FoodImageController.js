const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class FoodImageController {
    async update(request, response) {
            console.log(request);
            const { id } = request.params;
            const food_id = id;
            
            const imageFilename = request.file.filename;
    
            const diskStorage = new DiskStorage();

            const food = await knex("foods").where({ id: food_id }).first();
    
            if(food.image){
                await diskStorage.deleteFile(food.image);
            }
    
            const filename = await diskStorage.saveFile(imageFilename);
            food.image = filename;
    
            await knex("foods").update(food).where({ id: food_id });
    
            return response.json();
    }
}

module.exports = FoodImageController;