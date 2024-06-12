document.addEventListener('htmx:afterRequest', async function(event){
    if(event.target.getAttribute('id') === 'form-funcionarios'){
        await fetchFuncionarios();
        document.querySelector('#form-funcionarios').reset();
    }
});

async function fetchFuncionarios(){
    await htmx.ajax('GET', 'http://localhost:3333/colaboradores', '#lista-funcionarios');
}

async function handleDelete(id){
     await htmx.ajax('DELETE', `http://localhost:3333/colaboradores/${id}`, '#toast');
     await fetchFuncionarios();
}

document.addEventListener('htmx:configRequest', function(event){
    // console.log(event);
    if(event.detail.path === '/colaboradores' && event.detail.verb !== 'get'){
        setTimeout(()=>{
            document.querySelector('#toast').innerHTML = '';
        }, 4000);
    }
});