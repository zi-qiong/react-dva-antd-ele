import React from 'react';
import { NavBar } from 'antd-mobile';
import './Head.less'

const Head = (props) => {
  const rightContent = [];
  const leftContent = [];
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
