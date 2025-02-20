const summarize = async (text: string) => {
  try {
    const summarizer = await window.ai.summarizer.create();
    const summary = await summarizer.summarize(text, {
      type: "key-points",
    });
    return summary;
  } catch {
    return "Error connecting to Summarizer";
  }
};
export default summarize;
