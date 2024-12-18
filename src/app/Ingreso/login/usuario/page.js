'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./page.css"

const LoginUsuario = () => {
    const [nombre, setNombre] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nombre) {
            setError("Por favor, ingresa tu nombre.");
            return;
        }

        try {
            // Guardar el nombre en sessionStorage
            sessionStorage.setItem("nombreUsuario", nombre);

            alert("Inicio de sesión exitoso.");
            router.push("/inicio/usuarios");
        } catch (err) {
            console.error(err);
            setError("Error al guardar datos.");
        }
    };

    return (
        <div className="usuario-container">
            <form onSubmit={handleSubmit}>
                <h2>Inicio de Sesión</h2>

                {error && <p className="error">{error}</p>}

                <input
                    type="text"
                    placeholder="Nombre del Usuario"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />

                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default LoginUsuario;
