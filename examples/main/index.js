import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from '../../es';
import './index.less';

/**
 * 主应用, 可以使用任意技术栈
 * 以下分别是 React 和 Vue 的示例，可切换尝试
 */

// import render from './render/ReactRender';
import render from './render/VueRender';

// Step1 初始化应用（可选）
render({ loading: true });

const loader = loading => render({ loading });

// Step2 注册子应用
registerMicroApps(
  [
    {
      name: 'vue',
      entry: '//localhost:7101',
      container: '#subapp-viewport',
      loader,
      activeRule: '/vue',
    },
    {
      name: 'purehtml',
      entry: '//localhost:7104',
      container: '#subapp-viewport',
      loader,
      activeRule: '/purehtml',
    },
    {
      name: 'react16',
      entry: '//localhost:7100',
      container: '#subapp-viewport',
      loader,
      activeRule: '/react16',
    },
    // {
    //   name: 'vue-components',
    //   entry: '//localhost:9000',
    //   container: '#subapp-viewport',
    //   activeRule: '/vue-组件',
    //   // url: https://github.com/zlong1010/vue-components
    // },
    // {
    //   name: 'react15',
    //   entry: '//localhost:7102',
    //   container: '#subapp-viewport',
    //   loader,
    //   activeRule: '/react15',
    // },
    // {
    //   name: 'vue3',
    //   entry: '//localhost:7105',
    //   container: '#subapp-viewport',
    //   loader,
    //   activeRule: '/vue3',
    // },
  ],
  {
    beforeLoad: [
      app => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      },
    ],
    beforeMount: [
      app => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      },
    ],
    afterUnmount: [
      app => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
      },
    ],
  },
);

const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'qiankun',
});

onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));

setGlobalState({
  ignore: 'master',
  user: {
    name: 'master',
  },
});

// Step3 设置默认进入的子应用
setDefaultMountApp('/vue');

// Step4 启动应用
start();

runAfterFirstMounted(() => {
  console.log('\n[MainApp] first app mounted');
});
