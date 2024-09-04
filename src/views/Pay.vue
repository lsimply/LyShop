<template>
	<div class="payment-container">
		<transition name="fade">
			<div v-if="showPayment" class="payment-card">
				<h2>USDT Payment支付页面（USDT Payment）</h2>
				<p class="time">请在<span style="color: red;"> {{ minutes }}:{{ seconds }} </span> 内完成支付，否则将返回上一页面。</p>

				<p>请将USDT金额发送至以下地址：（Please send the USDT amount to the following address:）</p>

				<el-input v-model="input" style="width: 240px" placeholder="请输入邮箱,用于接收" clearable
					@blur="validateEmail" />
				<div v-if="emailError" style="color: #ffe300;">{{ emailError }}</div>
				<p></p>

				<img :src="qrcodeUrl" alt="USDT QR Code" class="qrcode" />
				<div class="usdt-address" @click="copy">
					{{ usdtAddress }}
				</div>
				<p style="color:#2dffa0; font-weight: bold">{{ price }} usdt</p>
				<p> 该地址仅支持trx/trc20相关资产</p>

				<el-button @click="confirmPayment">确认已付款</el-button>
			</div>
		</transition>
		<transition name="slide">
			<div v-if="paymentConfirmed" class="confirmation-message">
				<el-result icon="success" title="感谢您的付款 Payment Confirmed " sub-title="Thank you for your payment.">
					<template #extra>
						<el-button type="primary" onclick="window.history.back()">Back</el-button>
					</template>
				</el-result>
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
			paymentSuccessImage: 'https://example.com/payment-success.png', // 支付成功图片链接
			totalSeconds: 600, // 10分钟 = 600秒
			interval: null,
			input: '',
			price: '',
			product: '',
			usdtAddress: "TMDA2iaMqbk5GhVfa5F5dUFCYe7N8xRVtN",
			qrcodeUrl: require('../assets/usdt.jpeg'),
			showPayment: true,
			paymentConfirmed: false,
			emailError: ''
		};
	},
	created() {
		this.product = this.$store.getters.getProduct;
		this.price = Math.ceil(this.product.price / 7.2);

	},
	beforeDestroy() {
		// 清除计时器和事件监听器
		clearInterval(this.interval);

	},
	mounted() {
		// 开始计时
		this.startTimer();

		// 检查价格是否为 NaN
		if (isNaN(this.price)) {
			// 如果价格为 NaN，跳转到首页
			this.$router.push('/');
		} else {
			// 如果价格有效，则设置状态

		}
	},
	methods: {
		copy() {
			// 模拟复制链接到剪贴板的操作
			const link = this.usdtAddress;
			navigator.clipboard.writeText(link).then(() => {
				// 使用 ElMessage 显示消息
				ElMessage({
					message: '已复制到剪贴板！',
					type: 'success',
					duration: 3000, // 消息显示时间（毫秒）
					zIndex: 4  // 
				});
			}).catch(() => {
				ElMessage.error({
					message: '复制失败，请手动复制！',
					zIndex: 4  // 设定一个很高的 zIndex
				});
			});

		},
		validateEmail() {
			const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailPattern.test(this.input)) {
				this.emailError = '请输入有效的邮箱地址';
				return false;
			} else {
				this.emailError = '';
				return true;
			}
		},
		confirmPayment() {
			if (this.validateEmail()) {

				// 邮箱验证通过，执行付款确认逻辑
				const workerUrl = '/t';

				axios.post(workerUrl, {
					input: this.input,
					product: this.product,
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

			clearInterval(this.interval); // 成功支付后清除倒计时


		},
		startTimer() {
			// 开始倒计时
			this.interval = setInterval(() => {
				if (this.totalSeconds > 0) {
					this.totalSeconds -= 1;
				} else {
					this.timeUp();
				}
			}, 1000);
		},
		timeUp() {
			// 倒计时结束，返回上一页面
			clearInterval(this.interval);
			ElMessage({
				showClose: true,
				message: '支付超时，正在返回上一页面...)',
				type: 'success',
			})
			setTimeout(() => {
				window.history.back();
			}, 2000); // 2秒后返回上一页面
		},
	},
	computed: {
		minutes() {
			return String(Math.floor(this.totalSeconds / 60)).padStart(2, '0');
		},
		seconds() {
			return String(this.totalSeconds % 60).padStart(2, '0');
		},
	},
};
</script>

<style scoped>
.time {
	font-size: 24px;
	font-weight: bold;
}

.payment-container {
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: white;
	/* background: linear-gradient(to right, #6a11cb, #2575fc); */
	color: #fff;
}

.payment-card {
	background: linear-gradient(to right, #6a11cb, #2575fc);

	/* background: rgba(255, 255, 255, 0.1); */
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