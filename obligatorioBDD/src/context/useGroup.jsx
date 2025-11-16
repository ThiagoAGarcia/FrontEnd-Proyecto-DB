import {createContext, useContext, useEffect, useState} from 'react'

import getMyGroupsService from '../service/getMyGroups.jsx'

const GroupsContext = createContext()

export function GroupsProvider({children}) {
  const [grupos, setGrupos] = useState([])
  const [loadingGroups, setLoadingGroups] = useState(false)

  const fetchGroups = async () => {
    try {
      setLoadingGroups(true)
      const data = await getMyGroupsService()
      if (data?.success) {
        setGrupos(data.grupos)
      } else {
        setGrupos([])
      }
    } catch (err) {
      console.error('Error al obtener grupos:', err)
      setGrupos([])
    } finally {
      setLoadingGroups(false)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  return (
    <GroupsContext.Provider
      value={{
        grupos,
        setGrupos,
        loadingGroups,
        refreshGroups: fetchGroups,
      }}>
      {children}
    </GroupsContext.Provider>
  )
}

export function useGroups() {
  return useContext(GroupsContext)
}
