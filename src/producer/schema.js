const avro = require('avsc')

// const v1 = avro.Type.forSchema({
//   type: 'record',
//   fields: [
//     { name: 'message', type: 'string' },
//     {
//       name: 'data',
//       type: {
//         type: 'record',
//         fields: [{name: 'foo', type: 'string'}]
//       }
//     }
//   ]
// })

// const validSchema = {message: 'dank memes', data: {foo: 'fdsdfsfdsdf'}}
// console.log(v1.isValid(validSchema)) 
// const buf = v1.toBuffer(validSchema)
// console.log(buf)
// const decoded = JSON.parse(v1.fromBuffer(buf))
// console.log(decoded)

const tutorialTopicSchemaV1 = avro.Type.forSchema({
  type: 'record',
  fields: [
    { name: 'message', type: 'string' }
  ]
})

module.exports = {
  tutorialTopicSchemaV1
}