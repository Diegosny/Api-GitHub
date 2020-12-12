const renderHtml = (img, id, user, bio, followers, following, url) => {
    let element = `
    <div id="jumbotron" class="jumbotron mt-5">
          <div id="header_avatar">
            <img id="img_avatar" src="${img}" alt=""> 
           
            <div id="titulo_avatar">
              <h4><b>ID:</b> ${id} </h4>
              <hr>
              <h4><b>User:</b> ${user} </h4>
            </div>
            
          </div>
          <hr>
           <h4><b>Bio: </b> ${bio != null ? bio : 'Sem Descrição'}</h4>
           <hr>
           <h4><b>Seguidores: </b> ${followers} </h4>
           <hr>
           <h4><b>Seguindo: </b> ${following} </h4>
           <hr>
           <h4><b>GitHub: </b> <a href="${url}" class="text-dark" id="link_git" style="text-decoration:none;" target="__blank">  ${url} </a> </h4>
        </div>
    `

    return document.getElementById('element-pai').innerHTML += element
}

const apiProfile = user => {
    fetch(`https://api.github.com/users/${user.toLowerCase()}`)
    .then(response => response.json() 
       .then(data => {
           console.log(data)
           if (!data['login']) {
             document.getElementById('verifica_usuario').innerHTML += `<p class="alert alert-danger mt-4"> USUÁRIO NÃO EXISTE </p>`
             document.querySelector('#user').focus()
             return false;
           }
           return renderHtml(data['avatar_url'], data['id'], data['login'], data['bio'], data['followers'], data['following'], data['html_url']);
       })    
    )
}

const profile = () => {
    const user = document.querySelector('#user')
    document.getElementById('verifica_usuario').innerHTML = ''
    document.getElementById('element-pai').innerHTML = ''

    try {
        if (user.value == '') {
            alert('Campo Vazio')
            document.querySelector('#user').focus()
            return;
        }        
        apiProfile(user.value)

    } catch (error) {
        console.log(error)
    }

}