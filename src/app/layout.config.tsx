import { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

export const logo = (
  <>
    <Image
      src="/static/images/logo-light.png"
      alt="CodeShare Logo"
      width={48}
      height={48}
      priority
      className="hidden size-6 items-center dark:block"
    />
    <Image
      src="/static/images/logo-dark.png"
      alt="CodeShare Logo"
      width={48}
      height={48}
      priority
      className="block size-6 items-center dark:hidden"
    />
  </>
);

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        {logo}
        <p className="font-rubik text-xl font-medium">CodeShare</p>
      </>
    ),
    transparentMode: "top",
  },
};
