import React from 'react'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <section className={'py-9'}>{children}</section>
}
