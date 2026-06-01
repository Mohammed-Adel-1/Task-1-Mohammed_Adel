

// Authorization function
export const authorization = (roles = []) => {
    return (req, res, next) => {

        // Checking if the user's role is on of the listed roles for this API
        if(!roles.includes(req.user.role)){
            throw new Error("You are not authorized");
        }
        next();
    } 
}