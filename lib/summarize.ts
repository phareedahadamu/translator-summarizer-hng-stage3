const summarize = async (text: string) => {
  const summarizer = await window.ai.summarizer.create();
  const summary = await summarizer.summarize(text, {
    type: "key-points",
  });
  return summary;
};
export default summarize;
