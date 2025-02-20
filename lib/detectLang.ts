const detectLang = async (text: string) => {
  if (window.ai.languageDetector) {
    const detector = await window.ai.languageDetector.create();
    const res = await detector.detect(text);
    // console.log(res[0]);
    return res[0].detectedLanguage;
  } else return "Error accessing Language Detector.";
};
export default detectLang;
