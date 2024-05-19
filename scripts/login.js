document.getElementById("buttonLogin").addEventListener("click", function () {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWJkZmM2ZmM0ZmFjNjQ2ZDViNDFkYzk4ZGQ0NDE0ZSIsInN1YiI6IjY2M2QyODMzNDdhODA4YTcxOGE5YTE1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4hePtS7--TpUOQ3NV67gES-O1DT5da5fZIFf5XRbqmE",
    },
  };

  fetch("https://api.themoviedb.org/3/authentication/token/new", options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      const requestToken = response.request_token;
      console.log(requestToken);
      const newPageUrl = `https://www.themoviedb.org/authenticate/${requestToken}`;
      window.open(newPageUrl, "_blank");
    })
    .catch((err) => console.error(err));
});
