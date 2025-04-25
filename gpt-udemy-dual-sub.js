// ==UserScript==
// @name         Udemy 雙字幕翻譯（支援自動切課重啟）
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  自動將 Udemy 英文字幕翻譯成中文並顯示在下方，支援課程切換自動重啟
// @match        https://www.udemy.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const API_KEY = ''; // ← 換成你自己的 OpenAI API Key
  const MODEL = 'gpt-3.5-turbo'; // ← 可改成 gpt-4o、gpt-4-turbo、gpt-3.5-turbo
  let lastText = '';

  const waitForSubtitleElement = () => {
    return new Promise(resolve => {
      const check = () => {
        const el = document.querySelector('.well--text--J1-Qi');
        if (el) resolve(el);
        else setTimeout(check, 500);
      };
      check();
    });
  };

  async function start() {
    console.log('開始啟動字幕翻譯');
    lastText = ''; // 重置過往字幕，避免跳課後錯誤
    const subtitleEl = await waitForSubtitleElement();
    subtitleEl.style.fontSize = '1.8rem';

    const observer = new MutationObserver(async () => {
      const fullText = subtitleEl.innerText.trim();
      const [englishLine] = fullText.split('\n');

      if (!englishLine || englishLine === lastText) return;
      lastText = englishLine;

      console.log('偵測到字幕變化：', englishLine);

      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: MODEL,
            messages: [
              { role: "system", content: "你是電腦科學課程的翻譯器，請將英文翻成繁體中文。" },
              { role: "user", content: englishLine }
            ],
            temperature: 0.7,
            max_tokens: 100,
          })
        });

        const data = await res.json();
        const translated = data.choices?.[0]?.message?.content?.trim();

        if (translated) {
          subtitleEl.innerText = `${englishLine}\n${translated}`;
          console.log('翻譯完成：', translated);
        } else {
          console.warn('翻譯失敗', data);
        }
      } catch (err) {
        console.error('錯誤：', err);
      }
    });

    observer.observe(subtitleEl, { childList: true, characterData: true, subtree: true });
  }

  // 檢查 URL 變化並自動重啟腳本
  let lastUrl = location.href;
  new MutationObserver(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      console.log('📺 偵測到課程切換，重新初始化翻譯...');
      start(); // 課程切換時自動重啟翻譯
    }
  }).observe(document, { subtree: true, childList: true });

  // 初次啟動
  start();

})();
