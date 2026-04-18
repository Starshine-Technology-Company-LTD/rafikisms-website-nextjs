"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { landingContent } from "./content";

const ICONS: Record<string, React.ReactNode> = {
  phone: <Phone className="w-4 h-4" />,
  mail: <Mail className="w-4 h-4" />,
  "map-pin": <MapPin className="w-4 h-4" />,
};

export function ContactSection() {
  const { eyebrow, title, subtitle, description, channels, form } =
    landingContent.contact;
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative w-full py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="rounded-3xl border border-foreground/10 bg-background/60 backdrop-blur-sm overflow-hidden">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-0">
            {/* Left: info */}
            <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-foreground/10 bg-gradient-to-br from-brand/[0.04] via-transparent to-transparent">
              <span className="inline-block text-xs font-mono uppercase tracking-[0.18em] text-brand mb-4">
                {eyebrow}
              </span>
              <h2 className="text-3xl lg:text-4xl font-display tracking-tight">
                {title}
              </h2>
              <p className="mt-2 text-brand text-lg font-display">{subtitle}</p>
              <p className="mt-4 text-muted-foreground max-w-md">
                {description}
              </p>

              <div className="mt-8 flex flex-col gap-4">
                {channels.map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-brand/15 text-brand flex items-center justify-center">
                      {ICONS[c.icon] ?? <Phone className="w-4 h-4" />}
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">
                        {c.label}
                      </div>
                      <div className="text-base font-medium">{c.value}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {c.hint}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="p-8 lg:p-12">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-full flex flex-col items-center justify-center text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.05 }}
                      className="w-16 h-16 rounded-full bg-brand text-white flex items-center justify-center mb-6"
                    >
                      <Check className="w-8 h-8" strokeWidth={3} />
                    </motion.div>
                    <h3 className="text-2xl font-display">{form.successTitle}</h3>
                    <p className="mt-2 text-muted-foreground max-w-sm">
                      {form.successBody}
                    </p>
                    <button
                      type="button"
                      className="mt-6 text-sm text-brand inline-flex items-center gap-1 hover:gap-2 transition-all"
                      onClick={() => setSubmitted(false)}
                    >
                      Send another message
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={onSubmit}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    <Field label={form.firstNameLabel} id="first" required />
                    <Field label={form.lastNameLabel} id="last" required />
                    <Field
                      label={form.emailLabel}
                      id="email"
                      type="email"
                      required
                      className="sm:col-span-2"
                    />
                    <Field
                      label={form.phoneLabel}
                      id="phone"
                      type="tel"
                      className="sm:col-span-2"
                    />
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="message"
                        className="text-xs uppercase tracking-widest text-muted-foreground"
                      >
                        {form.messageLabel}
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        required
                        className="mt-1.5 w-full rounded-xl border border-foreground/10 bg-background/60 backdrop-blur-sm px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      variant="ghost"
                      className="btn-brand sm:col-span-2 h-12 rounded-full group"
                    >
                      {form.submitLabel}
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  type = "text",
  required,
  className = "",
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="text-xs uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-foreground/10 bg-background/60 backdrop-blur-sm px-4 h-11 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all"
      />
    </div>
  );
}
