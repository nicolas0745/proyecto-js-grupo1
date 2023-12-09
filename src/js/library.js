const btnW = document.querySelector('.btn-watched')
const btnQ = document.querySelector('.btn-queue')

btnQ.addEventListener('click', (e) => { 
    
    btnQ.style.background = 'rgba(255, 107, 8, 1)';
    btnW.style.background = 'transparent';
    
    //aqui la funcion llamando a las peliculas en cola
    
})

btnW.addEventListener('click', (e) => { 
    
    btnW.style.background = 'rgba(255, 107, 8, 1)';
    btnQ.style.background = 'transparent';
    
    //aqui la funcion llamando a las peliculas vistas o guardadas
})