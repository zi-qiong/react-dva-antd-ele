import React from 'react';
import { NavBar } from 'antd-mobile';

const Head = () => {
  return (
    <div>
      <NavBar mode="dark" leftContent="ele.me" rightContent={<div>登录 | 注册</div>}/>
    </div>
  );
};

Head.propTypes = {
};

export default Head;
