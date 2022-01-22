export function enviarCompras(payload) {
    return {
        type: 'ENVIAR_COMPRAS',
        payload: payload
    };
}

export function eliminarCompras(payload) {
    return {
        type: 'ELIMINAR_COMPRAS',
        payload: payload
    }
}

export function resetearEstado() {
    return {
        type: 'RESETEAR_ESTADO'
    }
}