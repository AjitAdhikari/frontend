import { cn } from "@/lib/utils";

interface ContainerProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn("max-w-7xl mx-auto max-sm:px-6 max-xl:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
};
