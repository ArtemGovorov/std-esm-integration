const Module = require('module');

process.env.ESM_OPTIONS = {await: true};

const file = {
  content: 'await 1',
  path: 'virtual.js'
};

const entryModule = new Module('.', null);
entryModule.filename = file.path;
entryModule._compile(file.content, file.path);

