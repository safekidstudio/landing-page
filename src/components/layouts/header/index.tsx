"use client";

import { PrismicNextImage } from "@prismicio/next";
import { PrismicNextLink } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

interface SiteHeaderProps {
  settings: Content.AppSettingsDocument | null;
}

export default function SiteHeader({ settings }: SiteHeaderProps) {
  const pathname = usePathname();

  // Strip locale prefix (e.g. /en-us, /vi-vn) from Prismic URLs for comparison
  const stripLocale = (url: string) =>
    url.replace(/^\/[a-z]{2}(-[a-z]{2})?(?=\/|$)/, "") || "/";
  if (!settings) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/50 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <span className="text-xl font-bold text-brand">Kibal</span>
        </div>
      </header>
    );
  }

  const { logo_image, navigation_items, login_button, cta_button } =
    settings.data;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/85 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side: Logo & Desktop Navigation */}
        <div className="flex items-center gap-8 lg:gap-12">
          {/* Logo */}
          <PrismicNextLink href="/" className="flex items-center gap-2">
            {isFilled.image(logo_image) ? (
              <PrismicNextImage
                field={logo_image}
                className="h-7 w-auto object-contain"
                fallback={
                  <span className="text-xl font-bold text-brand">Kibal</span>
                }
              />
            ) : (
              <span className="text-xl font-bold text-brand">Kibal</span>
            )}
          </PrismicNextLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navigation_items.map((item, idx) => (
              <PrismicNextLink
                key={idx}
                field={item.link}
                className={cn(
                  "font-medium text-muted-foreground hover:text-foreground transition-colors relative py-1",
                  {
                    "text-brand":
                      isFilled.link(item.link) &&
                      stripLocale(item.link.url ?? "") === pathname,
                  },
                )}
              >
                {item.label === "*" ? (
                  <span className="text-fuchsia-500 font-extrabold text-base scale-125 inline-block -mt-1">
                    *
                  </span>
                ) : (
                  <span>{item.label}</span>
                )}
              </PrismicNextLink>
            ))}
          </nav>
        </div>

        {/* Right Side: Auth Buttons (Desktop) & Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-5">
            {isFilled.keyText(login_button.text) && (
              <PrismicNextLink
                field={login_button}
                className="font-medium text-muted-foreground hover:text-foreground transition-colors"
              />
            )}
            {isFilled.keyText(cta_button.text) && (
              <Button
                variant="brand"
                className="rounded-full px-5 py-2 h-auto font-medium"
                asChild
              >
                <PrismicNextLink field={cta_button} />
              </Button>
            )}
          </div>

          {/* Mobile Menu (Sheet) */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground focus:outline-none cursor-pointer"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] flex flex-col justify-between pt-16 bg-background"
            >
              <div className="flex flex-col space-y-6">
                <nav className="flex flex-col space-y-4">
                  {navigation_items.map((item, idx) => (
                    <SheetClose asChild key={idx}>
                      <PrismicNextLink
                        field={item.link}
                        className={cn(
                          "text-base font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md py-2 px-3",
                          {
                            "text-brand bg-brand/10":
                              isFilled.link(item.link) &&
                              stripLocale(item.link.url ?? "") === pathname,
                          },
                        )}
                      >
                        {item.label === "*" ? (
                          <span className="text-fuchsia-500 font-extrabold text-base">
                            *
                          </span>
                        ) : (
                          <span>{item.label}</span>
                        )}
                      </PrismicNextLink>
                    </SheetClose>
                  ))}
                </nav>
              </div>

              <div className="border-t border-border pt-6 flex flex-col gap-4">
                {isFilled.keyText(login_button.text) && (
                  <SheetClose asChild>
                    <PrismicNextLink
                      field={login_button}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "w-full justify-center text-base font-medium",
                      )}
                    />
                  </SheetClose>
                )}
                {isFilled.keyText(cta_button.text) && (
                  <SheetClose asChild>
                    <Button
                      variant="brand"
                      className="rounded-full w-full py-2.5 h-auto text-base font-medium"
                      asChild
                    >
                      <PrismicNextLink field={cta_button} />
                    </Button>
                  </SheetClose>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
