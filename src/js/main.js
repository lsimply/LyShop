/*
Program name: Payment Code
Author: LY
Website: https://www.lyone.xyz/
Gmail: richeist@outlook.com
Time: 2023.06.06
*/
document.addEventListener("DOMContentLoaded", function () {
	/* 当HTML文档加载完成后执行函数 */ var qrCode1Image = new Image(); /* 创建一个Image对象用于加载QR Code图像 */
	qrCode1Image.src = new QRCode(document.createElement("div") /* 创建一个div元素 */, {
		text: "https://qr.alipay.com/fkx19062x9vznkosgd6zwc8" /* 设置二维码1的内容 */,
		width: 300 /* 设置二维码宽度 */,
		height: 300 /* 设置二维码高度 */,
		correctLevel: QRCode.CorrectLevel.H /* 设置二维码纠错级别 */,
	})._el.firstChild.toDataURL(); /* 将二维码转为DataURL */
	var qrCode1Element = document.getElementById("qr-code1"); /* 获取元素id为"qr-code1"的元素 */
	qrCode1Element.appendChild(qrCode1Image); /* 将二维码图像添加到元素中 */

	var qrCode2Image = new Image(); /* 创建一个Image对象用于加载QR Code图像 */
	qrCode2Image.src = new QRCode(document.createElement("div") /* 创建一个div元素 */, {
		text: "wxp://f2f0DeiJBtVzvQgy7Kl0ycBBW1sCxxzuIPLbzzo8h2L5fqA" /* 设置二维码2的内容 */,
		width: 300 /* 设置二维码宽度 */,
		height: 300 /* 设置二维码高度 */,
		correctLevel: QRCode.CorrectLevel.H /* 设置二维码纠错级别 */,
	})._el.firstChild.toDataURL(); /* 将二维码转为DataURL */
	var qrCode2Element = document.getElementById("qr-code2"); /* 获取元素id为"qr-code2"的元素 */
	qrCode2Element.appendChild(qrCode2Image); /* 将二维码图像添加到元素中 */

	var qrCode3Image = new Image(); /* 创建一个Image对象用于加载QR Code图像 */
	qrCode3Image.src = new QRCode(document.createElement("div") /* 创建一个div元素 */, {
		text: "https://i.qianbao.qq.com/wallet/sqrcode.htm?m=tenpay&a=1&u=2528264882&ac=CAEQsoXJtQkYjcGWtAY4AEIgY2Y4NGE4NGU0ZDgzYjU4Y2M5NTdmMjEwYzM2OTgxN2U%3D_xxx_sign&n=500&f=wallet" /* 设置二维码3的内容 */,
		width: 300 /* 设置二维码宽度 */,
		height: 300 /* 设置二维码高度 */,
		correctLevel: QRCode.CorrectLevel.H /* 设置二维码纠错级别 */,
	})._el.firstChild.toDataURL(); /* 将二维码转为DataURL */
	var qrCode3Element = document.getElementById("qr-code3"); /* 获取元素id为"qr-code3"的元素 */
	qrCode3Element.appendChild(qrCode3Image); /* 将二维码图像添加到元素中 */

	var qrCode4Image = new Image(); /* 创建一个Image对象用于加载QR Code图像 */
	qrCode4Image.src = new QRCode(document.createElement("div") /* 创建一个div元素 */, {
		text: "TMDA2iaMqbk5GhVfa5F5dUFCYe7N8xRVtN" /* 设置二维码4的内容 */,
		width: 300 /* 设置二维码宽度 */,
		height: 300 /* 设置二维码高度 */,
		correctLevel: QRCode.CorrectLevel.H /* 设置二维码纠错级别 */,
	})._el.firstChild.toDataURL(); /* 将二维码转为DataURL */
	var qrCode4Element = document.getElementById("qr-code4"); /* 获取元素id为"qr-code4"的元素 */
	qrCode4Element.appendChild(qrCode4Image); /* 将二维码图像添加到元素中 */


});
