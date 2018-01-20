const path = require('path');
const Module = require('module');
const vm = require('vm');

const file = {
  content: `
    import a from './someModule'
    console.log('hello');
  `,
  path: 'virtual.js'
};

const sourceCode = Module.wrap(file.content);
const runner = vm.runInThisContext(sourceCode, {filename: file.path});

const entryModule = new Module('.', null);
entryModule.filename = file.path;
entryModule.paths = Module._nodeModulePaths(path.dirname(entryModule.filename)).concat([]); // more module folders

entryModule.require = function (request) {
  const loadedModule = Module._load(request, entryModule, false);
  // some irrelevant logic using/checking loadedModule
  return loadedModule;
};

entryModule._compile(file.content, file.path);
