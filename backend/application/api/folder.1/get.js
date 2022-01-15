async ({ id }) =>
  lib.utils.tryReturnObj(
    context,
    (ctx) => domain.module.folder.get(ctx, id),
    'folder'
  );
