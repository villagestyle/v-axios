## @foxit/v-axios

使用：
```typescript
const axios = new VAxios({
  // 设置默认值（不传值时生效）
  vConfig: {
    showLoading: true
  }
});

/** 注册请求拦截 */
axios.requestInterceptors = config => {
  return config;
};

/** 注册响应拦截 */
axios.responseInterceptors = config => {
  return config.data;
};

axios.vRequest<{ name: '老王', age: 12 }>({
  url: "127.0.0.1",
  method: "get",
  vConfig: {
    showLoading: false
  }
}).then(ret => {
  const { name, age } = ret.data;
  console.log(name, age);
});

axios.vGet(`127.0.0.1/test`, { vConfig: { showLoading: false } });

axios.vPost(`127.0.0.1/testPost`, {
  name: '老王',
  age: 15
}, {
  vConfig: {
    showLoading: false,
    formData: true
  }
});

axios.vDelete(`127.0.0.1/testDelete`, {
  vConfig: {
    showLoading: true
  }
})

axios.vPut(`127.0.0.1/testPut`, {
  id: '123',
  name: "测试"
}, {
  vConfig: {
    showLoading: false
  }
})
```