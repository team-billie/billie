'use client'

import { useUserStore } from '@/lib/store/useUserStore'
import { useState } from 'react'

export default function TestLoginForm() {
  const [inputId, setInputId] = useState('')
  const { setUserId, userId, logout } = useUserStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = parseInt(inputId)
    if (!isNaN(id)) {
      setUserId(id)
    }
  }

  if (userId) {
    return (
      <div className="p-4">
        <p className="mb-4">현재 로그인된 사용자 ID: {userId}</p>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          로그아웃
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label htmlFor="userId" className="block mb-2">
          사용자 ID:
        </label>
        <input
          type="number"
          id="userId"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          className="border p-2 rounded"
          placeholder="사용자 ID를 입력하세요"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        로그인
      </button>
    </form>
  )
} 