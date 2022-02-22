// log util
export default function log(...args) {
  if (args.length === 0) {
    console.log('\n');
    return;
  }
  // if (args.length === 1) {
  //   console.log(args[0]);
  //   return;
  // }
  const optObj = {};
  const optObjeKMap = {
    string: 'css',
    boolean: 'br',
    number: 'indent',
  }

  const lastArg = args[args.length - 1];
  if (typeof lastArg === 'object' && Array.isArray(lastArg.opt)) {
    lastArg.opt.forEach(optV => {
      const optType = typeof optV;
      optObjeKMap[optType] && (optObj[optObjeKMap[optType]] = optV);
    });
    args = args.slice(0, -1);
  }
  const _opt = Object.assign({
    br: true, indent: 0, css: '#00ffdd',
  }, optObj);
  if (_opt.br) {
    console.log('\n');
  }

  let indent = new Array(_opt.indent).fill(' ').join('');
  const output = [...args];
  if (typeof args[0] === 'string') {
    output.shift();
    output.unshift(`%c${indent+args[0]}`, `color:${_opt.css}`);
  }
  
  console.log(...output);
}

// window.log = log;
log('执行log.js');