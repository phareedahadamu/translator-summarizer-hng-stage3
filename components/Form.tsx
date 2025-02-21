import Image from "next/image";
import detectLang from "@/lib/detectLang";

interface Chat {
  text: string;
  summary: string;
  translation: string;
  language: string;
}
export default function Form(props: {
  charsCount: number;
  setCharsCount: (count: number) => void;
  setErrors: (value: boolean) => void;
  initialised: boolean;
  setInitialized: (value: boolean) => void;
  chat: Chat[] | [];
  setChat: (value: Chat[] | []) => void;
  setDetectionErr: (value: boolean) => void;
}) {
  async function submitInput(fd: FormData) {
    if (!("ai" in self) || !("languageDetector" in self.ai)) {
      props.setDetectionErr(true);
      return;
    }
    const inputText = fd.get("input");
    if (
      !inputText ||
      props.charsCount === 0 ||
      String(inputText).trim() === ""
    ) {
      // console.log("input something joor!");
      props.setErrors(true);
      setTimeout(() => {
        props.setErrors(false);
      }, 2000);
      return;
    }
    props.setCharsCount(0);

    // console.log(inputText);
    try {
      const lang = await detectLang(inputText as string);
      const language = lang;
      // console.log(language);
      if (props.chat.length === 0) {
        props.setChat([
          {
            text: String(inputText),
            summary: "",
            translation: "",
            language: language,
          },
        ]);
      } else {
        props.setChat([
          ...props.chat,
          {
            text: String(inputText),
            summary: "",
            translation: "",
            language: language,
          },
        ]);
      }
      props.setInitialized(true);
    } catch {
      alert("Language detector is not compatible on this device / browser");
    }
  }
  return (
    <form
      action={submitInput}
      className={`${
        props.initialised ? "bottom-[16px]" : "top-[345px]"
      } blurred flex flex-col fixed max-w-[700px] w-[98%] text-[#647b95]`}
    >
      <textarea
        className="px-[16px] py-[8px]"
        rows={3}
        name="input"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            // console.log(e.currentTarget.value);
            const formData = new FormData();
            formData.append("input", e.currentTarget.value);
            submitInput(formData);
            e.currentTarget.value = "";
          }
        }}
        onKeyUp={(e) => {
          // console.log(e.currentTarget.value);
          props.setCharsCount(e.currentTarget.value.length);
        }}
        onChange={(e) => {
          // console.log(e.currentTarget.value);
          props.setCharsCount(e.currentTarget.value.length);
        }}
        onMouseUp={(e) => {
          // console.log(e.currentTarget.value);
          props.setCharsCount(e.currentTarget.value.length);
        }}
      ></textarea>
      <div className="flex self-stretch justify-between items-end px-[16px] pb-[16px]">
        <p className="text-[#86a4c5] text-[12px]">
          Number of characters: {props.charsCount}
        </p>
        <button type="submit" className="bg-[#669df6] p-[8px] rounded-[4px]">
          <Image
            className="w-[20px] h-[20px]"
            alt="Submit Icon"
            src="/enter.svg"
            width={200}
            height={200}
          />
        </button>
      </div>
    </form>
  );
}
