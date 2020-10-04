module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.module.rules.delete("eslint");
  },
  pages: {
    index: {
      entry: "src/main.ts",
      title: "Grupo A",
    },
  },
};
