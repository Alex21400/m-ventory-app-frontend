import { useSelector } from "react-redux"

// Shows links when User is logged in
export const ShowOnLogin = ({ children }) => {
    const { isLoggedIn } = useSelector(state => state.auth)

    if(isLoggedIn) {
        return <>{children}</>
    }

    return null
}

// Shows links when User is logged out
export const ShowOnLogout = ({ children }) => {
    const { isLoggedIn } = useSelector(state => state.auth)

    if(!isLoggedIn) {
        return <>{children}</>
    }

    return null
}