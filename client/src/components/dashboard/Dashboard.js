import React, {useContext} from 'react'
import { UserContext } from '../../UserContext'

const Dashboard = () => {
    const {user} = useContext(UserContext)
  return (
    <div>
        {user ? user.firstname : ''} Welcome to your Dashboard
    </div>
  )
}

export default Dashboard