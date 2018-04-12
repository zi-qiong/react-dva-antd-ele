import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import router from 'umi/router';
import './Head.less'

const Head = (props) => {
  const rightContent = [];
  const leftContent = [];
  switch (props.name) {
    case "logo":
      leftContent.push(<span onClick={() => {window.location.reload();}}>ele.me</span>)
    case "login":
      rightContent.push(<span onClick={() => {router.push('/login');}}>登录 | 注册</span>)
    case "goBack":
      leftContent.push(<Icon onClick={() => {router.go(-1);}} type="left" />)
  }
  return (
    <div>
      <NavBar mode="dark" leftContent={leftContent} rightContent={rightContent}>{props.headTitle}</NavBar>
      {
        props.children
      }
    </div>
  );
};

Head.propTypes = {
};

export default Head;
