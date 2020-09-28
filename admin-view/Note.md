# Node

## vue-cli 中 cookie 的使用（vue-cookie 1.1.4）

> npm i vue-cookies

main.js

```js
import cookie from 'vue-cookie'
Vue.prototype.$cookie = cookie;
axios.defaults.withCredentials = true   // 允许 ajax 请求携带 Cookies
```

1. 注入 Cookie：

> $cookies.set(keyName, value[, expireTimes[, path[, domain[, secure[, sameSite]]]]])   //return this

```js
// $cookie 是 main.js 中设置的
// 默认时长：1d
this.$cookie.set("SESSIONID", response.data["Token"], 1);
```

2. 获取 cookie 值：

> $cookies.get(keyName)

```js
let token = this.$cookie.get("SESSIONID");
```

3. 删除 Cookie

```js
this.$cookie.delete("SESSIONID")
```

## 刷新页面

通过 js 直接跳转路由页面不会刷新的解决办法：

App.vue

```vue
<template>
  <div id="app" class="page">
    <router-view class="route" v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data: () => {
    return {
      isRouterAlive: true,
    };
  },

  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

```

其他页面

```vue
<template id="login-body">
</template>

<script>
export default {
  name: "Login",
  inject: ["reload"],   // 注入父页面方法
  },
  methods: {
    login() {
      this.reload();
      }
    },
  },
};
</script>

```this
