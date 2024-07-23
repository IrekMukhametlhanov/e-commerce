export const pathsPublic: {[k: string]: string} = {
    home: '/',
    productDetails: './product/:idOrSlug'
}

export const pathsPrivate: {[k: string]: string} = {
    accountSettings: '/account-settings'
}

export const paths: {[k: string]: string} = Object.assign({}, pathsPublic, pathsPrivate)


export const checkPathMath = (pathname: string, paths: {[k: string] : string}) => {
     let isMath = false
     const allPaths = Object.keys(paths).map((k) => paths[k])
     const pathFirstSection = pathname.split('/')[1]

     allPaths.forEach((p) => {
        if (p.slice(1) === pathFirstSection) isMath = true
     })
     return isMath
}