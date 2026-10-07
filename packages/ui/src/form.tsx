"use client";
// style-check-allow-primitive-override -- control-composition

import type { VariantProps } from "class-variance-authority";
import type {
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProviderProps,
} from "react-hook-form";
import * as React from "react";
import { cn } from "./cn.js";
import type * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { Check, ChevronDown, Info, Plus, X } from "lucide-react";
import { Controller, FormProvider, useFormContext } from "react-hook-form";

import type { ButtonProps } from "./button.js";
import type { ControlSurface } from "./control-variants.js";
import { panelTitleStyles, sidebarTextStyles } from "./impression-recipes.js";
import { Button } from "./button.js";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible.js";
import { Label } from "./label.js";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip.js";

export type FormSurface = ControlSurface;
export type FormVariant = "default" | "compact";
export type FormItemVariant = "default" | "compact" | "inline";
export type FormSectionVariant = "default" | "divided" | "compact";
export type FormRowVariant = "stacked" | "inline" | "compact";
export type FormDisclosureVariant = "advanced" | "quiet" | "info" | "compact";
export type FormDisclosureMotion = "animated" | "instant";
export type FormExampleActionVariant =
  | "select"
  | "insert"
  | "suggestion"
  | "clear";
export type FormActionsVariant = "end" | "split" | "full" | "stacked";

interface FormStyleContextValue {
  surface: FormSurface;
  variant: FormVariant;
}

const FormStyleContext = React.createContext<FormStyleContextValue>({
  surface: "app",
  variant: "default",
});

function useFormStyle(surface?: FormSurface) {
  const context = React.useContext(FormStyleContext);
  return { ...context, surface: surface ?? context.surface };
}

function Form<
  TFieldValues extends FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>({
  surface = "app",
  variant = "default",
  ...props
}: FormProviderProps<TFieldValues, TContext, TTransformedValues> & {
  surface?: FormSurface;
  variant?: FormVariant;
}) {
  return (
    <FormStyleContext.Provider value={{ surface, variant }}>
      <FormProvider {...props} />
    </FormStyleContext.Provider>
  );
}

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

const FormFieldContext = React.createContext<FormFieldContextValue | undefined>(
  undefined,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: ControllerProps<TFieldValues, TName>,
) => (
  <FormFieldContext.Provider value={{ name: props.name }}>
    <Controller {...props} />
  </FormFieldContext.Provider>
);

interface FormItemContextValue {
  id: string;
}

const FormItemContext = React.createContext<FormItemContextValue | undefined>(
  undefined,
);

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext)
    throw new Error("useFormField should be used within <FormField>");
  if (!itemContext)
    throw new Error("useFormField should be used within <FormItem>");

  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

const formItemVariants = cva("", {
  variants: {
    variant: {
      default: "space-y-2",
      compact: "space-y-1",
      inline: "flex items-start justify-between gap-4",
    },
  },
  defaultVariants: { variant: "default" },
});

type FormItemProps = React.HTMLAttributes<HTMLDivElement> & {
  surface?: FormSurface;
  variant?: FormItemVariant;
  layout?: "default" | "full" | "choice" | "choiceSpaced";
  align?: "default" | "center";
};

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  (
    {
      className,
      surface,
      variant,
      layout = "default",
      align = "default",
      ...props
    },
    ref,
  ) => {
    const id = React.useId();
    const style = useFormStyle(surface);
    const resolvedVariant =
      variant ?? (style.variant === "compact" ? "compact" : "default");

    return (
      <FormItemContext.Provider value={{ id }}>
        <div
          ref={ref}
          className={cn(
            formItemVariants({ variant: resolvedVariant }),
            layout === "full" && "w-full",
            layout === "choice" &&
              "flex flex-row items-start space-x-3 space-y-0",
            layout === "choiceSpaced" &&
              "mb-4 flex flex-row items-start space-x-3 space-y-0 pt-2",
            align === "center" && "items-center",
            className,
          )}
          {...props}
        />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = "FormItem";

const formLabelVariants = cva(
  "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      surface: {
        app: sidebarTextStyles,
        auth: "text-mono-700 dark:text-mono-200",
      },
      variant: {
        default: "text-sm font-medium leading-none",
        choice: "text-sm font-normal leading-5",
      },
    },
    defaultVariants: { surface: "app", variant: "default" },
  },
);

type FormLabelProps = React.ComponentPropsWithoutRef<
  typeof LabelPrimitive.Root
> &
  Omit<VariantProps<typeof formLabelVariants>, "surface" | "variant"> & {
    surface?: FormSurface;
    variant?: "default" | "choice";
    tone?: "default" | "emphasis";
    preset?: "default" | "settings" | "entity" | "section" | "choice";
  };

const FormLabel = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  FormLabelProps
>(
  (
    {
      className,
      surface,
      variant = "default",
      tone = "default",
      preset = "default",
      ...props
    },
    ref,
  ) => {
    const { error, formItemId } = useFormField();
    const style = useFormStyle(surface);

    return (
      <Label
        ref={ref}
        className={cn(
          formLabelVariants({ surface: style.surface, variant }),
          error && "text-destructive",
          tone === "emphasis" && "text-mono-800 dark:text-mono-100",
          preset === "settings" && "mb-1",
          preset === "entity" && "pl-2 text-xs",
          preset === "section" && "text-base",
          preset === "choice" && "font-normal",
          className,
        )}
        htmlFor={formItemId}
        {...props}
      />
    );
  },
);
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ComponentRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>((props, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={Boolean(error)}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement> & {
  surface?: FormSurface;
  variant?: "default" | "inline";
  preset?: "default" | "settings";
};

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(({ className, surface, variant, preset = "default", ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  const style = useFormStyle(surface);
  const resolvedVariant =
    variant ?? (style.variant === "compact" ? "inline" : "default");

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn(
        resolvedVariant === "default" ? "text-sm" : "text-xs",
        style.surface === "app"
          ? "text-muted-foreground"
          : "text-mono-500 dark:text-mono-400",
        preset === "settings" && "pr-10",
        className,
      )}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement> & {
  surface?: FormSurface;
  variant?: "default" | "compact";
};

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, surface, variant, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const style = useFormStyle(surface);
    const resolvedVariant =
      variant ?? (style.variant === "compact" ? "compact" : "default");
    const body = error?.message?.length ? error.message : children;

    if (!body) return null;

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn(
          "font-medium text-destructive",
          resolvedVariant === "default" ? "pb-2 text-sm" : "text-xs",
          className,
        )}
        {...props}
      >
        {body}
      </p>
    );
  },
);
FormMessage.displayName = "FormMessage";

const formSectionVariants = cva("", {
  variants: {
    variant: {
      default: "space-y-4",
      divided: "space-y-4 border-b pb-4",
      compact: "space-y-2",
    },
  },
  defaultVariants: { variant: "default" },
});

type FormSectionProps = React.HTMLAttributes<HTMLElement> & {
  action?: React.ReactNode;
  description?: React.ReactNode;
  headingAs?: "h2" | "h3";
  surface?: FormSurface;
  title?: React.ReactNode;
  variant?: FormSectionVariant;
};

const FormSection = React.forwardRef<HTMLElement, FormSectionProps>(
  (
    {
      action,
      children,
      className,
      description,
      headingAs: Heading = "h2",
      surface,
      title,
      variant = "default",
      ...props
    },
    ref,
  ) => {
    const style = useFormStyle(surface);

    return (
      <section
        ref={ref}
        className={cn(formSectionVariants({ variant }), className)}
        {...props}
      >
        {/* Preserve the original truthy-content test, including empty strings. */}
        {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
        {(title || description || action) && (
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-1">
              {title && (
                <Heading
                  className={cn(
                    style.surface === "app"
                      ? cn("text-xl font-semibold", panelTitleStyles)
                      : "font-inter text-lg font-semibold text-mono-900 dark:text-white",
                  )}
                >
                  {title}
                </Heading>
              )}
              {description && (
                <p
                  className={cn(
                    "text-sm",
                    style.surface === "app"
                      ? "text-muted-foreground"
                      : "text-mono-600 dark:text-mono-300",
                  )}
                >
                  {description}
                </p>
              )}
            </div>
            {action}
          </div>
        )}
        {children}
      </section>
    );
  },
);
FormSection.displayName = "FormSection";

const formRowVariants = cva("", {
  variants: {
    variant: {
      stacked: "space-y-2",
      inline: "flex items-start justify-between gap-4",
      compact: "space-y-1",
    },
  },
  defaultVariants: { variant: "stacked" },
});

type FormRowProps = React.HTMLAttributes<HTMLDivElement> & {
  action?: React.ReactNode;
  controlId?: string;
  description?: React.ReactNode;
  label?: React.ReactNode;
  surface?: FormSurface;
  variant?: FormRowVariant;
};

const FormRow = React.forwardRef<HTMLDivElement, FormRowProps>(
  (
    {
      action,
      children,
      className,
      controlId,
      description,
      label,
      surface,
      variant = "stacked",
      ...props
    },
    ref,
  ) => {
    const style = useFormStyle(surface);
    const copy =
      label || description ? (
        <div className="min-w-0 space-y-1">
          {label && (
            <Label
              htmlFor={controlId}
              className={cn(
                style.surface === "app"
                  ? sidebarTextStyles
                  : "text-mono-700 dark:text-mono-200",
              )}
            >
              {label}
            </Label>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      ) : null;

    return (
      <div
        ref={ref}
        className={cn(formRowVariants({ variant }), className)}
        {...props}
      >
        {copy}
        {children}
        {action}
      </div>
    );
  },
);
FormRow.displayName = "FormRow";

type FormDisclosureProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange" | "title"
> & {
  contentClassName?: string;
  contentLayout?: "default" | "indented" | "fields";
  defaultOpen?: boolean;
  disabled?: boolean;
  label: React.ReactNode;
  motion?: FormDisclosureMotion;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  surface?: FormSurface;
  title?: React.ReactNode;
  tooltipContent?: React.ReactNode;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  variant?: FormDisclosureVariant;
};

function disclosureButtonAppearance(
  surface: FormSurface,
  variant: FormDisclosureVariant,
): ButtonProps {
  if (surface === "auth") return { surface: "auth", variant: "secondary" };
  return {
    surface: "app",
    variant: variant === "quiet" || variant === "info" ? "ghost" : "secondary",
  };
}

const FormDisclosure = React.forwardRef<HTMLDivElement, FormDisclosureProps>(
  (
    {
      children,
      className,
      contentClassName,
      contentLayout = "default",
      defaultOpen,
      disabled,
      label,
      motion = "animated",
      onOpenChange,
      open,
      surface,
      title,
      tooltipContent,
      tooltipSide = "bottom",
      variant = "advanced",
      ...props
    },
    ref,
  ) => {
    const style = useFormStyle(surface);
    const contentId = React.useId();
    const appearance = disclosureButtonAppearance(style.surface, variant);
    const triggerButton = (
      <Button
        {...appearance}
        type="button"
        size={variant === "compact" || variant === "info" ? "xs" : "default"}
        aria-controls={contentId}
        preset="formDisclosure"
        align="between"
        width={variant === "advanced" || variant === "quiet" ? "full" : "fit"}
      >
        <span className="flex items-center gap-2">
          {variant === "info" && <Info className="h-4 w-4" />}
          {label}
        </span>
        <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/disclosure:rotate-180" />
      </Button>
    );
    const trigger = tooltipContent ? (
      <TooltipProvider delayDuration={650}>
        <Tooltip>
          <TooltipTrigger asChild>
            <CollapsibleTrigger asChild>{triggerButton}</CollapsibleTrigger>
          </TooltipTrigger>
          <TooltipContent side={tooltipSide}>{tooltipContent}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      <CollapsibleTrigger asChild>{triggerButton}</CollapsibleTrigger>
    );

    return (
      <Collapsible
        {...(open === undefined ? {} : { open })}
        {...(defaultOpen === undefined ? {} : { defaultOpen })}
        {...(onOpenChange === undefined ? {} : { onOpenChange })}
        {...(disabled === undefined ? {} : { disabled })}
      >
        <div ref={ref} className={className} {...props}>
          {title ? (
            <div className="inline-flex items-center pt-0">
              <h2
                className={cn("pr-2 text-lg font-semibold", sidebarTextStyles)}
              >
                {title}
              </h2>
              {trigger}
            </div>
          ) : (
            trigger
          )}
          <CollapsibleContent
            id={contentId}
            className={cn(
              "overflow-hidden pt-2",
              motion === "animated" &&
                "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none",
              contentClassName,
              contentLayout === "indented" && "my-0 mt-1 pl-2",
              contentLayout === "fields" && "space-y-4",
            )}
          >
            {children}
          </CollapsibleContent>
        </div>
      </Collapsible>
    );
  },
);
FormDisclosure.displayName = "FormDisclosure";

type FormExampleActionProps = Omit<
  React.ComponentPropsWithoutRef<typeof Button>,
  "surface" | "variant" | "state" | "preset" | "className" | "style"
> & {
  className?: never;
  style?: never;
  icon?: React.ReactNode;
  state?: "default" | "selected";
  tooltipContent?: React.ReactNode;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  variant?: FormExampleActionVariant;
  placement?: "default" | "field";
};

const FormExampleAction = React.forwardRef<
  HTMLButtonElement,
  FormExampleActionProps
>(
  (
    {
      children,
      icon,
      size,
      state = "default",
      tooltipContent,
      tooltipSide = "bottom",
      variant = "select",
      placement = "default",
      ...props
    },
    ref,
  ) => {
    const appearance: ButtonProps = {
      surface: "app",
      variant:
        variant === "insert"
          ? "quiet"
          : variant === "clear"
            ? "ghost"
            : "secondary",
    };
    const defaultIcon =
      variant === "select" ? (
        <Check className={cn("h-4 w-4", state !== "selected" && "opacity-0")} />
      ) : variant === "insert" || variant === "suggestion" ? (
        <Plus className="h-4 w-4" />
      ) : (
        <X className="h-4 w-4" />
      );

    const action = (
      <Button
        ref={ref}
        {...props}
        {...appearance}
        type={props.type ?? "button"}
        size={
          size ??
          (variant === "clear"
            ? "iconSm"
            : variant === "suggestion"
              ? "default"
              : "xs")
        }
        state={state === "selected" ? "selected" : "default"}
        aria-pressed={variant === "select" ? state === "selected" : undefined}
        gap="standard"
        preset={
          variant === "suggestion"
            ? "formSuggestion"
            : placement === "field"
              ? "formClear"
              : "default"
        }
        className={undefined}
        style={undefined}
      >
        {icon ?? defaultIcon}
        {children}
      </Button>
    );

    if (!tooltipContent) return action;

    return (
      <TooltipProvider delayDuration={650}>
        <Tooltip>
          <TooltipTrigger asChild>{action}</TooltipTrigger>
          <TooltipContent side={tooltipSide}>{tooltipContent}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
);
FormExampleAction.displayName = "FormExampleAction";

const formActionsVariants = cva("flex gap-2", {
  variants: {
    variant: {
      end: "justify-end",
      split: "[&>*]:flex-1",
      full: "flex-col [&>*]:w-full",
      stacked: "flex-col-reverse sm:flex-row sm:justify-end",
    },
  },
  defaultVariants: { variant: "end" },
});

type FormActionsProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: FormActionsVariant;
  preset?: "default" | "inline";
};

const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(
  ({ className, variant = "end", preset = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        formActionsVariants({ variant }),
        preset === "inline" && "items-center pr-2",
        className,
      )}
      {...props}
    />
  ),
);
FormActions.displayName = "FormActions";

export {
  Form,
  FormActions,
  FormControl,
  FormDescription,
  FormDisclosure,
  FormExampleAction,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRow,
  FormSection,
  useFormField,
};
