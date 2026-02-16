export function TypographySmall({ props }: { props: string }) {
  return <small className="text-sm leading-none font-medium">{props}</small>;
}

export function TypographyMuted({ props }: { props: string }) {
  return <p className="text-muted-foreground text-sm">{props}</p>;
}

export function TypographyLarge({ props }: { props: string }) {
  return <div className="text-lg font-semibold">{props}</div>;
}

export function TypographyLead({ props }: { props: string }) {
  return <p className="text-muted-foreground text-xl">{props}</p>;
}

export function TypographyInlineCode({ props }: { props: string }) {
  return (
    <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {props}
    </code>
  );
}

//list
export function TypographyList({ props }: { props: string }) {
  return <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{props}</ul>;
}

export function TypographyBlockquote({ props }: { props: string }) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{props}</blockquote>
  );
}

export function TypographyP({ props }: { props: string }) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{props}</p>;
}

export function TypographyH4({ props }: { props: string }) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {props}
    </h4>
  );
}

export function TypographyH3({ props }: { props: string }) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {props}
    </h3>
  );
}

export function TypographyH2({ props }: { props: string }) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {props}
    </h2>
  );
}

export function TypographyH1({ props }: { props: string }) {
  return (
    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      {props}
    </h1>
  );
}
