// run the json file with the cmd: json-server --watch async-await.json

const SERVER = "http://localhost:3000/";

async function fetchUsers() {
    const response = await fetch(`${SERVER}users`);
    const users = await response.json();
    console.table(users)
};
fetchUsers();

// Use Button in index.html to fetch the "users" from the async - await.json file.
const fetchButton = document.querySelector(".fetch-button");

// Add an event handler to the button so that on each click, the users are fetched:
fetchButton.addEventListener('click', fetchUsers);


// A helper function
const fetchJson = async function (url) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
};

const fetchPostAndComments = async function (postId) {
    const asyncUsers = fetchJson(`${SERVER}users`);
    const asyncPost = fetchJson(`${SERVER}posts/${postId}`);
    const asyncComments = fetchJson(`${SERVER}comments?postId=${postId}`);

    const users = await asyncUsers;
    const post = await asyncPost;
    const comments = await asyncComments;

    const postAuthor = users.find((user) => user.id === post.userId);
    console.log(postAuthor.name, "-", post.body);

    // Loop over the comments
    for (const comment of comments) {
        // For each comment find the author, and log their name, and the comment.
        const commentAuthor = users.find((user) => user.id === comment.userId);
        console.log(commentAuthor.name, "-", comment.comment);
    }
};
fetchPostAndComments("892a4ba3");

fetchButton.addEventListener("click", () => fetchPostAndComments("892a4ba3"));