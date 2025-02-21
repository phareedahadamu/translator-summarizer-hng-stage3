"use client";
import { useState, useTransition } from "react";
import Form from "@/components/Form";
import Nav from "@/components/Nav";
import ChatElements from "@/components/ChatElements";

// import summarize from "@/lib/summarize";

interface Chat {
  text: string;
  summary: string;
  translation: string;
  language: string;
}
export default function Home() {
  const [charsCount, setCharsCount] = useState<number>(0);
  const [initialised, setInitialized] = useState<boolean>(false);
  const [chat, setChat] = useState<Chat[] | []>([]);
  // const [onChrome, setOnChrome] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<boolean>(false);
  const [detectionErr, setDetectionErr] = useState<boolean>(false);
  const [translationErr, setTranslationErr] = useState<boolean>(false);
  const [summaryErr, setSummaryErr] = useState<boolean>(false);
  const [transError, setTransError] = useState<string>("");
  const [sumError, setSumError] = useState<string>("");
  const [index, setIndex] = useState(-1);
  const [isPendingSum, startTransitionSum] = useTransition();
  const [isPendingTrans, startTransitionTrans] = useTransition();

  // useEffect(() => {
  //   // const userAgent = navigator.userAgent.toLowerCase();
  //   const isChrome = window && window.ai;
  //   // console.log(isChrome);
  //   if (!isChrome) {
  //     setOnChrome(false);
  //   } else {
  //     setOnChrome(true);
  //   }
  // }, []);

  return (
    <main className="flex flex-col items-center relative justify-start w-[100%]">
      {/* {onChrome === false && (
        <h1 className="mt-[240px] text-[24px] sm:text-[32px] font-semibold text-center text-[#647b95]">
          Only compatible on Chrome browsers on computers.
        </h1>
      )} */}

      <>
        <Nav setChat={setChat} setInitialized={setInitialized} />
        {initialised && (
          <section className="max-w-[700px] w-[98%] flex flex-col gap-[28px] overflow-y-scroll fixed top-[90px] px-[6px] pb-[10px]">
            {chat.length > 0 && (
              <ChatElements
                chat={chat}
                setChat={setChat}
                transError={transError}
                setTransError={setTransError}
                sumError={sumError}
                setSumError={setSumError}
                index={index}
                setIndex={setIndex}
                isPendingSum={isPendingSum}
                isPendingTrans={isPendingTrans}
                startTransitionSum={startTransitionSum}
                startTransitionTrans={startTransitionTrans}
                setTranslationErr={setTranslationErr}
                setSummaryErr={setSummaryErr}
              />
            )}
          </section>
        )}
        {!initialised && (
          <h1 className="mt-[240px] text-[24px] sm:text-[32px] font-semibold text-center text-[#647b95]">
            Enter text to translate or summarize.
          </h1>
        )}
        {detectionErr && (
          <p className="text-red-500 animate-pulse fixed top-[65px] text-[12px] text-center">
            Language Detection AI not available on your device.
          </p>
        )}
        {isPendingSum && (
          <p className="fixed top-[28px] animate-pulse text-[14px] text-green-600">
            Summarizing...
          </p>
        )}
        {isPendingTrans && (
          <p className=" fixed top-[28px] animate-pulse text-[14px] text-green-600">
            Translating...
          </p>
        )}
        {errors && (
          <p className={`text-red-500 animate-pulse fixed top-[28px]`}>
            Text field cannot be empty.
          </p>
        )}
        {translationErr && (
          <p
            className={`text-red-500 animate-pulse fixed top-[65px] text-[12px] text-center`}
          >
            Translation AI not available on your device.
          </p>
        )}
        {summaryErr && (
          <p
            className={`text-red-500 animate-pulse fixed top-[65px] text-[12px] text-center`}
          >
            Summary AI not available on your device.
          </p>
        )}
        {/* here */}
        <Form
          charsCount={charsCount}
          setCharsCount={setCharsCount}
          setErrors={setErrors}
          initialised={initialised}
          setInitialized={setInitialized}
          chat={chat}
          setChat={setChat}
          setDetectionErr={setDetectionErr}
        />
      </>
    </main>
  );
}
