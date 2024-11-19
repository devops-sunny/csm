const path = require('path');

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        '[Project Convention] No cross module import and Restricted Folder Pairs Import',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          pairs: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                from: { type: 'string' },
                to: { type: 'string' },
              },
              required: ['from', 'to'],
            },
          },
          noCrossFolders: {
            type: 'array',
            items: { type: 'string' },
          },
        },
      },
    ],
  },
  create(context) {
    const { pairs, noCrossFolders } = context.options[0];

    function getPathAfterFolderName(path, folderName) {
      const featuresIndex = path.indexOf(folderName);

      if (featuresIndex !== -1) {
        const pathStartIndex = featuresIndex + folderName.length;
        const pathAfterFeatures = path.substring(pathStartIndex).split('/')[0];

        if (pathAfterFeatures) {
          return pathAfterFeatures;
        }
      }

      return null;
    }

    return {
      ImportDeclaration(node) {
        const importPath = node.source.value.replace(/^\W+/, '');
        const fullFilePath = context.getFilename();
        const projectRoot = context.getCwd();

        const filePath = path.relative(projectRoot, fullFilePath);

        if (pairs) {
          const matchPair = pairs.find(
            ({ from, to }) =>
              importPath.startsWith(from) && filePath.startsWith(to),
          );

          if (matchPair) {
            const { from, to } = matchPair;

            context.report({
              node,
              message: `[Project Convention] Import from '${from}' to '${to}' is not allowed`,
              fix(fixer) {
                return fixer.remove(node);
              },
            });
          }
        }

        if (noCrossFolders) {
          const violatingFolder = noCrossFolders.find((folder) => {
            const folderPath = folder.endsWith('/') ? folder : folder + '/';

            const isImportFromTargetFolder = importPath.startsWith(folderPath);

            if (!isImportFromTargetFolder) return false;

            const subFolderName = getPathAfterFolderName(filePath, folderPath);

            if (subFolderName) {
              const checkingPath = `${folderPath}${subFolderName}/`;

              return !importPath.startsWith(checkingPath);
            }

            return false;
          });

          if (violatingFolder) {
            const message = `[Project Convention] Cross module import inside '${violatingFolder}' is not allowed`;

            context.report({
              node,
              message,
            });
          }
        }
      },
    };
  },
};
