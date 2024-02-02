
document.addEventListener('DOMContentLoaded', () =>  {

    // Seleccionar el formulario y agregar un evento de envío
    const citaForm = document.getElementById('citaForm');
    citaForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevenir el envío predeterminado del formulario

        // Obtener los valores de los campos del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const apellidos = document.getElementById('apellidos').value.trim();
        const dni = document.getElementById('dni').value.trim();
        const fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
        const telefono = document.getElementById('telefono').value.trim();
        const observaciones = document.getElementById('observaciones').value.trim();
        const fechaCita = new Date (document.getElementById('fechaCita').value);
        const horaCita = document.getElementById('horaCita').value;


        var now = new Date();

        // Rcomprobar la fecha que no sea posterior
        if (fechaCita < now ) {
            // Si la fecha de la cita es anterior a la fecha actual, mostrar un mensaje de error
            alert('La fecha de la cita no puede ser anterior a la fecha actual.');
            return;
        }

        // comprobar la fecha que no sea futura
        if (fechaNacimiento > now ) {
            // Si la fecha de la cita es anterior a la fecha actual, mostrar un mensaje de error
            alert('La fecha de nacimiento no puede ser posterior a la fecha actual.');
            return;
        }

        //validamos los datos del formulario
        if (validarDatos(nombre, apellidos, dni, fechaNacimiento, telefono, observaciones, fechaCita, horaCita)) {
            // Crear un objeto de cita con los datos del formulario
            const nuevaCita = new Cita(nombre, apellidos, dni, fechaNacimiento, telefono, observaciones, fechaCita, horaCita);
        
            // Agregar la cita a la lista
            controlCitas.agregarCita(nuevaCita);
        
            // Guardar la lista actualizada en el almacenamiento local
            localStorage.setItem('citas', JSON.stringify(controlCitas.citas)); // Mover esta línea aquí
            
            // Mostrar un mensaje de confirmación de la cita
            alert('La cita se ha solicitado correctamente.');
        
            // Limpiar el formulario después de agregar la cita
            citaForm.reset();
        } else {
            // Mostrar mensaje de error si la validación falla
            alert('Por favor, complete todos los campos correctamente.');
        }

        
    });

    // Función para validar los datos del formulario

    function validarDatos(nombre, apellidos, dni, fechaNacimiento, telefono, observaciones, fechaCita, horaCita) {
        //verificamos que los campos no estén vacíos
        return nombre !== '' && apellidos !== '' && dni !== '' && fechaNacimiento !== '' && telefono !== '' && observaciones !== '' && fechaCita !== '' && horaCita !== '';
    }

    //funcion que permite mostrar las citas si lo indicamos en un div con el mismo id
    // en el mismo html que el formulario de solicitar cita.
    function mostrarCitas() {
    const citasList = document.getElementById('citasList');

    // Limpiar el contenido actual
    citasList.innerHTML = '';

    if (controlCitas.citas.length === 0) {
        // Si no hay citas, mostrar un mensaje indicando que no hay citas disponibles
        citasList.innerHTML = '<p>No hay citas disponibles.</p>';
    } else {
        // Construir la tabla de citas
        const tablaCitas = document.createElement('table');
        tablaCitas.innerHTML = `
            <tr>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>DNI</th>
                <th>Fecha Nacimiento</th>
                <th>Teléfono</th>
                <th>Observaciones</th>
                <th>Fecha Cita</th>
                <th>Hora Cita</th>
            </tr>
        `;

        // Iterar sobre todas las citas y agregar filas a la tabla
        controlCitas.citas.forEach(cita => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${cita.nombre}</td>
                <td>${cita.apellidos}</td>
                <td>${cita.dni}</td>
                <td>${cita.fechaNacimiento}</td>
                <td>${cita.telefono}</td>
                <td>${cita.observaciones}</td>
                <td>${cita.fechaCita}</td>
                <td>${cita.horaCita}</td>
            `;

            tablaCitas.appendChild(fila);
        });

        // Agregar la tabla al contenedor citasList
        citasList.appendChild(tablaCitas);
    }
}

    // Definir la clase Cita
    class Cita {
        constructor(nombre, apellidos, dni, fechaNacimiento, telefono, observaciones, fechaCita, horaCita) {
            this.nombre = nombre;
            this.apellidos = apellidos;
            this.dni = dni;
            this.fechaNacimiento = fechaNacimiento;
            this.telefono = telefono;
            this.observaciones = observaciones;
            this.fechaCita = fechaCita;
            this.horaCita = horaCita;
        }
    }

    // Clase principal para gestionar las citas
    class ControlCitas {
        constructor() {
            this.citas = [];
        }

        agregarCita(cita) {
            this.citas.push(cita);
            this.guardarCitasEnCookies();
        }

        guardarCitasEnCookies() {
        }

        cargarCitasDesdeCookies() {
        }
    }
    const controlCitas = new ControlCitas();
    controlCitas.cargarCitasDesdeCookies();

});


