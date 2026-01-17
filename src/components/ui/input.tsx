import * as React from "react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", style, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        style={{
          height: "2.5rem",
          width: "100%",
          padding: "0 0.75rem",
          fontSize: "0.875rem",
          borderRadius: "0.375rem",
          border: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
          transition: "all 0.15s ease-in-out",
          boxSizing: "border-box",
          ...style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#3b82f6"
          e.currentTarget.style.outline = "none"
          e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.1)"
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#e5e7eb"
          e.currentTarget.style.boxShadow = "none"
        }}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

