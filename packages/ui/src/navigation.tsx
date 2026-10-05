"use client";

import * as React from "react";

export interface NavigationLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  ref?: React.Ref<HTMLAnchorElement>;
}

export type NavigationLinkComponent = React.ComponentType<NavigationLinkProps>;

const DefaultNavigationLink = React.forwardRef<
  HTMLAnchorElement,
  NavigationLinkProps
>(({ href, ...props }, ref) => <a ref={ref} href={href} {...props} />);
DefaultNavigationLink.displayName = "DefaultNavigationLink";

const NavigationContext = React.createContext<NavigationLinkComponent>(
  DefaultNavigationLink,
);

export function NavigationProvider({
  link: Link,
  children,
}: {
  link: NavigationLinkComponent;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <NavigationContext.Provider value={Link}>
      {children}
    </NavigationContext.Provider>
  );
}

export const NavigationLink = React.forwardRef<
  HTMLAnchorElement,
  NavigationLinkProps
>((props, ref) => {
  const Link = React.useContext(NavigationContext);
  return <Link {...props} ref={ref} />;
});
NavigationLink.displayName = "NavigationLink";
