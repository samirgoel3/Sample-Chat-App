import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'


export const store = createStore(reducers,{}, composeWithDevTools(applyMiddleware(thunk, logger)))