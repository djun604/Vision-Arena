import * as React from "react"

interface DialogContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextValue | null>(null)

interface DialogProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Dialog = ({ children, open: controlledOpen, onOpenChange }: DialogProps) => {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = React.useCallback((newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }, [controlledOpen, onOpenChange])

  React.useEffect(() => {
    if (!open) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"
    
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [open, setOpen])

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  )
}

interface DialogTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ children, asChild, ...props }, ref) => {
    const context = React.useContext(DialogContext)
    if (!context) throw new Error("DialogTrigger must be used within Dialog")

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        onClick: () => context.setOpen(true),
        ref,
      } as any)
    }

    return (
      <button
        ref={ref}
        onClick={() => context.setOpen(true)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
DialogTrigger.displayName = "DialogTrigger"

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, style, ...props }, ref) => {
    const context = React.useContext(DialogContext)
    if (!context) throw new Error("DialogContent must be used within Dialog")

    if (!context.open) return null

    return (
      <>
        {/* 오버레이 */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 40,
          }}
          onClick={() => context.setOpen(false)}
        />
        {/* 다이얼로그 컨텐츠 */}
        <div
          ref={ref}
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#ffffff",
            borderRadius: "0.5rem",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            width: "90%",
            maxWidth: "42rem",
            maxHeight: "90vh",
            overflow: "auto",
            zIndex: 50,
            ...style,
          }}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {children}
        </div>
      </>
    )
  }
)
DialogContent.displayName = "DialogContent"

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ children, style, ...props }, ref) => (
    <div
      ref={ref}
      style={{
        padding: "1.5rem",
        borderBottom: "1px solid #e5e7eb",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
)
DialogHeader.displayName = "DialogHeader"

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ children, style, ...props }, ref) => (
    <h2
      ref={ref}
      style={{
        fontSize: "1.25rem",
        fontWeight: "600",
        color: "#111827",
        margin: 0,
        ...style,
      }}
      {...props}
    >
      {children}
    </h2>
  )
)
DialogTitle.displayName = "DialogTitle"

interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ children, style, ...props }, ref) => (
    <p
      ref={ref}
      style={{
        fontSize: "0.875rem",
        color: "#6b7280",
        margin: "0.5rem 0 0 0",
        ...style,
      }}
      {...props}
    >
      {children}
    </p>
  )
)
DialogDescription.displayName = "DialogDescription"

interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ children, style, ...props }, ref) => (
    <div
      ref={ref}
      style={{
        padding: "1.5rem",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
)
DialogBody.displayName = "DialogBody"

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ children, style, ...props }, ref) => (
    <div
      ref={ref}
      style={{
        padding: "1.5rem",
        borderTop: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "flex-end",
        gap: "0.5rem",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
)
DialogFooter.displayName = "DialogFooter"

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
}

