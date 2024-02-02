document.addEventListener('DOMContentLoaded', () => {
    const consultaForm = document.getElementById('consultaForm');
    const citasContainer = document.getElementById('citasContainer');

    consultaForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar el envío del formulario

        const dni = document.getElementById('dni').value;

        // Simulación de consulta local
        const datosConsulta = consultarCitaPorDNI(dni);

        if (datosConsulta) {
            // Mostrar los datos de la consulta al usuario
            mostrarCita(datosConsulta);
        } else {
            alert('No se encontraron citas para el DNI proporcionado.'); // Mostrar un mensaje si no se encuentran datos
        }
    });

    function consultarCitaPorDNI(dni) {
        // Obtener las citas del almacenamiento local
        const citas = JSON.parse(localStorage.getItem('citas')) || [];

        // Buscar la cita correspondiente al DNI proporcionado
        return citas.find(cita => cita.dni === dni);
    }

    function mostrarCita(cita) {
        // Crear elementos HTML para mostrar la cita
        const citaDiv = document.createElement('div');
        citaDiv.innerHTML = `
            <p>Nombre: ${cita.nombre}</p>
            <p>Apellidos: ${cita.apellidos}</p>
            <p>dni: ${cita.dni}</p>
            <p>FechaNacimiento: ${cita.fechaNacimiento}</p>
            <p>Obsevaciones: ${cita.observaciones}</p>
            <p>Fecha de la cita: ${cita.fechaCita}</p>
            <p>Hora de la cita: ${cita.horaCita}</p>
            
        `;

        // Limpiar el contenido actual del contenedor
        citasContainer.innerHTML = '';

        // Agregar la cita al contenedor de citas
        citasContainer.appendChild(citaDiv);
    }
});
