import React from 'react';
import { connect } from 'dva';
import { NavBar, Icon, Grid, List, WhiteSpace } from 'antd-mobile';
import user from 'assets/user.png';
import router from 'umi/router';
import {getStore} from 'utils/localStorage'
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
    const { msite: {msiteAddressData = {}, FoodTypesData = [], shopListData = []} } = this.props
    return(
      <div>
        <NavBar mode="dark" icon={<Icon type="search" />}
        onLeftClick={()=>{ router.go(-1)}}
        rightContent={user_token ? <img src={user} onClick={()=>{router.push('/profile');}} /> : <div onClick={() => {router.push('/login');}}>登录 | 注册</div>}
        ><a href='/'>{msiteAddressData.name}</a></NavBar>
        <Grid data={FoodTypesData} isCarousel renderItem={dataItem => (
          <div>
            <img style={{width: 46, height: 46, paddingBottom: 20}} src={`https://fuss10.elemecdn.com/${dataItem.image_url}`} />
            <div>{dataItem.title}</div>
          </div>
        )} />
        <WhiteSpace size='lg' />
        <List renderHeader={() => '附近商家'}>
          {shopListData.map(item => {
            return <List.Item>123</List.Item>
          })}
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
