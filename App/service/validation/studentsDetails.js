
var StudentSchema = {
    type: 'object',
    required: ['name', 'email'],
    properties: {
        
        name: {
            type: 'string',
            minLength: 2,
            maxLength: 20
        },
        email: {
            type: 'string',
            minLength: 2,
            maxLength: 16
            
        }
    }
}

module.exports = StudentSchema;
 
 