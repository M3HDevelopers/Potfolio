import { CONTACT_ITEMS } from "../data";
import { CONTACT_ICONS } from "./Icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden pb-10 pt-28">
      <div
        aria-hidden="true"
        className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-accent/[0.04] blur-[130px]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">
        <SectionHeading
          watermark="CONTACT"
          title="Contact Me"
          subtitle="Below are the details to reach out to me!"
        />

        {/* Contact cards */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_ITEMS.map((item, i) => {
            const Icon = CONTACT_ICONS[item.icon];
            const value = item.href ? (
              <a
                href={item.href}
                className="text-sm text-gray-400 transition-colors duration-200 hover:text-accent"
              >
                {item.value}
              </a>
            ) : (
              <span className="text-sm text-gray-400">{item.value}</span>
            );

            return (
              <Reveal key={item.title} delay={i * 120}>
                <div className="group flex flex-col items-center text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/5 bg-[#1a1a1a] text-accent shadow-[inset_0_2px_18px_rgba(0,0,0,0.75)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-accent/50 group-hover:shadow-[0_14px_45px_rgba(255,193,7,0.18)]">
                    <Icon className="h-9 w-9 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2">{value}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Footer call to action */}
        <Reveal delay={120}>
          <div className="mt-24 flex flex-col items-center justify-center gap-5 border-t border-white/5 pt-14 sm:flex-row sm:gap-7">
            <p className="font-display text-2xl font-bold text-white md:text-3xl">
              Have a Question?
            </p>
            <a
              href="mailto:muzammil.m3h@gmail.com?subject=Question%20for%20Muzammil%20Ahmed"
              className="rounded-full bg-accent px-6 py-2 text-xs font-bold uppercase tracking-[0.22em] text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-[0_12px_40px_rgba(255,193,7,0.35)]"
            >
              Click Here
            </a>
          </div>
        </Reveal>

        {/* Copyright */}
        <p className="mt-12 border-t border-white/5 pt-6 text-center text-xs text-gray-500">
          Copyright ©2026 All rights reserved | M3H-Web-Dev
        </p>
      </div>
    </section>
  );
}
