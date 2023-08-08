export default function formatearFecha(fecha) {
    if (!fecha) {
        return "Fecha no proporcionada";
    }
    // Dividir la cadena de fecha y hora en dos partes
    const partesFechaHora = fecha.split('T');
    
    // Obtener solo la parte de la fecha en formato "2023-08-07"
    const fechaNueva = partesFechaHora[0];

    // Dividir la fecha en año, mes y día
    const [year, month, day] = fechaNueva.split('-');

    // Crear una nueva fecha con los componentes
    const nuevaFecha = new Date(year, parseInt(month) - 1, day);

    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    return nuevaFecha.toLocaleDateString('es-ES', opciones);
}