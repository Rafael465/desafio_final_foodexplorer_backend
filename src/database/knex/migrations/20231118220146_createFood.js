exports.up = knex => knex.schema.createTable("foods", table => {
    table.increments("id");
    table.text("title");
    table.text("image");
    table.text("price");
    table.text("type");
    table.text("description");
  
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("foods");