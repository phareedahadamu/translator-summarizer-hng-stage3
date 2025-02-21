import allLanguages from "@/lib/allLanguages";
import translate from "@/lib/translate";
import summarize from "@/lib/summarize";
import { useState, useRef } from "react";

interface Chat {
  text: string;
  summary: string;
  translation: string;
  language: string;
}
export default function ChatElements(props: {
  chat: Chat[] | [];
  setChat: (value: Chat[] | []) => void;
  transError: string;
  setTransError: (value: string) => void;
  sumError: string;
  setSumError: (value: string) => void;
  index: number;
  setIndex: (value: number) => void;
  isPendingSum: boolean;
  isPendingTrans: boolean;
  startTransitionSum: (fn: () => void) => void;
  startTransitionTrans: (fn: () => void) => void;
  setTranslationErr: (value: boolean) => void;
  setSummaryErr: (value: boolean) => void;
}) {
  const chatRef = useRef<null | HTMLDivElement>(null);
  const [targetLang, setTargetLang] = useState("");

  if (chatRef.current) {
    chatRef.current.scrollIntoView();
  }

  const transLanguages = {
    en: "English",
    es: "Spanish",
    fr: "French",
    pt: "Portuguese",
    ru: "Russian",
    tr: "Turkish",
    zh: "Chinese",
  };

  const chatElements = props.chat.map((c, i) => {
    const Els = [];
    for (const [key, value] of Object.entries(transLanguages)) {
      if (key !== c.language) {
        Els.push(
          <option key={key} value={key} disabled={value === c.language}>
            {value}
          </option>
        );
      }
    }
    let language = c.language.toUpperCase();
    for (const [key, value] of Object.entries(allLanguages)) {
      if (key === c.language.toUpperCase()) {
        language = value;
      }
    }
    return (
      <div
        ref={i === props.chat.length - 1 ? chatRef : null}
        key={i}
        className="bg-[#f7f7ff] p-[16px] rounded-[4px] chat flex flex-col w-[100%] gap-[18px] text-[#3e4d5d]"
      >
        <div className="flex flex-col gap-[8px]">
          <p className=" text-left ">{c.text}</p>
          <p className="text-[#647b95] text-[12px]">Language: {language}</p>
        </div>
        <hr />
        <form
          action={(fd) => {
            if (!("ai" in self) || !("translator" in self.ai)) {
              props.setTranslationErr(true);
              return;
            }
            props.setIndex(i);
            const lang = fd.get("transLanguage");
            //   console.log(lang);
            if (!lang || lang === "default") {
              props.setTransError("Please select target language");
              setTimeout(() => {
                props.setTransError("");
              }, 2000);
              return;
            }
            for (const [key, value] of Object.entries(transLanguages)) {
              if (key === lang) {
                setTargetLang(value);
              }
            }

            //   console.log(lang, c.language);
            props.startTransitionTrans(async () => {
              try {
                const response = await translate(
                  c.language,
                  String(lang),
                  c.text
                );

                const newChat = props.chat.slice(i, i + 1)[0];
                newChat.translation = response;
                //   console.log(newChat);
                const allChats = props.chat.slice();
                allChats[i] = newChat;
                //   console.log(allChats);
                props.setChat(allChats);
              } catch {
                alert("Translator is not compatible on this device / browser");
              }
            });
          }}
          className="flex self-stretch relative justify-start gap-[24px] max-w-[280px] w-[100%]"
        >
          {props.transError !== "" && props.index === i && (
            <p className="absolute top-[26px] animate-pulse text-red-500 text-[14px]">
              {props.transError}
            </p>
          )}
          <select
            name="transLanguage"
            defaultValue="default"
            className="text-[#647b95] text-[14px] rounded-[5px]"
            required
            disabled={props.isPendingTrans}
          >
            <option value="default" disabled>
              Choose a language
            </option>
            {Els}
          </select>
          <button
            type="submit"
            disabled={props.isPendingTrans}
            className="text-[16px] flex-grow py-[4px] bg-[#669df6] leading-snug rounded-[5px] text-[#FFF]"
          >
            Translate
          </button>
        </form>

        {c.translation !== "" && (
          <p>
            <span className="text-[12px] text-[#647b95]">
              Translation: {targetLang}
            </span>
            <br />
            {c.translation}
          </p>
        )}
        <hr />
        {c.text.length > 150 && c.language === "en" && (
          <div className="relative flex flex-col gap-[10px] self-stretch w-[100%]">
            {props.index === i && props.sumError !== "" && (
              <p className="absolute top-[-20px] text-red-500 animate-pulse text-[14px]">
                {props.sumError}
              </p>
            )}
            <form
              action={() => {
                if (!("ai" in self) || !("summarizer" in self.ai)) {
                  props.setSummaryErr(true);
                  return;
                }
                //   console.log(e.target);
                props.setIndex(i);
                if (c.language !== "en") {
                  props.setSumError("Text should be in English");
                  setTimeout(() => {
                    props.setSumError("");
                  }, 2000);
                  return;
                }
                if (c.text.length < 151) {
                  props.setSumError(
                    "Text should be at more than 150 characters"
                  );
                  setTimeout(() => {
                    props.setSumError("");
                  }, 2000);

                  return;
                }
                props.startTransitionSum(async () => {
                  try {
                    const summary = await summarize(c.text);
                    const newChat = props.chat.slice(i, i + 1)[0];
                    newChat.summary = summary;
                    //   console.log(newChat);
                    const allChats = props.chat.slice();
                    allChats[i] = newChat;
                    //   console.log(allChats);
                    props.setChat(allChats);
                  } catch {
                    alert(
                      "Summarizer is not compatible on this device / browser"
                    );
                  }
                });
              }}
            >
              <button
                className="rounded-[5px] text-[#669df6] border-[2px] border-[#669df6] max-w-[138.4px] w-[100%] relative"
                disabled={props.isPendingSum}
              >
                Summarize
              </button>
            </form>
            {c.summary !== "" && (
              <p>
                <span className="text-[12px] text-[#647b95]">Summary:</span>
                <br />
                {c.summary}
              </p>
            )}
          </div>
        )}
      </div>
    );
  });
  return <>{chatElements}</>;
}
