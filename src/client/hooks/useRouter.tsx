

export const useRouter = ()=> {

    return {
        navigate: (path: string)=> {
            window.location.href = path
        }
    }
}