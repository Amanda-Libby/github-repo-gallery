// this is where your profile info will appear
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

const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    console.log(repoData);
    displayRepos(repoData);
};

const displayRepos = function (repos) {
    // filterInput.classList.remove("hide");
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
        console.log(repoName);
        getRepoInfo(repoName);
    };
});

const getRepoInfo = async function (repoName) {
    const fetchRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`); 
    const repoInfo = await fetchRepo.json();
    console.log(repoInfo);

    // fetch data from languages
    const fetchLanguages = await fetch(repoInfo.languages_url); 
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    // make a list of languages
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    };
    console.log(languages);
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
    console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const searchLowerText = searchText.toLowerCase(); // lowercase value of the search text

    for (const repo of repos) {
        const repoLowerCase = repo.innerText.toLowerCase(); // lowercase value of the innerText. of each repo
        if (repoLowerCase.includes(searchLowerText)) { // if lowercase value of the innerText of the repo includes the lowercase value of the search text
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    };
});

// write down what all the functions do since they have similar names, I'll have to go back through the project to find this.
// look at the api video to see if I understand how to find the website, endpoints and parameters I need