// Language detection
async function detectLanguage() {
    const languageDetectorCapabilities = await self.ai.languageDetector.capabilities();
    const canDetect = languageDetectorCapabilities.capabilities;
    let detector;
    if (canDetect === 'no') {
      // The language detector isn't usable.
      return;
    }
    if (canDetect === 'readily') {
      // The language detector can immediately be used.
      detector = await self.ai.languageDetector.create();
    } else {
      // The language detector can be used after model download.
      detector = await self.ai.languageDetector.create({
        monitor(m) {
          m.addEventListener('downloadprogress', (e) => {});
        },
      });
      await detector.ready;
    }

    return detector;
}

export { detectLanguage };

// Summarization