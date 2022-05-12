window.onload = function () {
  function createNode(element) {
    return document.createElement(element);
  }

  function append(parent, el) {
    return parent.appendChild(el);
  }

  const api = "http://localhost:8000";

  const root = document.getElementById("root");
  const nav_cat = document.getElementById("nav_cat");
  const loader = document.getElementById("loader");

  token = localStorage.getItem("token");

  // Si le user est connecté
  if (token && token != "undefined") {
    document.getElementById("button_users").style.display = "inline";
    document.getElementById("button_login").style.display = "none";
    document.getElementById("button_logout").style.display = "inline";
  }

  // Création nav avec les catégories
  console.log("BEGIN NAV CATEGORIES");

  fetch(api + "/api/categories")
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      console.log("Data = ", data);
      let categories = data["hydra:member"];
      return categories.map(function (category) {
        let a = createNode("a");
        append(nav_cat, a);
        a.innerHTML = `${category.name}`;
        a.href = api + `/api/categories/${category.id}`;
        a.classList.add("btn");
        a.classList.add("btn-primary");
        a.classList.add("m-1");
        a.addEventListener("click", function (event) {
          event.preventDefault();
          loader.style.display = "inline";

          fetch(a.href)
            .then((response) => {
              return response.json();
            })

            .then((data) => {
              console.log("Data = ", data);
              root.innerHTML = "";
              h2 = createNode("h2");
              append(root, h2);

              return data.posts.map(function (post) {
                fetch(api + post)
                  .then((response) => {
                    return response.json();
                  })
                  .then((post) => {
                    console.log("Data = ", data);

                    let h3 = createNode("h3");
                    append(root, h3);
                    h2.innerHTML = `${post.title}`;

                    let div = createNode("div");
                    append(root, div);
                    div.innerHTML = `${post.createdAt}`;

                    let img = createNode("img");
                    append(root, img);
                    img.src = `${post.image}`;

                    div = createNode("div");
                    append(root, div);
                    div.innerHTML = `${post.content.substring(0, 5)}...`;

                    loader.style.display = "none";
                  });
                });
            });
        });
      });
    });

  console.log("END CATEGORIES");

  document
    .getElementById("button_posts")
    .addEventListener("click", function () {
      console.log("BEGIN POSTS");

      root.innerHTML = "";
      loader.style.display = "block";

      fetch(api + "/api/posts")
        .then((response) => {
          console.log();
          console.log("Response = ", response);
          return response.json();
        })

        .then((data) => {
          console.log("Data = ", data);
          let posts = data["hydra:member"];
          console.log("Posts = ", posts);
          return posts.map(function (post) {
            console.log("Post = ", post);

            //let element = document.createElement('h2')
            //document.getElementById("root").appendChild(element)
            //element.innerHTML = `${post.slug}`

            let h2 = createNode("h2");
            append(root, h2);
            h2.innerHTML = `${post.title}`;

            let div = createNode("div");
            append(root, div);
            div.innerHTML = `${post.createdAt}`;

            let img = createNode("img");
            append(root, img);
            img.src = `${post.image}`;

            div = createNode("div");
            append(root, div);
            div.innerHTML = `${post.content}`;

            loader.style.display = "none";
          });
        });

      console.log("END POSTS");
    });

  document
    .getElementById("button_categories")
    .addEventListener("click", function () {
      console.log("BEGIN CATEGORIES");

      root.innerHTML = "";
      loader.style.display = "block";

      fetch(api + "/api/categories")
        .then((response) => {
          console.log();
          console.log("Response = ", response);
          return response.json();
        })

        .then((data) => {
          console.log("Data = ", data);
          let categories = data["hydra:member"];
          console.log("Categories = ", categories);
          return categories.map(function (category) {
            console.log("Category = ", category);

            let h2 = createNode("h2");
            append(root, h2);
            h2.innerHTML = `${category.name}`;

            let div = createNode("div");
            append(root, div);
            div.innerHTML = `${category.id} - ${category.slug}`;

            loader.style.display = "none";
          });
        });

      console.log("END CATEGORIES");
    });

  document
    .getElementById("button_users")
    .addEventListener("click", function () {
      console.log("BEGIN USERS");

      root.innerHTML = "";
      loader.style.display = "block";

      token = localStorage.getItem("token");
      console.log("Token = ", token);

      fetch(api + "/api/users", {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          console.log();
          console.log("Response = ", response);
          return response.json();
        })

        .then((data) => {
          console.log("Data = ", data);
          let users = data["hydra:member"];
          console.log("Users = ", users);
          return users.map(function (user) {
            console.log("User = ", user);

            let h2 = createNode("h2");
            append(root, h2);
            h2.innerHTML = `${user.email}`;

            let div = createNode("div");
            append(root, div);
            div.innerHTML = `Roles = ${user.roles}`;

            div = createNode("div");
            append(root, div);
            div.innerHTML = `${user.id} - Verified =  ${user.verified}`;

            loader.style.display = "none";
          });
        });

      console.log("END USERS");
    });

  document
    .getElementById("button_login")
    .addEventListener("click", function () {
      console.log("BEGIN LOGIN");

      root.innerHTML = "";

      const email = prompt("Email");
      const password = prompt("Password");

      loader.style.display = "block";

      fetch(api + "/api/login_check", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          console.log();
          console.log("Response = ", response);
          return response.json();
        })

        .then((data) => {
          console.log("Data = ", data);
          localStorage.setItem("token", data.token);
          loader.style.display = "none";

          if (data.token && data.token != "undefined") {
            document.getElementById("button_users").style.display = "inline";
            document.getElementById("button_login").style.display = "none";
            document.getElementById("button_logout").style.display = "inline";
          }
        });

      console.log("END LOGIN");
    });

  document
    .getElementById("button_logout")
    .addEventListener("click", function () {
      console.log("BEGIN LOGOUT");

      root.innerHTML = "";

      //localStorage.setItem('token', 'toto')
      localStorage.removeItem("token");

      document.getElementById("button_users").style.display = "none";
      document.getElementById("button_login").style.display = "inline";
      document.getElementById("button_logout").style.display = "none";

      console.log("END LOGOUT");
    });
};
