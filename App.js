import React from 'react'
import {StackContainer} from './route/StackRoot'
import {createStore,applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import {Provider} from 'react-redux'
import Reducers from './1.reducers'

const GlobalState = createStore(Reducers , {} , applyMiddleware(ReduxThunk))

class App extends React.Component{
  render(){
    return(
      <Provider store={GlobalState}>
        <StackContainer/>
      </Provider>
    )
  }
}

export default App