import React from 'react';
import { connect } from 'dva';
import {Card, InputItem, Button, WhiteSpace, WingBlank, Toast, List} from 'antd-mobile';
import { createForm } from 'rc-form';
import {getStore, setStore, removeStore} from 'utils/localStorage';
import router from 'umi/router';
import styles from './index.less';

class City extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      placelist: [],
      history: true
    }
  }
  componentDidMount() {
    if (getStore('placeHistory')) {
      this.setState({
        placelist: JSON.parse(getStore('placeHistory'))
      })
    }else{
      this.setState({placelist: []});
    }
  }
  search = () => {
    const {form, dispatch, match: { params }} = this.props;
    form.validateFields((error, values) => {
      if (!error) {
        values.type = 'search'
        values.city_id = params.cityId
        this.setState({
          history: false
        })
        dispatch({
          type: 'city/serch',
          payload: values
        })
      } else {
        Toast.info('请填入地址', 3)
      }
    })
  }
  checkedPlace = (place, index) => {
    let history = getStore('placeHistory');
    let placeHistory = [];
    let repeat = false;
    if (history) {
      placeHistory = JSON.parse(history);
      placeHistory.map(item => {
        if (item.name === place.name) {
          repeat = true;
        }
      })
      if (!repeat) {
        placeHistory.push(place)
      }
    }else {
      placeHistory.push(place)
    }
    this.props.dispatch({
      type: 'city/save',
      payload: {currentcityData: {}, placeData: []}
    })
    setStore('placeHistory',placeHistory)
    router.push('/msite')
  }

  clearAll = () => {
      removeStore('placeHistory');
      this.setState({placelist: []});
  }

  render() {
    const {form, city} = this.props;
    return (
      <div>
        <WhiteSpace size="lg" />
        <Card>
          <Card.Body>
            <WingBlank size="lg">
              <div className={styles['input']}>
                <InputItem {...form.getFieldProps('keyword', {rules: [{ required: true }]})} placeholder="输入学校、商务楼、地址" />
              </div>
              <Button onClick={this.search} type="primary">提交</Button>
              <WhiteSpace size="lg" />
            </WingBlank>
          </Card.Body>
        </Card>
        {this.state.history && (
          <div>
            <WingBlank size="lg">
              <p>搜索历史</p>
            </WingBlank>
            <List>
            {
              this.state.placelist.map((item, index) => {
                return(
                  <List.Item key={index} onClick={() => this.checkedPlace(item, index)}>
                    <div className={styles['pois_name']}>{item.name}</div>
                    <div className={styles['pois_text']}>{item.address}</div>
                  </List.Item>
                )
              })
            }
            </List>
            {this.state.placelist.length !== 0 && <div className={styles['clear']} onClick={this.clearAll}>清空所有</div>}
          </div>
        )}
        <List>
        {(city.placeData || []).map((item, index) => {
          return(
            <List.Item key={index} onClick={() => this.checkedPlace(item, index)}>
              <div className={styles['pois_name']}>{item.name}</div>
              <div className={styles['pois_text']}>{item.address}</div>
            </List.Item>
          )
        })}
        </List>
      </div>
    )
  }
}

function mapStateToProps({city}) {
  return {city}
}

export default connect(mapStateToProps)(createForm()(City));
