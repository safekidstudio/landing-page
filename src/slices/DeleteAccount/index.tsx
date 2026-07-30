"use client";

import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type React from "react";
import { useState } from "react";

export type DeleteAccountProps = {
  slice: Content.DeleteAccountSlice;
};

export default function DeleteAccount({ slice }: DeleteAccountProps) {
  const { primary } = slice;
  const t = useTranslations("delete_account");

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [confirm, setConfirm] = useState(false);

  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    email?: string;
    confirm?: string;
  }>({});

  const validate = () => {
    const errors: typeof validationErrors = {};

    if (!name.trim()) {
      errors.name = t("validation_name");
    }

    if (!email.trim()) {
      errors.email = t("validation_email");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = t("validation_email");
    }

    if (!confirm) {
      errors.confirm = t("validation_confirm");
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          reason,
          confirm,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t("error_default"));
      }

      setStatus("success");
      // Reset form
      setName("");
      setEmail("");
      setReason("");
      setConfirm(false);
    } catch (error) {
      setStatus("error");
      const err = error as Error;
      setErrorMessage(err.message || t("error_default"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-[#EFEEEA] py-16 md:py-24"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  {t("success_title")}
                </h3>
                <div className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
                  {isFilled.richText(primary.success_message) ? (
                    <PrismicRichText field={primary.success_message} />
                  ) : (
                    <p>
                      Your account deletion request has been submitted
                      successfully.
                    </p>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Header */}
                <div className="mb-10 text-center md:text-left">
                  {isFilled.richText(primary.heading) && (
                    <PrismicRichText
                      field={primary.heading}
                      components={{
                        heading2: ({ children }) => (
                          <h2 className="text-3xl font-bold text-foreground mb-4 tracking-tight">
                            {children}
                          </h2>
                        ),
                      }}
                    />
                  )}
                  {isFilled.richText(primary.description) && (
                    <div className="text-sm sm:text-base text-muted-foreground/90 max-w-xl leading-relaxed">
                      <PrismicRichText field={primary.description} />
                    </div>
                  )}
                </div>

                {/* Error Alert */}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400 flex items-start gap-3"
                  >
                    <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">
                        {t("error_title")}
                      </h4>
                      <p className="text-xs mt-1">{errorMessage}</p>
                    </div>
                  </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-foreground"
                    >
                      {t("name_label")}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                        <User className="h-5 w-5" />
                      </div>
                      <input
                        id="name"
                        type="text"
                        disabled={isSubmitting}
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (validationErrors.name) {
                            setValidationErrors((prev) => ({
                              ...prev,
                              name: undefined,
                            }));
                          }
                        }}
                        placeholder={t("name_placeholder")}
                        className={`block w-full pl-11 pr-4 py-3.5 bg-neutral-50 dark:bg-neutral-900/50 border rounded-2xl text-foreground placeholder-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-brand/20 transition-all duration-200 ${
                          validationErrors.name
                            ? "border-red-400 focus:border-red-400"
                            : "border-neutral-200 dark:border-neutral-800 focus:border-neutral-400 dark:focus:border-neutral-700"
                        }`}
                      />
                    </div>
                    {validationErrors.name && (
                      <p className="text-xs text-red-500 font-medium pl-1">
                        {validationErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-foreground"
                    >
                      {t("email_label")}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                        <Mail className="h-5 w-5" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        disabled={isSubmitting}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (validationErrors.email) {
                            setValidationErrors((prev) => ({
                              ...prev,
                              email: undefined,
                            }));
                          }
                        }}
                        placeholder={t("email_placeholder")}
                        className={`block w-full pl-11 pr-4 py-3.5 bg-neutral-50 dark:bg-neutral-900/50 border rounded-2xl text-foreground placeholder-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-brand/20 transition-all duration-200 ${
                          validationErrors.email
                            ? "border-red-400 focus:border-red-400"
                            : "border-neutral-200 dark:border-neutral-800 focus:border-neutral-400 dark:focus:border-neutral-700"
                        }`}
                      />
                    </div>
                    {validationErrors.email && (
                      <p className="text-xs text-red-500 font-medium pl-1">
                        {validationErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Reason Textarea */}
                  <div className="space-y-2">
                    <label
                      htmlFor="reason"
                      className="block text-sm font-semibold text-foreground"
                    >
                      {t("reason_label")}
                    </label>
                    <div className="relative">
                      <div className="absolute top-4 left-4 pointer-events-none text-neutral-400">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <textarea
                        id="reason"
                        rows={4}
                        disabled={isSubmitting}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder={t("reason_placeholder")}
                        className="block w-full pl-11 pr-4 py-3.5 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-foreground placeholder-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-brand/20 focus:border-neutral-400 dark:focus:border-neutral-700 transition-all duration-200 resize-y min-h-[100px]"
                      />
                    </div>
                  </div>

                  {/* Confirm Checkbox */}
                  <div className="space-y-2 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        disabled={isSubmitting}
                        checked={confirm}
                        onChange={(e) => {
                          setConfirm(e.target.checked);
                          if (validationErrors.confirm) {
                            setValidationErrors((prev) => ({
                              ...prev,
                              confirm: undefined,
                            }));
                          }
                        }}
                        className="mt-1 h-4 w-4 rounded-md border-neutral-300 dark:border-neutral-700 text-neutral-900 focus:ring-neutral-900/20"
                      />
                      <span className="text-sm text-muted-foreground select-none leading-relaxed">
                        {t("confirm_label")}
                      </span>
                    </label>
                    {validationErrors.confirm && (
                      <p className="text-xs text-red-500 font-medium pl-7">
                        {validationErrors.confirm}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#18181B] hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 rounded-full py-4 px-6 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>{t("submitting")}</span>
                        </>
                      ) : (
                        <span>
                          {slice.primary.button_text || t("confirm_label")}
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
