# Udemy 雙字幕（GPT翻譯）

利用 Tampermonkey 用戶腳本，可自動將 Udemy 課程中的英文字幕**即時翻譯成中文**，再以「雙字幕」顯示。


![image](https://github.com/user-attachments/assets/6f43e580-a1b3-41a0-9e37-b1a1d499baed)
![image](https://github.com/user-attachments/assets/b4e5f501-d686-4de0-ae05-80ed60737766)

---

## 功能
- 自動偵測字幕變化並呼叫 GPT API 翻譯成任何語言
- 可改成 gpt-4o、gpt-4-turbo、gpt-3.5-turbo、gpt-4o-mini（自由選擇）


---


### GPT API 
    
➡須前往 [https://platform.openai.com/account/billing](https://platform.openai.com/account/billing) 目前 Open AI 政策下需先儲值至少 **$5 美金** 才能讓 API 能工作

---

## 安裝

1. 去商店安裝 [Tampermonkey 擴充功能](https://www.tampermonkey.net/)
2. 點擊「新增腳本」後，載入 `gpt-udemy-dual-sub.js` 腳本或複製貼上內容
3. 編輯腳本，把 `const API_KEY = 'your-api-key';` 換成你自己的 GPT API 金鑰
4. 開啟任一 Udemy 課程影片，字幕出現時即會自動翻譯成中文！

---

## 限制

- 若 API 速率限制或金額不足，將無法使用
- 
---

## 注意

- 若想調整字體大小 在 subtitleEl.style.fontSize = '1.8rem'` 自己改
- 建議使用 GPT-3.5 或 gpt-4o-mini 作為翻譯，**便宜又快**
- 若想翻譯其他語言，自行再{ role: "system", content: "你是電腦科學課程的翻譯器，請將取得的文字翻成 XXX。" } 將XXX自己改想要的語言。
- 目前有些BUG，例如翻譯的字幕連續重複出現，字幕沒正常顯示，嘗試F5，或重啟腳本
- 字幕設定需在影片下顯示 ，如圖:
- ![tt](https://github.com/user-attachments/assets/a91437e1-683a-418e-a5b0-0f315d502645)
---





