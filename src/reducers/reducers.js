const initialState = {
    origin: {
        latitude: null,
        longitude: null,
        address: "",
        name: ""
    },
    destination: {
        latitude: null,
        longitude: null,
        address: "",
        name: ""
    }
}

export const OriginReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'ADD_ORIGIN':
                return{
                    latitude:action.payload.latitude,
                    longitude:action.payload.longitude,
                    address:action.payload.address,
                    name:action.payload.name
                }
            default:
                return state
    }
}


export const DestinationReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'ADD_DESTINATION':
                return{
                    latitude:action.payload.latitude,
                    longitude:action.payload.longitude,
                    address:action.payload.address,
                    name:action.payload.name
                }
            default:
                return state
    }
}