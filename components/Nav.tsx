import Image from "next/image";
interface Chat {
  text: string;
  summary: string;
  translation: string;
  language: string;
}
export default function Nav(props: {
  setChat: (value: Chat[] | []) => void;
  setInitialized: (value: boolean) => void;
}) {
  return (
    <header className="flex max-w-[900px] w-[98%] blurred h-[50px] items-center px-[12px] fixed top-[16px]">
      <nav className="flex self-stretch justify-between w-[100%] items-center">
        <Image
          alt="icon"
          src="/icon.svg"
          width={200}
          height={200}
          className="w-[40px] h-[40px]"
        />
        <button
          className="text-[16px] px-[24px] py-[4px] bg-[#e96262] leading-snug rounded-[5px] text-[#FFF]"
          onClick={() => {
            props.setChat([]);
            props.setInitialized(false);
          }}
        >
          Clear
        </button>
      </nav>
    </header>
  );
}
