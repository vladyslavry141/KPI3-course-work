({
  Registry: {},

  parent: { type: 'Folder', require: false, delete: 'cascade' },
  creator: { type: 'Account', delete: 'cascade' },
  name: 'string',
});
