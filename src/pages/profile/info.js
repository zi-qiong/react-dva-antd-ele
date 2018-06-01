import React from 'react';
import { connect } from 'dva';
import { NavBar, Icon, WhiteSpace, List, Button, Modal } from 'antd-mobile';
import router from 'umi/router';
import { removeStore } from 'utils/localStorage'

class ProfileInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  showAlert = () => {
    Modal.alert('退出', '是否退出登录', [
      { text: '再等等', onPress: () => console.log('cancel'), style: 'default' },
      { text: '退出登录', onPress: () => {
        removeStore('user_token')
        this.props.dispatch({
          type: 'profile/loginOut'
        })
      } },
    ])
  }

  render() {
    const { profile: {userInfo = {}} } = this.props
    return(
      <div>
        <NavBar mode="dark" icon={<Icon type="left" />} onLeftClick={()=>{router.push('/profile')}}>账户信息</NavBar>
        <WhiteSpace />
        <List>
          <List.Item extra="extra content" arrow="horizontal" onClick={() => {}}>
            头像
          </List.Item>
          <List.Item extra={userInfo.username} arrow="horizontal" onClick={() => {}}>
            用户名
          </List.Item>
          <List.Item arrow="horizontal" onClick={() => {}}>
            收货地址
          </List.Item>
        </List>
        <List renderHeader={() => '账号绑定'}>
          <List.Item arrow="horizontal" onClick={() => {}}>
            手机
          </List.Item>
        </List>
        <List renderHeader={() => '安全设置'}>
          <List.Item arrow="horizontal" extra='修改' onClick={() => {}}>
            登录密码
          </List.Item>
        </List>
        <WhiteSpace size='xl' />
        <Button onClick={this.showAlert} type='warning'>退出登录</Button>
      </div>
    )
  }
}

function mapStateToProps({profile}) {
  return {profile}
}

export default connect(mapStateToProps)(ProfileInfo);
