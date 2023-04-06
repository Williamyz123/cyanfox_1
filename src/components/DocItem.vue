<template>
  <div class="defense" @click="openURL" >
    <h1>{{title}}</h1>
    <div class="content">
      {{ description }}
    </div>
    <div class="item-footer">
      <span>{{time}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DocItem",
  props: ['title','description','time','url'],
  methods: {
    openURL() {
      // 实验证明只要点到卡片就可以出发这个方法
      alert(this.url);


    }
  },
}
</script>

<style scoped>
.defense {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 5px;
  background-color: #ececec;
  border-radius: 5px;
  /*background-color: #005c30;*/
  /*border-bottom: #005c30 3px solid;*/
}

h1 {
  font-size: 18px;
}

.item-footer {
  align-self: flex-end;
}

span {

}
</style>