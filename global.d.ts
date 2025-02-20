export {};
interface One {
  ({ sourceLanguage: string, targetLanguage: sring }): Promise;
}

interface Translate {
  create: One;
}
interface Detect {
  create: { (): Promise };
}
interface Summarize {
  create: { (): Promise };
}

declare global {
  interface Window {
    ai: {
      translator: Translate;
      languageDetector: Detect;
      summarizer: Summarize;

      //   summarizer: any; // Adjust the type of 'translator' if needed
    };
  }
}
