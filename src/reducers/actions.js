export const setOrigin = (origin) => {
    dispatchEvent({
        type: 'ADD_ORIGIN',
        payload: origin
    })
}

export const setDestination = (destination) => {
    dispatchEvent({
        type: 'ADD_DESTINATION',
        payload: destination
    })
}