import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
// import HTML5Backend from 'react-dnd-html5-backend'
// import Toaster from '../Toaster/Toaster'
// import { DragDropContext } from 'react-dnd'

class Root extends React.Component {
  render = () =>
    <Provider store={ this.props.store }>
      <div style={ { height: '100%', width: '100%' } }>
        <Router
          children={ this.props.routes }
          key={ this.props.routerKey }
          history={ this.props.history }
          onUpdate={ this.props.logPageView }
        />
      </div>
    </Provider>
}

Root.propTypes = {
  history: PropTypes.object,
  logPageView: PropTypes.func,
  routerKey: PropTypes.number,
  routes: PropTypes.object,
  store: PropTypes.object,
}
export default Root
// export default DragDropContext(HTML5Backend)(Root)
