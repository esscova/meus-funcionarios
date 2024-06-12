document.addEventListener('htmx:afterRequest', async function(event){
    if(event.target.getAttribute('id') === 'form-funcionarios'){
        await fetchFuncionarios();
        document.querySelector('#form-funcionarios').reset();
    }
})

async function fetchFuncionarios(){
    await htmx.ajax('GET', 'http://localhost:3333/colaboradores', '#lista-funcionarios')
}

document.addEventListener('htmx:configRequest', function(event){
    // console.log(event);
    if(event.detail.path === '/colaboradores' && event.detail.verb !== 'get'){
        setTimeout(()=>{
            document.querySelector('#toast').innerHTML = '';
        }, 4000);
    }
});