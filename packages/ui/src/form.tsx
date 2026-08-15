import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "./cn.js";
import { Label } from "./controls.js";

export const Form = FormProvider;

interface FormFieldContextValue {
  name: string;
}

const FormFieldContext = React.createContext<FormFieldContextValue | undefined>(
  undefined,
);

export function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>): React.JSX.Element {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

interface FormItemContextValue {
  id: string;
}

const FormItemContext = React.createContext<FormItemContextValue | undefined>(
  undefined,
);

export function FormItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  const id = React.useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("grid gap-1.5", className)} {...props} />
    </FormItemContext.Provider>
  );
}

function useFormField() {
  const field = React.useContext(FormFieldContext);
  const item = React.useContext(FormItemContext);
  const form = useFormContext();
  if (!field || !item) throw new Error("form-field-context-missing");
  const state = form.getFieldState(field.name, form.formState);
  return {
    ...state,
    name: field.name,
    formItemId: `${item.id}-control`,
    formDescriptionId: `${item.id}-description`,
    formMessageId: `${item.id}-message`,
  };
}

export const FormLabel = React.forwardRef<
  React.ComponentRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return (
    <Label
      ref={ref}
      htmlFor={formItemId}
      data-error={error ? true : undefined}
      className={cn(error && "text-danger", className)}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

export const FormControl = React.forwardRef<
  React.ComponentRef<"div">,
  React.HTMLAttributes<HTMLDivElement> & { children: React.ReactElement }
>(({ children, ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();
  return (
    <div ref={ref} {...props}>
      {React.cloneElement(children, {
        id: formItemId,
        "aria-describedby": error
          ? `${formDescriptionId} ${formMessageId}`
          : formDescriptionId,
        "aria-invalid": Boolean(error),
      } as React.HTMLAttributes<HTMLElement>)}
    </div>
  );
});
FormControl.displayName = "FormControl";

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const content = error?.message ?? children;
  if (!content) return null;
  return (
    <p
      ref={ref}
      id={formMessageId}
      role="alert"
      className={cn("text-sm text-danger", className)}
      {...props}
    >
      {content}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export function FormSection({
  title,
  description,
  className,
  children,
}: {
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <section
      className={cn(
        "grid gap-4 border-t border-border py-5 first:border-t-0",
        className,
      )}
    >
      {(title !== undefined || description !== undefined) && (
        <header className="grid gap-1">
          {title && <h2 className="text-base font-medium">{title}</h2>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}

export function FormRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)} {...props} />
  );
}

export function FormDisclosure({
  label,
  className,
  children,
  ...props
}: React.DetailsHTMLAttributes<HTMLDetailsElement> & {
  label: string;
}): React.JSX.Element {
  return (
    <details
      className={cn("border-t border-border py-3", className)}
      {...props}
    >
      <summary className="cursor-pointer text-sm font-medium text-muted-foreground marker:text-muted-foreground hover:text-foreground">
        {label}
      </summary>
      <div className="pt-3">{children}</div>
    </details>
  );
}

export function FormActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}
