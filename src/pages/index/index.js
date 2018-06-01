import React from 'react';
import { connect } from 'dva';
import { List, WhiteSpace, Card, Grid, NavBar } from 'antd-mobile';
import classNames from 'classnames';
import router from 'umi/router';
import styles from './index.less';
import user from 'assets/user.png';
import {getStore} from 'utils/localStorage'

function IndexPage({home, login}) {
  const {hotcityData, groupcityData, cityGuessData} = home;
  const user_token = getStore('user_token')
  let groupcityKey = [];
  Object.keys(groupcityData).map((item) => {
    groupcityKey.push(item)
    groupcityKey.sort()
  })
  return (
    <div className={styles['ele-home']}>
      <NavBar leftContent={<div onClick={() => {window.location.reload();}}>ele.me</div>} rightContent={user_token ? <img src={user} onClick={()=>{router.push('/profile');}} /> : <div onClick={() => {router.push('/login');}}>登录 | 注册</div>} />
      <List>
        <List.Item extra="定位不准时，请在城市列表中选择">当前定位城市：</List.Item>
        <List.Item arrow='horizontal' onClick={() => {router.push(`/city/${cityGuessData.id}`);}}><span className={styles['text-blue']}>{cityGuessData.name}</span></List.Item>
      </List>
      <WhiteSpace size='lg' />
      <Card>
        <Card.Header title="热门城市" />
        <Card.Body>
          <Grid data={hotcityData} activeStyle={false}  renderItem={item => (
            <div onClick={() => {router.push(`/city/${item.id}`);}} className={classNames(styles['grid-item'], styles['text-blue'])}>{item.name}</div>
          )} />
        </Card.Body>
      </Card>
      {(groupcityKey || []).map(item => {
        return (
          groupcityData[item] &&
          <div key={item}>
            <WhiteSpace size='lg' />
            <Card>
              <Card.Header title={item === 'A' ? `${item}（按字母排序）` : item} />
              <Card.Body>
                <Grid data={groupcityData[item]} activeStyle={false}  renderItem={data => (
                  <div className={styles['grid-item']} onClick={() => {router.push(`/city/${data.id}`);}}>{data.name}</div>
                )} />
              </Card.Body>
            </Card>
          </div>
        )
      })}
    </div>
  );
}

IndexPage.propTypes = {
};

function mapStateToProps(state) {
  const { home, login } = state
  return { home, login };
}

export default connect(mapStateToProps)(IndexPage);
