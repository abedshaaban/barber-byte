import React from 'react'

type User = {
  name: string
}

interface HeaderProps {
  user?: User
}

export default function Index({ user }: HeaderProps) {
  return <header></header>
}
