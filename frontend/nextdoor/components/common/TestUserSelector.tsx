import { useState } from 'react'
import { useTestUserStore } from '@/lib/store/useTestUserStore'

export default function TestUserSelector() {
  const [inputId, setInputId] = useState('')
  const { userId, setUserId, logout } = useTestUserStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = parseInt(inputId)
    if (!isNaN(id)) {
      setUserId(id)
    }
  }

  if (userId) {
    return (
      <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border">
        <p className="mb-2">테스트 사용자 ID: {userId}</p>
        <button
          onClick={logout}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          로그아웃
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="testUserId" className="block text-sm mb-1">
            테스트 사용자 ID:
          </label>
          <input
            type="number"
            id="testUserId"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            className="border p-1 rounded text-sm w-32"
            placeholder="ID 입력"
            required
          />
        </div>
        <button
          type="submit"
          className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          로그인
        </button>
      </form>
    </div>
  )
} 