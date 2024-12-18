// Activa el componente en el cliente
'use client';

import { useRouter } from "next/navigation";
import './sobre-nosotros.css';

const SobreNosotros = () => {
    const router = useRouter();

    // Función para redireccionar al login del usuario
    const login = () => {
        router.push('/Ingreso/login/usuario');
    };

    return (
        <div className="sobre-container">
            
            {/* Encabezado principal del componente */}
            <h1>🌐 Sobre GeoSalud</h1>

            {/* Descripción breve del propósito del proyecto */}
            <p><strong>📌 Simplificamos tu acceso a la atención médica de emergencia.</strong></p>

            {/* Sección '¿Quiénes Somos?' */}
            <h2>👥 ¿Quiénes Somos?</h2>
            <p>
                En <strong>GeoSalud</strong>, nuestra misión es conectar a las personas con los servicios de emergencia más cercanos
                de manera rápida y eficiente. Sabemos que en momentos de urgencia, el tiempo y la información correcta pueden marcar la diferencia.
            </p>

            {/* Sección '¿Qué te ofrecemos?' con una lista de servicios */}
            <h2>📜 ¿Qué te ofrecemos?</h2>

            {/* Contenedor para los servicios ofrecidos */}
            <div className="contenedor-servicios">
                
                {/* Servicio 1: Localizar hospitales cercanos */}
                <div className="servicio">
                    🗺️ <strong>Localizar hospitales cercanos</strong>
                    <p>Usa tu ubicación para encontrar opciones rápidas y seguras.</p>
                </div>

                {/* Servicio 2: Filtrar según tu EPS */}
                <div className="servicio">
                    🏥 <strong>Filtrar según tu EPS</strong>
                    <p>Asegúrate de recibir atención en hospitales compatibles con tu cobertura.</p>
                </div>

                {/* Servicio 3: Ver tiempos de llegada estimados */}
                <div className="servicio">
                    🚗 <strong>Ver tiempos de llegada estimados</strong>
                    <p>Descubre cuánto tardarás en llegar a cada hospital.</p>
                </div>

                {/* Servicio 4: Consultar ocupación en urgencias */}
                <div className="servicio">
                    📊 <strong>Consultar ocupación en urgencias</strong>
                    <p>Conoce el estado actual del área de urgencias para tomar decisiones informadas.</p>
                </div>

                {/* Servicio 5: Tiempos de Respuesta Optimizados */}
                <div className="servicio">
                    🕒 <strong>Tiempos de Respuesta Optimizados</strong>
                    <p>La rapidez y eficiencia garantizan tu acceso inmediato a servicios médicos.</p>
                </div>

                {/* Servicio 6: Seguridad y Privacidad */}
                <div className="servicio">
                    🔒 <strong>Seguridad y Privacidad</strong>
                    <p>Tu información personal y médica se maneja con altos estándares de privacidad.</p>
                </div>

            </div>

            {/* Sección 'Tecnología al servicio de tu salud' */}
            <h2>🛠️ Tecnología al servicio de tu salud</h2>
            <p>
                Nuestra herramienta combina mapas interactivos, datos en tiempo real y un sistema intuitivo que prioriza tus necesidades,
                ayudándote a encontrar soluciones médicas en situaciones críticas.
            </p>

            {/* Botón para iniciar sesión */}
            <div className="cuenta">
                <button onClick={login}>Empieza ahora</button>
            </div>

        </div>
    );
};

export default SobreNosotros;
