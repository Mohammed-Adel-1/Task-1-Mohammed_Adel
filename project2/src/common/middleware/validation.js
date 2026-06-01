

// Validation function
export const validate = (schema) => {
    return async (req, res, next) => {

    let errorResults = [];
    
    // Looping over the shcema checking all the inputs
    for (const key of Object.keys(schema)) {
        const { error } = schema[key].validate(req[key], { abortEarly: false});

        // Checking if there is any errors
        if(error) {
            error.details.forEach(element => {
                errorResults.push({
                    key,
                    path: element.path[0],
                    message: element.message,
                })
            });
        }
        
    }

    //sending the error if there are any
    if(errorResults.length){
        return res.status(400).json({ message: "Validation Error", error: errorResults });
    }

    next();
}
}