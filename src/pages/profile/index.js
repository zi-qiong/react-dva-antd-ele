import React from 'react';
import { connect } from 'dva';
import Footer from '../../components/Footer'
class Msite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return(
      <div>
        <Footer activeTab={3}/>
      </div>
    )
  }
}

function mapStateToProps({msite}) {
  return {msite}
}

export default connect(mapStateToProps)(Msite);
