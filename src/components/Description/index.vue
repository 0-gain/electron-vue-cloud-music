<template>
  <div class="description-wrapper">
    <h4>{{ title }}</h4>
    <div class="des">
      <p v-for="(str, index) in strArr" :key="index">
        {{ str }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Description",
  data() {
    return {
      // 处理后的介绍
      strArr: [],
    };
  },
  props: {
    title: {
      type: String,
      default() {
        return 专辑介绍;
      },
    },
    des: {
      type: String,
      default() {
        return;
      },
    },
  },
  mounted() {
    this.handleDes()
  },
  methods: {
    // 计算每个换行符
    handleDes() {
      let str = this.des
      this.strArr = str.split("\n");
    },
  },
};
</script>

<style scoped>
.description-wrapper {
  text-align: left;
  padding-bottom: 20px;
}
.des {
  text-indent: 24px;
  line-height: 28px;
  text-align: justify;
  font-size: 14px;
  color: #909399;
}
p {
  margin: 0;
}
</style>
