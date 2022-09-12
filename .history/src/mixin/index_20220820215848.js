export const mixins = {
  provide() {
    return {
      reload: this.reload,
    };
  },
  methods: {
    // 实现刷新
    reload() {
      this.showRouter = false;
      this.$nextTick(() => {
        this.showRouter = true;
      });
    },
  },
};
