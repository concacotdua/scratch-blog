import { SparklesText } from "@/components/magicui/sparkles-text";
import ButtonDashboard from "./components/ButtonDashboard";
import { HyperText } from "@/components/magicui/hyper-text";
import { Terminal } from "lucide-react";
import { ShineBorder } from "@/components/magicui/shine-border";
import { Card, CardHeader } from "@/components/ui/card";
export default function Home() {
  return (
    <section>
      <div className="flex flex-col justify-center items-center space-y-10 mt-12 sm:mt-24 md:mt-32">
        <SparklesText text="Welcome to Scratch Blog" />
        <div className="text-4xl sm:text-7xl font-bold capitalize">
          <p className="text-center">A blog for scratch enthusiasts</p>
          <span className="flex items-center gap-2 mt-4">
            <HyperText className="text-green-600">Scratch</HyperText>
            <Card className="relative overflow-hidden">
              <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
              <CardHeader className="text-white bg-black/80 border border-gray-600 rounded-lg p-2"><Terminal className="size-6" /></CardHeader>
            </Card>
            <HyperText className="text-gray-600">Dev</HyperText>
          </span>
          <h2 className="text-xl sm:text-2xl">
            Start your journey here, and learn how to code with scratch, and build your own projects.
          </h2>
        </div>
        <ButtonDashboard />
      </div>
    </section >
  );
}
