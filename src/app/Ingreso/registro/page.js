'use client';  // Activa el componente como cliente en Next.js, necesario para hooks y navegación.

import { useState } from "react";  // Importa el hook `useState` para manejar el estado del formulario.
import { useRouter } from "next/navigation";  // Importa el hook `useRouter` para redireccionar entre páginas.
import { ref, set, get } from "firebase/database";  // Importa funciones para leer y escribir datos en Firebase.
import { database } from "@/config/firebase";  // Importa la configuración de Firebase.
import "./registro.css";  // Importa el archivo CSS para estilizar el componente.

const RegistroHospital = () => {
    // Estados para almacenar la información del formulario
    const [nombreHospital, setNombreHospital] = useState("");
    const [direccion, setDireccion] = useState("");
    const [nit, setNit] = useState("");
    const [responsableNombre, setResponsableNombre] = useState("");
    const [responsableDocumento, setResponsableDocumento] = useState("");
    const [cargo, setCargo] = useState("");
    const [capacidadUrgencias, setCapacidadUrgencias] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [eps, setEps] = useState([]);  // Almacena las EPS asociadas al hospital.
    const [nuevaEps, setNuevaEps] = useState("");  // Almacena la nueva EPS que el usuario quiere agregar.
    const router = useRouter();  // Hook `useRouter` para redireccionar a otras páginas.

    // Maneja el cambio del input para la capacidad de urgencias
    const onChangeCapacidad = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            setCapacidadUrgencias(value);
        }
    };

    // Agrega una nueva EPS al array `eps` si no existe ya
    const agregarEps = () => {
        if (nuevaEps && !eps.includes(nuevaEps)) {
            setEps([...eps, nuevaEps]);
            setNuevaEps("");
        }
    };

    // Elimina una EPS específica del array `eps`
    const eliminarEps = (index) => {
        const newEps = eps.slice();
        newEps.splice(index, 1);
        setEps(newEps);
    };

    // Maneja el envío del formulario para registrar un hospital
    const handleSubmit = async (e) => {
        e.preventDefault();  // Previene el comportamiento por defecto del formulario HTML.

        // Crea el objeto con la información del hospital
        const hospitalData = {
            nombre: nombreHospital,
            direccion,
            nit,
            capacidadUrgencias,
            responsable: {
                nombre: responsableNombre,
                documento: responsableDocumento,
                cargo,
                contrasena
            },
            epsAtendidas: eps  // Array que almacena las EPS que el hospital atiende.
        };

        try {
            // Referencia en Firebase para verificar si el hospital ya existe
            const refHospital = ref(database, `hospitales/${nit}`);
            const snapshot = await get(refHospital);

            if (snapshot.exists()) {
                alert("Ya existe un hospital con este NIT.");  // Muestra alerta si el hospital ya existe.
                return;
            }

            // Guarda el hospital en la base de datos de Firebase
            await set(refHospital, hospitalData);
            alert("Hospital registrado exitosamente.");
            router.push("/Ingreso/login/hospital");  // Redirecciona al formulario de inicio de sesión del hospital.
        } catch (error) {
            console.error("Error al registrar el hospital:", error);
            alert("Hubo un error al registrar el hospital.");  // Manejo de posibles errores en Firebase.
        }
    };

    return (
        <div className="form-container">
            <h2>Registro del Hospital</h2>

            {/* Formulario para registrar el hospital */}
            <form onSubmit={handleSubmit}>

                {/* Input para el nombre del hospital */}
                <input
                    type="text"
                    placeholder="Nombre del hospital"
                    value={nombreHospital}
                    onChange={(e) => setNombreHospital(e.target.value)}
                    required
                />
                
                {/* Input para la dirección del hospital */}
                <input
                    type="text"
                    placeholder="Dirección"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                />

                {/* Input para el NIT del hospital */}
                <input
                    type="text"
                    placeholder="NIT"
                    value={nit}
                    onChange={(e) => setNit(e.target.value)}
                    required
                />

                {/* Input para el nombre del responsable */}
                <input
                    type="text"
                    placeholder="Nombre del Responsable"
                    value={responsableNombre}
                    onChange={(e) => setResponsableNombre(e.target.value)}
                    required
                />
                
                {/* Input para el documento del responsable */}
                <input
                    type="text"
                    placeholder="Documento del Responsable"
                    value={responsableDocumento}
                    onChange={(e) => setResponsableDocumento(e.target.value)}
                    required
                />
                
                {/* Input para el cargo del responsable */}
                <input
                    type="text"
                    placeholder="Cargo del Responsable"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    required
                />
                
                {/* Input para la capacidad de urgencias */}
                <input
                    type="number"
                    placeholder="Capacidad Urgencias"
                    value={capacidadUrgencias}
                    onChange={onChangeCapacidad}
                    min="0"
                    required
                />
                
                {/* Input para la contraseña del responsable */}
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                />

                {/* Sección para agregar EPS */}
                <div>
                    <input
                        type="text"
                        placeholder="Nueva EPS"
                        value={nuevaEps}
                        onChange={(e) => setNuevaEps(e.target.value)}
                    />
                    <button type="button" onClick={agregarEps}>
                        ➕ Añadir EPS
                    </button>

                    {/* Muestra las EPS añadidas y permite eliminarlas */}
                    {eps.length > 0 && (
                        <div>
                            {eps.map((item, idx) => (
                                <span key={idx}>
                                    {item}
                                    <button type="button" onClick={() => eliminarEps(idx)}>❌</button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Botón para enviar el formulario */}
                <button type="submit">Registrar Hospital</button>
            </form>
        </div>
    );
};

export default RegistroHospital;  // Exporta el componente `RegistroHospital`.
