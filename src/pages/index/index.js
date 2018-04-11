import React from 'react';
import { connect } from 'dva';
import { List, WhiteSpace, Card, Grid } from 'antd-mobile';
import classNames from 'classnames';
import styles from './index.less';
import Head from 'components/Head.js';

function IndexPage({ hotcityData, groupcityData, cityGuessData }) {
  let groupcityKey = [];
  for (let i = 65; i <= 90; i++) {
    groupcityKey.push(String.fromCharCode(i))
  }
  return (
    <div className={styles.normal}>
      <Head />
      <List>
        <List.Item extra="定位不准时，请在城市列表中选择">当前定位城市：</List.Item>
        <List.Item arrow="horizontal" onClick={() => {console.log(cityGuessData.id);}}><span className={styles['text-blue']}>{cityGuessData.name}</span></List.Item>
      </List>
      <WhiteSpace size="lg" />
      <Card>
        <Card.Header title="热门城市" />
        <Card.Body>
          <Grid data={hotcityData} activeStyle={false}  renderItem={item => (
            <div className={classNames(styles['grid-item'], styles['text-blue'])}>{item.name}</div>
          )} />
        </Card.Body>
      </Card>
      {(groupcityKey || []).map(item => {
        return (
          groupcityData[item] &&
          <div key={item}>
            <WhiteSpace size="lg" />
            <Card>
              <Card.Header title={item === 'A' ? `${item}（按字母排序）` : item} />
              <Card.Body>
                <Grid data={groupcityData[item]} activeStyle={false}  renderItem={data => (
                  <div className={styles['grid-item']}>{data.name}</div>
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
  return state.home;
}

export default connect(mapStateToProps)(IndexPage);
