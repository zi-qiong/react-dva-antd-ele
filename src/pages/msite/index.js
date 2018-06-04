import React from 'react';
import { connect } from 'dva';
import { NavBar, Icon, Grid, List, WhiteSpace, Carousel } from 'antd-mobile';
import user from 'assets/user.png';
import router from 'umi/router';
import {getStore} from 'utils/localStorage'
import _ from 'lodash'
import styles from './index.less'
import Footer from '../../components/Footer'

class Msite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    const currentPlace = JSON.parse(getStore('currentPlace'))
    this.props.dispatch({
      type: 'msite/fetch',
      payload: currentPlace
    })
  }
  render() {
    const user_token = getStore('user_token')
    const { msite: {msiteAddressData = {}, FoodTypesData = []} } = this.props
    const data = _.chunk(FoodTypesData, 8)
    return(
      <div>
        <NavBar mode="dark" icon={<Icon type="search" />}
        onLeftClick={()=>{ router.go(-1)}}
        rightContent={user_token ? <img src={user} onClick={()=>{router.push('/profile');}} /> : <div onClick={() => {router.push('/login');}}>登录 | 注册</div>}
        ><a href='/'>{msiteAddressData.name}</a></NavBar>
        <Carousel>
          {data.map((item, index) => {
            return <Grid data={data[index]} columnNum={4}
            renderItem={dataItem => (
            <div>
              <img src={`https://fuss10.elemecdn.com/${dataItem.image_url}`} />
              <div>{dataItem.title}</div>
            </div>
          )} />
          })}
        </Carousel>
        <WhiteSpace size='lg' />
        <List renderHeader={() => '附近商家'}>
          <List.Item>12333</List.Item>
          <List.Item>12333</List.Item>
          <List.Item>12333</List.Item>
        </List>
        <Footer activeTab={0}/>
      </div>
    )
  }
}

function mapStateToProps({msite}) {
  return {msite}
}

export default connect(mapStateToProps)(Msite);
