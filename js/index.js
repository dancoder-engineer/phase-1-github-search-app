let type = "Repo" //or repo

document.addEventListener('DOMContentLoaded', function() {
    switchType()
    document.getElementById('submit').addEventListener('click', function(e) {
        e.preventDefault()
        if (type === "User") {searchUsers(document.getElementById('search').value)}
    })

    
})

function searchUsers(term) {
    usrList = document.getElementById('user-list')
    while(usrList.firstChild) { usrList.firstChild.remove()}
    repos = document.getElementById('repos-list')
    while(repos.firstChild) {repos.firstChild.remove()}
    url = "https://api.github.com/search/users?q="+term
    fetch(url)
    .then(res => res.json())
    .then(data => { 
        for (i of data.items) {
            li = document.createElement('li')
            link = `https://api.github.com/users/${i.login}/repos`
            li.innerText = i.login
            li.addEventListener('click', function(e){
                 getRepos(e.target.innerText)
            })
            document.getElementById('user-list').appendChild(li)
        }
        
        
    })
}

function getRepos(login) {
    repos = document.getElementById('repos-list')
    while(repos.firstChild) {repos.firstChild.remove()}
    url=`https://api.github.com/users/${login}/repos`
    fetch(url)
    .then(res => res.json())
    .then(data => {
   //console.log(url)
   for (i of data) {
       li = document.createElement('li')
       li.innerText= i.name
       document.getElementById('repos-list').appendChild(li)
   }
})

}


function switchType() {
    which = document.getElementById('submit').value
    if (type === "User") {
        type = "Repo"
        document.getElementById('submit').value = "Search Repos"
        return 1
    }

    if (type === "Repo") {
        type = "User"
        document.getElementById('submit').value = "Search Users"
        return 1
    }
}