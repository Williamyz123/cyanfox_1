<template>
  <div class="defense">
    <h1>这是标题</h1>
    <div class="content">
      这些是网页的信息的简介
    </div>
    <div class="item-footer">
      <span>时间</span>
      <span>作者</span>
      <span>单位</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DocItem"
}
</script>

<style scoped>
.defense {
  margin-top: 10px;
  border-bottom: #005c30 3px solid;
}

h1 {
  font-size: 20px;
}

.item-footer {
  display: flex;
  /*border: red 1px solid;*/
  justify-content: flex-end;
  align-items: center;
}

span {
  /*border: blue 1px solid;*/
  margin-left: 5px;
  margin-right: 5px;;
}
</style>