import { getUserId } from '@/app/lib/action'
import React from 'react'

const UserInfo = async() => {
    const userId = await getUserId();
  return (
    <div>UserInfo - {userId}</div>
  )
}

export default UserInfo