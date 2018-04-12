import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List, InputItem, WingBlank, Button, Switch, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import router from 'umi/router';
import style from './index.less';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hidden: true
    }
  }
  handleClick = (checked) => {
    this.setState({hidden: checked})
  }
  handleLogin = () => {
    const {form, dispatch} = this.props;
    form.validateFields((error, values) => {
      if (!error) {
        delete values.switch
        dispatch({
          type: 'login/login',
          payload: values
        })
      } else {
        if (error.username) {
          Toast.info('请输入手机号/邮箱/用户名', 3)
        }else if(error.password) {
          Toast.info('请输入密码', 3)
        }else if (error.captcha_code) {
          Toast.info('请输入验证码', 3)
        }
      }
    })
  }
  render() {
    const {form, login, dispatch} = this.props;
    const {captchas} = login;
    const { getFieldProps, getFieldError } = form;
    return(
      <div>
        <WhiteSpace size="lg" />
        <List>
          <InputItem clear error={!!getFieldError('username')} {...getFieldProps('username', {rules: [{ required: true }]})} placeholder="请输入账号">账号</InputItem>
          <InputItem {...getFieldProps('password', {rules: [{ required: true }]})} extra={<Switch onClick={this.handleClick} {...getFieldProps('switch', { initialValue: false, valuePropName: 'checked'})} />} placeholder="请输入密码" type={this.state.hidden ? 'password' : 'text'}>密码</InputItem>
          <InputItem maxLength={4} {...getFieldProps('captcha_code', {rules: [{ required: true }]})} extra={<div className={style['captchas']}>
            <img alt='验证码' src={captchas.code} />
            <div onClick={() => {dispatch({type: 'login/fetch'})}}>
              <div>看不清</div>
              <div className={style['text-blue']}>换一张</div>
            </div>
            </div>} placeholder="验证码">验证码</InputItem>
        </List>
        <WingBlank size="lg">
          <p>温馨提示：未注册过的账号，登录时将自动注册</p>
          <p>注册过的用户可凭账号密码登录</p>
        </WingBlank>
        <Button type="primary" onClick={this.handleLogin}>登录</Button>
        <WhiteSpace size="lg" />
        <div className={style['resetpsw']} onClick={() => {router.push('/forget')}}>重置密码？</div>
      </div>
    )
  }
}

function mapStateToProps({login}) {
  return {login}
}

export default connect(mapStateToProps)(createForm()(Login));
