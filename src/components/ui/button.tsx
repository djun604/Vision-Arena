import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary" | "link"
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", style, asChild, children, ...props }, ref) => {
    const baseStyles: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "0.375rem",
      fontWeight: "500",
      transition: "all 0.2s",
      cursor: "pointer",
      border: "none",
      outline: "none",
      position: "relative",
      whiteSpace: "nowrap",
      userSelect: "none",
      textDecoration: "none",
    }

    // shadcn/ui 표준 색상 팔레트
    const variants: Record<string, React.CSSProperties> = {
      default: {
        backgroundColor: "#000000",
        color: "#ffffff",
      },
      outline: {
        backgroundColor: "transparent",
        color: "hsl(222.2 47.4% 11.2%)",
        border: "1px solid hsl(214.3 31.8% 91.4%)",
      },
      ghost: {
        backgroundColor: "transparent",
        color: "hsl(222.2 47.4% 11.2%)",
        border: "none",
      },
      secondary: {
        backgroundColor: "hsl(210 40% 96.1%)",
        color: "hsl(222.2 47.4% 11.2%)",
      },
      destructive: {
        backgroundColor: "hsl(0 84.2% 60.2%)",
        color: "hsl(210 40% 98%)",
      },
      link: {
        backgroundColor: "transparent",
        color: "hsl(221.2 83.2% 53.3%)",
        border: "none",
        textDecoration: "underline",
        textUnderlineOffset: "4px",
      },
    }

    const sizes: Record<string, React.CSSProperties> = {
      sm: {
        height: "2rem",
        padding: "0 0.75rem",
        fontSize: "0.875rem",
      },
      default: {
        height: "2.5rem",
        padding: "0 1rem",
        fontSize: "0.875rem",
      },
      lg: {
        height: "2.75rem",
        padding: "0 2rem",
        fontSize: "1rem",
      },
      icon: {
        height: "2.5rem",
        width: "2.5rem",
        padding: "0",
      },
      "icon-sm": {
        height: "2rem",
        width: "2rem",
        padding: "0",
      },
      "icon-lg": {
        height: "2.75rem",
        width: "2.75rem",
        padding: "0",
      },
    }

    // disabled 상태 스타일
    const disabledStyles: React.CSSProperties = props.disabled ? {
      opacity: 0.5,
      cursor: "not-allowed",
      pointerEvents: "none",
    } : {}

    // style prop이 전달되면 병합 (전달된 style이 우선순위 높음)
    const mergedStyle: React.CSSProperties = {
      ...baseStyles,
      ...variants[variant],
      ...sizes[size],
      ...disabledStyles,
      ...style, // 전달된 style이 마지막에 오므로 우선순위가 높음
    }

    // hover 스타일 (shadcn/ui 표준)
    const hoverStyles: Record<string, { backgroundColor?: string; color?: string }> = {
      default: {
        backgroundColor: "#1a1a1a",
      },
      outline: {
        backgroundColor: "hsl(210 40% 96.1%)",
        color: "hsl(222.2 47.4% 11.2%)",
      },
      ghost: {
        backgroundColor: "hsl(210 40% 96.1%)",
        color: "hsl(222.2 47.4% 11.2%)",
      },
      secondary: {
        backgroundColor: "hsl(210 40% 90%)",
      },
      destructive: {
        backgroundColor: "hsl(0 84.2% 60.2% / 0.9)",
      },
      link: {
        color: "hsl(221.2 83.2% 53.3% / 0.8)",
      },
    }

    // active 스타일
    const activeStyles: Record<string, { backgroundColor?: string; color?: string }> = {
      default: {
        backgroundColor: "#333333",
      },
      outline: {
        backgroundColor: "hsl(210 40% 90%)",
      },
      ghost: {
        backgroundColor: "hsl(210 40% 90%)",
      },
      secondary: {
        backgroundColor: "hsl(210 40% 85%)",
      },
      destructive: {
        backgroundColor: "hsl(0 84.2% 60.2% / 0.8)",
      },
      link: {
        color: "hsl(221.2 83.2% 53.3% / 0.7)",
      },
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (props.disabled) return
      
      const customBg = style?.backgroundColor as string | undefined
      const hasCustomBg = customBg !== undefined && customBg !== "transparent"
      
      if (!hasCustomBg && hoverStyles[variant]) {
        if (hoverStyles[variant].backgroundColor) {
          e.currentTarget.style.backgroundColor = hoverStyles[variant].backgroundColor!
        }
        if (hoverStyles[variant].color) {
          e.currentTarget.style.color = hoverStyles[variant].color!
        }
      }
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (props.disabled) return
      
      const customBg = style?.backgroundColor as string | undefined
      const hasCustomBg = customBg !== undefined && customBg !== "transparent"
      
      if (!hasCustomBg) {
        // 원래 variant 스타일로 복원
        if (variants[variant].backgroundColor) {
          e.currentTarget.style.backgroundColor = variants[variant].backgroundColor as string
        }
        if (variants[variant].color) {
          e.currentTarget.style.color = variants[variant].color as string
        }
      } else {
        // 커스텀 스타일이 있으면 원래 스타일로 복원
        if (customBg !== undefined) {
          e.currentTarget.style.backgroundColor = customBg
        }
        if (style?.color !== undefined) {
          e.currentTarget.style.color = style.color as string
        }
      }
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (props.disabled) return
      
      const customBg = style?.backgroundColor as string | undefined
      const hasCustomBg = customBg !== undefined && customBg !== "transparent"
      
      if (!hasCustomBg && activeStyles[variant]) {
        if (activeStyles[variant].backgroundColor) {
          e.currentTarget.style.backgroundColor = activeStyles[variant].backgroundColor!
        }
        if (activeStyles[variant].color) {
          e.currentTarget.style.color = activeStyles[variant].color!
        }
      }
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (props.disabled) return
      handleMouseEnter(e)
    }

    const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
      if (props.disabled) return
      e.currentTarget.style.outline = "2px solid #000000"
      e.currentTarget.style.outlineOffset = "2px"
    }

    const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
      e.currentTarget.style.outline = "none"
    }

    // asChild prop이 있으면 children을 그대로 반환 (Slot 패턴)
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ref,
        style: { ...mergedStyle, ...children.props.style },
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onFocus: handleFocus,
        onBlur: handleBlur,
      } as any)
    }

    return (
      <button
        ref={ref}
        style={mergedStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
