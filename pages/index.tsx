import ScrollSection from "@/components/ScrollSection";

export default function Home() {
  return (
    <main className="overflow-y-auto max-h-screen">
      <ScrollSection from={1} to={20} direction="vertical" />
      <ScrollSection from={21} to={30} direction="horizontal" />
      <ScrollSection from={31} to={50} direction="vertical" />
    </main>
  );
}
