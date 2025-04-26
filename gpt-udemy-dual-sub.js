// ==UserScript==
// @name         Udemy 字幕預載字幕翻譯 + 漂浮字幕顯示
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  抓取目前字幕與後續字幕，並即時翻譯與快取顯示中文字幕
// @match        https://www.udemy.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const API_KEY = ''; // 🔑 填入你的 API 金鑰
  const MODEL = 'gpt-4o-mini';
  window.translationDict = {}; // 快取字典全域可見
  let lastText = '';

  // 建立字幕框
  const zhBox = document.createElement('div');
  zhBox.id = 'zhSubtitleBox';
  zhBox.style = `
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.75);
    color: white;
    font-size: 20px;
    padding: 10px 20px;
    border-radius: 12px;
    max-width: 80%;
    min-width: 200px;
    min-height: 60px;
    resize: both;
    overflow: auto;
    z-index: 99999;
    cursor: move;
    user-select: none;
    text-align: center;
  `;
  document.body.appendChild(zhBox);

  // 拖動功能
  let isDragging = false, offsetX = 0, offsetY = 0;
  zhBox.addEventListener('mousedown', e => {
    if (e.target === zhBox && e.offsetX < zhBox.clientWidth - 20 && e.offsetY < zhBox.clientHeight - 20) {
      isDragging = true;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
    }
  });
  document.addEventListener('mousemove', e => {
    if (isDragging) {
      zhBox.style.left = `${e.clientX - offsetX}px`;
      zhBox.style.top = `${e.clientY - offsetY}px`;
      zhBox.style.bottom = 'unset';
      zhBox.style.transform = 'none';
    }
  });
  document.addEventListener('mouseup', () => {isDragging = false});

  // 翻譯函式
  async function translate(text) {
    if (window.translationDict[text]) return window.translationDict[text];
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: "請將英文翻譯為繁體中文，並確保語意通順自然。" },
            { role: "user", content: text }
          ],
          temperature: 0.5,
          max_tokens: 100
        })
      });
      const data = await res.json();
      const translated = data.choices?.[0]?.message?.content?.trim() || "(翻譯失敗)";
      window.translationDict[text] = translated;
      console.log("翻譯完成：", text);
      return translated;
    } catch (e) {
      console.error("翻譯失敗：", e);
      return "(翻譯失敗)";
    }
  }

  // 抓逐字稿目前句與後續 N 句字幕
  function getTranscriptBlockTexts(count = 6) {
    const currentSpan = document.querySelector('span.transcript--highlight-cue--ugVsE');
    if (!currentSpan) return [];

    let currentBlock = currentSpan;
    while (currentBlock && !currentBlock.className.includes('transcript--cue-container')) {
      currentBlock = currentBlock.parentElement;
    }
    if (!currentBlock) return [];

    const texts = [];
    for (let i = 0; i <= count; i++) {
      const block = i === 0 ? currentBlock : currentBlock.nextElementSibling;
      if (block) {
        texts.push(block.innerText.trim());
        currentBlock = block;
      }
    }
    return texts;
  }

  // 主迴圈：每 300ms 檢查並翻譯
  setInterval(async () => {
    const [currentText, ...nextTexts] = getTranscriptBlockTexts(6);
    if (!currentText || currentText === lastText) return;
    lastText = currentText;

    console.log("當前字幕內容：", currentText);
    const translated = await translate(currentText);

    // 顯示翻譯字幕在漂浮字幕框中
    zhBox.innerHTML = `<div style="font-size:22px; color:#fff;">${translated}</div>`;

    for (const text of nextTexts) {
      if (text && !window.translationDict[text]) {
        console.log("🔮 預載翻譯：", text);
        translate(text);
      }
    }
  }, 300);
})();
