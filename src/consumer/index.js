const kafka = require('kafka-node')
const {Consumer} = kafka
const config = require('../../config')
const client = new kafka.KafkaClient({
  kafkaHost: config.kafkaHost
})


const consumerConfig = {
  payloads: [
    { topic: config.topic1, partition: 0, offset: 2} // offset and partition are important
  ],
  options: {
    fromOffset: true,
  }
}


const consumer = new Consumer(client, consumerConfig.payloads, consumerConfig.options)

console.log('starting consumer')
consumer.on('message', (message) => {
  console.log("received message", message)
})

consumer.on('error', (err) => {
  console.log(err)
})

consumer.on('offsetOutOfRange', (err) => {
  console.log(err)
})