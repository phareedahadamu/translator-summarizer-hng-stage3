const translate = async (source: string, target: string, text: string) => {
  if (typeof window) {
    try {
      if (window.ai.translator) {
        // console.log("Yes!");
        const trans = await window.ai.translator.create({
          sourceLanguage: source,
          targetLanguage: target,
        });
        const res = await trans.translate(text);
        return res;
      }
    } catch {
      return "Language pair not available";
    }
  }
};
export default translate;
