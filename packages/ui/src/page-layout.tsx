import * as React from "react";

/** One 36px control row: filters and search at the start, actions at the end. Wraps when narrow. */
export function Toolbar({
  start,
  end,
}: {
  start?: React.ReactNode;
  end?: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="flex min-h-9 flex-wrap items-center gap-2">
      <div className="flex min-w-0 flex-[1_1_14rem] flex-wrap items-center gap-2">
        {start}
      </div>
      {end && <div className="flex flex-wrap items-center gap-2">{end}</div>}
    </div>
  );
}

/** Label and value rows for detail pages and side panels. */
export function PropertyList({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <dl className="grid divide-y divide-border text-sm">{children}</dl>;
}

export function Property({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="grid grid-cols-[8rem_minmax(0,1fr)] items-baseline gap-3 py-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="min-w-0 break-words text-mono-700 dark:text-mono-300">
        {children}
      </dd>
    </div>
  );
}
