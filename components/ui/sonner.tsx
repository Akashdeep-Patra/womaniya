"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      closeButton
      visibleToasts={4}
      duration={4000}
      gap={8}
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            'bg-background text-foreground border-border font-sans rounded-2xl border-l-4',
          success: 'border-l-admin-success [&>[data-icon]]:text-admin-success',
          error: 'border-l-destructive [&>[data-icon]]:text-destructive',
          warning: 'border-l-admin-warning [&>[data-icon]]:text-admin-warning',
          info: 'border-l-primary [&>[data-icon]]:text-primary',
          actionButton:
            'min-h-[32px] rounded-full touch-manipulation bg-primary text-primary-foreground hover:bg-primary/90',
          cancelButton:
            'min-h-[32px] rounded-full touch-manipulation',
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
