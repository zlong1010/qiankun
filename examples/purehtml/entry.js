const render = () => {
  document.querySelector('#purehtml-container').insertAdjacentHTML('beforeend', '<p>update by insertAdjacentHTML</p>');
  return Promise.resolve();
};

(global => {
  // log('加载purehtml');
  global['purehtml'] = {
    bootstrap: () => {
      console.log('purehtml bootstrap');
      return Promise.resolve();
    },
    mount: () => {
      // log('purehtml mount');
      return render();
    },
    unmount: () => {
      console.log('purehtml unmount');
      return Promise.resolve();
    },
  };
})(window);
