import generator from './utils/generator';

let tag = 'Countries';
let schema = {$ref: '#/definitions/Country'};

export default {
  tags: [
    {
      name: tag,
      description: 'Endpoints for countries management'
    }
  ],
  paths: {
    '/countries': {
      get: generator.getAll(tag, schema),
      post: generator.post(tag, schema)
    },
    '/countries/{id}': {
      parameters: [generator.idParameter()],
      get: generator.getById(tag, schema),
      put: generator.put(tag, schema),
      delete: generator.delete(tag, schema)
    }
  },
  definitions: {
    Country: {
      required: [
        'name',
        'isoCodeTwo',
        'isoCodeThree'
      ],
      properties: {
        _id: {
          type: 'string',
          uniqueItems: true
        },
        name: {
          type: 'string',
          maxLength: 100
        },
        shortListed: {
          type: 'boolean',
          default: false
        },
        isoCodeTwo: {
          type: 'string',
          minLength: 2,
          maxLength: 2
        },
        isoCodeThree: {
          type: 'string',
          minLength: 3,
          maxLength: 3
        },
        description: {
          type: 'string'
        },
        taxRate: {
          type: 'number'
        },
        currency: {
          type: 'string'
        }
      }
    }
  }
}