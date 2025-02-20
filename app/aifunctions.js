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

// Translation function
async function translateText(text, originalLanguage, targetLanguage) {
  const translatorCapabilities = await self.ai.translator.capabilities();
  const languagePairAvailable = await translatorCapabilities.languagePairAvailable(originalLanguage, targetLanguage);


  let translatedText;

  if(languagePairAvailable === 'no'){

    translatedText = 'Language pair not available';

  } else if(languagePairAvailable === 'readily'){

    const translator = await self.ai.translator.create({
      sourceLanguage: originalLanguage,
      targetLanguage,
    });

    translatedText = await translator.translate(text);

  } else if(languagePairAvailable === 'after-download'){
    const translator = await self.ai.translator.create({
      sourceLanguage: originalLanguage,
      targetLanguage,
      monitor(m) {
        m.addEventListener('downloadprogress', (e) => {
          console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
        });
      }, // monitoring download progress.
    });

    await translator.ready;
    translatedText = await translator.translate(text);


  }

  return translatedText;
}

// Summarization
async function summarize(longText){

  const available = (await self.ai.summarizer.capabilities()).available;
  let summarizer;
  
if (available === 'no') {
  alert('The summarizer API is not available or not supported on your device.');
  return;
}
if (available === 'readily') {
  // The Summarizer API can be used immediately .
  summarizer = await self.ai.summarizer.create();
} else {
  // The Summarizer API can be used after the model is downloaded.
  summarizer = await self.ai.summarizer.create(options);
  summarizer.addEventListener('downloadprogress', (e) => {
    console.log(e.loaded, e.total);
  });
  await summarizer.ready;
}

const summary = await summarizer.summarize(longText, {
  context: 'This article is intended for a tech-savvy audience.',
});

return summary;
}

export { detectLanguage, translateText, summarize };