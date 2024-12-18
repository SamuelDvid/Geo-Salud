'use client';  // Activa el componente como cliente en Next.js, necesario para hooks y navegación.

import { useState } from "react";  // Importa el hook `useState` para manejar el estado del formulario.
import { ref, get } from "firebase/database";  // Importa las funciones de Firebase para acceder a la base de datos.
import { database } from "@/config/firebase";  // Importa la configuración de Firebase.
import { useRouter } from "next/navigation";  // Importa el hook `useRouter` para la navegación en Next.js.
import "./page.css";  // Importa el archivo CSS para estilizar el componente.

const LoginHospital = () => {
    // Declaración de estados para manejar el valor de los campos del formulario.
    const [nit, setNit] = useState("");  // Estado para el NIT del hospital.
    const [documento, setDocumento] = useState("");  // Estado para el número de documento del responsable.
    const [contrasena, setContrasena] = useState("");  // Estado para la contraseña del hospital.
    const router = useRouter();  // Hook para redirigir al usuario dentro de Next.js.

    // Función que maneja el envío del formulario.
    const handleSubmit = async (e) => {
        e.preventDefault();  // Previene el comportamiento predeterminado del formulario HTML.

        try {
            // Referencia a la base de datos de Firebase para acceder al hospital con el NIT ingresado.
            const hospitalRef = ref(database, `hospitales/${nit}`);
            const snapshot = await get(hospitalRef);

            if (snapshot.exists()) {
                const datosHospital = snapshot.val();  // Obtiene los datos del hospital desde Firebase.

                console.log("Datos recuperados desde Firebase:", datosHospital);

                // Verifica si el documento y la contraseña coinciden con los datos del hospital.
                if (
                    String(datosHospital.responsable.documento).trim() === String(documento).trim() &&
                    String(datosHospital.responsable.contrasena).trim() === String(contrasena).trim()
                ) {
                    alert("Inicio de sesión exitoso");

                    // Guarda el NIT del hospital en sessionStorage para mantener la sesión activa.
                    sessionStorage.setItem("nombreHospital", nit);

                    // Redirecciona al hospital a la página de inicio después del inicio de sesión.
                    router.push("/inicio/hospital");
                } else {
                    alert("Contraseña o documento incorrecto");
                }
            } else {
                alert("Hospital no encontrado en el sistema");  // Notifica si el hospital no existe en la base de datos.
            }
        } catch (err) {
            console.error("Error al recuperar datos:", err);
            alert("Hubo un error al iniciar sesión");  // Muestra un mensaje de error si falla la solicitud.
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión Hospital</h2>

            {/* Formulario para el inicio de sesión del hospital */}
            <form onSubmit={handleSubmit}>
                <label>NIT del Hospital</label>
                <input
                    placeholder="Ingrese el NIT del hospital"
                    value={nit}
                    onChange={(e) => setNit(e.target.value)}
                    required
                />
                
                <label>Número de Documento</label>
                <input
                    placeholder="Número del documento"
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    type="text"
                    required
                />
                
                <label>Contraseña</label>
                <input
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    type="password"
                    required
                />

                <button type="submit">Iniciar Sesión</button>  {/* Botón para enviar el formulario */}
            </form>

            {/* Botón adicional para redirigir al formulario de registro de hospitales */}
            <button onClick={() => router.push('/Ingreso/registro')}>
                Registrar Hospital
            </button>
        </div>
    );
};

export default LoginHospital;
