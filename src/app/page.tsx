
import ButtonDashboard from "./components/ButtonDashboard";
export default function Home() {

  return (
    <section>
      <div className="flex flex-col justify-center items-center space-y-10 mt-12 sm:mt-24 md:mt-32">
        <h1 className="text-4xl font-bold text-center">Welcome to Scratch Blog</h1>
        <div className="text-4xl sm:text-7xl font-bold capitalize">
          <span className="block">
            A blog for scratch enthusiasts
          </span>
          <span className="block">
            <span className="text-green-600">Scratch</span>
            <span className="text-gray-600">Dev</span>
          </span>
          <h2 className="text-xl sm:text-2xl">
            Start your journey here, and learn how to code with scratch, and build your own projects.
          </h2>
        </div>

        <ButtonDashboard />
      </div>
    </section>
  );
}
