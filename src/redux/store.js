import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import {OriginReducer,DestinationReducer} from  '../reducers/reducers'
import {applyMiddleware,createStore } from '@reduxjs/toolkit'

const store1 = configureStore({
    reducer: {
        origin: OriginReducer,
        destination: DestinationReducer
    }
    })

const rootReducer = combineReducers({
    origin: OriginReducer,
    destination: DestinationReducer
})

const store = createStore(rootReducer,applyMiddleware(thunk))

export {store,store1}