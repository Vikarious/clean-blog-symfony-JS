window.onload = function () {
  function createNode(element) {
    return document.createElement(element);
  }

  function append(parent, el) {
    return parent.appendChild(el);
  }

  const api = "http://localhost:8000/api";

  const root = document.getElementById("root");

  const preloader = document.getElementById("preloader");

  // button posts
  document
    .getElementById("button-posts")
    .addEventListener("click", function () {
      // console.log("BEGIN_POSTS");
      root.innerHTML = "";
      preloader.style = "display: block";

      fetch(api + "/posts")
        .then((response) => {
          // console.log();
          // console.log("Response = " + response);
          return response.json();
        })

        .then((data) => {
          // console.log("Data = " + data);
          let posts = data["hydra:member"];
          // console.log("Posts = " + posts);
          return posts.map(function (post) {
            // console.log("Post = ", post);

            // let element = document.createElement("h2");
            // document.getElementById("root").appendChild(element);
            // element.innerHTML = `${post.slug}`;

            let h2 = createNode("h2");
            append(root, h2);
            h2.innerHTML = `${post.slug}`;

            let div = createNode("div");
            append(root, div);
            div.innerHTML = `${post.createdAt}`;

            let img = createNode("img");
            append(root, img);
            img.src = `${post.image}`;

            div = createNode("div");
            append(root, div);
            div.innerHTML = `${post.content}`;

            preloader.style = "display: none";
          });
        });
      // console.log("END_POSTS");
    });

  // button categorie
  document
    .getElementById("button-categories")
    .addEventListener("click", function () {
      // console.log("BEGIN_CATEGORIES");
      root.innerHTML = "";
      preloader.style = "display: block";

      fetch(api + "/categories")
        .then((response) => {
          // console.log();
          // console.log("Response = " + response);
          return response.json();
        })

        .then((data) => {
          // console.log("Data = " + data);
          let category = data["hydra:member"];
          // console.log("Posts = " + posts);
          return category.map(function (category) {
            // console.log("Post = ", post);

            let h2 = createNode("h2");
            append(root, h2);
            h2.innerHTML = `${category.name}`;

            let div = createNode("div");
            append(root, div);
            div.innerHTML = `${"slug = " + category.slug}`;

            div = createNode("div");
            append(root, div);
            div.innerHTML = `${"id = " + category.id}`;

            preloader.style = "display: none";
          });
        });
      // console.log("END_CATEGORIES");
    });
};
