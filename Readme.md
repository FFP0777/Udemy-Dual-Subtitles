# Udemy 雙字幕助手（GPT 中文翻譯版）

利用 Tampermonkey 用戶腳本，可自動將 Udemy 課程中的英文字幕**即時翻譯成中文**，實現「雙字幕」顯示，提升學習效率！

> 🚀 將字幕翻譯工作交給 GPT，自動顯示在原字幕下方！

---

## 功能

- ✅ 自動偵測字幕變化並呼叫 GPT API 翻譯成中文
- ✅ 支援 GPT-3.5 / GPT-4o（自由選擇）
- ✅ 字幕會以「英文在上、中文在下」方式雙語顯示
- ✅ 可自由調整字體大小、顏色、位置
- ✅ 播放一段，自動翻一段，**完全自動化**

---


### 💳 GPT API 價格說明（2024年）

| 模型         | 單位 (tokens) | 輸入成本     | 輸出成本     |
|--------------|---------------|---------------|---------------|
| GPT-3.5-turbo | 每 1K tokens   | $0.0005       | $0.0015       |
| GPT-4o        | 每 1K tokens   | $0.0050       | $0.0150       |

**基本估算：**
-  **GPT-3.5 約 $0.03～$0.04 / 1堂課**
    
➡️ 須前往 [https://platform.openai.com/account/billing](https://platform.openai.com/account/billing) 目前 Open AI 政策下需先儲值至少 **$5 美金** 才能讓API Key 啟動。

---

## 安裝

1. 去商店安裝 [Tampermonkey 擴充功能](https://www.tampermonkey.net/)
2. 點擊「新增腳本」後，貼上 `gpt-udemy-dual-sub.js` 腳本內容
3. 編輯腳本，把 `const API_KEY = 'your-api-key';` 換成你自己的 GPT API 金鑰
4. 開啟任一 Udemy 課程影片，字幕出現時即會自動翻譯成中文！

---

## 限制

- 僅支援自動偵測 **英文字幕 → 中文**
- 不會儲存歷史翻譯，**僅即時顯示**
- 若影片本身沒有英文字幕，將無法觸發翻譯
- 若 API 速率限制或金額不足，將無法使用

---

## 小提示

- 若想調整字體大小 在 subtitleEl.style.fontSize = '1.8rem'` 自己改
- 建議使用 GPT-3.5 作為翻譯，**便宜又快**
- 目前有些BUG，例如翻譯的字幕連續重複出現，字幕沒正常顯示，嘗試F5，或重啟腳本。
---

##  範例畫面

![image](https://github.com/user-attachments/assets/eda9e051-611e-42f0-aa79-5b11119076b6)


---


