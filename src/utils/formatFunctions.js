export const formatMilenar = (value) => {
    return value.toLocaleString(undefined, { useGrouping: true }).replace(',', '.')
}


export const limitarString = (texto, limite) => {
    if (texto.length <= limite) {
        return texto;
    } else {
        return texto.slice(0, limite) + "...";
    }
}
