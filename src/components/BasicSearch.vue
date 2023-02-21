<template>
  <div id="keywor-basic-search">
    <div class="header-row">
      <div class="input-col">
        <el-input
            id="search-input"
            size="mini"
            placeholder="请输入关键字"
            class="keyword-input"
            v-model="keywords"
        >
          <!--@change="$emit('input', keywords)"没搞懂触发的是什么地方的事件-->
          <!--searchByKeyword(NormalPage)这个我也没怎么看懂-->
          <template slot="append">
            <el-button
                id="input-append-button"
                plain
                size="mini"
                type="primary"
                icon="el-icon-search"
            ></el-button>
          </template>
        </el-input>
      </div>

      <!--searchByKeyword(NormalPage)就是手动输入关键字-->
      <!--searchByKeyword(StupidPage)应该就是软件自己识别关键字然后进行搜索-->
      <div class="process-col">
        <el-button
            size="mini"
            type="primary"
            class="process-select"
            plain
        >智能检索
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BasicSearch"
}
</script>

<style scoped>
.process-select {
  color: white;
  padding: 7px 7px;
  background-color: #1ca7de;
}
.keyword-input {
  padding-right: 10px;
}
.header-row {
  padding-top: 8px;
  display: flex;
  justify-content: space-around;
}
.main-template-title {
  font-weight: 600;
  font-size: 18px;
  padding: 18px 0 8px 30px;
  text-align: left;
}
</style>

<style>
 #keyword-basic-search.el-button {
   color: black;
   border: solid 1px;
   border-radius: 0 4px 4px 0;
 }
#search-input.el-input__inner {
  border-radius: 4px 0 0 4px;
  border-width: 1px 0 1px 1px;
}
#input-append-button.el-button {
  color: white;
  border: solid 1px;
  border-radius: 0 4px 4px 0;
  background-color: #1ca7de;
}
#search-range-select {
  height: 100%;
  display: flex;
  align-items: center;
}
#search-range-select .el-select {
  height: 20px;
  width: 80px;
  margin-right: 2px;
}
#search-range-select .el-input__inner {
  height: 20px;
  font-size: 10px;
  line-height: 20px;
  border-width: 0 0 0 1px;
  padding: 0 10px 0 7px;
  border-radius: 0;
}
#search-range-select .el-input__icon {
  line-height: 20px;
  font-size: 10px;
}
#search-range-select .is-focus .el-input__inner {
  border-color: #409EFF;
}
.check-success {
  color: #67C23A;
}

.check-fail {
  color: #ff0d0d;
}
</style>