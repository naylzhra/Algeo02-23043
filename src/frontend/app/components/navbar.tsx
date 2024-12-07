import React from 'react'

export default function Navbar({theme = "default"}: {theme?: string}) { //  theme bisa hmif atau ukm, kalau ada di homepage dia default, bisa dimanfaatin buat logic milih warna
  return (
    <div className='bg-blue'>Ini Navbar</div>
    )
}