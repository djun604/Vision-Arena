import * as React from "react"

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "checked"> {
  checked?: boolean | "indeterminate"
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, onCheckedChange, className = "", style, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = checked === "indeterminate"
      }
    }, [checked])

    React.useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(inputRef.current)
        } else {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = inputRef.current
        }
      }
    }, [ref])

    return (
      <input
        type="checkbox"
        ref={inputRef}
        checked={checked === "indeterminate" ? false : checked}
        onChange={(e) => {
          onCheckedChange?.(e.target.checked)
        }}
        style={{
          width: "1rem",
          height: "1rem",
          cursor: "pointer",
          accentColor: "#3b82f6",
          ...style,
        }}
        {...props}
      />
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }

