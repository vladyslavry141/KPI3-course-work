({
  Entity: {},

  parent: { type: 'Folder', delete: 'cascade' },
  creator: { type: 'Account', delete: 'cascade' },
  name: { type: 'string', length: { min: 1, max: 200 } },
  url: { type: 'string', length: { min: 1, max: 200 } },
  info: { type: 'string', length: { max: 500 } },
});
