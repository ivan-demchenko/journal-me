function QA(props: { q: string; a: string }) {
  return (
    <div className="py-9">
      <p className="text-xl font-semibold text-black dark:text-gray-300">
        {props.q}
      </p>
      <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
        {props.a}
      </p>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="py-10 bg-white sm:py-16 lg:py-24 my-4 rounded-2xl dark:bg-slate-700">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold leading-tight text-black dark:text-gray-300 sm:text-4xl lg:text-5xl">
          Frequently Asked Questions
        </h2>

        <div className="flow-root mt-12 sm:mt-16">
          <div className="divide-y divide-gray-200 dark:divide-gray-500 -my-9">
            <QA
              q="How to create an account?"
              a="You can sign up using your email or signin using a Google account."
            />

            <QA
              q="Is my data safe?"
              a="Absolutely! Your notes are protected by an advanced cryptographic algorithms."
            />

            <QA
              q="Can I export my data?"
              a="Yes, at any time. You can download your data in a plain text format."
            />

            <QA
              q="How do you provide support?"
              a="You can reach out to us using contact form any time"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
