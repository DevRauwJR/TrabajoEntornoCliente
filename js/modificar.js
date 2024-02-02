document.addEventListener('DOMContentLoaded', () => {
    const modificarCitaForm = document.getElementById('modificarCitaForm');
    const citasContainer = document.getElementById('citasContainer');

    modificarCitaForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar el envío del formulario

        const dni = document.getElementById('dni').value;
        const campo = document.getElementById('campo').value;
        const nuevoValor = document.getElementById('nuevoValor').value;

        // Simulación de consulta local
        const cita = consultarCitaPorDNI(dni);

        if (cita) {
            // Mostrar los detalles de la cita para modificar
            mostrarDetallesCita(cita);

            // Modificar el campo de la cita con el nuevo valor
            modificarCita(cita, campo, nuevoValor);

            // Actualizar la visualización de la cita modificada
            mostrarDetallesCita(cita);

            alert('La cita se ha modificado correctamente.');
        } else {
            alert('No se encontró ninguna cita para el DNI proporcionado.');
        }
    });

    function consultarCitaPorDNI(dni) {
        // Obtener las citas del almacenamiento local
        const citas = JSON.parse(localStorage.getItem('citas')) || [];

        // Buscar la cita correspondiente al DNI proporcionado
        return citas.find(cita => cita.dni === dni);
    }

    function modificarCita(cita, campo, nuevoValor) {
        // Verificar si el campo es válido y modificar la cita
        if (cita.hasOwnProperty(campo)) {
            cita[campo] = nuevoValor;

            // Actualizar la cita en el almacenamiento local
            const citas = JSON.parse(localStorage.getItem('citas')) || [];
            const index = citas.findIndex(c => c.dni === cita.dni);
            if (index !== -1) {
                citas[index] = cita;
                localStorage.setItem('citas', JSON.stringify(citas));
            }
        } else {
            alert('El campo seleccionado no es válido.');
        }
    }

    function mostrarDetallesCita(cita) {
        // Crear elementos HTML para mostrar los detalles de la cita
        const citaDiv = document.createElement('div');
        citaDiv.innerHTML = `
            <p>Nombre: ${cita.nombre}</p>
            <p>Apellidos: ${cita.apellidos}</p>
            <p>DNI: ${cita.dni}</p>
            <p>Fecha de Nacimiento: ${cita.fechaNacimiento}</p>
            <p>Observaciones: ${cita.observaciones}</p>
            <p>Fecha de la cita: ${cita.fechaCita}</p>
            <p>Hora de la cita: ${cita.horaCita}</p>
        `;

        // Limpiar el contenido actual del contenedor
        citasContainer.innerHTML = '';

        // Agregar los detalles de la cita al contenedor
        citasContainer.appendChild(citaDiv);
    }
});
