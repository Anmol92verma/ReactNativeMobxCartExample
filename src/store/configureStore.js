import {createStore} from 'redux'
import rootReducer from '../store/reducer'

export default function configureStore() {
    let store = createStore(rootReducer)
    return store
}