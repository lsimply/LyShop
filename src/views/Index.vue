<template>
  <!---->
  <div class="index">
    <div class="box">
      <t-image src="https://tdesign.gtimg.com/demo/demo-image-1.png" :style="{ height: '400px' }" shape="round"
        :overlay-content="label" />
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
              telegram客服&nbsp
            </el-tag>
            <t-link theme="primary" underline href="https://t.me/fly9977_bot" target="_self">
              <t-icon name="link"></t-icon>
              24小时客服
            </t-link>
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
            <el-card shadow="hover" v-for="(item, index) in result.data" :key="index" @click="Detail(item.price)" >


              <div class="content1" >
                <img width="100px" height="100px" :src="imageUrl(item.cover)" :alt="item.name">
                <p v-html="item.name"></p>
                <p style="color: red;  font-weight: bold;    line-height: 0px;">{{ Math.ceil(item.price / 7.2) }} usdt
                </p>
              </div>


            </el-card>
          </div>
        </div>


        <!-- <div class="jz">
          <el-form :inline="true" label-width="70px" :model="shop" class="demo-form-inline">
            <el-form-item label="商品分类">
              <el-select
                  v-model="shop.fenlei"
                  placeholder="商品分类"
                  clearable
              >
                <el-option label="Telegram 帐号" value="Telegram 帐号"/>
                <el-option label="X账号" value="X账号"/>
                <el-option label="TikTok 美老号带粉丝" value="TIKYTOK账号"/>
                <el-option label="WhatsApp产品" value="WhatsApp产品"/>
                <el-option label="LiNE" value="LiNE"/>
                <el-option label="苹果ID" value="苹果ID"/>
                <el-option label="小火箭" value="小火箭"/>
                <el-option label="代理IP" value="代理IP"/>
                <el-option label="ChatGPT 账号" value="ChatGPT 账号"/>
                <el-option label="苹果礼品卡" value="苹果礼品卡"/>
                <el-option label="其他需求请联系" value="其他需求请联系"/>
              </el-select>
            </el-form-item>
            <el-form-item label="选择国家">
              <el-select
                  v-model="shop.from"
                  placeholder="选择国家"
                  clearable
              >
                <el-option label="随机" value="随机"/>
                <el-option label="CN/中国+86" value="CN/中国+86"/>
                <el-option label="CA/加拿大+1" value="CA/加拿大+1"/>
                <el-option label="US/美国+1" value="US/美国+1"/>
                <el-option label="TW/台湾+886" value="TW/台湾+886"/>
                <el-option label="SG/新加坡+65" value="SG/新加坡+65"/>
                <el-option label="其他需求请联系" value="其他需求请联系"/>
              </el-select>
            </el-form-item>
            <el-form-item label="商品单价">
              <t-tag theme="warning" style="font-size: 15px;" variant="light" >{{shop.price}}usdt</t-tag>
            </el-form-item>
            <el-form-item label="商品库存">
              <t-tag shape="round"  theme="primary">&nbsp {{shop.kucun}} &nbsp </t-tag>
            </el-form-item>
            <el-form-item label="购买数量">
              <el-input-number v-model="shop.num" :min="1" :max="10" @change="handleChange"/>
            </el-form-item>

            <el-form-item label="选择性别">
              <el-radio-group v-model="shop.sex">
                <el-radio value="sj">随机</el-radio>
                <el-radio value="boy">男</el-radio>
                <el-radio value="girl">女</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="电子邮箱">
              <el-input require v-model="shop.email" placeholder="下单后系统自动发送卡密到该邮箱"/>
            </el-form-item> -->

        <!--          <t-space direction="vertical">-->
        <!--            <t-message theme="success">总金额 0.00 usdt</t-message>-->
        <!--          </t-space>-->
        <!-- <el-alert title="总金额 0.00 " style="width: 80%"  description="usdt" type="success" :closable="false"/>
            <br>
            <el-form-item style="width: 100%">
              <el-button style="width: 80%;padding: 0px 10px 0px 10px" type="primary" @click="onSubmit">立即下单</el-button>
            </el-form-item>
          </el-form>
        </div> -->




        <template #footer class="end">
          <p style="text-align: center">您已偏航，已重新为你选择最优路线</p>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ElLoading } from 'element-plus'



export default {
  data() {
    return {
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
  },
  methods: {
    Detail(price){
      this.$router.push({ name: 'Pay', params: { id:Math.ceil(price / 7.2) } });

    },
    rest(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },


  async catalog(id,name) {
  //     this.fullscreenLoading = true
  // setTimeout(() => {
  //   this.fullscreenLoading = false
  // }, 2000)
  const loading = ElLoading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    loading.close();
  }, 1000)
  await this.rest(1000);
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

};
</script>


<style scoped>
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
