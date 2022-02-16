const { Observable } = require('rxjs');
const { filter } = require('rxjs/operators'); // Filtrar valores 

// Promesas
const doSomething = () => {
    return new Promise((resolve) => {
        // resolve('valor 1');

        // No podemos cancelar la respuesta al ejecutar codigo
        setTimeout(() => {
            resolve('valor 2');
        }, 3000);
    })
}

(async () => {
    const rta = await doSomething();
    console.log(rta);
})();

// Observador
// Podemos cancelar respuesta al ejecutar codigo
const doSomething$ = () => {
    return new Observable(observer => {
        // Puede ejecutar varios datos
        observer.next('valor 1 $');
        observer.next('valor 2 $');
        observer.next('valor 3 $');
        observer.next(null);

        setTimeout(() => {
            observer.next('valor 4 $');
        }, 5000);
        setTimeout(() => {
            observer.next(null);
        }, 8000);
        setTimeout(() => {
            observer.next('valor 5 $');
        }, 10000);
    })
}

// A un observador podemos agregar pipes
(() => {
    const obs$ = doSomething$();
    obs$
    .pipe(
        // Filtrar datos que son diferentes a nulo
        filter(value => value !== null)
    )
    .subscribe(rta => {
        console.log(rta);
    })
})();