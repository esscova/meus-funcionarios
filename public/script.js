document.addEventListener('htmx:afterRequest', async function(event){
    if(event.target.getAttribute('id') === 'form-funcionarios'){
        await fetchFuncionarios();
        document.querySelector('#form-funcionarios').reset();
    }

    if(event.target.getAttribute('id') === 'form-edit-funcionarios'){
        await fetchFuncionarios();
        handleCancelEdit();
    }
});

async function fetchFuncionarios(){
    await htmx.ajax('GET', 'http://localhost:3333/colaboradores', '#lista-funcionarios');
}

async function handleDelete(id){
     await htmx.ajax('DELETE', `http://localhost:3333/colaboradores/${id}`, '#toast');
     await fetchFuncionarios();
}

async function handleEdit(id, nome, email, cargo, status){
    // console.log(id, nome, email, cargo, status);
    document.querySelector('#id-funcionario').value = id;
    document.querySelector('#edit-nome').value = nome;
    document.querySelector('#edit-email').value = email;
    document.querySelector('#edit-cargo').value = cargo;
    document.querySelector('#edit-status').checked = status === 'true' ? true : false;

    document.querySelector('#form-edit-funcionarios').classList.remove('hidden');
    document.querySelector('#form-funcionarios').classList.add('hidden');
}

function handleCancelEdit(){
    document.querySelector('#form-edit-funcionarios').classList.add('hidden');
    document.querySelector('#form-funcionarios').classList.remove('hidden');
}

document.addEventListener('htmx:configRequest', function(event){
    // console.log(event);
    if(event.detail.path === '/colaboradores' && event.detail.verb !== 'get'){
        setTimeout(()=>{
            document.querySelector('#toast').innerHTML = '';
        }, 4000);
    }
});