<template>
  <!---->
  
  <div class="index">
    <GuanGao v-if="showModal" @close="closeModal" :isVisible="showModal" />
    

    <div>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in img" :key="item">
      <!-- <h3 text="2xl" justify="center">{{ item }}</h3> -->
      <a target="_blank" :href="item.li">
        <el-image style="height: 200px;" :src="item.url"  />
      </a>
  
    </el-carousel-item>
  </el-carousel>

    </div>
    <div class="box">
      <el-card class="card ">
        <template #header>
          <div class="shanghuxinxi">
            <div class="card-header">
              <el-tag class="tag-title" :type="primary" effect="dark">
                商户信息
              </el-tag>
            </div>
          </div>

        </template>


        <p>
          <el-tag :type="primary" size="large" effect="light">
            公告
          </el-tag>
          <el-tag type="danger" effect="Light">
            由于收款通道风控 本店只支持USDT付款
          </el-tag>


        </p>
        <template #footer>
          <div class="jz">
            <el-tag :type="primary" size="large" effect="light">
              telegram客服
            </el-tag>
            <el-link icon=""  target="_blank" href="https://t.me/fly9977_bot" type="warning">
              &nbsp<svg width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" ><path fill="currentColor" d="M864 409.6a192 192 0 0 1-37.888 349.44A256.064 256.064 0 0 1 576 960h-96a32 32 0 1 1 0-64h96a192.064 192.064 0 0 0 181.12-128H736a32 32 0 0 1-32-32V416a32 32 0 0 1 32-32h32c10.368 0 20.544.832 30.528 2.432a288 288 0 0 0-573.056 0A193.235 193.235 0 0 1 256 384h32a32 32 0 0 1 32 32v320a32 32 0 0 1-32 32h-32a192 192 0 0 1-96-358.4 352 352 0 0 1 704 0M256 448a128 128 0 1 0 0 256zm640 128a128 128 0 0 0-128-128v256a128 128 0 0 0 128-128"></path></svg>
               24小时客服</el-link>
            
            
          </div>
        </template>
      </el-card>


    </div>




    <div class="box">
      <el-card class="card">
        <template #header>
          <div class="card-header">
            <el-tag class="tag-title" :type="primary" effect="dark">
              请点击选择商品分类
            </el-tag>
          </div>
        </template>
        <div class="a">
          <div class="content" @click="catalog(item.id,item.name)" v-for="(item, index) in cata" :key="index"  v-loading.fullscreen.lock="fullscreenLoading">
            <img width="60px" height="60px" :src="item.url" :alt="item.name">
            <p>{{ item.name }}</p>
          </div>
        </div>
      </el-card>
    </div>







    <div id="select"  class="box">
      <el-card class="card">
        <template #header>
          <div class="card-header">
            <el-tag class="tag-title" :type="primary" effect="dark">
              请选择商品
            </el-tag>
          </div>
        </template>



        <div class="flex flex-wrap gap-4">
          <div class="a">
            <el-card shadow="hover" v-for="(item, index) in result.data" :key="index" @click="Detail(item)" >


              <div class="content1" >
                <img width="100px" height="100px" :src="imageUrl(item.cover)" :alt="item.name">
                <p v-html="item.name"></p>
                <p style="color: red;  font-weight: bold;    line-height: 0px;">{{ Math.ceil(item.price / 7.2) }} usdt
                </p>
              </div>


            </el-card>
          </div>
        </div>





        <template #footer class="end">
          <p style="text-align: center">您已偏航，已重新为你选择最优路线</p>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import GuanGao from '@/components/GuanGao.vue';
import axios from 'axios';
import { ElLoading } from 'element-plus'



export default {
  components: {
    GuanGao
  },
  data() {
    return {
      showModal: false,
      img:[
        {
              li:'https://t.me/fly9988_bot',
              url:require('../assets/1.png')
        },
       
        {
          li:'https://t.me/fly9988_bot',
              url:'data:image/jpeg;base64,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'
        },
        {
          li:'https://t.me/fly9988_bot',

          url:require('../assets/2.png')
        },
      ],
      fullscreenLoading:false,
      name: 'John',
      shop: {
        from: '随机',
        fenlei: '',
        price: '2.00',
        kucun: 999,
        num: 1,
        sex: 'sj',
        email: ''
      },
      formInline: {
        user: '',
        region: '',
        date: '',
      },
      cata: [
        {
          id: 2,
          url: require('../assets/logo/appstore.png'),
          name: 'AppStore'
        },
        {
          id: 26,
          url: require('../assets/logo/icloud.png'),
          name: '苹果icloud和功能账号'
        },
        {
          id: 5,
          url: require('../assets/logo/appstorecz.png'),
          name: 'AppStore充值卡'
        },
        {
          id: 25,
          url: require('../assets/logo/gpt.png'),
          name: 'ChatGPT'
        },
       
        {
          id: 25,
          url: require('../assets/logo/telegram.png'),
          name: 'Telegram'
        },
        {
          id: 25,
          url: require('../assets/logo/x.png'),
          name: 'Twitter'
        },
        {
          id: 25,

          url: require('../assets/logo/google.png'),
          name: 'Google'
        },
        {
          id: 25,

          url: require('../assets/logo/ins.png'),
          name: 'Instagram'
        },
        {
          id: 25,

          url: require('../assets/logo/facebook.png'),
          name: 'Facebook'
        },
        {
          id: 25,

          url: require('../assets/logo/tiktok.png'),
          name: 'TikTok'
        },
        {
          id: 13,
          url: require('../assets/logo/vip.png'),
          name: '软件会员充值'
        },
        {
          id: 14,
          url: require('../assets/logo/fenshi.png'),
          name: '刷粉刷量服务'
        },
      ],
      result: '',
      result2: {
        "code": 200,
        "msg": "success",
        "data": [
          {
            "id": 137,
            "name": "独享成品<b>老号</b><br>已购小火箭APP</b><br>⭐更稳定⭐",
            "cover": "/assets/cache/images/202401212051237310014.png",
            "status": 1,
            "delivery_way": 0,
            "price": 32.99,
            "user_price": 32.99,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 0
          },
          {
            "id": 114,
            "name": "<b>租赁</b>成品账号<br>已购小火箭APP<br>",
            "cover": "/assets/cache/images/202401212126097187386.png",
            "status": 1,
            "delivery_way": 1,
            "price": 7.5,
            "user_price": 7.5,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 0
          },
          {
            "id": 2,
            "name": "独享成品老号<br>已购小火箭APP<br><b>🛒代理批发优惠</b>",
            "cover": "/assets/cache/images/202401212110209843347.png",
            "status": 1,
            "delivery_way": 0,
            "price": 32.99,
            "user_price": 32.99,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 33
          },
          {
            "id": 87,
            "name": "独享成品账号<br>Quantumult X<br>美区成品号",
            "cover": "/assets/cache/images/202401212137273070859.png",
            "status": 1,
            "delivery_way": 0,
            "price": 39,
            "user_price": 39,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 62
          },
          {
            "id": 109,
            "name": "独享成品账号<br>Quantumult X<br>套装",
            "cover": "/assets/cache/images/202401212142517894861.jpg",
            "status": 1,
            "delivery_way": 0,
            "price": 43.99,
            "user_price": 43.99,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 0
          },
          {
            "id": 106,
            "name": "独享成品账号<br>Stash",
            "cover": "/assets/cache/images/202401212141568169007.png",
            "status": 1,
            "delivery_way": 0,
            "price": 32.99,
            "user_price": 32.99,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 27
          },
          {
            "id": 172,
            "name": "独享成品账号<br>Choc",
            "cover": "/assets/cache/images/202408220111122876410.jpg",
            "status": 1,
            "delivery_way": 0,
            "price": 32.99,
            "user_price": 32.99,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 20
          },
          {
            "id": 48,
            "name": "韩国17+19+<br><b>年龄认证号</b><br>可下DNF等",
            "cover": "/assets/cache/images/202401220112291450919.png",
            "status": 1,
            "delivery_way": 0,
            "price": 18.88,
            "user_price": 18.88,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 16
          },
          {
            "id": 144,
            "name": "韩国 | 下载号<br><b>稳定老号</b><br>未激活iCloud",
            "cover": "/assets/cache/images/202401220122198006796.png",
            "status": 1,
            "delivery_way": 0,
            "price": 11.5,
            "user_price": 11.5,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 27
          },
          {
            "id": 57,
            "name": "美国 | 下载号<br>次新号<br>未激活iCloud<br>🛒代理批发优惠",
            "cover": "/assets/cache/images/202401220123126620768.png",
            "status": 1,
            "delivery_way": 0,
            "price": 8.88,
            "user_price": 8.88,
            "inventory_hidden": 0,
            "shared_id": 0,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 690
          },
          {
            "id": 129,
            "name": "美国 | 下载号<br><b>稳定老号</b><br>未激活iCloud",
            "cover": "/assets/cache/images/202401220145166652438.png",
            "status": 1,
            "delivery_way": 0,
            "price": 10.5,
            "user_price": 10.5,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 0
          },
          {
            "id": 61,
            "name": "香港 | 下载号<br>次新号<br>未激活iCloud",
            "cover": "/assets/cache/images/202401220148191554375.png",
            "status": 1,
            "delivery_way": 0,
            "price": 8.88,
            "user_price": 8.88,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 189
          },
          {
            "id": 134,
            "name": "香港 | 下载号<br><b>稳定老号</b><br>未激活iCloud",
            "cover": "/assets/cache/images/202401220149503980930.png",
            "status": 1,
            "delivery_way": 0,
            "price": 11.5,
            "user_price": 11.5,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 106
          },
          {
            "id": 58,
            "name": "日本 | 下载号<br>次新号<br>未激活iCloud",
            "cover": "/assets/cache/images/202401220150534857714.png",
            "status": 1,
            "delivery_way": 0,
            "price": 8.88,
            "user_price": 8.88,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 71
          },
          {
            "id": 136,
            "name": "日本 | 下载号<br><b>稳定老号</b><br>未激活iCloud",
            "cover": "/assets/cache/images/202401220152056112710.png",
            "status": 1,
            "delivery_way": 0,
            "price": 11.5,
            "user_price": 11.5,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 116
          },
          {
            "id": 60,
            "name": "台湾 | 下载号<br>次新号<br>未激活iCloud",
            "cover": "/assets/cache/images/202401220153468425538.png",
            "status": 1,
            "delivery_way": 0,
            "price": 7.88,
            "user_price": 7.88,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 0
          },
          {
            "id": 145,
            "name": "台湾 | 下载号<br><b>稳定老号</b><br>未激活iCloud",
            "cover": "/assets/cache/images/202401220155113916417.png",
            "status": 1,
            "delivery_way": 0,
            "price": 11.5,
            "user_price": 11.5,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 254
          },
          {
            "id": 62,
            "name": "土区 | 下载号<br><b>稳定老号</b><br>未激活iCloud",
            "cover": "/assets/cache/images/202401220200313874686.png",
            "status": 1,
            "delivery_way": 0,
            "price": 11.5,
            "user_price": 11.5,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 42
          },
          {
            "id": 97,
            "name": "新加坡 | 下载号<br><b>稳定老号</b><br>未激活iCloud",
            "cover": "/assets/cache/images/202401220157207714458.png",
            "status": 1,
            "delivery_way": 0,
            "price": 11.5,
            "user_price": 11.5,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 42
          },
          {
            "id": 107,
            "name": "巴西 | 下载号<br><b>稳定老号</b><br>未激活iCloud",
            "cover": "/assets/cache/images/202401220156348491435.png",
            "status": 1,
            "delivery_way": 0,
            "price": 11.5,
            "user_price": 11.5,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 56
          },
          {
            "id": 122,
            "name": "英国 | 下载号<br><b>稳定老号</b><br>未激活iCloud",
            "cover": "/assets/cache/images/202402011914189077992.png",
            "status": 1,
            "delivery_way": 0,
            "price": 11.5,
            "user_price": 11.5,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 30
          },
          {
            "id": 123,
            "name": "澳洲 | 下载号<br><b>稳定老号</b><br>未激活iCloud",
            "cover": "/assets/cache/images/202309261808565622955.png",
            "status": 1,
            "delivery_way": 0,
            "price": 11.5,
            "user_price": 11.5,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 37
          },
          {
            "id": 151,
            "name": "尼日利亚 | 下载号<br>次新号<br>未激活iCloud",
            "cover": "/assets/cache/images/202402161445274174078.png",
            "status": 1,
            "delivery_way": 0,
            "price": 11.5,
            "user_price": 11.5,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 122
          },
          {
            "id": 152,
            "name": "西班牙 | 下载号<br><b>稳定老号</b><br>未激活iCloud",
            "cover": "/assets/cache/images/202402170154555175295.png",
            "status": 1,
            "delivery_way": 0,
            "price": 11.5,
            "user_price": 11.5,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 0
          },
          {
            "id": 153,
            "name": "越南 | 下载号<br>次新号<br>未激活iCloud",
            "cover": "/assets/cache/images/202402251926546717336.PNG",
            "status": 1,
            "delivery_way": 0,
            "price": 11.5,
            "user_price": 11.5,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 0
          },
          {
            "id": 156,
            "name": "俄罗斯 | 下载号<br><b>稳定老号</b><br>未激活iCloud",
            "cover": "/assets/cache/images/202404031317031958985.png",
            "status": 1,
            "delivery_way": 0,
            "price": 11.5,
            "user_price": 11.5,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 26
          },
          {
            "id": 157,
            "name": "加拿大 | 下载号<br><b>稳定老号</b><br>未激活iCloud",
            "cover": "/assets/cache/images/202404041256198873335.png",
            "status": 1,
            "delivery_way": 0,
            "price": 11.5,
            "user_price": 11.5,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 13
          },
          {
            "id": 158,
            "name": "泰国 | 下载号<br><b>稳定老号</b><br>未激活iCloud",
            "cover": "/assets/cache/images/202404041258283772732.png",
            "status": 1,
            "delivery_way": 0,
            "price": 11.5,
            "user_price": 11.5,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 28
          },
          {
            "id": 63,
            "name": "定制国家 | 下载号 <br>次新号<br>未激活iCloud",
            "cover": "/assets/cache/images/202401220158303151337.png",
            "status": 1,
            "delivery_way": 1,
            "price": 11.5,
            "user_price": 11.5,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 0
          },
          {
            "id": 147,
            "name": "独享成品账号<br>Loon",
            "cover": "/assets/cache/images/202401240109329520950.png",
            "status": 1,
            "delivery_way": 0,
            "price": 30.88,
            "user_price": 30.88,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 0
          },
          {
            "id": 149,
            "name": "独享成品账号<br>Quantumult <br>美区成品号",
            "cover": "/assets/cache/images/202401270209399154791.png",
            "status": 1,
            "delivery_way": 0,
            "price": 36.99,
            "user_price": 36.99,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 2,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 2,
              "name": "苹果APP Store下载号",
              "icon": "/assets/cache/images/202401222314246665809.png"
            },
            "card_count": 0
          }
        ],
        "total": 31
      },

 result25: { "code": 200, "msg": "success", "data": [{ "id": 170, "name": "ChatGPT 4.0账号<br>质保包30天<br>可能有惊喜", "cover": "/assets/cache/images/202407221414564271652.png", "status": 1, "delivery_way": 0, "price": 130, "user_price": 130, "inventory_hidden": 0, "shared_id": 4, "hide": 0, "owner": null, "recommend": 0, "category_id": 25, "inventory_sync": 1, "category": { "id": 25, "name": "跨境社媒+软件账号", "icon": "/assets/cache/images/202401221653035493562.png" }, "card_count": 3 }, { "id": 85, "name": "ChatGPT 账号<br>可能含5美金<br>已提取API-Key", "cover": "/assets/cache/images/202401222331121574149.png", "status": 1, "delivery_way": 0, "price": 12.99, "user_price": 12.99, "inventory_hidden": 0, "shared_id": null, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 25, "inventory_sync": 0, "shared": null, "category": { "id": 25, "name": "跨境社媒+软件账号", "icon": "/assets/cache/images/202401221653035493562.png" }, "card_count": 48 }, { "id": 116, "name": "Telegram 帐号<br> 已养7天<br> 适合所有设备！", "cover": "/assets/cache/images/202401222341316100234.png", "status": 1, "delivery_way": 0, "price": 15.99, "user_price": 15.99, "inventory_hidden": 0, "shared_id": 5, "hide": 0, "owner": null, "recommend": 0, "category_id": 25, "inventory_sync": 1, "category": { "id": 25, "name": "跨境社媒+软件账号", "icon": "/assets/cache/images/202401221653035493562.png" }, "card_count": 30 }, { "id": 154, "name": "Telegram 帐号<br> 通过Tdata<br> 相对稳定", "cover": "/assets/cache/images/202401222341316100234.png", "status": 1, "delivery_way": 0, "price": 24.99, "user_price": 24.99, "inventory_hidden": 0, "shared_id": null, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 25, "inventory_sync": 0, "shared": null, "category": { "id": 25, "name": "跨境社媒+软件账号", "icon": "/assets/cache/images/202401221653035493562.png" }, "card_count": 0 }, { "id": 121, "name": "Twitter 新号<br>带粉丝约50个<br>可能需要接码", "cover": "/assets/cache/images/202401042251025936944.png", "status": 1, "delivery_way": 0, "price": 15.99, "user_price": 15.99, "inventory_hidden": 0, "shared_id": null, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 25, "inventory_sync": 0, "shared": null, "category": { "id": 25, "name": "跨境社媒+软件账号", "icon": "/assets/cache/images/202401221653035493562.png" }, "card_count": 0 }, { "id": 56, "name": "Twitter 老号<br>比较稳定<br>可能需要接码", "cover": "/assets/cache/images/202401042250568518903.png", "status": 1, "delivery_way": 0, "price": 15.99, "user_price": 15.99, "inventory_hidden": 0, "shared_id": 0, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 25, "inventory_sync": 0, "shared": null, "category": { "id": 25, "name": "跨境社媒+软件账号", "icon": "/assets/cache/images/202401221653035493562.png" }, "card_count": 0 }, { "id": 33, "name": "Facebook <b>老号</b><br>通过邮箱+2FA", "cover": "/assets/cache/images/202401222253329447521.png", "status": 1, "delivery_way": 0, "price": 20.99, "user_price": 20.99, "inventory_hidden": 0, "shared_id": null, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 25, "inventory_sync": 0, "shared": null, "category": { "id": 25, "name": "跨境社媒+软件账号", "icon": "/assets/cache/images/202401221653035493562.png" }, "card_count": 3 }, { "id": 150, "name": "Instagram账号<br><b>2018年老号</b><br>通过邮箱认证", "cover": "/assets/cache/images/202402011257086441027.jpg", "status": 1, "delivery_way": 0, "price": 20.99, "user_price": 20.99, "inventory_hidden": 0, "shared_id": null, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 25, "inventory_sync": 0, "shared": null, "category": { "id": 25, "name": "跨境社媒+软件账号", "icon": "/assets/cache/images/202401221653035493562.png" }, "card_count": 2 }, { "id": 169, "name": "Instagram账号<br><b>欧洲老号</b><br>通过邮箱认证", "cover": "/assets/cache/images/202402011257086441027.jpg", "status": 1, "delivery_way": 0, "price": 20.99, "user_price": 20.99, "inventory_hidden": 0, "shared_id": null, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 25, "inventory_sync": 0, "shared": null, "category": { "id": 25, "name": "跨境社媒+软件账号", "icon": "/assets/cache/images/202401221653035493562.png" }, "card_count": 0 }, { "id": 124, "name": "Google/Gmail<br>纯新账号", "cover": "/assets/cache/images/202401222330251481256.png", "status": 1, "delivery_way": 0, "price": 5.99, "user_price": 5.99, "inventory_hidden": 0, "shared_id": null, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 25, "inventory_sync": 0, "shared": null, "category": { "id": 25, "name": "跨境社媒+软件账号", "icon": "/assets/cache/images/202401221653035493562.png" }, "card_count": 31 }, { "id": 37, "name": "Google/Gmail<br>老号", "cover": "/assets/cache/images/202401222330111917282.png", "status": 1, "delivery_way": 0, "price": 11.99, "user_price": 11.99, "inventory_hidden": 0, "shared_id": null, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 25, "inventory_sync": 0, "shared": null, "category": { "id": 25, "name": "跨境社媒+软件账号", "icon": "/assets/cache/images/202401221653035493562.png" }, "card_count": 28 }, { "id": 138, "name": "TikTok <b>美老号带粉丝</b><br>直登账号", "cover": "/assets/cache/images/202401042219389589682.png", "status": 1, "delivery_way": 0, "price": 24.99, "user_price": 24.99, "inventory_hidden": 0, "shared_id": null, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 25, "inventory_sync": 0, "shared": null, "category": { "id": 25, "name": "跨境社媒+软件账号", "icon": "/assets/cache/images/202401221653035493562.png" }, "card_count": 0 }, { "id": 81, "name": "Netflix 全区号", "cover": "/assets/cache/images/202401222339577007387.png", "status": 1, "delivery_way": 0, "price": 19, "user_price": 19, "inventory_hidden": 0, "shared_id": null, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 25, "inventory_sync": 0, "shared": null, "category": { "id": 25, "name": "跨境社媒+软件账号", "icon": "/assets/cache/images/202401221653035493562.png" }, "card_count": 0 }], "total": 13 },
      result13: { "code": 200, "msg": "success", "data": [{ "id": 40, "name": "Telegram <br> 正规会员充值", "cover": "/assets/cache/images/202401222343033085787.png", "status": 1, "delivery_way": 1, "price": 25, "user_price": 10, "inventory_hidden": 0, "shared_id": null, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 13, "inventory_sync": 0, "shared": null, "category": { "id": 13, "name": "软件会员充值", "icon": "/assets/cache/images/202401222346148368950.png" }, "card_count": 0 }, { "id": 146, "name": "Telegram <br> 会员兑换码 <br>3个月", "cover": "/assets/cache/images/202401222343033085787.png", "status": 1, "delivery_way": 0, "price": 90, "user_price": 90, "inventory_hidden": 0, "shared_id": null, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 13, "inventory_sync": 0, "shared": null, "category": { "id": 13, "name": "软件会员充值", "icon": "/assets/cache/images/202401222346148368950.png" }, "card_count": 0 }], "total": 2 },
      result14: { "code": 200, "msg": "success", "data": [{ "id": 139, "name": "Twitter 刷量<br> 粉丝 1000 人<br>☆ 加赠 20% <br>即刻开始", "cover": "/assets/cache/images/202407031656592719084.jpg", "status": 1, "delivery_way": 1, "price": 50, "user_price": 50, "inventory_hidden": 0, "shared_id": null, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 14, "inventory_sync": 0, "shared": null, "category": { "id": 14, "name": "刷粉刷量服务", "icon": "/assets/cache/images/202401222318306563756.png" }, "card_count": 0 }, { "id": 42, "name": "Telegram 刷量<br> 粉丝 1000 人<br>☆ 加赠 20% <br>即刻开始", "cover": "/assets/cache/images/202401222341493377899.png", "status": 1, "delivery_way": 1, "price": 30, "user_price": 30, "inventory_hidden": 0, "shared_id": null, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 14, "inventory_sync": 0, "shared": null, "category": { "id": 14, "name": "刷粉刷量服务", "icon": "/assets/cache/images/202401222318306563756.png" }, "card_count": 0 }, { "id": 82, "name": "TikTok 刷量<br> 粉丝 1000 人<br>☆ 加赠 20% <br>即刻开始", "cover": "/assets/cache/images/202401042236131004243.png", "status": 1, "delivery_way": 1, "price": 50, "user_price": 50, "inventory_hidden": 0, "shared_id": null, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 14, "inventory_sync": 0, "shared": null, "category": { "id": 14, "name": "刷粉刷量服务", "icon": "/assets/cache/images/202401222318306563756.png" }, "card_count": 0 }, { "id": 94, "name": "TikTok 刷量<br> 浏览 10000 次<br>☆ 加赠 20% <br>即刻开始", "cover": "/assets/cache/images/202401042236384494964.png", "status": 1, "delivery_way": 1, "price": 8, "user_price": 8, "inventory_hidden": 0, "shared_id": null, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 14, "inventory_sync": 0, "shared": null, "category": { "id": 14, "name": "刷粉刷量服务", "icon": "/assets/cache/images/202401222318306563756.png" }, "card_count": 0 }, { "id": 95, "name": "TikTok 刷量<br> 点赞 1000 次<br>☆ 加赠 20% <br>即刻开始", "cover": "/assets/cache/images/202401042236439823152.png", "status": 1, "delivery_way": 1, "price": 15, "user_price": 15, "inventory_hidden": 0, "shared_id": null, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 14, "inventory_sync": 0, "shared": null, "category": { "id": 14, "name": "刷粉刷量服务", "icon": "/assets/cache/images/202401222318306563756.png" }, "card_count": 0 }, { "id": 130, "name": "TikTok 刷量<br> 分享 1000 次<br>☆ 加赠 20% <br>即刻开始", "cover": "/assets/cache/images/202401042236508538088.png", "status": 1, "delivery_way": 1, "price": 10, "user_price": 10, "inventory_hidden": 0, "shared_id": null, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 14, "inventory_sync": 0, "shared": null, "category": { "id": 14, "name": "刷粉刷量服务", "icon": "/assets/cache/images/202401222318306563756.png" }, "card_count": 0 }, { "id": 165, "name": "Facebook 刷量<br> 粉丝 1000 人<br>☆ 加赠 20% <br>即刻开始", "cover": "/assets/cache/images/202407030241252296682.png", "status": 1, "delivery_way": 1, "price": 50, "user_price": 50, "inventory_hidden": 0, "shared_id": null, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 14, "inventory_sync": 0, "shared": null, "category": { "id": 14, "name": "刷粉刷量服务", "icon": "/assets/cache/images/202401222318306563756.png" }, "card_count": 0 }, { "id": 166, "name": "Instagram 刷量<br> 粉丝 1000 人<br>☆ 加赠 20% <br>即刻开始", "cover": "/assets/cache/images/202407031642344562633.jpg", "status": 1, "delivery_way": 1, "price": 50, "user_price": 50, "inventory_hidden": 0, "shared_id": null, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 14, "inventory_sync": 0, "shared": null, "category": { "id": 14, "name": "刷粉刷量服务", "icon": "/assets/cache/images/202401222318306563756.png" }, "card_count": 0 }, { "id": 167, "name": "Instagram 刷量<br> 帖子赞1000 次<br>☆ 加赠 20% <br>即刻开始", "cover": "/assets/cache/images/202407031642344562633.jpg", "status": 1, "delivery_way": 1, "price": 15, "user_price": 15, "inventory_hidden": 0, "shared_id": null, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 14, "inventory_sync": 0, "shared": null, "category": { "id": 14, "name": "刷粉刷量服务", "icon": "/assets/cache/images/202401222318306563756.png" }, "card_count": 0 }, { "id": 168, "name": "Instagram 刷量<br> 浏览 10000 次<br>☆ 加赠 20% <br>即刻开始", "cover": "/assets/cache/images/202407031642344562633.jpg", "status": 1, "delivery_way": 1, "price": 10, "user_price": 10, "inventory_hidden": 0, "shared_id": null, "shared_code": "", "hide": 0, "owner": null, "recommend": 0, "category_id": 14, "inventory_sync": 0, "shared": null, "category": { "id": 14, "name": "刷粉刷量服务", "icon": "/assets/cache/images/202401222318306563756.png" }, "card_count": 0 }], "total": 10 },
      

      result5: {
        "code": 200,
        "msg": "success",
        "data": [
          {
            "id": 32,
            "name": "Apple iTunes 礼品卡<br>用于充值余额<br>适用于土耳其ID",
            "cover": "/assets/cache/images/202304031806331791071.jpg",
            "status": 1,
            "delivery_way": 0,
            "price": 5.5,
            "user_price": 5.5,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 5,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 5,
              "name": "苹果APP Store充值卡",
              "icon": "/assets/cache/images/202401222314418241245.png"
            },
            "card_count": 50
          },
          {
            "id": 73,
            "name": "Apple iTunes 礼品卡<br>用于充值余额<br>适用于美国ID",
            "cover": "/assets/cache/images/202304031800048875501.jpg",
            "status": 1,
            "delivery_way": 0,
            "price": 16,
            "user_price": 16,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 5,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 5,
              "name": "苹果APP Store充值卡",
              "icon": "/assets/cache/images/202401222314418241245.png"
            },
            "card_count": 113
          },
          {
            "id": 83,
            "name": "Apple iTunes 礼品卡<br>用于充值余额<br>适用于日本ID",
            "cover": "/assets/cache/images/202304031807036484167.jpg",
            "status": 1,
            "delivery_way": 0,
            "price": 13,
            "user_price": 13,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 5,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 5,
              "name": "苹果APP Store充值卡",
              "icon": "/assets/cache/images/202401222314418241245.png"
            },
            "card_count": 41
          },
          {
            "id": 96,
            "name": "Apple iTunes 礼品卡<br>用于充值余额<br>适用于香港ID",
            "cover": "/assets/cache/images/202304031808092358799.jpg",
            "status": 1,
            "delivery_way": 0,
            "price": 150,
            "user_price": 150,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 5,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 5,
              "name": "苹果APP Store充值卡",
              "icon": "/assets/cache/images/202401222314418241245.png"
            },
            "card_count": 17
          },
          {
            "id": 99,
            "name": "Apple iTunes 礼品卡<br>用于充值余额<br>适用于台湾ID",
            "cover": "/assets/cache/images/202304032013283603827.jpg",
            "status": 1,
            "delivery_way": 0,
            "price": 4.5,
            "user_price": 4.5,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 5,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 5,
              "name": "苹果APP Store充值卡",
              "icon": "/assets/cache/images/202401222314418241245.png"
            },
            "card_count": 48
          }
        ],
        "total": 5
      },
      result26: {
        "code": 200,
        "msg": "success",
        "data": [
          {
            "id": 171,
            "name": "美国 | iCloud号<br><b>已绑卡老号</b><br>可激活iCloud",
            "cover": "/assets/cache/images/202407260152581873674.png",
            "status": 1,
            "delivery_way": 0,
            "price": 17.88,
            "user_price": 17.88,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 26,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 26,
              "name": "苹果iCloud和功能账号",
              "icon": "/assets/cache/images/202308261448145863372.jpg"
            },
            "card_count": 958
          },
          {
            "id": 141,
            "name": "韩国 | iCloud号<br><b>04-12年老号</b><br>可激活iCloud",
            "cover": "/assets/cache/images/202407031632391411792.jpg",
            "status": 1,
            "delivery_way": 0,
            "price": 17.88,
            "user_price": 17.88,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 26,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 26,
              "name": "苹果iCloud和功能账号",
              "icon": "/assets/cache/images/202308261448145863372.jpg"
            },
            "card_count": 72
          },
          {
            "id": 140,
            "name": "美国 | iCloud号<br><b>04-12年老号</b><br>可激活iCloud",
            "cover": "/assets/cache/images/202407031401206347451.jpg",
            "status": 1,
            "delivery_way": 0,
            "price": 17.88,
            "user_price": 17.88,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 26,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 26,
              "name": "苹果iCloud和功能账号",
              "icon": "/assets/cache/images/202308261448145863372.jpg"
            },
            "card_count": 193
          },
          {
            "id": 159,
            "name": "香港 | iCloud号<br><b>04-12年老号</b><br>可激活iCloud",
            "cover": "/assets/cache/images/202407031404139075699.png",
            "status": 1,
            "delivery_way": 0,
            "price": 17.88,
            "user_price": 17.88,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 26,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 26,
              "name": "苹果iCloud和功能账号",
              "icon": "/assets/cache/images/202308261448145863372.jpg"
            },
            "card_count": 92
          },
          {
            "id": 164,
            "name": "日本 | iCloud号<br><b>04-12年老号</b><br>可激活iCloud",
            "cover": "/assets/cache/images/202407031405143734379.jpg",
            "status": 1,
            "delivery_way": 0,
            "price": 17.88,
            "user_price": 17.88,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 26,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 26,
              "name": "苹果iCloud和功能账号",
              "icon": "/assets/cache/images/202308261448145863372.jpg"
            },
            "card_count": 97
          },
          {
            "id": 120,
            "name": "台湾 | iCloud号<br><b>04-12年老号</b><br>可激活iCloud",
            "cover": "/assets/cache/images/202407031625245587277.jpg",
            "status": 1,
            "delivery_way": 0,
            "price": 17.88,
            "user_price": 17.88,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 26,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 26,
              "name": "苹果iCloud和功能账号",
              "icon": "/assets/cache/images/202308261448145863372.jpg"
            },
            "card_count": 24
          },
          {
            "id": 142,
            "name": "日本 | iCloud号<br><b>6位短号老号</b><br>可激活iCloud",
            "cover": "/assets/cache/images/202401220204356584070.png",
            "status": 1,
            "delivery_way": 0,
            "price": 15.88,
            "user_price": 15.88,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 26,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 26,
              "name": "苹果iCloud和功能账号",
              "icon": "/assets/cache/images/202308261448145863372.jpg"
            },
            "card_count": 0
          },
          {
            "id": 143,
            "name": "韩国 | iCloud号<br><b>6位短号老号</b><br>可激活iCloud",
            "cover": "/assets/cache/images/202401220205036189775.png",
            "status": 1,
            "delivery_way": 0,
            "price": 15.88,
            "user_price": 15.88,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 26,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 26,
              "name": "苹果iCloud和功能账号",
              "icon": "/assets/cache/images/202308261448145863372.jpg"
            },
            "card_count": 0
          },
          {
            "id": 155,
            "name": "台湾 | iCloud号<br><b>6位短号老号</b><br>可激活iCloud",
            "cover": "/assets/cache/images/202403062335394380702.png",
            "status": 1,
            "delivery_way": 0,
            "price": 15.88,
            "user_price": 15.88,
            "inventory_hidden": 0,
            "shared_id": null,
            "shared_code": "",
            "hide": 0,
            "owner": null,
            "recommend": 0,
            "category_id": 26,
            "inventory_sync": 0,
            "shared": null,
            "category": {
              "id": 26,
              "name": "苹果iCloud和功能账号",
              "icon": "/assets/cache/images/202308261448145863372.jpg"
            },
            "card_count": 0
          }
        ],
        "total": 9
      },
      test:{
        data:''
      },
      baseUrl:"https://appleidbook.top/"



    };

  },
  created() {
    
    this.result = this.result2
    this.load();
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    Detail(item){
      this.$store.commit('setProduct', item);

      this.$router.push({ name: 'Pay'});

    },
    rest(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

load(){
  const loading = ElLoading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    loading.close();
  }, 500)
},
  async catalog(id,name) {
 this.load();
 
  //  this.rest(200);
      if (id == 13) {

        this.result = this.result13
        // this.$axios.get('')
        // .then(response => {
        //   this.result = response.data;
        // })
        // .catch(error => {
        //   console.error('Error fetching data:', error);
        // });
      } else if (id ==14) {
        this.result = this.result14

      } else if (id == 2) {
        this.result = this.result2
      } else if (id == 25) {
         this.test.data=this.result25.data.filter(item=>item.name.includes(name))
         this.result = this.test
        
      }else if(id==5){
        this.result = this.result5

      }
       else {
        this.result = this.result26
      }
      const element = document.getElementById("select");
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    imageUrl(cover) {
      return this.baseUrl + cover;
    }
  },
  mounted() {
    // 页面加载后自动显示弹出框
    this.openModal();
  }

};
</script>


<style scoped>
.gg{
  height: 100px;
}
/* .el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
/deep/.el-card__body {
  padding: 10px;
  flex-wrap: wrap;

}

/deep/ .el-card {
  margin: 5px;
}

.a {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: center;
}

.content {
  cursor: pointer;
  border-radius: 10px;
 /* width: 100px; */
 height: 150px;
  margin: 10px 20px 10px 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: space-around;
  align-items: center;
}

.content1 {
  cursor: pointer;
  height: 280px;
  width: 100px;
  /* padding-top: 10px; */
  /* margin: 10px; */
  background-color: white;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: space-around;
  justify-content: center;
  align-items: center;
}

a {
  text-decoration: none;
  display: inline;
}

.index {
  /*display: flex;*/
  /*flex-direction: column;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  margin: 0 auto;
  /* 去除默认的 body 边距 */
  font-family: Inter, 'Helvetica Neue', Helvetica, 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.jz {
  display: flex;
  align-items: center;
  align-content: space-around;
  justify-content: center;
}

.box {
  /*width: 800px;*/
  margin: 10px;
}

.card {
  /*max-width: 800px;*/
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  background-color: #11c3e3;
  border-radius: 4px;
  min-height: 36px;
}

.tag-title {
  width: 100%;
  height: 32px;
}

.shanghuxinxi {
  margin-left: -15px;
  padding-left: 15px;
  border-left: 2px solid #11c3e3;
  margin-top: 10px;
  word-break: break-all;
}

/deep/.demo-form-inline {
  display: flex;
  flex-direction: column;
  align-items: baseline;
}

/deep/ .el-card__footer {
  text-align: left;
}

/deep/ .el-card__body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.demo-form-inline .el-input {
  --el-input-width: 240px;
}

.demo-form-inline .el-select {
  --el-select-width: 210px;
}

/deep/ .el-alert__content {
  flex-direction: row;
}

/deep/ .el-alert__description {
  font-size: 16px;
}

/deep/.el-tag__content {
  font-size: 13px;
}

/deep/.el-card__body {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-evenly;
  align-content: space-around;
}

/* /deep/.el-card__footer {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-evenly;
    align-content: space-around;
} */
</style>
