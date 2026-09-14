import type { Step } from "@/lib/install-steps";

/* The numbered walkthrough list from /how-to-install/, reusable with any
   slice of the steps. Numbering restarts at 1 for whatever it's handed, and
   each kicker doubles as the step's permalink (#step-N) so the FAQ and
   anyone helping a friend can link a single step. */
export default function InstallSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="install-steps">
      {steps.map((s, i) => (
        <li className="install-step" key={s.title} id={`step-${i + 1}`}>
          <div className="install-step-copy">
            <a className="svc-step-kicker step-anchor" href={`#step-${i + 1}`}>
              Step {i + 1}
              <span className="step-anchor-hash" aria-hidden="true">#</span>
            </a>
            <h2 className="display">{s.title}</h2>
            <p>{s.body}</p>
          </div>
          {s.img && (
            <img
              className={s.fit ? `install-step-img install-step-img-${s.fit}` : "install-step-img"}
              src={s.img}
              alt={s.alt ?? ""}
              width={s.w ?? 1400}
              height={s.h ?? 788}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={i === 0 ? "high" : "low"}
            />
          )}
        </li>
      ))}
    </ol>
  );
}
