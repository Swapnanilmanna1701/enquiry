import SupportScribe from "./components/SupportScribe";

export default function Home() {
  return (
    <div className="min-h-screen h-screen bg-black flex items-stretch p-4">
      <div className="w-full flex flex-col lg:flex-row gap-4"> 
        <SupportScribe /> 
      </div>
    </div>
  );
}