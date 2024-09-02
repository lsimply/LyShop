<template>
	<div class="payment-container">
		<transition name="fade">
			<div v-if="showPayment" class="payment-card">
				<h2>USDT Payment 美元支付（USDT Payment）</h2>
				<p>请将USDT金额发送至以下地址：（Please send the USDT amount to the following address:）</p>
				<p></p>
				<div class="usdt-address">
					{{ usdtAddress }}
				</div>
				<img :src="qrcodeUrl" alt="USDT QR Code" class="qrcode" />

				<p style="color: red;">{{ price }} usdt</p>

				<el-button @click="confirmPayment">确认付款</el-button>
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
export default {
	data() {
		return {
			price:'',
			usdtAddress: "TMDA2iaMqbk5GhVfa5F5dUFCYe7N8xRVtN",
			qrcodeUrl: require('../assets/usdt.jpeg'),
			showPayment: true,
			paymentConfirmed: false,
		};
	},
	created(){
		this.price = this.$route.params.id;

	},
	methods: {
		confirmPayment() {
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