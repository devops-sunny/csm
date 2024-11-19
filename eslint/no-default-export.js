module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        '[Project Convention] Enforce using named exports instead of default exports',
      category: 'Best Practices',
      recommended: true,
    },
  },
  create: function (context) {
    const ruleConfig =
      context.options.find((option) => option && option.ignoredFolders) || {};
    const ignoredFolders = ruleConfig.ignoredFolders || [];

    return {
      ExportDefaultDeclaration: function (node) {
        const filePath = context.getFilename();

        if (
          ignoredFolders.some((pattern) => filePath.match(new RegExp(pattern)))
        ) {
          return;
        }

        context.report({
          node: node,
          message:
            '[Project Convention] Avoid using default exports. Use named exports for tracable.',
        });
      },
    };
  },
};
