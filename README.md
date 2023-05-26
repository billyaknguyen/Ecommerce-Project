<div align="center">
<img align="center" src="https://cdn.discordapp.com/attachments/899929905318486046/1110477371687059486/EM.png" alt="ecommerce website" height="120" width= "120">
  <h1>Electronics Multiverse - E-commerce Website</h1>
  <p>
     An online shopping platform that provides users with an interactive and seamless online shopping experience.
    <br />
    <br />
    <a href="https://www.youtube.com/watch?v=Et9Fb2kgShM">View Demo</a>
    ·
    <!-- <a href="https://cryptopluie.onrender.com/">Live Website</a>
    · -->
    <a href="https://github.com/billyaknguyen/Ecommerce-Project/issues">Report Bug</a>
  </p>
</div>


<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#tech-stack">Tech Stack</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#installation">Installation</a>
      <ul>
        <li><a href="#run-locally">Run Locally</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


## About The Project

<img alt= "homepage" src="https://cdn.discordapp.com/attachments/899929905318486046/1111561079261245470/homepage5.gif"/>

Electronic Multiverse is an online shopping platform that allows customers to browse through a wide range of electronic products, add items to their cart, and securely complete transactions. Whether customers are looking for smartphones, laptops, headphones, or other electronic gadgets, Electronic Multiverse offers a diverse selection of products to cater to their needs.

## Tech Stack

* Frontend: HTML, CSS, JavaScript
* Backend: Node.js, Express.js, MongoDB
* Frameworks/Libraries: React.js, Styled-components
* Authentication: Auth0


## Features

- **Product Catalog**: Users can browse through a diverse range of products, organized by categories and subcategories. Each product listing includes details such as price, description and brand.

<img alt= "category picture" src="https://cdn.discordapp.com/attachments/899929905318486046/1111541572794855454/category_and_subcategory.gif"/>

- **User Registration and Authentication**: Using Auth0, only authenticated users can add items to their cart and checkout.

<img alt= "authentication picture" src="https://cdn.discordapp.com/attachments/899929905318486046/1111541728630030357/Authentication.gif"/>

- **Shopping Cart**: Add products to the cart, view the cart contents, update quantities, and remove items as needed. The cart is persistent, allowing users to keep items across browsing sessions.

Add products to the cart
<img alt= "product-to-cart" src="https://cdn.discordapp.com/attachments/899929905318486046/1111541988140003408/add_to_cart.gif"/>

View cart contents/ update quantities/ remove items

<img alt= "cart" src="https://cdn.discordapp.com/attachments/899929905318486046/1111542531180744774/cart_funtionality.gif"/>

- **Payment Process**: To complete a purchase, users are required to fill out a secure form containing their address, email, name, and credit card number. This ensures a smooth and reliable transaction process, providing a convenient way for customers to finalize their orders.

<img alt= "payment" src="https://cdn.discordapp.com/attachments/899929905318486046/1111545168714285076/checkout.gif"/>

- **Product Search and Pagination**: Users can easily search for specific products using keywords and paginated pages providing a convenient way to find desired items quickly.

Pagination 
<img alt= "pagination" src="https://cdn.discordapp.com/attachments/899929905318486046/1111545371362070598/pagination.gif"/>

Product Search
<img alt= "search" src="https://cdn.discordapp.com/attachments/899929905318486046/1111545495979036764/Search.gif"/>

- **Confirmation Page**: After successfully completing the purchase, users are presented with a confirmation page displaying the order details.

<img alt= "confirmation" src="https://cdn.discordapp.com/attachments/899929905318486046/1111545668574646312/Confirmation_page.gif"/>

## Installation

### Run Locally

Clone the project

```bash
  git clone https://github.com/billyaknguyen/Ecommerce-Project.git
```
Go to server directory
```bash
  cd server
```
Go to client directory
```bash
  cd client
```
Install dependencies for both client and server

```bash
  yarn install
```

Create  1 .env file with following variables inside root of client

.env
```bash
REACT_APP_API_SERVER_URL= http://localhost:3000/
REACT_APP_AUTH0_DOMAIN=[your AUTH0 DOMAIN key]
REACT_APP_AUTH0_CLIENT_ID= [your AUTH0 CLIENT ID key]
REACT_APP_AUTH0_CALLBACK_URL= http://localhost:3000/callback
```

Create 1 .env file with following variables inside root of server

```bash
MONGO_URI = [your MONGODB key]
```

Start server and client

```bash
yarn start
```

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or suggestions, feel free to reach out to me at my <a href="https://linkedin.com/in/billyaknguyen" target="blank">Linkedin</a> or email : billyaknguyen@gmail.com
