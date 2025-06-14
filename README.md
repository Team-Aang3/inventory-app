![logo](https://user-images.githubusercontent.com/44912347/202296600-c5f247d6-9616-49db-88f0-38433429d781.jpg)

# Team Members

Lauren Balch, Madison DeGrezia, Jordan Harris

# Video Link

- https://youtu.be/9BMSiffoyaE

# Wireframe link

- https://excalidraw.com/#json=e-2nVeacNdx-iHLYdM16z,6knihIhaoarW6srCmBCqvw

# Inventory App

Inventory App is a full-stack web application that interacts with a RESTful API to manage and display product inventory. Users can browse the full product list, view detailed information for individual items, add new products, or update existing ones using intuitive forms. The app also supports searching by item name or category for quick and efficient navigation.

# Deployment link

- https://inventory-app-crjj.onrender.com

## Getting Started

After forking and cloning the repository, run the following:

1. `npm install`
2. `npm run seed` (runs the seed file)
3. `npm run server-dev`
4. In a seperate terminal, `npm run client-dev`

## Inventory App “Tiers”

The tiers describe different levels of functionality in your application with the difficulty becoming more complex as you advance through the tiers. Start with Tier I, and complete everything you can, moving as quickly as possible as you can to Tier II. They are described as user stories.

Your team should strive to finish at least the first 4 tiers (a CRUD application) and attempt some of the bonus material.

### Tier I: MVP Application

- As a User, I want to view all items in inventory
  - Sequelize Model for Item
  - Name, Description, Price, Category, Image
  - Express Route to GET all Items
  - Front-end View for all Items
- As a User, I want to view any individual item
  - Express Route to GET one Item
  - Front-end view for one item (click to see)

Once you have defined your model, `npm run seed` to populate the table.

### Tier II: Adding an Item

- As a User, I want to add an item by completing a form
  - Add Item front-end form
  - Express Route to ADD the Item
  - Form or Fetch request to add item when form is submitted

### Tier III: Deleting an Item

- As a User, I want to remove an item from inventory
  - Delete button on Single Item View
  - Express Route to DELETE the Item
  - Fetch request to delete item when button is clicked

### Tier IV: Updating an Item

- As a User, I want to edit an item by filling a form
  - Edit form on Single Item View
  - Express Route to UPDATE the Item
  - Fetch request to update item when form is submitted

### Tier V: Bonus Stuff

- As a User, I want my Inventory site to be visually stunning
- As a User, I want to be able to search through data based on search criteria
- As a User, I want to use the application on a mobile browser
