"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

import Script from 'next/script';

const setEffects = (enabled : boolean) => {
  "use strict";
  globalThis.localStorage.setItem('effects', `${enabled}`);
  if (!enabled) {
    globalThis.document.body.classList.add('noEffects');
  } else {
    globalThis.document.body.classList.remove('noEffects');
  }
}

export default function SettingsPage() {
  const { setTheme } = useTheme();

  return (
    <main className="relative space-y-4 px-8 py-6 lg:gap-10 lg:px-0 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <Script 
        src="/js/third-party/confetti.min.js"
        // @ts-ignore:next-line
        onLoad={()=>{let confetti = new Confetti('_just_effects_enable'); confetti.setCount(75); confetti.setSize(1); confetti.setPower(25); confetti.setFade(false); confetti.destroyTarget(false);}}
      />
      <div className="mx-auto w-full min-w-0 max-w-2xl space-y-4">
        <header>
          <p className="text-3xl font-semibold">Settings</p>
        </header>
        
        <section className="space-y-2">
          <div>
            <p className="text-lg font-medium">Appearance</p>
            <p className="text-sm text-muted-foreground">
              Customize the appearance for this website.
            </p>
          </div>
          <Button
            asChild
            variant={"ghost"}
            className="h-fit w-fit"
            onClick={() => setTheme("light")}
          >
            <div className="flex flex-col">
              <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                  <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-2 w-[80px] animate-pulse rounded-lg bg-[#ecedef]" />
                    <div className="h-2 w-[100px] animate-pulse rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 animate-pulse rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] animate-pulse rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 animate-pulse rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] animate-pulse rounded-lg bg-[#ecedef]" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                Light
              </span>
            </div>
          </Button>
          <Button
            asChild
            variant={"ghost"}
            onClick={() => setTheme("dark")}
            className="h-fit w-fit"
          >
            <div className="flex flex-col">
              <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                <div className="space-y-2 rounded-sm bg-neutral-950 p-2">
                  <div className="space-y-2 rounded-md bg-neutral-800 p-2 shadow-sm">
                    <div className="h-2 w-[80px] animate-pulse rounded-lg bg-neutral-400" />
                    <div className="h-2 w-[100px] animate-pulse rounded-lg bg-neutral-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-neutral-800 p-2 shadow-sm">
                    <div className="h-4 w-4 animate-pulse rounded-full bg-neutral-400" />
                    <div className="h-2 w-[100px] animate-pulse rounded-lg bg-neutral-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-neutral-800 p-2 shadow-sm">
                    <div className="h-4 w-4 animate-pulse rounded-full bg-neutral-400" />
                    <div className="h-2 w-[100px] animate-pulse rounded-lg bg-neutral-400" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                Dark
              </span>
            </div>
          </Button>
          <Button
            asChild
            variant={"ghost"}
            onClick={() => setTheme("system")}
            className="h-fit w-fit"
          >
            <div className="flex flex-col">
              <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                <div className="space-y-2 rounded-sm bg-neutral-300 p-2">
                  <div className="space-y-2 rounded-md bg-neutral-600 p-2 shadow-sm">
                    <div className="h-2 w-[80px] animate-pulse rounded-lg bg-neutral-400" />
                    <div className="h-2 w-[100px] animate-pulse rounded-lg bg-neutral-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-neutral-600 p-2 shadow-sm">
                    <div className="h-4 w-4 animate-pulse rounded-full bg-neutral-400" />
                    <div className="h-2 w-[100px] animate-pulse rounded-lg bg-neutral-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-neutral-600 p-2 shadow-sm">
                    <div className="h-4 w-4 animate-pulse rounded-full bg-neutral-400" />
                    <div className="h-2 w-[100px] animate-pulse rounded-lg bg-neutral-400" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                System
              </span>
            </div>
          </Button>
        </section>

        <section className="space-y-2 effectsSelector">
          <div>
            <p className="text-lg font-medium">Effects</p>
            <p className="text-sm text-muted-foreground">
              Enable or disable some fresh effects for this website.
            </p>
          </div>
          <Button
            asChild
            variant={"ghost"}
            className="h-fit w-fit"
            id="_just_effects_enable"
            onClick={() => setEffects(true)}
          >
            <div className="flex flex-col">
              <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent _just_style0">
                <div className="space-y-2 rounded-sm bg-[#6e3bf3] p-2">
                  <div className="space-y-2 rounded-md bg-white p-2 shadow-sm _just_style1">
                    <div className="h-2 w-[80px] animate-pulse rounded-lg bg-[#6e3bf3]" />
                    <div className="h-2 w-[100px] animate-pulse rounded-lg bg-[#6e3bf3]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm _just_style2">
                    <div className="h-4 w-4 animate-pulse rounded-full bg-[#6e3bf3]" />
                    <div className="h-2 w-[100px] animate-pulse rounded-lg bg-[#6e3bf3]" />
                    <div className="_just_style4"></div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-neutral-800 p-2 shadow-sm _just_style3">
                    <div className="h-4 w-4 animate-pulse rounded-full bg-[#6e3bf3]" />
                    <div className="h-2 w-[100px] animate-pulse rounded-lg bg-[#6e3bf3]" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                Enable
              </span>
            </div>
          </Button>
          <Button
            asChild
            variant={"ghost"}
            id="_just_effects_disable"
            className="h-fit w-fit"
            onClick={() => setEffects(false)}
          >
            <div className="flex flex-col">
              <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground _just_style5">
                <div className="_just_style4 _just_style6"></div>
                <div className="space-y-2 rounded-sm bg-neutral-950 p-2">
                  <div className="space-y-2 rounded-md bg-neutral-800 p-2 shadow-sm">
                    <div className="h-2 w-[80px] animate-pulse rounded-lg bg-neutral-400" />
                    <div className="h-2 w-[100px] animate-pulse rounded-lg bg-neutral-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-neutral-800 p-2 shadow-sm">
                    <div className="h-4 w-4 animate-pulse rounded-full bg-neutral-400" />
                    <div className="h-2 w-[100px] animate-pulse rounded-lg bg-neutral-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-neutral-800 p-2 shadow-sm">
                    <div className="h-4 w-4 animate-pulse rounded-full bg-neutral-400" />
                    <div className="h-2 w-[100px] animate-pulse rounded-lg bg-neutral-400" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                Disable
              </span>
            </div>
          </Button>
        </section>
        
      </div>
    </main>
  );
}
