document.addEventListener('DOMContentLoaded', () => {
    const cancelarCitaForm = document.getElementById('cancelarCitaForm');
    const mensajeDiv = document.getElementById('mensaje');

    cancelarCitaForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar el envío del formulario

        const dni = document.getElementById('dni').value;

        // Simulación de consulta local
        const cita = consultarCitaPorDNI(dni);

        if (cita) {
            // Eliminar la cita
            cancelarCita(dni);

            // Mostrar mensaje de confirmación
            mensajeDiv.textContent = 'La cita ha sido eliminada correctamente.';

        } else {
            mensajeDiv.textContent = 'No se encontró ninguna cita para el DNI proporcionado.';
        }
    });

    function consultarCitaPorDNI(dni) {
        // Obtener las citas del almacenamiento local
        const citas = JSON.parse(localStorage.getItem('citas')) || [];

        // Buscar la cita correspondiente al DNI proporcionado
        return citas.find(cita => cita.dni === dni);
    }

    function cancelarCita(dni) {
        // Obtener las citas del almacenamiento local
        let citas = JSON.parse(localStorage.getItem('citas')) || [];

        // Filtrar las citas para eliminar la cita con el DNI proporcionado
        citas = citas.filter(cita => cita.dni !== dni);
        
        // Actualizar las citas en el almacenamiento local
        localStorage.setItem('citas', JSON.stringify(citas));
        
    }

});
