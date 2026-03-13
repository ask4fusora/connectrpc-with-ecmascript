import "./globals.css"

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default Layout
