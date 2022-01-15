({
  Entity: {},

  parent: { type: 'Folder', required: false, delete: 'cascade' },
  creator: { type: 'Account', delete: 'cascade' },
  name: 'string',
});
