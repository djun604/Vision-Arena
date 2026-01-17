import * as React from "react"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className = "", style, ...props }, ref) => (
  <div style={{ width: "100%", overflow: "auto" }}>
    <table
      ref={ref}
      style={{
        width: "100%",
        borderCollapse: "collapse",
        ...style,
      }}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className = "", style, ...props }, ref) => (
  <thead
    ref={ref}
    style={{
      ...style,
    }}
    {...props}
  />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className = "", style, ...props }, ref) => (
  <tbody
    ref={ref}
    style={{
      ...style,
    }}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className = "", style, ...props }, ref) => (
  <tr
    ref={ref}
    style={{
      borderBottom: "1px solid #e5e7eb",
      transition: "background-color 0.15s ease-in-out",
      ...style,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = "#f9fafb"
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "transparent"
    }}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className = "", style, ...props }, ref) => (
  <th
    ref={ref}
    style={{
      height: "3rem",
      padding: "0 1rem",
      textAlign: "left",
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#6b7280",
      ...style,
    }}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className = "", style, ...props }, ref) => (
  <td
    ref={ref}
    style={{
      padding: "1rem",
      fontSize: "0.875rem",
      ...style,
    }}
    {...props}
  />
))
TableCell.displayName = "TableCell"

export { Table, TableHeader, TableBody, TableHead, TableRow, TableCell }

