import { createContext, useState } from "react"

export const AuthContext = createContext()

function AuthProvider({ children }) {

  const [user, setUser] = useState(
    localStorage.getItem("access_token") || null
  )

  const login = (token) => {

    localStorage.setItem("access_token", token)

    setUser(token)
  }

  const logout = () => {

    localStorage.removeItem("access_token")

    setUser(null)
  }

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>
  )
}

export default AuthProvider