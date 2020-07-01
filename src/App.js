import React, { useState, useEffect } from 'react';
import SingInSingUp from './page/SingInSingUp'
import { ToastContainer } from 'react-toastify'
import { AuthContext } from './utils/context';
import { isUserLoged } from './api/auth';
import Routing from './routes/Routing';

export default function App() {

  const [user, setUser] = useState(null)
  const [loadUser, setLoadUser] = useState(false)
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false)

  useEffect(() => {
    setUser(isUserLoged())
    setRefreshCheckLogin(false)
    setLoadUser(true)
  }, [refreshCheckLogin])

  if (!loadUser) return null


  return (
    <AuthContext.Provider value={{user, setRefreshCheckLogin}}>
      {!user ?
        (<>
          <SingInSingUp setRefreshCheckLogin={setRefreshCheckLogin} />
        </>
        ) : (
          <Routing />
        )
      }



      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss />

    </AuthContext.Provider>
  )
}
