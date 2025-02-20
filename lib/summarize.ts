const summarize = async (text: string) => {
  if (window.ai.summarizer) {
    try {
      const summarizer = await window.ai.summarizer.create();
      const summary = await summarizer.summarize(text, {
        type: "key-points",
      });
      return summary;
    } catch {
      return "Error connecting to Summarizer";
    }
  } else {
    console.error("Chrome Summarize API is not available.");
  }
};
export default summarize;
