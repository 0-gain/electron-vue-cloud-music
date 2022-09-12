export const mixins = {
  
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
