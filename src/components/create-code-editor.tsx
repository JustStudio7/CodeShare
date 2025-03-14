// @ts-ignore
"use client";
import { postCodeAction } from "@/lib/actions/code";
import { languages, parser } from "@/config/code";
import { type editor as MonacoEditor } from "monaco-editor";
import { format as prettierFormat } from "prettier/standalone";
import { CodeEditor } from "./code-editor";

import { StoreActions, StoreType, store } from "@/lib/store";

import {
  type Dispatch,
  type SetStateAction,
  type HTMLProps,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Check, SendHorizonal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SplitButton } from "@/components/ui/split-button";
import { DoneDialog } from "./done-dialog";

import Script from 'next/script';

export function CreateCodeEditor({
  code,
  setCode,
  ...props
}: {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
} & HTMLProps<HTMLDivElement>) {
  const [formatLoading, setFormatLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("plaintext");
  const [editor, setEditor] = useState<MonacoEditor.IStandaloneCodeEditor>();

  const storeActions = store.getActions() as StoreActions;

  const router = useRouter();

  function formatCode(force = false): any {
    if (code.length > 1000000 && !force)
      return toast.warning("Are you sure?", {
        duration: 10000,
        description: "The code you've put is too long. (>1.000.000 chars)",
        action: {
          label: "Format anyway",
          onClick: () => formatCode(true),
        },
      });
    setFormatLoading(true);

    const supportedLanguages = Object.keys(parser());

    if (!supportedLanguages.includes(language)) {
      setFormatLoading(false);

      return toast.error("The language you pick is not supported.", {
        description: "Tips: Try changing the language on the Bottom Left.",
      });
    }

    let startTime = Date.now();
    prettierFormat(code, parser()[language].options)
      .then((str) => {
        setCode(str);
        let endTime = Date.now();
        setFormatLoading(false);
        toast.success(`Formatted Successfully (${endTime - startTime}ms)`);
      })
      .catch((e) => {
        let endTime = Date.now();
        setFormatLoading(false);
        toast.error("Error on Formatting", {
          description: `${
            e.cause?.loc?.line
              ? `There's an error in your code. (${e.cause.loc.line}:${e.cause.loc.column})`
              : `Format failed. ('${e.cause?.code || e}')`
          } (${endTime - startTime}ms)`,
          action: e.cause?.loc?.line
            ? {
                label: "Jump to Line",
                onClick: () => {
                  editor?.revealLine(e.cause.loc.line);
                },
              }
            : undefined,
        });
      });
  }

  useEffect(() => {
    if (!editor) return;

    function resizeEditor() {
      // @ts-expect-error
      editor.layout({});
    }

    window.addEventListener("resize", resizeEditor);
    return () => {
      window.removeEventListener("resize", resizeEditor);
    };
  }, [editor]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.repeat) return;
      if (e.ctrlKey && e.shiftKey && e.key === "S") {
        e.preventDefault();
        formatCode(true);
      } else if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        formatCode();
      }
    }

    if (code !== "") {
      storeActions.setIsEditingCode(true);
    } else {
      storeActions.setIsEditingCode(false);
    }

    window.onbeforeunload = () => (code === "" ? null : true);

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.onbeforeunload = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, language]);
/*
  const submitCode = async (lang: "dynamic" | "plaintext") => {
    const formData = new FormData();
    formData.append("code", code);
    formData.append("language", lang === "dynamic" ? language : lang);

    toast.promise(postCodeAction(formData), {
      loading: "Submitting your Paste Code...",
      success: async (data) => {
        if (!data.success)
          return `Error while submitting your Paste Code. ${data.error}`;

        router.push(`/paste/${data.data.id}`);

        return (
          <div className="space-y-2">
            <span className="flex items-center gap-2 text-sm font-medium">
              <Check size={18} /> Done!
            </span>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="text-xs" size="sm">
                  View Paste info
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DoneDialog id={data.data.id} password={data.data.password} />
              </DialogContent>
            </Dialog>
          </div>
        );
      },
      duration: 15000,
    });
  };
*/
  const submitCode = async (lang: string) => {
    const formData = new FormData();
    formData.append("code", code);
    formData.append("language", lang === "dynamic" ? language : lang);
    toast.promise(postCodeAction(formData), {
      loading: "Publishing your code...",
      success: async (data) => {
        if (!data.success)
          return `Error while publishing your code. ${data.error}`;

        return (
          <div className="space-y-2">
            <span className="flex items-center gap-2 text-sm font-medium">
              <Check size={18} /> Almost done...
            </span>
          </div>
        );
      },
      duration: 15000,
    });
  };

  const publishCode = async () => {
    "use client";
    eval('__just.Publish.Code()');
  };
  const publishText = async () => {
    "use client";
    eval('__just.Publish.Text()');
  };
  const saveAsDraft = async () => {
    "use client";
    eval('__just.Publish.Draft()');
  };

  return (
    <CodeEditor
      code={code}
      setCode={setCode}
      language={language}
      onMount={(editor, monaco) => {
        setEditor(editor);
      }}
      navChildren={
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-0">
          {typeof editor === "undefined" ? (
            <Skeleton className="h-8 w-44" />
          ) : (
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px] _just_monacoEditorButtons">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => {
                  const langIcon = lang[2];

                  return (
                    <SelectItem key={lang[1]} value={lang[1]}>
                      <span className="flex items-center gap-2 truncate text-sm">
                        <span className="scale-75 noHighlightEffect">{langIcon}</span> {lang[0]}
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
          <div className="flex gap-2">
            {typeof editor === "undefined" ? (
              <>
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-32" />
              </>
            ) : (
              <>
                <Button
                  onClick={() => formatCode()}
                  className="flex items-center gap-2 _just_monacoEditorButtons disabled:cursor-not-allowed notification"
                  id="_just_style_border"
                  disabled={formatLoading}
                >
                  <Sparkles size={16} className="size-2 sm:size-4" />
                  Format
                </Button>
                <SplitButton
                  buttonChildren={
                    <>
                      <SendHorizonal size={16} className="size-2 sm:size-4" />
                      <div id="__just_publish _just_styleParent_border" onClick={() => {publishCode()}}>Publish</div>
                    </>
                  }
                  dropdownChildren={
                    <>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          Publish as...
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="w-48">
                          <DropdownMenuItem
                            onClick={() => {submitCode("dynamic"); publishText()}}
                            id="__just_publish-txt"
                          >
                            Plain Text
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                      <DropdownMenuItem disabled id="__just_publish-draft" onClick={() => {saveAsDraft()}}>
                        Save as Draft
                      </DropdownMenuItem>
                    </>
                  }
                  className={{
                    button: "flex items-center gap-2 _just_monacoEditorButtons disabled:cursor-not-allowed notification",
                    main: "_just_monacoEditorButtons",
                  }}
                  disabled={formatLoading || code === ""}
                  options={{
                    DropdownMenuContent: {
                      side: "top",
                    },
                    Button: {
                      onClick: () => {submitCode("dynamic") onClick={() => {publishCode()}}},
                    },
                  }}
                />
              </>
            )}
          </div>
        </div>
      }
    />
  );
}
