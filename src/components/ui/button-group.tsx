import * as React from "react"

// ButtonGroupSeparator와 ButtonGroupText를 먼저 정의
interface ButtonGroupSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
}

const ButtonGroupSeparator = React.forwardRef<HTMLDivElement, ButtonGroupSeparatorProps>(
  ({ orientation = "vertical", style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        style={{
          width: orientation === "horizontal" ? "100%" : "1px",
          height: orientation === "vertical" ? "100%" : "1px",
          backgroundColor: "#e5e7eb",
          alignSelf: "stretch",
          ...style,
        }}
        {...props}
      />
    )
  }
)
ButtonGroupSeparator.displayName = "ButtonGroupSeparator"

interface ButtonGroupTextProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  children: React.ReactNode
}

const ButtonGroupText = React.forwardRef<HTMLDivElement, ButtonGroupTextProps>(
  ({ asChild, children, style, ...props }, ref) => {
    const baseStyle: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      padding: "0 0.75rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#374151",
      backgroundColor: "#f9fafb",
      border: "1px solid #e5e7eb",
      borderRadius: "0.375rem",
      ...style,
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ref,
        style: { ...baseStyle, ...children.props.style },
      } as any)
    }

    return (
      <div ref={ref} style={baseStyle} {...props}>
        {children}
      </div>
    )
  }
)
ButtonGroupText.displayName = "ButtonGroupText"

// ButtonGroup 정의
interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
  children: React.ReactNode
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ orientation = "horizontal", style, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        style={{
          display: "inline-flex",
          flexDirection: orientation === "vertical" ? "column" : "row",
          alignItems: "stretch",
          gap: 0,
          ...style,
        }}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child

          // ButtonGroupSeparator는 그대로 반환
          if (child.type === ButtonGroupSeparator) {
            return child
          }

          // ButtonGroupText는 그대로 반환
          if (child.type === ButtonGroupText) {
            return child
          }

          // ButtonGroup 내부의 자식이 ButtonGroup인 경우 (중첩) - gap 추가
          if (child.type === ButtonGroup) {
            return React.cloneElement(child, {
              style: {
                ...(child.props.style || {}),
                marginLeft: orientation === "horizontal" && index > 0 ? "0.75rem" : undefined,
                marginTop: orientation === "vertical" && index > 0 ? "0.75rem" : undefined,
              },
            } as any)
          }

          // 실제 버튼 요소들에 대한 스타일 적용
          const childrenArray = React.Children.toArray(children)
          const isFirst = index === 0
          const isLast = index === childrenArray.length - 1
          const isOnly = childrenArray.length === 1

          // 이전/다음 요소가 ButtonGroupSeparator인지 확인
          const prevChild = index > 0 ? childrenArray[index - 1] : null
          const nextChild = index < childrenArray.length - 1 ? childrenArray[index + 1] : null
          const prevIsSeparator = React.isValidElement(prevChild) && prevChild.type === ButtonGroupSeparator
          const nextIsSeparator = React.isValidElement(nextChild) && nextChild.type === ButtonGroupSeparator

          const buttonStyle: React.CSSProperties = {}

          // border-radius 조정
          if (isOnly) {
            buttonStyle.borderRadius = "0.375rem"
          } else {
            if (orientation === "horizontal") {
              // 첫 번째 버튼
              if (isFirst && !prevIsSeparator) {
                buttonStyle.borderTopRightRadius = 0
                buttonStyle.borderBottomRightRadius = 0
                buttonStyle.borderTopLeftRadius = "0.375rem"
                buttonStyle.borderBottomLeftRadius = "0.375rem"
              }
              // 마지막 버튼
              else if (isLast && !nextIsSeparator) {
                buttonStyle.borderTopLeftRadius = 0
                buttonStyle.borderBottomLeftRadius = 0
                buttonStyle.borderTopRightRadius = "0.375rem"
                buttonStyle.borderBottomRightRadius = "0.375rem"
              }
              // 중간 버튼
              else if (!isFirst && !isLast) {
                buttonStyle.borderRadius = 0
              }

              // 오른쪽 border 제거 (마지막이 아니고 separator가 아닌 경우)
              if (!isLast && !nextIsSeparator) {
                buttonStyle.borderRightWidth = 0
              }
            } else {
              // vertical orientation
              if (isFirst && !prevIsSeparator) {
                buttonStyle.borderTopLeftRadius = "0.375rem"
                buttonStyle.borderTopRightRadius = "0.375rem"
                buttonStyle.borderBottomLeftRadius = 0
                buttonStyle.borderBottomRightRadius = 0
              } else if (isLast && !nextIsSeparator) {
                buttonStyle.borderTopLeftRadius = 0
                buttonStyle.borderTopRightRadius = 0
                buttonStyle.borderBottomLeftRadius = "0.375rem"
                buttonStyle.borderBottomRightRadius = "0.375rem"
              } else if (!isFirst && !isLast) {
                buttonStyle.borderRadius = 0
              }

              // 아래쪽 border 제거
              if (!isLast && !nextIsSeparator) {
                buttonStyle.borderBottomWidth = 0
              }
            }
          }

          return React.cloneElement(child, {
            style: {
              ...buttonStyle,
              ...(child.props.style || {}),
            },
          } as any)
        })}
      </div>
    )
  }
)
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText }
