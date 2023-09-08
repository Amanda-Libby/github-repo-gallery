// where the profile information will appear
const overview = document.querySelector(".overview");
const username = "Amanda-Libby";
const repoList = document.querySelector(".repo-list");
const allReposContainer = document.querySelector(".repos"); // where all the repo information appears
const repoData = document.querySelector(".repo-data"); // where the individual repo data is
const viewReposButton = document.querySelector(".view-repos"); // back to repo gallery button
const filterInput = document.querySelector(".filter-repos");

// go back through the courses to see how to do the javascript needed in this project.

const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json()
    console.log("This is the data from the fetch", data)
    displayUserInfo(data)
}; // function to fetch information from my github profile

gitUserInfo();

const displayUserInfo = function (data) {
    const div = document.createElement("div")
    div.classList.add("user-info")
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div> 
    `;
    overview.append(div);
    fetchRepoFunction();
}; // function to fetch my github user data

const fetchRepoFunction = async function () {
    const fetchRepo = await fetch("https://api.github.com/users/${username}/repos?sort=updated&per_page=100");
    const repoData = await fetchRepo.json();
    console.log(repoData);
    displayRepos(repoData);

}; // function to fetch my repos

const displayRepos = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li")
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3=${repo.name}</h3>`;
        repoList.append(repoItem);
    }
    filterInput.classList.remove("hide");
}; // function to display information about each repo, this will display all of the repos

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText; // check this line
        getRepoInfo(repoName);

    }
});

const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json()
    console.log(repoInfo);

    // fetch the data for all the coding languages in every repo
    const fetchLanguages = await fetch(repoInfo.language_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    // Make a list of languages
    const languages = [];
    for (let language in languageData) {
        languages.push(language);
    }
    console.log(languages);

    displayRepoInfo(repoInfo, languages);
    
}; // Function to get specific repo info

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";

    repoData.classList.remove("hide"); // Unhide (show) the “repo-data” element.
    allReposContainer.classList.add("hide"); // Hide the element with the class of “repos”.

    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(div) // Append the new div element to the section with a class of “repo-data”.

    viewReposButton.classList.remove("hide");
}; // Function to display the individual repo information


viewReposButton.addEventListener("click", function () {
    allReposContainer.classList.remove("hide");
    repoData.classList.add("hide");
    viewReposButton.classList.add("hide");

}); // a click event for what happens when you click the back to repo gallery button

// Dynamic Search
filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value // capture the value of the search text
    console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const searchLowerText = searchText.toLowerCase(); // variable that is assigned the lowercase value of the search text

    for (const repo of repos) { // Loop through each repo inside your repos element.
        const repoLowerText = repo.innerText.toLowerCase(); // variable that is assigned it to the lowercase value of the innerText. of each repo.
        if (repoLowerText.includes(searchLowerText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        } // Check to see if the lowercase repo text includes the lowercase search text. If the repo contains the text, show it. If it doesn’t contain the text, hide the repo.
    }


})


// Ask slack about fetch requests and where to find the information about the url and the endpoints since I always have to look this up.
// ask for screen shots for where to find the information for the fetch requests like where to find the url and where to find the end points that I need





































/*
const overview = document.querySelector(".overview");
const username = "Amanda-Libby"; 
const repoList = document.querySelector(".repo-list");
const allReposContainer = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const viewReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserInfo(data);
};

gitUserInfo();

const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>
    `;
    overview.append(div);
    gitRepos(username);
};

const gitRepos = async function (username) {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    displayRepos(repoData);
};

const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function (e) { // I'm attaching the event listener to the repoList variable since it already has a value at the top of the page.
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    };
});

const getRepoInfo = async function (repoName) {
    const fetchRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`); 
    const repoInfo = await fetchRepo.json();

    // fetch data from languages
    const fetchLanguages = await fetch(repoInfo.languages_url); 
    const languageData = await fetchLanguages.json();

    // make a list of languages
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    };
    
    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
    viewReposButton.classList.remove("hide");
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    allReposContainer.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(div);
};

viewReposButton.addEventListener("click", function () {
    allReposContainer.classList.remove("hide");
    repoData.classList.add("hide");
    viewReposButton.classList.add("hide");
});

// Dynamic search
filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value; // capture the value of the search text
    const repos = document.querySelectorAll(".repo");
    const searchLowerText = searchText.toLowerCase(); // lowercase value of the search text

    for (const repo of repos) {
        const repoLowerCase = repo.innerText.toLowerCase(); // lowercase value of the innerText. of each repo
        if (repoLowerCase.includes(searchLowerText)) { // if lowercase value of the innerText of the repo includes the lowercase value of the search text
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});
*/