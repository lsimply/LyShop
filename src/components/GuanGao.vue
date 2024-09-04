<template>
    <div v-if="isVisible" class="modal-overlay" @click="close">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="close">×</button>
        <h2>购买 & 使用 常见问题</h2>
        <ul>
          <li>问：如何购买？</li>
          <li>答：您可以通过官网直接购买。</li>
          <li>问：购买后如何使用？</li>
          <li>答：购买后，您将收到一封包含使用说明的电子邮件。</li>
        </ul>
  
        <h3>招推广：享受 20%-30% 分成</h3>
        <p>分享我们的产品，即可享受推广分成。</p>
  
        <div class="share">
          <button @click="share">分享</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ElMessage } from 'element-plus'

  export default {
    props: {
      isVisible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      share() {
        // 模拟复制链接到剪贴板的操作
        const link = 'https://store.lsimply.us.kg/share';
        navigator.clipboard.writeText(link).then(() => {
          // 使用 ElMessage 显示消息
          ElMessage({
            message: '分享链接已复制到剪贴板！',
            type: 'success',
            duration: 3000, // 消息显示时间（毫秒）
            zIndex: 4  // 
          });
        }).catch(() => {
            ElMessage.error({
      message: '复制失败，请手动复制链接！',
      zIndex: 4  // 设定一个很高的 zIndex
    });
        });
       
      }
    }
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3; /* 设置为较高的 z-index，确保在最上层 */
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 90%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: left;
    position: relative;
    z-index: 10000; /* 确保内容在覆盖层之上 */
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
  
  h2, h3 {
    margin-top: 0;
  }
  
  .share button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .share button:hover {
    background-color: #45a049;
  }
  </style>
  