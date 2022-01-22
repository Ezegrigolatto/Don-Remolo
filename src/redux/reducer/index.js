const initialState = {
    carrito: [],
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'ENVIAR_COMPRAS':
            return {
                ...state,
                carrito: action.payload,
            };
            case 'RESETEAR_ESTADO':
                return {
                    ...state,
                    carrito: [],
                };
        default:
            return state;
    }
}