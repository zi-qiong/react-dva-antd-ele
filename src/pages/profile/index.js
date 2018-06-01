import React from 'react';
import { connect } from 'dva';
import { NavBar, Icon, Flex, List, WhiteSpace } from 'antd-mobile';
import router from 'umi/router';
import classNames from 'classnames';
import { getStore } from 'utils/localStorage'
import Footer from '../../components/Footer'
import styles from './index.less'
class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const { profile: {userInfo = {}} } = this.props
    return(
      <div>
        <NavBar mode="dark" icon={<Icon type="left" />} onLeftClick={()=>{ router.push('/')}}>我的</NavBar>
        <List>
          <List.Item arrow="horizontal" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine
            onClick={() => {if (getStore('user_token')) {
              router.push('/profile/info')
            } else {
              router.push('/login')
            }}}>
            {userInfo.username || '登录/注册'}<List.Item.Brief>{userInfo.mobile || '暂无绑定手机号'}</List.Item.Brief>
          </List.Item>
        </List>
        <Flex>
          <Flex.Item className={styles['flex-item']}>
            <div><span className={classNames(styles['num'], styles['orange'])}>{(userInfo.balance || 0).toFixed(2)}</span>元</div>
            <div className={styles['text']}>我的余额</div>
          </Flex.Item>
          <Flex.Item className={styles['flex-item']}>
            <div><span className={classNames(styles['num'], styles['red'])}>{userInfo.gift_amount || 0}</span>个</div>
            <div className={styles['text']}>我的优惠</div>
          </Flex.Item>
          <Flex.Item className={styles['flex-item']}>
            <div><span className={classNames(styles['num'], styles['green'])}>{userInfo.pointNumber || 0}</span>分</div>
            <div className={styles['text']}>我的积分</div>
          </Flex.Item>
        </Flex>
        <WhiteSpace />
        <List>
          <List.Item arrow="horizontal" multipleLine onClick={() => {}}>
            我的订单
          </List.Item>
          <List.Item arrow="horizontal" onClick={() => {}} platform="android">
            积分商城
          </List.Item>
          <List.Item arrow="horizontal" onClick={() => {}}>
            饿了么会员卡
          </List.Item>
        </List>
        <WhiteSpace />
        <List>
          <List.Item arrow="horizontal" multipleLine onClick={() => {}}>
            服务中心
          </List.Item>
          <List.Item arrow="horizontal" onClick={() => {}} platform="android">
            积分商城
          </List.Item>
          <List.Item arrow="horizontal" onClick={() => {}}>
            下载饿了么APP
          </List.Item>
        </List>
        <Footer activeTab={3}/>
      </div>
    )
  }
}

function mapStateToProps({profile}) {
  return {profile}
}

export default connect(mapStateToProps)(Profile);
