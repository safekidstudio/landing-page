import { type Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import {
  Shield,
  Lock,
  TrendingUp,
  Database,
  Key,
  Info,
  Mail,
} from "lucide-react";
import { Heading } from "@/components/ui/typography";
import { ScrollAnimatedContainer } from "@/components/animated";

export type DataFlowsProps = {
  slice: Content.DataFlowsSlice;
};

export default function DataFlows({ slice }: DataFlowsProps) {
  const { primary } = slice;

  // Icon resolver for flow card headers
  const getFlowIcon = (iconName: string) => {
    const iconClass = "h-5 w-5 text-neutral-600";
    switch (iconName) {
      case "lock":
        return <Lock className={iconClass} />;
      case "trending-up":
        return <TrendingUp className={iconClass} />;
      case "database":
        return <Database className={iconClass} />;
      case "key":
        return <Key className={iconClass} />;
      case "mail":
        return <Mail className={iconClass} />;
      case "info":
        return <Info className={iconClass} />;
      case "shield":
      default:
        return <Shield className={iconClass} />;
    }
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-[#FAF8F5]/30 py-20 md:py-28 border-b border-border/40"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Header Section */}
        <ScrollAnimatedContainer
          type="slide"
          direction="up"
          className="w-full text-center max-w-3xl mx-auto space-y-4"
        >
          {isFilled.richText(primary.heading) && (
            <PrismicRichText
              field={primary.heading}
              components={{
                heading2: ({ children }) => <Heading>{children}</Heading>,
              }}
            />
          )}
          {isFilled.richText(primary.description) && (
            <PrismicRichText
              field={primary.description}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-base sm:text-lg text-muted-foreground/80 leading-relaxed text-center max-w-2xl mx-auto">
                    {children}
                  </p>
                ),
              }}
            />
          )}
        </ScrollAnimatedContainer>

        {/* Vertically Stacked Cards Container */}
        {isFilled.group(primary.flows) && (
          <div className="flex flex-col gap-6 md:gap-8 w-full max-w-5xl mt-16">
            {primary.flows.map((flow, index) => (
              <ScrollAnimatedContainer
                key={index}
                type="slide"
                direction="up"
                delay={index * 0.1}
                className="w-full flex"
              >
                <div className="bg-white border border-neutral-100 rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 w-full flex flex-col">
                  {/* Card Header */}
                  <div className="flex items-center gap-4 mb-6 sm:mb-8">
                    <div className="p-3.5 bg-neutral-100 rounded-xl flex items-center justify-center">
                      {getFlowIcon(flow.icon || "shield")}
                    </div>
                    {isFilled.keyText(flow.title) && (
                      <h3 className="text-base sm:text-lg font-serif italic font-medium text-foreground">
                        {flow.title}
                      </h3>
                    )}
                  </div>

                  {/* Card Body Content */}
                  {isFilled.richText(flow.content) && (
                    <div className="prose max-w-none">
                      <PrismicRichText
                        field={flow.content}
                        components={{
                          paragraph: ({ children }) => (
                            <p className="text-sm sm:text-[15px] text-muted-foreground/90 leading-relaxed mb-5 last:mb-0">
                              {children}
                            </p>
                          ),
                          list: ({ children }) => (
                            <ul className="list-disc pl-6 space-y-3.5 text-sm sm:text-[15px] text-muted-foreground/90 leading-relaxed mb-5 last:mb-0">
                              {children}
                            </ul>
                          ),
                          listItem: ({ children }) => (
                            <li className="pl-1">{children}</li>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-semibold text-foreground">
                              {children}
                            </strong>
                          ),
                        }}
                      />
                    </div>
                  )}
                </div>
              </ScrollAnimatedContainer>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
