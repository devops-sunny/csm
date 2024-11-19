const path = require('path');

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        '[Project Convention] Use alias import to keep import consistent',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          ignoredExtensions: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create: function (context) {
    const ruleConfig =
      context.options.find((option) => option && option.ignoredExtensions) ||
      [];
    const ignoredExtensions = ruleConfig.ignoredExtensions || [];

    return {
      ImportDeclaration(node) {
        const {
          source: { value },
        } = node;

        const hasRelativeStart =
          value.startsWith('./') || value.startsWith('../');
        const isIgnoredExtension = ignoredExtensions.some((ext) =>
          value.endsWith(ext)
        );

        if (hasRelativeStart && !isIgnoredExtension) {
          context.report({
            node,
            message: '[Project Convention] Use alias import to keep import consistent',
          });
        }
      },
    };
  },
};
