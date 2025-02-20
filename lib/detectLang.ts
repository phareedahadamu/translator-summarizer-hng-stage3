const detectLang = async (text: string) => {
  try {
    const detector = await window.ai.languageDetector.create();
    const res = await detector.detect(text);
    // console.log(res[0]);
    return res[0].detectedLanguage;
  } catch {
    console.log("Error accessing Language Detector.");
  }
};
export default detectLang;
