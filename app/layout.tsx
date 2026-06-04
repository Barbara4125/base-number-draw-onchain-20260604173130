import type { Metadata } from 'next'
import './globals.css'
import { DrawHeader } from '@/components/DrawHeader'
import { WagmiProviders } from '@/components/WagmiProviders'

export const metadata: Metadata = {
  title: 'base-split-vault-number-draw',
  description: 'A Base contract console for running the deployed NumberDrawVault draw transaction.',
  metadataBase: new URL('https://base-split-vault-number-draw.vercel.app'),
  openGraph: {
    title: 'base-split-vault-number-draw',
    description: 'A Base contract console for running the deployed NumberDrawVault draw transaction.',
    url: 'https://base-split-vault-number-draw.vercel.app',
    siteName: 'base-split-vault-number-draw',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'base-split-vault-number-draw',
    description: 'A Base contract console for running the deployed NumberDrawVault draw transaction.'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="6a1fdf554fbf682eb25dc0c3" />
        <meta
          name="talentapp:project_verification"
          content="c72e1997b2a5f7c751001aaf5fe9122349136a041df6c64c06cd757abb94722c9ac31eeb56c47c32b9d1df209346c1e29836d4403d9167139361adee2266fc4e"
        />
      </head>
      <body>
        <WagmiProviders>
          <div className="app-shell">
            <DrawHeader />
            {children}
          </div>
        </WagmiProviders>
      </body>
    </html>
  )
}
