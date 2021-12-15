// this is where your profile info will appear
const overview = document.querySelector(".overview");
const username = "Amanda-Libby"; 
const repoList = document.querySelector(".repo-list");
const selectRepo = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backToRepoButton = document.querySelector(".view-repos");
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
    gitRepos();
};

const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    console.log(repoData);
    displayRepos(repoData);
};

const displayRepos = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        console.log(repoName);
        getRepoInfo(repoName);
    };
});

const getRepoInfo = async function (repoName) {
    const fetchRepo = await fetch(""); // look up how to find the data to fetch in the previous lessons.
    const repoInfo = await fetchRepo.json();
    console.log(repoInfo);
    // fetch data from languages
    const fetchLanguages = await fetch(""); // look up how to find the data to fetch in the previous lessons.
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
    repoData.innerHTML = "";

    const div = document.createElement("div");

    /*
    div.innerHTML = `
    <h3>Name: ${}</h3>
        <p>Description: ${}</p>
        <p>Default Branch: ${}</p>
        <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(div);
    repoData.classList.remove("hide");
    allReposContainer.classList.add("hide");
    */
    backToRepoButton.classList.remove("hide");
};

backToRepoButton = document.addEventListener("click", function () {
    selectRepo.classList.remove("hide");
    displayRepoInfo.classList.add("hide");
    backToRepoButton.classList.add("hide");

});

// write down what all the functions do since they have similar names, I'll have to go back through the project to find this.