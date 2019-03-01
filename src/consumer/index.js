const kafka = require('kafka-node')
const {Consumer} = kafka
const config = require('../../config')
const { tutorialTopicSchemaV1 } = require('../producer/schema')
const client = new kafka.KafkaClient({
  kafkaHost: config.kafkaHost
})


const consumerConfig = {
  payloads: [
    { topic: config.topic1, partition: 0, offset: 0} // offset and partition are important
  ],
  options: {
    fromOffset: true,
  }
}


function getConsumerOffset(topic, partition) {
  const offsetClient = new kafka.Offset(client)
  offsetClient.fetch([
    { 
      topic,
      partition,
      // time:
      // Used to ask for all messages before a certain time (ms), default Date.now(),
      // Specify -1 to receive the latest offsets and -2 to receive the earliest available offset.
      time: -1,
    }
  ], (err, data) => {
    if (err) console.log(err)
    else console.log(data)
  })
}

const consumer = new Consumer(client, consumerConfig.payloads, consumerConfig.options)

console.log('starting consumer')
consumer.on('message', (data) => {
  const buf = Buffer.from(data.value, 'binary') // Read string into a buffer.
  const msg = JSON.parse(tutorialTopicSchemaV1.fromBuffer(buf))
  console.log("received message", msg)
})

consumer.on('error', (err) => {
  console.log(err)
})

consumer.on('offsetOutOfRange', (err) => {
  console.log(err)
})