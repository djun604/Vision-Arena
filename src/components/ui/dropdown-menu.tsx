import * as React from "react"

interface DropdownMenuContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(
  null
)

interface DropdownMenuProps {
  children: React.ReactNode
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (!open) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('[data-dropdown-menu]')) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div style={{ position: "relative", display: "inline-block" }} data-dropdown-menu>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}

interface DropdownMenuTriggerProps {
  asChild?: boolean
  children: React.ReactNode
}

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ asChild, children, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext)
  if (!context) throw new Error("DropdownMenuTrigger must be used within DropdownMenu")

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      onClick: () => context.setOpen(!context.open),
      ref,
    } as any)
  }

  return (
    <button
      ref={ref}
      onClick={() => context.setOpen(!context.open)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...props,
      }}
      {...props}
    >
      {children}
    </button>
  )
})
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end"
  children: React.ReactNode
}

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ align = "start", children, style, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext)
  if (!context) throw new Error("DropdownMenuContent must be used within DropdownMenu")

  if (!context.open) return null

  // shadcn/ui 스타일에 맞춘 정렬 로직
  const alignStyle = 
    align === "end" 
      ? { right: 0 } 
      : align === "center" 
        ? { left: "50%", transform: "translateX(-50%)" } 
        : { left: 0 }
  
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: "100%",
        ...alignStyle,
        marginTop: "0.25rem",
        minWidth: "12rem",
        maxWidth: "20rem",
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "0.375rem",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        padding: "0.25rem",
        zIndex: 50,
        overflow: "hidden",
        ...style,
      }}
      onClick={(e) => e.stopPropagation()}
      data-dropdown-menu
      {...props}
    >
      {children}
    </div>
  )
})
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      padding: "0.5rem 0.75rem",
      fontSize: "0.875rem",
      fontWeight: "600",
      color: "#1f2937",
    }}
    {...props}
  >
    {children}
  </div>
))
DropdownMenuLabel.displayName = "DropdownMenuLabel"

const DropdownMenuSeparator = () => (
  <div
    style={{
      height: "1px",
      backgroundColor: "#e5e7eb",
      margin: "0.25rem",
    }}
  />
)

interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ children, style, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)
    
    return (
      <div
        ref={ref}
        style={{
          position: "relative",
          display: "flex",
          cursor: "pointer",
          userSelect: "none",
          alignItems: "center",
          borderRadius: "0.25rem",
          padding: "0.5rem 0.75rem",
          fontSize: "0.875rem",
          outline: "none",
          transition: "background-color 0.15s ease-in-out, color 0.15s ease-in-out",
          backgroundColor: isHovered ? "#f3f4f6" : "transparent",
          color: isHovered ? "#1f2937" : "#374151",
          ...style,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
DropdownMenuItem.displayName = "DropdownMenuItem"

interface DropdownMenuCheckboxItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  children: React.ReactNode
}

const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuCheckboxItemProps
>(({ checked, onCheckedChange, children, style, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false)
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onCheckedChange?.(!checked)
  }
  
  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        display: "flex",
        cursor: "pointer",
        userSelect: "none",
        alignItems: "center",
        borderRadius: "0.25rem",
        padding: "0.5rem 0.75rem 0.5rem 2rem",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        outline: "none",
        transition: "background-color 0.15s ease-in-out, color 0.15s ease-in-out",
        backgroundColor: isHovered ? "#f3f4f6" : "transparent",
        color: isHovered ? "#1f2937" : "#374151",
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onClick={handleClick}
      {...props}
    >
      <span
        style={{
          position: "absolute",
          left: "0.5rem",
          display: "flex",
          height: "1rem",
          width: "1rem",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
        onMouseDown={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onCheckedChange?.(!checked)
          }}
          onMouseDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          style={{
            width: "1rem",
            height: "1rem",
            cursor: "pointer",
            accentColor: "#3b82f6",
            margin: 0,
            flexShrink: 0,
          }}
        />
      </span>
      <span style={{ 
        flex: 1,
        minWidth: 0,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}>
        {children}
      </span>
    </div>
  )
})
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
}

