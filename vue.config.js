module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/tools.scss";` // FIXME this straight up does not work
      }
    }
  }
};
