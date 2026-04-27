import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../lib/supabaseClient'
import { toast } from 'react-toastify'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      toast.error(error.message)
    } else if (data.user) {
      const user = data.user
      // The session will be stored in supabase.auth in the cookie automatically
      // Redirect based on role stored in user metadata
      const role = (user.user_metadata as any)?.role ?? 'user'
      if (role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/')
      }
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded shadow-md w-full max-w-md"
      >
        <h2 className="mb-6 text-2xl font-semibold text-center">Sign In</h2>
        <label className="block mb-2">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded"
            required
          />
        </label>
        <label className="block mb-4">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 mt-1 border rounded"
            required
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}
