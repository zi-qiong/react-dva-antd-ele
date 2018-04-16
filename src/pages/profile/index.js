import React from 'react';
import { connect } from 'dva';

class Msite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return(
      <div>
        111
      </div>
    )
  }
}

function mapStateToProps({msite}) {
  return {msite}
}

export default connect(mapStateToProps)(Msite);
