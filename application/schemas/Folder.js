({
  Registry: {},

  parent: { type: 'Folder', require: false, delete: 'cascade' },
  name: 'string',
  account: { type: 'Account', required: true, delete: 'cascade' },
  creator: { type: 'Account', delete: 'cascade' },
});
