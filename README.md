<a name="readme-top"></a>

<h3 align="center">My Grocery List Tracker</h3>

  <p align="center">
    This is a repository for a Grocery List tracker that allows users to add their home groceries and manage their quantities. Notifies you when you run out of an item and allows search for recipes using spoonacular API.
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

Want to be able to keep track of all your groceries and be able to get recipes all in the same place? Then this project will be great for your needs.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Instructions on setting up the project locally. To get a local copy up and running follow these simple example steps.

### Prerequisites

First make sure you have npm installed on your machine.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free spoonacular API Key at [https://spoonacular.com/food-api](https://spoonacular.com/food-api)
2. Get a free SendGrid email API Key at  [https://signup.sendgrid.com/](https://signup.sendgrid.com/)
3. Clone the repo
   ```sh
   git clone https://github.com/acvdoandrew/grocery-list.git
   ```
4. Install NPM packages
   ```sh
   npm install
   ```
5. Set Up your `.env.local`
   ```js
    SENDGRID_API_KEY=
    SENDGRID_EMAIL=
    SPOONACULAR_API_KEY=
   ```
6. Run the command inside your terminal
    ```sh
    npm run dev
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [ ] User Authentication.
- [ ] Favorite Recipes List for future uses.
- [ ] Display Nutrition facts inside a recipe's detail page.


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
