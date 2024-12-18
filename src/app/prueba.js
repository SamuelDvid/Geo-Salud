import {database} from '../config/firebase';
import { useEffect } from 'react';

const Prueba = () => {
    useEffect(() => {
        database.ref('usuarios/123').set({
            nombre: 'Juan',
            eps: 'Salucol',
            telefono : '123456789'
        })

        database.ref ('usuarios/123').on('value', (snapshot)=>{
            console.log(snapshot.val())
        })
    }, [])

    return <h1>Prueba de realtime database</h1>
}
export default Prueba;