import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux';
import reducer from './reducers';
import {Provider} from 'react-redux';


/*La segunda linea 'window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()' 
  dice:
	Si se tiene la extension redux devtools extension en el objeto window entonces 
	invocar objeto
  */
const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

//console.log(store;
//console.log(store.getState());



ReactDOM.render(<BrowserRouter>
					<Provider store={store}>
						<App />
					</Provider>
				</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
