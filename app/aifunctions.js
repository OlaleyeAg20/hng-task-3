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

    console.log(text)

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

export { detectLanguage, translateText };

// Summarization