import './assets/tailwind.css'
import React from 'react'
import {createRoot} from 'react-dom/client'

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(<h1 className="text-2xl font-bold text-red-600">Hello React!</h1>)
