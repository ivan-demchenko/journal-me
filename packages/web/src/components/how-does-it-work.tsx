export function HowDoesItWork() {
  return (
    <section className="py-10 bg-white sm:py-16 lg:py-24 my-4 rounded-2xl dark:bg-slate-700">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black dark:text-gray-300 sm:text-4xl lg:text-5xl">
            How does it work?
          </h2>
        </div>

        <div className="relative mt-12 lg:mt-20">
          <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
            <img
              className="w-full"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
              alt=""
            />
          </div>

          <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 dark:bg-gray-500 dark:border-gray-400 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                  {" "}
                  1{" "}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-black dark:text-gray-300 md:mt-10">
                Create a free account
              </h3>
              <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
                No payments requires, enjoy a generous free plan
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 dark:bg-gray-500 dark:border-gray-400 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                  {" "}
                  2{" "}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-black dark:text-gray-300 md:mt-10">
                Document your events
              </h3>
              <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
                Keep track of your achievements, learnings, challenges. Never
                lose a details.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 dark:bg-gray-500 dark:border-gray-400 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                  {" "}
                  3{" "}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-black dark:text-gray-300 md:mt-10">
                Tell a full story
              </h3>
              <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
                Get ready for an interview or a presentation with on your
                stories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
