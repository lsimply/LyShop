<template>
	<div class="payment-container">
		<transition name="fade">
			<div v-if="showPayment" class="payment-card">
				<h2>USDT Payment 美元支付（USDT Payment）</h2>
				<p>请将USDT金额发送至以下地址：（Please send the USDT amount to the following address:）</p>
				
				<el-input
      v-model="input"
      style="width: 240px"
      placeholder="请输入邮箱,用于接收"
      clearable
      @blur="validateEmail"
    />
    <div v-if="emailError" style="color: #ffe300;">{{ emailError }}</div>
  <p></p>

				<img :src="qrcodeUrl" alt="USDT QR Code" class="qrcode" />
				<div class="usdt-address">
					{{ usdtAddress }}
				</div>
				<p style="color:#2dffa0; font-weight: bold">{{ price }} usdt</p>
				<p >	该地址仅支持trx/trc20相关资产</p>

				<el-button @click="confirmPayment">确认已付款</el-button>
			</div>
		</transition>
		<transition name="slide">
			<div v-if="paymentConfirmed" class="confirmation-message">
				<h3>感谢您的付款(Payment Confirmed)</h3>
				<p>Thank you for your payment.</p>
			</div>
		</transition>
	</div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus'

export default {
	data() {
		return {
			input:'',
			price:'',
			product:'',
			usdtAddress: "TMDA2iaMqbk5GhVfa5F5dUFCYe7N8xRVtN",
			qrcodeUrl: require('../assets/usdt.jpeg'),
			showPayment: true,
			paymentConfirmed: false,
			 emailError: ''
		};
	},
	created(){
		this.product =     this.$store.getters.getProduct;
		this.price = Math.ceil(this.product.price / 7.2);
	
	},
	mounted() {
    // 检查价格是否为 NaN
    if (isNaN(this.price)) {
      // 如果价格为 NaN，跳转到首页
      this.$router.push('/');
    } else {
      // 如果价格有效，则设置状态

    }
  },
	methods: {
		validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.input)) {
        this.emailError = '*请输入有效的邮箱地址';
        return false;
      } else {
        this.emailError = '';
        return true;
      }},
		confirmPayment() {
			if (this.validateEmail()) {

        // 邮箱验证通过，执行付款确认逻辑
		const workerUrl = '/api';

axios.post(workerUrl, {
  input: this.input,
  product:this.product,
})
.then((response) => {
		  ElMessage({
    showClose: true,
    message: '提交成功(Message sent successfully!)',
    type: 'success',
  })
        })
        .catch((error) => {
			console.log(error)
		  ElMessage({
    showClose: true,
    message: '提交失败(Failed to send message.)',
    type: 'error',
  })
        });

			this.showPayment = false;
			setTimeout(() => {
				this.paymentConfirmed = true;
			}, 500);
		
      } else {
        // 邮箱验证不通过，阻止提交
		ElMessage({
    showClose: true,
    message: '请输入有效的邮箱地址',
    type: 'error',
  })
      }

	}
	},
};
</script>

<style scoped>
.payment-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background: linear-gradient(to right, #6a11cb, #2575fc);
	color: #fff;
}

.payment-card {
	background: rgba(255, 255, 255, 0.1);
	padding: 20px;
	border-radius: 10px;
	text-align: center;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.usdt-address {
	margin: 10px 0;
	font-family: monospace;
}

.qrcode {
	margin-top: 20px;
	width: 150px;
}

.confirmation-message {
	text-align: center;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
	{
	opacity: 0;
}

.slide-enter-active {
	animation: slide-in 0.5s forwards;
}

@keyframes slide-in {
	from {
		transform: translateY(100%);
	}

	to {
		transform: translateY(0);
	}
}
</style>