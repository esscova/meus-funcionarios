document.addEventListener('htmx:configRequest', function(event){
    // console.log(event);
    if(event.detail.path === '/colaboradores' && event.detail.verb !== 'get'){
        setTimeout(()=>{
            document.querySelector('#toast').innerHTML = '';
        }, 4000)
    }
})