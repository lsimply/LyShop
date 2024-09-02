<template>
	<div class="payment-container">
		<transition name="fade">
			<div v-if="showPayment" class="payment-card">
				<h2>USDT Payment 美元支付（USDT Payment）</h2>
				<p>请将USDT金额发送至以下地址：（Please send the USDT amount to the following address:）</p>

				<el-input  v-model="input" style="width: 240px" placeholder="请输入邮箱,用于接收" clearable />
				<p></p>

				<img :src="qrcodeUrl" alt="USDT QR Code" class="qrcode" />
				<div class="usdt-address">
					{{ usdtAddress }}
				</div>
				<p style="color:#2dffa0; font-weight: bold">{{ price }} usdt</p>
				<p> 该地址仅支持trx/trc20相关资产</p>

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
			input: '',
			price: '',
			usdtAddress: "TMDA2iaMqbk5GhVfa5F5dUFCYe7N8xRVtN",
			qrcodeUrl: require('../assets/usdt.jpeg'),
			showPayment: true,
			paymentConfirmed: false,
		};
	},
	created() {
		this.price = this.$route.params.id;

	},
	methods: {
		confirmPayment() {
			const workerUrl = 'https://api.lsimply.us.kg'; // 替换为你的 Cloudflare Workers URL

			axios.post(workerUrl, {
				input: this.input,
			})
				.then((response) => {
					console.log(response)
					ElMessage({
						showClose: true,
						message: 'Message sent successfully!',
						type: 'success',
					})
				})
				.catch((error) => {

					ElMessage({
						showClose: true,
						message: 'Failed to send message.',
						type: 'error',
					})
				});

			this.showPayment = false;
			setTimeout(() => {
				this.paymentConfirmed = true;
			}, 500);
		},
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