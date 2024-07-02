let listaEmpleados = [];
const objEmpleado = {
    id: '',
    nombre: '',
    puesto: ''
};

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const puestoInput = document.querySelector('#puesto');
const btnAgregar = document.querySelector('#btnAgregar');
//const contenedor = document.querySelector(".contenedor");

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();
    if(nombreInput.value === '' || puestoInput.value === ''){
        alert('Todos los campos son obligatorios');
        return;
    }else if(editando){
         editarEmpleado(); 
        editando =false;
    }else{
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.puesto = puestoInput.value;
        agregarEmpleado();
    }
}

function agregarEmpleado(){
    listaEmpleados.push({...objEmpleado});
    mostrarEmpleados();
    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto(){
    limpiarObjeto.id ='';
    limpiarObjeto.nombre ='';
    limpiarObjeto.puesto ='';   
}

function mostrarEmpleados(){
    const divEmpleados = document.querySelector('.div_empleados');
    limpiarHTML();
    listaEmpleados.forEach(empleado =>{
        const {id, nombre,puesto}= empleado;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre}  -  ${puesto}  -`;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarempleado(empleado);
       
       editarBoton.textContent = 'editar';
       editarBoton.classList.add ('btn','btn_editar');
       parrafo.append(editarBoton)

       const eliminarBoton = document.createElement('button');
    eliminarBoton.onclick = () => eliminarEmpleado(id);
       eliminarBoton.textContent = 'Eliminar';
       eliminarBoton.classList.add ('btn','btn_eliminar');
       parrafo.append(eliminarBoton);

       const hr=document.createElement('hr');
        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    });
} 

    function cargarempleado(empleado){
        const {id, nombre, puesto } =empleado;
        nombreInput.value =nombre;
        puestoInput.value = puesto;
        objEmpleado.id = id;
        formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
        editando=true;
    }

    function  editarEmpleado(){
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.puesto = puestoInput.value;

        listaEmpleados.map(empleado => {
            if(empleado.id === objEmpleado.id){
                empleado.id =objEmpleado.id;
                empleado.nombre =objEmpleado.nombre;
                empleado.puesto =objEmpleado.puesto;
            }
        })
        limpiarHTML();
        mostrarEmpleados();

        formulario.reset();
        formulario.querySelector('button[type="submit"]').textContent ='Agregar';
        editando =false;
    };   

       function eliminarEmpleado(id){
        listaEmpleados =listaEmpleados.filter(empleado => empleado.id !== id )
        limpiarHTML();   
        mostrarEmpleados(); 
    }

    function limpiarHTML(){
        const divEmpleados =document.querySelector('.div_empleados');
        while(divEmpleados.firstChild){
            divEmpleados.removeChild(divEmpleados.firstChild);
        }
    }

   




