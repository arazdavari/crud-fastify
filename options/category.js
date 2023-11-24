// options of add new category endpoint
const addOptions = {
    
    schema: {

      // request needs to have a querystring with `name`, `parent` parameters
      body: {
        type: 'object',
        properties: {
            name: { type: 'string'},
            parent: { type: 'integer'}
        },
        required: ['name']
      }
    }
}

// options of update category by id endpoint
const updateOptions = {
    
  schema: {

    // request needs to have a querystring with `name`, `parent` parameters
    body: {
      type: 'object',
      properties: {
          name: { type: 'string'},
          parent: { type: 'integer'}
      },
    }
  }
}

// export options

exports.addOptions = addOptions
exports.updateOptions = updateOptions