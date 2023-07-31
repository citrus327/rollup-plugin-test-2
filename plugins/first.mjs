import { extname } from "path";
/**
 * @returns {import('rollup').Plugin}
 */
export default function first() {
  return {
    name: "first",
    resolveId(source, importer, options) {
      if (options.isEntry) {
        console.log("find entry", importer, source);
      }
    },

    /**
     *
     * @param {import('rollup').NormalizedOutputOptions} output
     * @param {import('rollup').OutputBundle} bundle
     */
    generateBundle(output, bundle) {
      const getFiles = (bundle) => {
        const result = {};
        for (const file of Object.values(bundle)) {
          const { fileName } = file;
          const extension = extname(fileName).substring(1);

          result[extension] = (result[extension] || []).concat(file);
        }

        return result;
      };

      const files = getFiles(bundle);
      // console.log(files);
    },
  };
}
