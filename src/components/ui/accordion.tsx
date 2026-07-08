"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import * as React from "react";

interface AccordionItemProps {
  id: string;
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({
  title,
  content,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="border-b border-hairline-soft py-4">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-2 text-left font-medium text-ink hover:text-ink/80 focus:outline-none transition-colors duration-200 cursor-pointer"
      >
        <span className="body-default md:text-base font-semibold">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="text-ink-muted"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 pt-2 text-ink-muted body-default leading-relaxed">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionProps {
  items: {
    id: string;
    title: string;
    content: React.ReactNode;
  }[];
  className?: string;
}

export function Accordion({ items, className = "" }: AccordionProps) {
  const [openId, setOpenId] = React.useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={`w-full divide-y divide-hairline-soft ${className}`}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          content={item.content}
          isOpen={openId === item.id}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
}
