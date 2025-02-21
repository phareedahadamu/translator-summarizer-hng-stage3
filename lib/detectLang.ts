const detectLang = async (text: string) => {
  const detector = await window.ai.languageDetector.create();
  const res = await detector.detect(text);
  return res[0].detectedLanguage;
};
export default detectLang;
