document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar el botón de registro
    const btnRegistrar = document.querySelector('.btn button');

    // Función para capturar los datos del formulario y hacer el POST
    btnRegistrar.addEventListener('click', function () {
        // Obtener los valores de los campos del esposo
        const nombreEsposo = document.getElementById('nombre1').value; // Cambié 'nombre' por 'nombre1'
        const apellidoEsposo = document.getElementById('apellido1').value; // Cambié 'apellido' por 'apellido1'
        const cedulaEsposo = document.getElementById('cedula1').value; // Cambié 'cedula' por 'cedula1'
        const generoEsposo = document.getElementById('genero1').value; // Cambié 'genero' por 'genero1'
        const telefonoEsposo = document.getElementById('telefono1').value; // Cambié 'telefono' por 'telefono1'
        const direccionEsposo = document.getElementById('direccion1').value; // Cambié 'direccion' por 'direccion1'
        const emailEsposo = document.getElementById('email1').value; // Cambié 'email' por 'email1'

        // Obtener los valores de los campos de la esposa
        const nombreEsposa = document.getElementById('nombre2').value; // Cambié 'nombre' por 'nombre2'
        const apellidoEsposa = document.getElementById('apellido2').value; // Cambié 'apellido' por 'apellido2'
        const cedulaEsposa = document.getElementById('cedula2').value; // Cambié 'cedula' por 'cedula2'
        const generoEsposa = document.getElementById('genero2').value; // Cambié 'genero' por 'genero2'
        const telefonoEsposa = document.getElementById('telefono2').value; // Cambié 'telefono' por 'telefono2'
        const direccionEsposa = document.getElementById('direccion2').value; // Cambié 'direccion' por 'direccion2'
        const emailEsposa = document.getElementById('email2').value; // Cambié 'email' por 'email2'

        // Obtener los valores de los campos de matrimonio
        const fecha = document.getElementById('fecha').value;
        const lugar = document.getElementById('lugar').value;

        // Crear el objeto para enviar los datos del esposo
        const esposoData = {
            nombre: nombreEsposo,
            apellido: apellidoEsposo,
            cedula: cedulaEsposo,
            genero: generoEsposo,
            telefono: telefonoEsposo,
            direccion: direccionEsposo,
            email: emailEsposo
        };

        // Crear el objeto para enviar los datos de la esposa
        const esposaData = {
            nombre: nombreEsposa,
            apellido: apellidoEsposa,
            cedula: cedulaEsposa,
            genero: generoEsposa,
            telefono: telefonoEsposa,
            direccion: direccionEsposa,
            email: emailEsposa
        };

        // Crear el objeto para enviar los datos del matrimonio
        const matrimonioData = {
            fecha: fecha,
            lugar: lugar
        };

        // Hacer POST de los datos de las personas (esposo y esposa)
        fetch('http://localhost:3000/personas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ esposo: esposoData, esposa: esposaData })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Si las personas se registraron correctamente, obtener el id
                const idPersonaEsposo = data.idEsposo;
                const idPersonaEsposa = data.idEsposa;

                // Hacer POST de los datos del matrimonio
                return fetch('http://localhost:3000/matrimonios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idEsposo: idPersonaEsposo,
                        idEsposa: idPersonaEsposa,
                        fecha: matrimonioData.fecha,
                        lugar: matrimonioData.lugar
                    })
                });
            } else {
                alert("Error al registrar a las personas.");
            }
        })
        .then(response => response.json())
        .then(matrimonioData => {
            if (matrimonioData.success) {
                alert('Matrimonio registrado correctamente.');
            } else {
                alert('Error al registrar el matrimonio.');
            }
        })
        .catch(error => console.error('Error al registrar el matrimonio:', error));
    });
});
