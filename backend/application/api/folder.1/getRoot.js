async () =>
  lib.utils.tryReturnObj(
    context,
    (ctx) => domain.module.folder.getRoot(ctx),
    'folder'
  );
